package fr.maif.conciergerie.rest.api;

import groovy.json.JsonBuilder
import groovy.json.JsonSlurper

import java.sql.Connection
import java.sql.PreparedStatement
import java.sql.ResultSet
import java.sql.ResultSetMetaData
import java.sql.SQLException
import java.sql.Timestamp;
import java.text.DateFormat
import java.text.SimpleDateFormat
import java.util.logging.Logger
import java.util.stream.Collectors

import javax.naming.Context
import javax.naming.InitialContext
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import javax.sql.DataSource

import org.apache.http.HttpHeaders
import org.bonitasoft.web.extension.ResourceProvider
import org.bonitasoft.web.extension.rest.RestApiResponse
import org.bonitasoft.web.extension.rest.RestApiResponseBuilder

import com.bonitasoft.web.extension.rest.RestAPIContext
import com.bonitasoft.web.extension.rest.RestApiController

class Reporting implements RestApiController {

	private static final Logger LOGGER = Logger.getLogger("org.bonitasoft")

	@Override
	RestApiResponse doHandle(HttpServletRequest request, RestApiResponseBuilder responseBuilder, RestAPIContext context) {
		// To retrieve query parameters use the request.getParameter(..) method.
		// Be careful, parameter values are always returned as String values


		try {
			def body = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));

			def jsonSlurper = new JsonSlurper()
			def filters = jsonSlurper.parseText(body)

			Properties props = loadProperties("configuration.properties", context.resourceProvider)
			String datasource = props["datasource"]

			DataSource ds = getDatasource(datasource);
			Connection conn = ds.getConnection();

			String queryUtilisateurs = "SELECT count(distinct(idDEMANDEUR )) AS \"nombreUtilisateurs\" FROM DemandeConciergerie WHERE 1=1"

			Map<String, String> results = new HashMap();
			def nbUtilisateurs = getData(conn, filters, queryUtilisateurs);
			results.putAll(nbUtilisateurs)
			//LOGGER.severe("result : " + nbUtilisateurs);

			String queryFamilles = "SELECT count(distinct(FAMILLEDEMANDE )) AS \"nombreFamilles\" FROM DemandeConciergerie WHERE 1=1"
			def familles = getData(conn, filters, queryFamilles)
			results.putAll(familles)
			
			String querySousFamilles = "SELECT count (distinct(sousFAMILLEDEMANDE ) ) AS \"nombreSousFamilles\" FROM DemandeConciergerie WHERE 1=1 AND sousFAMILLEDEMANDE != ''"
			def sousFamilles = getData(conn, filters, querySousFamilles)
			results.putAll(sousFamilles)

//			def results = [nbUtilisateurs, familles, sousFamilles]
			// Send the result as a JSON representation
			// You may use buildPagedResponse if your result is multiple
			return buildResponse(responseBuilder, HttpServletResponse.SC_OK, new JsonBuilder(results).toPrettyString())
		} catch (Exception e){
			if (conn != null) conn.close();
		}
	}

	/**
	 * Build an HTTP response.
	 *
	 * @param  responseBuilder the Rest API response builder
	 * @param  httpStatus the status of the response
	 * @param  body the response body
	 * @return a RestAPIResponse
	 */
	RestApiResponse buildResponse(RestApiResponseBuilder responseBuilder, int httpStatus, Serializable body) {
		return responseBuilder.with {
			withResponseStatus(httpStatus)
			withResponse(body)
			build()
		}
	}

	/**
	 * Returns a paged result like Bonita BPM REST APIs.
	 * Build a response with content-range data in the HTTP header.
	 *
	 * @param  responseBuilder the Rest API response builder
	 * @param  body the response body
	 * @param  p the page index
	 * @param  c the number of result per page
	 * @param  total the total number of results
	 * @return a RestAPIResponse
	 */
	RestApiResponse buildPagedResponse(RestApiResponseBuilder responseBuilder, Serializable body, int p, int c, long total) {
		return responseBuilder.with {
			withAdditionalHeader(HttpHeaders.CONTENT_RANGE,"$p-$c/$total");
			withResponse(body)
			build()
		}
	}

	/**
	 * Load a property file into a java.util.Properties
	 */
	Properties loadProperties(String fileName, ResourceProvider resourceProvider) {
		Properties props = new Properties()
		resourceProvider.getResourceAsStream(fileName).withStream { InputStream s ->
			props.load s
		}
		props
	}

	public Object getData(Connection conn, Object filters, String query) throws Exception {
		ResultSet rs = null;
		PreparedStatement pstmt = null;
		StringBuilder sb = new StringBuilder(query);

		// SELECT count(FAMILLEDEMANDE ), FAMILLEDEMANDE  FROM DEMANDECONCIERGERIE Group by FAMILLEDEMANDE ;
		// SELECT count(distinct(idDEMANDEUR )) FROM DEMANDECONCIERGERIE ;
		// SELECT count (distinct(sousFAMILLEDEMANDE ) )FROM DEMANDECONCIERGERIE where sousFAMILLEDEMANDE != '';
		// SELECT count(distinct(FAMILLEDEMANDE )) FROM DEMANDECONCIERGERIE;

//		sb.append(" FROM DemandeConciergerie WHERE 1=1");

		DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		// dates
		Timestamp dateDebutAsTimestamp, dateFinAsTimestamp;
		boolean withDate = false;
		if (filters.dateDebut != null && filters.dateDebut.length() > 0 && filters.dateFin != null && filters.dateFin.length() > 0) {
			dateDebutAsTimestamp = new Timestamp(formatter.parse(filters.dateDebut.substring(0, 10)).getTime());
			dateFinAsTimestamp = new Timestamp(formatter.parse(filters.dateFin.substring(0, 10)).getTime());
			withDate = true;
			sb.append(" AND DATEDEMANDE BETWEEN ? AND ?");
		}

		LOGGER.severe("query : " + sb.toString());
		LOGGER.severe("Connection : " + conn);

		try {
			pstmt = conn.prepareStatement(sb.toString());
			if (withDate){
				pstmt.setTimestamp(1, dateDebutAsTimestamp);
				pstmt.setTimestamp(2, dateFinAsTimestamp);
			}
			rs = pstmt.executeQuery();

			return resultSetToObject(rs);
			//			return resultSetToList(rs);
		} finally {
			try {
				if (pstmt != null) pstmt.close();
			}
			catch (Exception e) {}
			try {
				if (rs != null) rs.close();;
			}
			catch (Exception e) {}

		}
	}

	public DataSource getDatasource(String datasourceName) {
		try {
			Context ctx = new InitialContext();
			Context envCtx = (Context) ctx.lookup("java:/comp/env/");

			// Look up our data source
			return (DataSource) envCtx.lookup(datasourceName);
		} catch (Exception e) {
			LOGGER.severe(e.getMessage());
			return null;
		}
	}
	
	private Object resultSetToObject(ResultSet rs) throws SQLException {
		ResultSetMetaData md = rs.getMetaData();
		int columns = md.getColumnCount();
		Map<String, String> row = new HashMap<String, String>(columns);
		if (rs != null){
			if (rs.next()){
				for(int i = 1; i <= columns; ++i){
					row.put(md.getColumnLabel(i), rs.getString(i));
				}
			}
		}
		return row;
	}

	private List<Map<String, String>> resultSetToList(ResultSet rs) throws SQLException {
		ResultSetMetaData md = rs.getMetaData();
		int columns = md.getColumnCount();
		List<Map<String, String>> rows = new ArrayList<Map<String, String>>();
		while (rs.next()){
			Map<String, String> row = new HashMap<String, String>(columns);
			for(int i = 1; i <= columns; ++i){
				row.put(md.getColumnLabel(i), rs.getString(i));
			}
			rows.add(row);
		}
		return rows;
	}
}

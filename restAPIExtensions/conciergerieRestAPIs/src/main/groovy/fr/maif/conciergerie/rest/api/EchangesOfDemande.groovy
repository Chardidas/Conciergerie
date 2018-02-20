package fr.maif.conciergerie.rest.api;

import java.sql.Connection
import java.sql.PreparedStatement
import java.sql.ResultSet
import java.sql.ResultSetMetaData
import java.sql.SQLException
import java.sql.Timestamp
import java.text.DateFormat
import java.text.SimpleDateFormat
import java.util.logging.Logger

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

import groovy.json.JsonBuilder

class EchangesOfDemande implements RestApiController {

	private static final Logger LOGGER = Logger.getLogger("org.bonitasoft")

	@Override
	RestApiResponse doHandle(HttpServletRequest request, RestApiResponseBuilder responseBuilder, RestAPIContext context) {
		// To retrieve query parameters use the request.getParameter(..) method.
		// Be careful, parameter values are always returned as String values

		def demandeId = request.getParameter "demandeId"
		if (demandeId == null) {
			return buildResponse(responseBuilder, HttpServletResponse.SC_BAD_REQUEST,"""{"error" : "the parameter demandeId is missing"}""")
		}

		Properties props = loadProperties("configuration.properties", context.resourceProvider)
		String datasource = props["datasource"]

		DataSource ds = getDatasource(datasource);
		def obj = getData(ds.getConnection(), Long.valueOf(demandeId));
		// Send the result as a JSON representation
		// You may use buildPagedResponse if your result is multiple
		return buildResponse(responseBuilder, HttpServletResponse.SC_OK, new JsonBuilder(obj).toPrettyString())
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

	public Object getData(Connection conn, Long demandeId) throws Exception {
		ResultSet rs = null;
		PreparedStatement pstmt = null;
		StringBuilder sb = new StringBuilder("SELECT");

		// attributes
		sb.append(" PERSISTENCEID AS \"persistenceId\",");
		sb.append(" CONTENU AS \"contenu\",");
		sb.append(" DATEPOSTAGE AS \"datePostage\",");
		sb.append(" USERFULLNAME AS \"userFullName\",");
		sb.append(" USERID AS \"userId\"");
		sb.append(" FROM Commentaire WHERE 1=1");
		sb.append(" AND demandeConciergerie_PID = ").append(demandeId);

		sb.append(" ORDER BY PERSISTENCEID ASC ");
		LOGGER.severe("query : " + sb.toString());
		LOGGER.severe("Connection : " + conn);

		try {
			pstmt = conn.prepareStatement(sb.toString());
			rs = pstmt.executeQuery();

			return resultSetToList(rs);
		} finally {
			try {
				if (pstmt != null) pstmt.close();
			}
			catch (Exception e) {}
			try {
				if (conn != null) conn.close();
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

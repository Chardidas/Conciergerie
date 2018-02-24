package fr.maif.conciergerie.rest.api

import fr.bonitasoft.modele.ElementPanier
import fr.bonitasoft.modele.ReservationConciergerie
import fr.bonitasoft.modele.ReservationConciergerieDAO
import groovy.json.JsonBuilder

import java.text.SimpleDateFormat
import java.util.logging.Logger

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

import org.apache.commons.codec.binary.Base64
import org.apache.commons.lang.StringEscapeUtils
import org.bonitasoft.web.extension.rest.RestApiResponse
import org.bonitasoft.web.extension.rest.RestApiResponseBuilder

import com.bonitasoft.engine.bdm.BusinessObjectDAOFactory
import com.bonitasoft.web.extension.rest.RestAPIContext
import com.bonitasoft.web.extension.rest.RestApiController

class ExportCSV implements RestApiController {

	private static final String REST_API_NAME = "Exporter";
	
	private static final Logger logger = Logger.getLogger("fr.bonitasoft");

	@Override
	RestApiResponse doHandle(HttpServletRequest request, RestApiResponseBuilder responseBuilder, RestAPIContext context) {
		try {
			String offerId = request.getParameter("offerId");
			if(offerId == null) {
				return handleBadRequestError(responseBuilder, "The offerId is not stated");
			}
			long offerIdAsLong = Long.parseLong(offerId);

			Map<String, Object> response = new HashMap<String, String>();
			response.put("result", Base64.encodeBase64String(exportFromOfferId(context, offerIdAsLong).getBytes()));
			response.put("error", null);
			return buildResponse(responseBuilder, HttpServletResponse.SC_OK, new JsonBuilder(response).toPrettyString());
		} catch (Exception e) {
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			String exceptionDetails = sw.toString();
			String error = "Exception [" + e.toString() + "] at " + exceptionDetails;
			logger.severe(error);
			Map<String, String> response = new HashMap<String, String>();
			response.put("result", null);
			response.put("error", REST_API_NAME + " REST API Extension Execution Error: " + error);
			return buildResponse(responseBuilder, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, new JsonBuilder(response).toPrettyString());
		}
	}
	
	RestApiResponse handleBadRequestError(RestApiResponseBuilder responseBuilder, String error) {
		logger.severe(REST_API_NAME + " REST API Extension Execution: " + error);
		return buildBadRequestResponse(responseBuilder, error);
	}
	
	RestApiResponse buildBadRequestResponse(RestApiResponseBuilder responseBuilder, String error) {
		Map<String, String> response = new HashMap<String, String>();
		response.put("result", null);
		response.put("error", error);
		
		return responseBuilder.with {
			withResponseStatus(HttpServletResponse.SC_BAD_REQUEST)
			withResponse(new JsonBuilder(response).toPrettyString())
			build()
		}
	}

	RestApiResponse buildResponse(RestApiResponseBuilder responseBuilder, int httpStatus, Serializable body) {
		return responseBuilder.with {
			withResponseStatus(httpStatus)
			withResponse(body)
			build()
		}
	}
	
	final static private String ROW_SEPARATOR = "\n";
	final static private String COLUMN_SEPARATOR = ",";

	final static private String[] headerColumnNames = [ "NOM", "PRIX-UNITAIRE", "QUANTITE", "PRIX-TOTAL" ];

	static private final SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd");
	
	static private String decorateValue(Serializable value) {
		if(value == null) {
			return StringEscapeUtils.escapeCsv(null);
		}
		return StringEscapeUtils.escapeCsv(value.toString());
	}
		
	static private String getValue(Object value){
		if(value == null) {
			return null;
		}
		
		return value.toString();
	}

	static private String tableToCSVString(List<List<Object>> table) {
		StringBuffer stringBuffer = new StringBuffer();
		if(!table.isEmpty()) {
			stringBuffer.append(rowToCSVString(table.get(0)));
		}
		for(int i = 1; i < table.size(); i++) {
			stringBuffer.append(ROW_SEPARATOR);
			stringBuffer.append(rowToCSVString(table.get(i)));
		}
		return stringBuffer.toString();
	}

	static private String rowToCSVString(List<Object> row) {
		StringBuffer stringBuffer = new StringBuffer();
		if(!row.isEmpty()) {
			stringBuffer.append(getValue(row.get(0)));
		}
		for(int i = 1; i < row.size(); i++) {
			stringBuffer.append(COLUMN_SEPARATOR);
			stringBuffer.append(getValue(row.get(i)));
		}
		return stringBuffer.toString();
	}

	static public String exportFromOfferId(RestAPIContext context, long offreId) throws Exception {
		List<List<Object>> table = new ArrayList<List<Object>>();

		// Header
		List<Object> header = new ArrayList<Object>();
		for(String headerColumnName : headerColumnNames) {
			header.add(decorateValue(headerColumnName));
		}
		table.add(header);

		// Body
		// Get the reservations from the BDM DAO
		BusinessObjectDAOFactory daoFactory = new BusinessObjectDAOFactory();
		ReservationConciergerieDAO reservationConciergerieDAO = (ReservationConciergerieDAO)daoFactory.createDAO(context.getApiSession(), ReservationConciergerieDAO.class);
		List<ReservationConciergerie> reservations = reservationConciergerieDAO.findByOffre(offreId, 0, Integer.MAX_VALUE);
		// Consolidate the lines
		Map<String, List<Object>> consolidatedBasket = new HashMap<String, List<Object>>();
		for(ReservationConciergerie reservation : reservations) {
			for(ElementPanier elementPanier : reservation.panier) {
				List<Object> elementConsolide = consolidatedBasket.get(elementPanier.produit.persistenceId + "");
				if(elementConsolide == null) {
					// Add a new line if it does not exist
					elementConsolide = new ArrayList<Object>();
					elementConsolide.add(elementPanier.produit.nom);
					elementConsolide.add(elementPanier.produit.prixUnitaire);
					elementConsolide.add(elementPanier.quantite);
					elementConsolide.add(0);
					
					consolidatedBasket.put(elementPanier.produit.persistenceId + "", elementConsolide)
				} else {
					// Reuse the existing line
					elementConsolide.set(2, (Integer)elementConsolide.get(2) + elementPanier.quantite);
					elementConsolide.set(3, (Integer)elementConsolide.get(2) * (Float)elementConsolide.get(1));
				}
			}
		}
		table.addAll(new ArrayList(consolidatedBasket.values()));
		
		return tableToCSVString(table);
	}
}
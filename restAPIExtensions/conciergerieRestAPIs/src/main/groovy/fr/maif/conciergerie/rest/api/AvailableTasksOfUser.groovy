package fr.maif.conciergerie.rest.api

import java.util.logging.Logger

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

import org.apache.http.HttpHeaders
import org.bonitasoft.engine.api.ProcessAPI
import org.bonitasoft.engine.bpm.flownode.HumanTaskInstance
import org.bonitasoft.engine.bpm.flownode.HumanTaskInstanceSearchDescriptor
import org.bonitasoft.engine.bpm.process.ProcessInstance
import org.bonitasoft.engine.search.SearchOptionsBuilder
import org.bonitasoft.engine.search.SearchResult
import org.bonitasoft.web.extension.ResourceProvider
import org.bonitasoft.web.extension.rest.RestApiResponse
import org.bonitasoft.web.extension.rest.RestApiResponseBuilder

import com.bonitasoft.engine.bpm.process.impl.ProcessInstanceSearchDescriptor;
import com.bonitasoft.web.extension.rest.RestAPIContext
import com.bonitasoft.web.extension.rest.RestApiController

import fr.bonitasoft.modele.DemandeConciergerie;
import fr.bonitasoft.modele.DemandeConciergerieDAO
import fr.bonitasoft.modele.DemandeConciergerieDAOImpl
import groovy.json.JsonBuilder
import groovy.json.JsonSlurper

class AvailableTasksOfUser implements RestApiController {

	private static final Logger LOGGER = Logger.getLogger("org.bonitasoft")

	@Override
	RestApiResponse doHandle(HttpServletRequest request, RestApiResponseBuilder responseBuilder, RestAPIContext context) {
		// To retrieve query parameters use the request.getParameter(..) method.
		// Be careful, parameter values are always returned as String values

		// Retrieve p parameter
		def p = request.getParameter "p"
		if (p == null) {
			return buildResponse(responseBuilder, HttpServletResponse.SC_BAD_REQUEST,"""{"error" : "the parameter p is missing"}""")
		}

		// Retrieve c parameter
		def c = request.getParameter "c"
		if (c == null) {
			return buildResponse(responseBuilder, HttpServletResponse.SC_BAD_REQUEST,"""{"error" : "the parameter c is missing"}""")
		}
		
		def userId = request.getParameter "userId"
		if (userId == null) {
			return buildResponse(responseBuilder, HttpServletResponse.SC_BAD_REQUEST,"""{"error" : "the parameter userId is missing"}""")
		}
		
		def demandeId = request.getParameter "demandeId"
		if (demandeId == null) {
			return buildResponse(responseBuilder, HttpServletResponse.SC_BAD_REQUEST,"""{"error" : "the parameter demandeId is missing"}""")
		}
		
		List<HumanTaskInstance> result = new ArrayList();
		ProcessAPI processApi = context.getApiClient().getProcessAPI();
		DemandeConciergerieDAO demandeDao = new DemandeConciergerieDAOImpl(context.getApiSession());
		DemandeConciergerie demande = demandeDao.findByPersistenceId(Long.valueOf(demandeId));
		if (demande != null && demande.getStatutDemande().equals("Annulation demandée")){
			// il faut récupérer l'id de la tâche d'annulation
			SearchOptionsBuilder builder = new SearchOptionsBuilder(Integer.valueOf(p), Integer.valueOf(c));
			builder.filter(ProcessInstanceSearchDescriptor.STRING_INDEX_1, demande.persistenceId.toString());
			SearchResult<ProcessInstance> cases = processApi.searchProcessInstances(builder.done());
			if (cases.getCount() > 0){
				HumanTaskInstance hm = processApi.getHumanTaskInstance(Long.valueOf(cases.getResult().get(0).getStringIndex2()))
				result.add(hm);
			}
		}
		SearchOptionsBuilder builder = new SearchOptionsBuilder(Integer.valueOf(p), Integer.valueOf(c));
		builder.filter(HumanTaskInstanceSearchDescriptor.STATE_NAME, "ready");
		builder.filter(HumanTaskInstanceSearchDescriptor.ASSIGNEE_ID, Long.valueOf(userId));
		builder.filter(HumanTaskInstanceSearchDescriptor.PROCESS_INSTANCE_ID, Long.valueOf(demande.caseId));
		SearchResult<HumanTaskInstance> humanTasks = processApi.searchHumanTaskInstances(builder.done());
		result.addAll(humanTasks.getResult());
			
		// Send the result as a JSON representation
		// You may use buildPagedResponse if your result is multiple
		return buildResponse(responseBuilder, HttpServletResponse.SC_OK, new JsonBuilder(result).toPrettyString())
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

}

package fr.maif.conciergerie.rest.api

import groovy.json.JsonBuilder
import groovy.json.JsonSlurper

import java.util.logging.Logger

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

import org.apache.http.HttpHeaders
import org.bonitasoft.engine.identity.User
import org.bonitasoft.engine.identity.UserSearchDescriptor
import org.bonitasoft.engine.search.Order;
import org.bonitasoft.engine.search.SearchOptionsBuilder
import org.bonitasoft.engine.search.SearchResult
import org.bonitasoft.web.extension.ResourceProvider
import org.bonitasoft.web.extension.rest.RestApiResponse
import org.bonitasoft.web.extension.rest.RestApiResponseBuilder

import com.bonitasoft.web.extension.rest.RestAPIContext
import com.bonitasoft.web.extension.rest.RestApiController

class UsersAndIds implements RestApiController {

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
		
		def jsonSlurper = new JsonSlurper()
		List<String> usersResponse = new  ArrayList();
		SearchOptionsBuilder builder = new SearchOptionsBuilder(Integer.valueOf(p), Integer.valueOf(c));
		builder.filter(UserSearchDescriptor.ENABLED, true);
		builder.sort(UserSearchDescriptor.FIRST_NAME, Order.ASC);
		SearchResult<User> users = context.getApiClient().getIdentityAPI().searchUsers(builder.done());
		for (User user : users.getResult()){
			def usr = '''{}''';
			def obj = jsonSlurper.parseText(usr);
			obj.userId = user.id;
			obj.fullName = user.firstName + " " + user.lastName;
			usersResponse.add(obj);
		}

			

		// Prepare the result
		def result = usersResponse

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

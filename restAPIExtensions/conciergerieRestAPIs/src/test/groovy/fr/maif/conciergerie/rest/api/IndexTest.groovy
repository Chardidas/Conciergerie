package fr.maif.conciergerie.rest.api;

import groovy.json.JsonSlurper

import javax.servlet.http.HttpServletRequest

import org.bonitasoft.web.extension.ResourceProvider
import org.bonitasoft.web.extension.rest.RestApiResponseBuilder

import spock.lang.Specification

import com.bonitasoft.web.extension.rest.RestAPIContext

/**
 * @see http://spockframework.github.io/spock/docs/1.0/index.html
 */
class IndexTest extends Specification {

    // Declare mocks here
    // Mocks are used to simulate external dependencies behavior
    def httpRequest = Mock(HttpServletRequest)
    def resourceProvider = Mock(ResourceProvider)
    def context = Mock(RestAPIContext)

    /**
     * You can configure mocks before each tests in the setup method
     */
    def setup(){
        // Simulate access to configuration.properties resource
        context.resourceProvider >> resourceProvider
        resourceProvider.getResourceAsStream("configuration.properties") >> IndexTest.class.classLoader.getResourceAsStream("testConfiguration.properties")
    }

//    def should_return_a_json_representation_as_result() {
//        given: "a RestAPIController"
//        def index = new Index()
//        // Simulate a request with a value for each parameter
//        httpRequest.getParameter("p") >> "aValue1"
//        httpRequest.getParameter("c") >> "aValue2"
//        httpRequest.getParameter("famille") >> "aValue3"
//        httpRequest.getParameter("statut") >> "aValue4"
//        httpRequest.getParameter("utilisateur") >> "aValue5"
//
//        when: "Invoking the REST API"
//        def apiResponse = index.doHandle(httpRequest, new RestApiResponseBuilder(), context)
//
//        then: "A JSON representation is returned in response body"
//        def jsonResponse = new JsonSlurper().parseText(apiResponse.response)
//        // Validate returned response
//        apiResponse.httpStatus == 200
//        jsonResponse.p == "aValue1"
//        jsonResponse.c == "aValue2"
//        jsonResponse.famille == "aValue3"
//        jsonResponse.statut == "aValue4"
//        jsonResponse.utilisateur == "aValue5"
//        jsonResponse.myParameterKey == "testValue"
//    }
//
//    def should_return_an_error_response_if_p_is_not_set() {
//        given: "a request without p"
//        def index = new Index()
//        httpRequest.getParameter("p") >> null
//        // Other parameters return a valid value
//        httpRequest.getParameter("c") >> "aValue2"
//        httpRequest.getParameter("famille") >> "aValue3"
//        httpRequest.getParameter("statut") >> "aValue4"
//        httpRequest.getParameter("utilisateur") >> "aValue5"
//
//        when: "Invoking the REST API"
//        def apiResponse = index.doHandle(httpRequest, new RestApiResponseBuilder(), context)
//
//        then: "A JSON response is returned with a HTTP Bad Request Status (400) and an error message in body"
//        def jsonResponse = new JsonSlurper().parseText(apiResponse.response)
//        // Validate returned response
//        apiResponse.httpStatus == 400
//        jsonResponse.error == "the parameter p is missing"
//    }
//
//    def should_return_an_error_response_if_c_is_not_set() {
//        given: "a request without c"
//        def index = new Index()
//        httpRequest.getParameter("c") >> null
//        // Other parameters return a valid value
//        httpRequest.getParameter("p") >> "aValue1"
//        httpRequest.getParameter("famille") >> "aValue3"
//        httpRequest.getParameter("statut") >> "aValue4"
//        httpRequest.getParameter("utilisateur") >> "aValue5"
//
//        when: "Invoking the REST API"
//        def apiResponse = index.doHandle(httpRequest, new RestApiResponseBuilder(), context)
//
//        then: "A JSON response is returned with a HTTP Bad Request Status (400) and an error message in body"
//        def jsonResponse = new JsonSlurper().parseText(apiResponse.response)
//        // Validate returned response
//        apiResponse.httpStatus == 400
//        jsonResponse.error == "the parameter c is missing"
//    }
//
//    def should_return_an_error_response_if_famille_is_not_set() {
//        given: "a request without famille"
//        def index = new Index()
//        httpRequest.getParameter("famille") >> null
//        // Other parameters return a valid value
//        httpRequest.getParameter("p") >> "aValue1"
//        httpRequest.getParameter("c") >> "aValue2"
//        httpRequest.getParameter("statut") >> "aValue4"
//        httpRequest.getParameter("utilisateur") >> "aValue5"
//
//        when: "Invoking the REST API"
//        def apiResponse = index.doHandle(httpRequest, new RestApiResponseBuilder(), context)
//
//        then: "A JSON response is returned with a HTTP Bad Request Status (400) and an error message in body"
//        def jsonResponse = new JsonSlurper().parseText(apiResponse.response)
//        // Validate returned response
//        apiResponse.httpStatus == 400
//        jsonResponse.error == "the parameter famille is missing"
//    }
//
//    def should_return_an_error_response_if_statut_is_not_set() {
//        given: "a request without statut"
//        def index = new Index()
//        httpRequest.getParameter("statut") >> null
//        // Other parameters return a valid value
//        httpRequest.getParameter("p") >> "aValue1"
//        httpRequest.getParameter("c") >> "aValue2"
//        httpRequest.getParameter("famille") >> "aValue3"
//        httpRequest.getParameter("utilisateur") >> "aValue5"
//
//        when: "Invoking the REST API"
//        def apiResponse = index.doHandle(httpRequest, new RestApiResponseBuilder(), context)
//
//        then: "A JSON response is returned with a HTTP Bad Request Status (400) and an error message in body"
//        def jsonResponse = new JsonSlurper().parseText(apiResponse.response)
//        // Validate returned response
//        apiResponse.httpStatus == 400
//        jsonResponse.error == "the parameter statut is missing"
//    }
//
//    def should_return_an_error_response_if_utilisateur_is_not_set() {
//        given: "a request without utilisateur"
//        def index = new Index()
//        httpRequest.getParameter("utilisateur") >> null
//        // Other parameters return a valid value
//        httpRequest.getParameter("p") >> "aValue1"
//        httpRequest.getParameter("c") >> "aValue2"
//        httpRequest.getParameter("famille") >> "aValue3"
//        httpRequest.getParameter("statut") >> "aValue4"
//
//        when: "Invoking the REST API"
//        def apiResponse = index.doHandle(httpRequest, new RestApiResponseBuilder(), context)
//
//        then: "A JSON response is returned with a HTTP Bad Request Status (400) and an error message in body"
//        def jsonResponse = new JsonSlurper().parseText(apiResponse.response)
//        // Validate returned response
//        apiResponse.httpStatus == 400
//        jsonResponse.error == "the parameter utilisateur is missing"
//    }

}
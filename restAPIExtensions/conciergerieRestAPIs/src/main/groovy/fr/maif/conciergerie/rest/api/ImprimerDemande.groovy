package fr.maif.conciergerie.rest.api

import java.util.logging.Logger

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

import org.apache.commons.io.IOUtils
import org.apache.http.HttpHeaders
import org.bonitasoft.engine.api.ProcessAPI
import org.bonitasoft.engine.bpm.document.ArchivedDocument
import org.bonitasoft.engine.bpm.document.ArchivedDocumentsSearchDescriptor
import org.bonitasoft.engine.bpm.document.Document
import org.bonitasoft.engine.bpm.document.DocumentNotFoundException
import org.bonitasoft.engine.bpm.flownode.HumanTaskInstance
import org.bonitasoft.engine.bpm.flownode.HumanTaskInstanceSearchDescriptor
import org.bonitasoft.engine.search.Order
import org.bonitasoft.engine.search.SearchOptionsBuilder
import org.bonitasoft.engine.search.SearchResult
import org.bonitasoft.web.extension.ResourceProvider
import org.bonitasoft.web.extension.rest.RestApiResponse
import org.bonitasoft.web.extension.rest.RestApiResponseBuilder

import com.bonitasoft.web.extension.rest.RestAPIContext
import com.bonitasoft.web.extension.rest.RestApiController

import fr.bonitasoft.modele.DemandeConciergerie
import fr.bonitasoft.modele.DemandeConciergerieDAO
import fr.bonitasoft.modele.DemandeConciergerieDAOImpl
import fr.opensagres.xdocreport.converter.*
import groovy.json.JsonBuilder
import groovy.json.JsonSlurper

class ImprimerDemande implements RestApiController {

	private static final Logger LOGGER = Logger.getLogger("org.bonitasoft")
	private static final String IMPRESSION_TASK_NAME = "impression"

	@Override
	RestApiResponse doHandle(HttpServletRequest request, RestApiResponseBuilder responseBuilder, RestAPIContext context) {
		// To retrieve query parameters use the request.getParameter(..) method.
		// Be careful, parameter values are always returned as String values

		// Retrieve p parameter
		def caseId = request.getParameter "caseId"
		if (caseId == null) {
			return buildResponse(responseBuilder, HttpServletResponse.SC_BAD_REQUEST,"""{"error" : "the parameter caseId is missing"}""")
		}
		
		def userId = request.getParameter "userId"
		if (userId == null) {
			return buildResponse(responseBuilder, HttpServletResponse.SC_BAD_REQUEST,"""{"error" : "the parameter userId is missing"}""")
		}
		
		//		final byte[] content = loadFile("demande service receipt.docx", context.resourceProvider)
		//		final byte[] finalDocumentAsPdf = applyReplacements(content, context, Long.valueOf(demandeId), context.resourceProvider);
				ProcessAPI processApi = context.getApiClient().getProcessAPI();
				List<HumanTaskInstance> instances = processApi.getHumanTaskInstances(Long.valueOf(caseId), IMPRESSION_TASK_NAME, 0, 1);
				SearchOptionsBuilder builder = new SearchOptionsBuilder(0,1);
		
				if (instances.size() > 0){
					processApi.assignUserTask(instances.get(0).id, Long.valueOf(userId))
					processApi.executeUserTask(Long.valueOf(userId), instances.get(0).id, null)
				} else {
					// case is archived, get the archived version of the receipt
					builder.filter(ArchivedDocumentsSearchDescriptor.DOCUMENT_NAME, "reçuPdf");
					builder.filter(ArchivedDocumentsSearchDescriptor.PROCESSINSTANCE_ID, Long.valueOf(caseId));
					builder.sort(ArchivedDocumentsSearchDescriptor.ARCHIVE_DATE, Order.DESC);
					SearchResult<ArchivedDocument> results = processApi.searchArchivedDocuments(builder.done());
					
					if (results.getCount() > 0){
						return buildResponse(responseBuilder, HttpServletResponse.SC_OK, new JsonBuilder(results.getResult().get(0).getUrl()).toPrettyString());
					} else {
						return buildResponse(responseBuilder, HttpServletResponse.SC_BAD_REQUEST, """{"error" : "No document found"}""");
					}
				}
		
				Properties props = loadProperties("configuration.properties", context.resourceProvider)
				int count = Integer.valueOf(props["impression.wait.count"]);
				int sleep = Integer.valueOf(props["impression.wait.timer"]);
				builder.filter(HumanTaskInstanceSearchDescriptor.NAME, IMPRESSION_TASK_NAME);
				builder.filter(HumanTaskInstanceSearchDescriptor.PROCESS_INSTANCE_ID, Long.valueOf(caseId));
				builder.filter(HumanTaskInstanceSearchDescriptor.STATE_NAME, "ready");
		
				def result = null;
				while (count > 0){
					//wait 5s
					Thread.sleep(sleep);
					SearchResult<HumanTaskInstance> results = processApi.searchHumanTaskInstances(builder.done());
					if (results.getCount() > 0){
						// document is ready
						try {
							Document receipt = processApi.getLastDocument(Long.valueOf(caseId), "reçuPdf")
							if (receipt != null){
								result = receipt.url
							}
						}
						catch (DocumentNotFoundException e){
							continue;
						}
					}
					count--;
				}
		
		return buildResponse(responseBuilder, HttpServletResponse.SC_OK, new JsonBuilder(result).toPrettyString());

//		return responseBuilder.with {
//			withAdditionalHeader("Content-Disposition","attachment; filename= doc.pdf");
//			withResponseStatus(HttpServletResponse.SC_OK)
//			withResponse(finalDocumentAsPdf)
//			build()
//		}
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

	/**
	 * Load a file into an array of bytes
	 */
	byte[] loadFile(String fileName, ResourceProvider resourceProvider) {
		final byte[] content;
		resourceProvider.getResourceAsStream(fileName).withStream { InputStream s ->
			content = IOUtils.toByteArray(s)
		}
		content
	}

//	byte[] applyReplacements(byte[] content, RestAPIContext apiContext, Long demandeId, ResourceProvider resourceProvider) {
//		try {
//			final IXDocReport report = XDocReportRegistry.getRegistry().loadReport(new ByteArrayInputStream(content), TemplateEngineKind.Velocity);
//			//LOGGER.severe("content is : " + content);
//			final IContext context = report.createContext();
//			
//			Properties props = loadProperties("xdocreport-velocity.properties", resourceProvider);
//			
//			VelocityTemplateEngine engine = new VelocityTemplateEngine(props);
//			report.setTemplateEngine(engine);
//			
//			FieldsMetadata metadata = new FieldsMetadata();
//			metadata.addFieldAsList("entry.key");
//			metadata.addFieldAsList("entry.value");
//			report.setFieldsMetadata(metadata);
//
//			DemandeConciergerieDAO dao = new DemandeConciergerieDAOImpl(apiContext.apiSession);
//			DemandeConciergerie demande = dao.findByPersistenceId(demandeId);
//
//			Map<String,String> humanReadable =  new HashMap();
//			Map details = new JsonSlurper().parseText(demande.detailDemande);
//
//			details.each {entry ->
//				humanReadable.put(StringUtils.join(StringUtils.splitByCharacterTypeCamelCase(entry.key),' '), entry.value);
//			}
//
//			context.put("demandeService", demande);
//			context.put("demandeur", apiContext.apiClient.identityAPI.getUser(demande.idDemandeur));
//			context.put("email", apiContext.apiClient.identityAPI.getUserContactData(demande.idDemandeur, false).email);
//			context.put("details", humanReadable);
//
//			//			for (final List<Object> objects : inputParameter) {
//			//				if (objects != null && objects.size() > 1) {
//			//					context.put(String.valueOf(objects.get(0)), objects.get(1));
//			//				}
//			//			}
//
//			Options options = Options.getTo(ConverterTypeTo.PDF);
//			
//			final ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
//			report.convert(context, options, byteArrayOutputStream);
//			//report.process(context, byteArrayOutputStream);
//
//			return byteArrayOutputStream.toByteArray();
//		} catch (final IOException | XDocReportException e) {
//			throw new Exception(e);
//		}
//	}

}

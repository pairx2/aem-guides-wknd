package com.abbott.aem.cloud.platform.core.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.Servlet;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.request.RequestPathInfo;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.ServletResolverConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import com.abbott.aem.cloud.platform.core.services.TagExporterService;
import com.google.gson.JsonArray;

import lombok.extern.slf4j.Slf4j;

/**
 * @author PAIRX2
 * 
 *         Get AEM Tags as Json for i18n
 * 
 *         <pre>
 *         
 *         
 * Selector tagdata can be used to invoke this servlet.
 * language code can be used for additional filtering using language.
 * To get tags at any given path, enter the path till the tag and add .tagdata.${lang}.json
 * 
 * Typical response attributes are :
 * 
 * path 			-> path of the tag 
 * key 				-> name of the tag 
 * value 			-> title of the tag
 * localizedValues  -> localized Titles authored for the tag
 * 
 * e.g. 
 * All Tags:
 * /i18n.tagdata.json                		 -> returns all tags in AEM under /content/cq:tags/i18n 
 * 										        with map of localizedValues
 * 
 * Global:
 * /i18n/global.tagdata.json 		 		 -> returns all tags in AEM under /content/cq:tags/i18n/global
 * 										   	    with map of localizedValues
 * /i18n/global.tagdata.en-GB.json	 		 -> returns tags with value set to localized version for en-GB 
 * 										   	    if found else value is set to default.
 * Application (e.g. global-reference):
 * /i18n/global-reference.tagdata.json		 -> returns combined tags from /content/cq:tags/i18n/global-reference
 * 												and /content/cq:tags/i18n/global 
 * 										   	    with map of localizedValues
 * /i18n/global-reference.tagdata.en-GB.json -> returns tags with value set to localized version for en-GB 
 * 										   	    if found else value is set to default.
 * 
 * Site specific tags will inherit tags from /global if missing.
 * 
 * e.g. 
 * With hierarchy as below:
 * /content
 * 		/i18n
 *  		/global [Dedicated for Tags that can be used by any application]
 *  			/ERR_001 - This is global message.
 *   			/ERR_002 - This is global message.
 *  		/global-reference [Dedicated for Tags specific to Global Reference site]
 *      		/ERR_001 - This is site specific message.
 *      		/ERR_003 - This is site specific message.
 *     			/ERR_004 - This is site specific message.
 *
 * Response for site will contain:
 *				/ERR_001 - This is site specific message.
 *   			/ERR_002 - This is global message.
 *      		/ERR_003 - This is site specific message.
 *      		/ERR_004 - This is site specific message.
 * 
 * 
 *         </pre>
 */

@Slf4j
@Component(service = Servlet.class, immediate = true, property = {
		Constants.SERVICE_DESCRIPTION + "= Tags Exporter Servlet",
		ServletResolverConstants.SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_GET,
		ServletResolverConstants.SLING_SERVLET_RESOURCE_TYPES + "=sling/servlet/default",
		ServletResolverConstants.SLING_SERVLET_SELECTORS + "=" + "tagdata",
		ServletResolverConstants.SLING_SERVLET_EXTENSIONS + "=" + "json" })
public class TagExporterServlet extends SlingSafeMethodsServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7083572849311923554L;

	@Reference
	private transient TagExporterService tagExporterService;

	@Override
	protected void doGet(SlingHttpServletRequest slingRequest, SlingHttpServletResponse slingResponse) {

		try {

			// Get print writer object to output
			PrintWriter out = slingResponse.getWriter();

			ResourceResolver resourceResolver = slingRequest.getResourceResolver();
			RequestPathInfo requestPathInfo = slingRequest.getRequestPathInfo();

			String requestPath = requestPathInfo.getResourcePath();

			String requestSelectorString = requestPathInfo.getSelectorString();

			String[] requestSelectors = requestPathInfo.getSelectors();

			log.debug("request path : {}", requestPath);

			log.debug("request selectors : {}", requestSelectorString);

			String tagPath = tagExporterService.getTagPath(requestPath, requestSelectorString);

			JsonArray tagData;

			tagData = tagExporterService.getAllTags(tagPath, requestSelectors, resourceResolver);

			log.debug("tag data : {}", tagData);

			slingResponse.setContentType(com.adobe.granite.rest.Constants.CT_JSON);
			slingResponse.setCharacterEncoding(com.adobe.granite.rest.Constants.DEFAULT_CHARSET);

			// Output tags in json format
			out.print(tagData);

		} catch (IOException ioException) {
			log.error("Exception while fetching tags data : TagExporterServlet : {} ", ioException);
		}
	}
}

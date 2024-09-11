package com.abbott.aem.platform.common.components.servlets;

import static org.apache.sling.api.servlets.HttpConstants.METHOD_GET;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_METHODS;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_RESOURCE_TYPES;

import java.io.IOException;
import java.util.Map;

import javax.servlet.Servlet;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpException;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.platform.common.components.services.APILookupService;
import com.abbott.aem.platform.common.components.services.HttpMethod;
import com.abbott.aem.platform.common.util.ConvertToDropdown;
import com.abbott.aem.platform.common.util.ConvertToDropdownImpl;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

import lombok.NonNull;

@Component(service = Servlet.class,
		   property = { SLING_SERVLET_RESOURCE_TYPES + "=" + LookupDataSource.RESOURCE_TYPE, SLING_SERVLET_METHODS + "=" + METHOD_GET })
public class LookupDataSource extends SlingSafeMethodsServlet {

	public static final String RESOURCE_TYPE = "abbott-platform/datasource/dropdown";
	private static final long serialVersionUID = 2222720152081520255L;
	private static final String LOOKUP_TYPE = "lookuptype";
	private static final String DATASOURCE = "datasource";

	private static final Logger LOGGER = LoggerFactory.getLogger(LookupDataSource.class);

	@Reference
	private transient APILookupService apiLookupService;

	/**
	 * Do get.
	 *
	 * @param request  the request
	 * @param response the response
	 */
	@Override
	protected void doGet(@NonNull SlingHttpServletRequest request, @NonNull SlingHttpServletResponse response) {
		try {
			Resource resource = request.getResource();
			ResourceResolver resolver = request.getResourceResolver();
			String lookup = resource.getChild(DATASOURCE).getValueMap().get(LOOKUP_TYPE, String.class);
			String endPoint = apiLookupService.getRequestEndpoint(lookup);
			String responseString = apiLookupService.processRequest(getCurrentPage(request, resolver), endPoint, HttpMethod.GET, null);			
			Map<String, String> dropDownMap = null;
			ConvertToDropdown convertTodropdown = new ConvertToDropdownImpl();

			dropDownMap = convertTodropdown.getDropDownList(StringUtils.EMPTY, responseString);

			convertTodropdown.constructDataSource(request, resolver, dropDownMap);
		} catch (IOException | HttpException e) {
			LOGGER.error("Error from FormContainerDataSourceServlet", e);
		}
	}

	private Page getCurrentPage(SlingHttpServletRequest request, ResourceResolver resolver) {
		PageManager pageManager = resolver.adaptTo(PageManager.class);
		return pageManager.getContainingPage(request.getRequestPathInfo().getSuffix());
	 }

}

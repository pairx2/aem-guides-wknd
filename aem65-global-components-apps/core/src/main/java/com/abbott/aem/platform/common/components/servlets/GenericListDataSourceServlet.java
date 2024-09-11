package com.abbott.aem.platform.common.components.servlets;

import static org.apache.sling.api.servlets.HttpConstants.METHOD_GET;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_EXTENSIONS;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_METHODS;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_RESOURCE_TYPES;

import java.io.IOException;

import javax.servlet.Servlet;
import javax.servlet.ServletException;

import lombok.NonNull;

import com.adobe.granite.ui.components.ds.DataSource;
import com.adobe.granite.ui.components.ds.EmptyDataSource;
import com.adobe.granite.ui.components.ds.ResourceDataSource;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.service.component.annotations.Component;

@Component(service = Servlet.class,
		   property = { SLING_SERVLET_RESOURCE_TYPES + "=" + GenericListDataSourceServlet.RESOURCE_TYPE, SLING_SERVLET_EXTENSIONS + "=" + "html", SLING_SERVLET_METHODS + "=" + METHOD_GET })
public class GenericListDataSourceServlet extends SlingSafeMethodsServlet {

	public static final String RESOURCE_TYPE = "abbott-platform/datasource/generic-list";
	private static final long serialVersionUID = 2222720152081520255L;
	private static final String ITEMS_PATH = "path";

	/**
	 * Do get.
	 *
	 * @param request  the request
	 * @param response the response
	 * @throws ServletException the servlet exception
	 * @throws IOException      Signals that an I/O exception has occurred.
	 */
	@Override
	protected void doGet(@NonNull SlingHttpServletRequest request, @NonNull SlingHttpServletResponse response) {

		request.setAttribute(DataSource.class.getName(), EmptyDataSource.instance());

		Resource resource = request.getResource();
		ResourceResolver resolver = resource.getResourceResolver();

		String resourcePath = resource.getChild("datasource").getValueMap().get(ITEMS_PATH, String.class);

		if (StringUtils.isNotBlank(resourcePath)) {
			request.setAttribute(DataSource.class.getName(), new ResourceDataSource(resolver.getResource(resourcePath)));
		}
	}

}

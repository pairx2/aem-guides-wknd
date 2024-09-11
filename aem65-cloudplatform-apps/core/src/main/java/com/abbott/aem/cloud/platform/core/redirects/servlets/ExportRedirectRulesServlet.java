package com.abbott.aem.cloud.platform.core.redirects.servlets;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.servlet.Servlet;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.ServletResolverConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;

import com.abbott.aem.cloud.platform.core.redirects.models.CsvUrlRedirectRule;
import com.abbott.aem.cloud.platform.core.redirects.models.Rule;
import com.abbott.aem.cloud.platform.core.redirects.models.UrlRedirect;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component(service = Servlet.class,
		immediate = true,
		property = { Constants.SERVICE_DESCRIPTION + "=Abbott Platform - Export URL Redirect Rules",
				ServletResolverConstants.SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_GET,
				ServletResolverConstants.SLING_SERVLET_RESOURCE_TYPES + "=" + UrlRedirect.RESOURCE_TYPE,
				ServletResolverConstants.SLING_SERVLET_SELECTORS + "=export" })
public class ExportRedirectRulesServlet extends SlingSafeMethodsServlet {

	private static final long serialVersionUID = -3564475196678277711L;
	private static final String FILE_CONTENT_TYPE = "text/csv";
	
	@Override
	protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws IOException {
		String path = request.getParameter("path");
		log.debug("Export processing for the path : " + path);
		Resource mappingResource = request.getResourceResolver().resolve(path);

		UrlRedirect urlRedirect = mappingResource.adaptTo(UrlRedirect.class);
		List<Rule> rules = urlRedirect.getMappings();
		Collection<CsvUrlRedirectRule> csvRules = new ArrayList<>();
		
		if (rules != null) {
			for (Rule rule : rules) {
				csvRules.addAll((CsvUrlRedirectRule.from(rule)));
			}
		}

		String filename = urlRedirect.getTitle().trim().replace(" ", "_").toLowerCase() + "_url-redirects.csv";
		
		CsvMapper csvMapper = new CsvMapper();
		CsvSchema csvSchema = csvMapper.schemaFor(CsvUrlRedirectRule.class).withHeader();
		ObjectWriter writer = csvMapper.writer(csvSchema);
		response.setContentType(FILE_CONTENT_TYPE);
		response.setHeader("Content-Disposition", "attachment;filename=\"" + filename + "\"");
		if(csvRules.isEmpty()) {
			writer.writeValues(response.getOutputStream()).write("");
		} else {
			writer.writeValues(response.getOutputStream()).writeAll(csvRules);
		}
	}
}

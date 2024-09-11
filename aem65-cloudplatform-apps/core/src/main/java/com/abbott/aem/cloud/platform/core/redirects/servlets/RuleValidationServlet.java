package com.abbott.aem.cloud.platform.core.redirects.servlets;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.Servlet;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.NonExistingResource;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.ServletResolverConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;

import com.abbott.aem.cloud.platform.core.redirects.Types.MappingType;
import com.abbott.aem.cloud.platform.core.redirects.models.QueryParams;
import com.abbott.aem.cloud.platform.core.redirects.models.Rule;
import com.abbott.aem.cloud.platform.core.redirects.models.RuleValidateResponse;
import com.abbott.aem.cloud.platform.core.redirects.models.UrlRedirect;
import com.abbott.aem.cloud.platform.core.redirects.util.ValidationUtils;
import com.google.gson.Gson;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component(service = Servlet.class,
		immediate = true,
		property = { Constants.SERVICE_DESCRIPTION + "=Abbott Platform - Rule Validation",
				ServletResolverConstants.SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_POST,
				ServletResolverConstants.SLING_SERVLET_RESOURCE_TYPES + "=" + UrlRedirect.RESOURCE_TYPE,
				ServletResolverConstants.SLING_SERVLET_SELECTORS + "=validaterule",
				ServletResolverConstants.SLING_SERVLET_EXTENSIONS + "=json" })
public class RuleValidationServlet extends SlingAllMethodsServlet {

	private static final long serialVersionUID = 6286765078826539646L;

	@Override
	protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) throws IOException {
		String message = "";
		int errorCode = 0;
		boolean isNew = false;

		final ResourceResolver resolver = request.getResource().getResourceResolver();
		final String parentPath = request.getParameter("parentPath");
		final String path = request.getParameter("path");

		log.debug("Parent Path: {}; Item Path: {}", parentPath, path);

		Resource parentResource = null;
		Resource itemResource = null;

		if (StringUtils.isNotBlank(parentPath)) {
			parentResource = resolver.resolve(parentPath);
			if (parentResource instanceof NonExistingResource) {
				message = "You are trying to create/edit a rule for an invalid site.";
				errorCode = 400;
			}
		}

		if (StringUtils.isNotBlank(path)) {
			itemResource = resolver.resolve(path);
			if (itemResource instanceof NonExistingResource) {
				message = "The item you are trying to edit doesn't exist.";
				errorCode = 400;
			}
		} else {
			isNew = true;
		}

		if (parentResource instanceof NonExistingResource) {
			message = "You are trying to create/edit a rule for an invalid site.";
			errorCode = 400;
		}
		
		if(!ValidationUtils.validateLink(getParam(request, "./sourceUrl"))) {
			message = "Source URL should start with / and cannot contain any query parameters.";
			errorCode = 400;
		}

		// Proceed for duplicate check if there's no basic validation error
		if (null != parentResource && errorCode == 0 && isDuplicate(request, parentResource, isNew, path)) {
			message = "This rule already exists.";
			errorCode = 100;
			}

		RuleValidateResponse resp = RuleValidateResponse.builder().message(message).errorCode(errorCode).build();
		response.setContentType("application/json");
		response.setCharacterEncoding("utf-8");

		response.getWriter().write(new Gson().toJson(resp));
	}

	private boolean isDuplicate(final SlingHttpServletRequest request, @NonNull Resource parentResource, boolean isNew,
			String path) {
		boolean duplicate = true;
		Rule rule = new Rule();

		log.debug("Checking for duplicate");
		// Create the Rule object that needs to be added or modified
		try {
			final String sourceUrl = getParam(request, "./sourceUrl");
			final String mappingType = getParam(request, "./mappingType");
			final List<QueryParams> queryParameters = getQueryParameters(request);
			log.info("queryParameters:"+ queryParameters);
			rule.setSourceUrl(sourceUrl);
			rule.setMappingType(mappingType);
			rule.setQueryParams(queryParameters);
			rule.updateQueryParameters();

			if (mappingType.equalsIgnoreCase(MappingType.BYHEADER.name())) {
				final String headerName = getParam(request, "./headerName");
				rule.setHeaderName(headerName);
			}

			log.info("queryParams: {}", rule.getQueryParametersString());
		} catch (IOException ex) {
			log.warn(ex.getMessage(), ex);
			return true;
		}

		// Get the list of existing mapping rules
		UrlRedirect urlRedirect = parentResource.adaptTo(UrlRedirect.class);
		List<Rule> rules = urlRedirect.getMappings();
		
		if (rules == null) {
			log.debug("There are no rules present, hence no duplicate!");
			return false;
		}

		boolean ruleExists = rules.contains(rule);
		log.debug("ruleExists: {}", ruleExists);

		if (ruleExists) {
			if (isNew) {
				duplicate = true;
			} else {
				log.debug("Existing rule checking");
				// check if the path is same
				Rule tempRule = rules.get(rules.indexOf(rule));
				log.debug("Temp Rule {}", tempRule);
				if (tempRule.getPath().equals(path)) {
					// We are editing the same rule, so allow
					log.debug("Same rule edited, so allowing");
					duplicate = false;
				} else {
					duplicate = true;
				}
			}

		} else {
			duplicate = false;
		}

		log.debug("Duplicate value: {}", duplicate);
		return duplicate;
	}

	private String getParam(SlingHttpServletRequest request, String param) throws IOException {
		String value = request.getParameter(param);
		if (StringUtils.isBlank(value)) {
			throw new IOException("Mandatory Param " + param + " must not be blank.");
		} else {
			log.debug("Loaded {} for parameter {}", value, param);
		}
		return value;
	}

	private List<QueryParams> getQueryParameters(SlingHttpServletRequest request) {
		log.debug("checking query params");
		Enumeration<String> enums = request.getParameterNames();
		
		log.debug(enums.toString());

		String paramName = "./queryParameters/";
		String keyFormat = "./queryParameters/item%s/./key";
		String valueFormat = "./queryParameters/item%s/./value";

		List<QueryParams> queryParameterList = new ArrayList<>();

		List<String> queryParams = Collections.list(enums).stream().filter(p -> p.contains(paramName))
				.collect(Collectors.toList());

		if (queryParams != null && !queryParams.isEmpty()) {
			log.debug(queryParams.toString());
			
			long keysCount = queryParams.stream().filter(p -> p.contains("./key")).count();
			log.debug("key count: {}", keysCount);

			for (int i = 0; i < keysCount; i++) {
				String key = request.getParameter(String.format(keyFormat, i));
				String value = request.getParameter(String.format(valueFormat, i));

				queryParameterList.add(new QueryParams(key, value));
			}
		}
		log.debug(queryParameterList.toString());
		return queryParameterList;
	}
}

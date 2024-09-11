package com.abbott.aem.cloud.platform.core.redirects.servlets;

import java.io.CharConversionException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.jcr.Session;
import javax.servlet.Servlet;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.request.RequestParameter;
import org.apache.sling.api.resource.NonExistingResource;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.ServletResolverConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import com.abbott.aem.cloud.platform.core.redirects.Types;
import com.abbott.aem.cloud.platform.core.redirects.Types.MappingType;
import com.abbott.aem.cloud.platform.core.redirects.models.CsvUrlRedirectRule;
import com.abbott.aem.cloud.platform.core.redirects.models.HeaderMatch;
import com.abbott.aem.cloud.platform.core.redirects.models.ImportRedirectRuleResponse;
import com.abbott.aem.cloud.platform.core.redirects.models.QueryParams;
import com.abbott.aem.cloud.platform.core.redirects.models.Rule;
import com.abbott.aem.cloud.platform.core.redirects.models.UrlRedirect;
import com.abbott.aem.cloud.platform.core.redirects.services.ManageUrlRedirectService;
import com.abbott.aem.cloud.platform.core.redirects.util.ValidationUtils;
import com.day.cq.commons.jcr.JcrConstants;
import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvParser;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;
import com.google.gson.Gson;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component(service = Servlet.class,
		immediate = true,
		property = { Constants.SERVICE_DESCRIPTION + "=Abbott Platform - Import URL Redirect Rules",
				ServletResolverConstants.SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_POST,
				ServletResolverConstants.SLING_SERVLET_RESOURCE_TYPES + "=" + UrlRedirect.RESOURCE_TYPE,
				ServletResolverConstants.SLING_SERVLET_SELECTORS + "=import" })
public class ImportRedirectRulesServlet extends SlingAllMethodsServlet {

	private static final long serialVersionUID = -2530061310456396585L;

	private List<Integer> duplicateList = new ArrayList<>();
	private List<Integer> incorrectList = new ArrayList<>();
	private List<Integer> blankList = new ArrayList<>();
	private List<Integer> invalidUrl = new ArrayList<>();

	@Reference
	transient ManageUrlRedirectService manageUrlRedirectService;

	private transient ImportRedirectRuleResponse redirectResponse = new ImportRedirectRuleResponse();

	private StringBuilder errorMessage = new StringBuilder();
	
	private Integer errorCode = 0;

	@Override
	protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) throws IOException {
		try {
			redirectResponse.setStatus(true);
			duplicateList = new ArrayList<>();
			incorrectList = new ArrayList<>();
			blankList = new ArrayList<>();
			invalidUrl = new ArrayList<>();
			
			String path = request.getResourceResolver().resolve(request.getParameter("path"))
					.getChild(JcrConstants.JCR_CONTENT).getPath();
			
			log.debug("PATH: {}", path);
			CsvMapper csvMapper = new CsvMapper().enable(CsvParser.Feature.SKIP_EMPTY_LINES)
					.enable(CsvParser.Feature.TRIM_SPACES);
	
			CsvSchema csvSchema = csvMapper.schemaFor(CsvUrlRedirectRule.class);
	
			List<CsvUrlRedirectRule> rules = null;
	
			try (InputStream is = getFile(request)) {
				MappingIterator<CsvUrlRedirectRule> it = csvMapper.readerFor(CsvUrlRedirectRule.class)
						.with(csvSchema.withHeader()).readValues(is);
	
				rules = it.readAll();
	
				UrlRedirect mapping = createMappingModel(rules);
				log.debug(mapping.toString());
				if(rules.isEmpty()) {
					redirectResponse.setStatus(false);
					redirectResponse.setMessage("The file you provided has empty rows.");
				} else {
					Resource parent = request.getResourceResolver().resolve(path);

					
					Session session = request.getResourceResolver().adaptTo(Session.class);

					if (session != null && session.isLive()) {
					String userName = session.getUserID();
					mapping.updateNode(request.getResourceResolver(), path);
					redirectResponse.setBlankRows(blankList);
					redirectResponse.setDuplicateRows(duplicateList);
					redirectResponse.setIncorrectRows(incorrectList);
					redirectResponse.setInvalidUrls(invalidUrl);
					manageUrlRedirectService.updateState(
							request.getResourceResolver().resolve(request.getParameter("path")).
							getChild(JcrConstants.JCR_CONTENT),
							Types.States.EDITED.toString(),userName);
					redirectResponse.setMessage(createMessage());
				}	
				}
				redirectResponse.setState(Types.States.EDITED.toString());
				redirectResponse.setErrorCode(errorCode);
				response.getWriter().write(new Gson().toJson(redirectResponse));
			}
		} catch (RuntimeException | InvalidFormatException | CharConversionException e) {
			log.error("Error occured in doPost of ImportRedirectRulesServlet : {}", e.getMessage(), e);
			redirectResponse.setMessage("Import failed!! <br> Try using another file. <br> Please contact Platform Team if issue persists.");
			if(CharConversionException.class.equals(e.getClass())) {
				redirectResponse.setMessage("Import failed!! <br> The file you provided might be broken/damaged. Rules cannot be imported.<br> Try using another file.");
			}
			redirectResponse.setStatus(false);
			redirectResponse.setState(Types.States.EDITED.toString());
			redirectResponse.setErrorCode(-1);			
			response.getWriter().write(new Gson().toJson(redirectResponse));
		}
	}

	/*
	 * Gets file from request
	 */
	private InputStream getFile(SlingHttpServletRequest request) throws IOException {
		InputStream stream = null;
		for (RequestParameter param : request.getRequestParameterList()) {
			if (!param.isFormField()) {
				stream = param.getInputStream();
				break;
			}
		}
		return stream;
	}

	private UrlRedirect createMappingModel(@NonNull List<CsvUrlRedirectRule> csvRules) {
		// Maintaining HashMap instead of Hashset for easy retrieval
		Map<Rule, Rule> rules = new LinkedHashMap<>();
		UrlRedirect mapping = new UrlRedirect();

		mapping.setStatus("EDITED");
		int rowIndex = 1;

		for (CsvUrlRedirectRule csvRule : csvRules) {
			rowIndex++;
			String sourceUrl = csvRule.getSourceUrl();
			String mappingType = csvRule.getMappingType();
			String redirectionType = csvRule.getRedirectionType();
			String targetUrl = csvRule.getTargetUrl();
			String queryParameters = csvRule.getQueryParameters();

			if (StringUtils.isEmpty(sourceUrl)) {
				log.debug("SOURCE URL MISSING: skipping row {} with sourceUrl {}", rowIndex, sourceUrl);
				blankList.add(rowIndex);
				continue;
			}

			if (!ValidationUtils.validateLink(sourceUrl)) {
				log.debug("SOURCE URL INVALID: skipping row {} with sourceUrl {}", rowIndex, sourceUrl);
				invalidUrl.add(rowIndex);
				continue;
			}

			if (!ValidationUtils.validateMappingType(mappingType)) {
				log.debug("MAPPING TYPE INCORRECT skipping row {} with mappingtype {}", rowIndex, mappingType);
				incorrectList.add(rowIndex);
				continue;
			}

			if (!ValidationUtils.validateRedirectionType(redirectionType)) {
				log.debug("REDIRECTION TYPE INCORRECT skipping row {} with mappingtype {}", rowIndex, redirectionType);
				incorrectList.add(rowIndex);
				continue;
			}

			List<HeaderMatch> headers = null;

			// Create the required set of fields for the Mapping Rule to run the duplicate
			// check
			Rule maprule = new Rule();
			maprule.setSourceUrl(sourceUrl);
			maprule.setRedirectionType(redirectionType);
			maprule.setForwardQueryString(Boolean.parseBoolean(csvRule.getForwardQueryString()));
			maprule.setQueryParametersString(queryParameters);
			maprule.setMappingType(mappingType);

			if (mappingType.equalsIgnoreCase(MappingType.BYHEADER.name())) {
				maprule.setHeaderName(csvRule.getHeaderName());
			} else {
				if (StringUtils.isEmpty(targetUrl)) {
					log.warn("TARGET URL MISSING: skipping row {} with targetUrl {}", rowIndex, targetUrl);
					blankList.add(rowIndex);
					continue;
				}
				maprule.setTargetUrl(targetUrl);
			}

			// Run the duplicate check - Rule's hash & equals will be leveraged here
			Rule tempRule = rules.get(maprule);
			if (tempRule == null) {
				// Rule do not exists, so go ahead and add
				log.debug("Adding rule row - {}", rowIndex);

				if (mappingType.equalsIgnoreCase(MappingType.BYHEADER.name())) {
					headers = new ArrayList<>();
					headers.add(createHeaderMatch(csvRule));
					maprule.setHeaderMatchers(headers);
				}
				List<QueryParams> queryParameterList = new ArrayList<>();
				if (null != queryParameters) {
					List<String> parameters = Arrays.asList(queryParameters.split("&"));
					parameters.forEach(parameter -> {
						String[] keyValue = parameter.split("=");
						if (keyValue.length == 2) {
							String key = keyValue[0];
							String value = keyValue[1];
							queryParameterList.add(new QueryParams(key, value));
						}
					});
					maprule.setQueryParams(queryParameterList);
				}
				rules.put(maprule, maprule);

			} else {
				// Its possible that this rule is by header, so update the header matches
				// only if the rule added earlier is not DIRECT
				if (!tempRule.getMappingType().equalsIgnoreCase(MappingType.DIRECT.name())
						&& mappingType.equalsIgnoreCase(MappingType.BYHEADER.name())) {
					headers = tempRule.getHeaderMatchers();
					headers.add(createHeaderMatch(csvRule));
				} else {
					log.warn("Duplicate Rule: Skipping Row {}", rowIndex);
					duplicateList.add(rowIndex);
				}
			}
		}

		mapping.setMappings(new ArrayList<Rule>(rules.values()));

		return mapping;
	}

	private HeaderMatch createHeaderMatch(@NonNull CsvUrlRedirectRule rule) {
		HeaderMatch match = new HeaderMatch();
		match.setHeaderValue(rule.getHeaderValue());
		match.setMatchType(rule.getMatchType().toUpperCase());
		match.setTargetUrl(rule.getTargetUrl());
		match.setOrder(null != rule.getOrder() ? rule.getOrder() : 0);

		return match;
	}

	private String createMessage() {
		errorMessage = new StringBuilder("The following rows were skipped while importing due to the reason:<br>");
		
		boolean blankFlag = verifyErrorList(redirectResponse.getBlankRows(), "Mandatory fields missing for row(s): %s.");
		boolean inFlag = verifyErrorList(redirectResponse.getInvalidUrls(), "Invalid URL values in row(s): %s.");
		boolean incorrectFlag = verifyErrorList(redirectResponse.getIncorrectRows(), "Incorrect values in row(s): %s.");
		boolean duplicateFlag = verifyErrorList(redirectResponse.getDuplicateRows(), "Duplicate row(s): %s.");
		
		// Even if one errors outs it will be false
		boolean flag = inFlag && incorrectFlag && blankFlag && duplicateFlag;
		
		if (flag) {
			errorCode = 0;
			return "All rows imported successfully.";
		} else {
			errorCode = 206;
			return errorMessage.toString();
		}

	}
	
	private boolean verifyErrorList(List<Integer> list, String message) {
		if (list == null || list.isEmpty()) {
			return true; // no errors
		}
		
		errorMessage.append(String.format(message, list.toString()));
		errorMessage.append("<br>");
		
		return false;
	}

}
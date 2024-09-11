package com.abbott.aem.cloud.platform.core.redirects.servlets;

import com.abbott.aem.cloud.platform.core.redirects.Types;
import com.abbott.aem.cloud.platform.core.redirects.models.CreateApplyPromoteResponse;
import com.abbott.aem.cloud.platform.core.redirects.models.UrlRedirect;
import com.abbott.aem.cloud.platform.core.redirects.services.ManageUrlRedirectService;
import com.day.cq.commons.jcr.JcrConstants;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletResourceTypes;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import javax.servlet.Servlet;
import java.io.IOException;

@Slf4j
@Component(service = Servlet.class, immediate = true, name = "ApplyRedirectRulesServlet", property = {
		Constants.SERVICE_DESCRIPTION + "=Abbott Platform - Apply Redirect Rules"})
@SlingServletResourceTypes(
		resourceTypes=UrlRedirect.RESOURCE_TYPE,
		methods= HttpConstants.METHOD_GET,
		selectors={ "apply", "save", "promote", "fetch", "overwrite"})
public class EnterpriseServicesRedirectRulesServlet extends SlingSafeMethodsServlet {

	private static final long serialVersionUID = 1L;

	public static final String ERROR_MESSAGE = "Oops! Something went wrong. Please contact platform team.";

	@Reference
	transient ManageUrlRedirectService manageUrlRedirectService;

	@Override
	protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws IOException {
		try {
			String selector = request.getRequestPathInfo().getSelectorString();
			log.debug("Selector: {}", selector);
			String path = request.getParameter("path");
			log.debug("processing for the path : " + path);
			Resource mappingResource = request.getResourceResolver().resolve(path).getChild(JcrConstants.JCR_CONTENT);
			CreateApplyPromoteResponse createApplyPromoteResponse = null;
			switch (selector) {
			case "apply":
				createApplyPromoteResponse = manageUrlRedirectService.applyRedirectRule(mappingResource);
				break;
			case "promote":
				createApplyPromoteResponse = manageUrlRedirectService.promoteRedirectRule(mappingResource);
				break;
			case "save":
				UrlRedirect redirectResource = request.getResourceResolver().resolve(path).adaptTo(UrlRedirect.class);
				createApplyPromoteResponse = manageUrlRedirectService.createRedirectRule(mappingResource,
						redirectResource);
				break;
			case "fetch":
				createApplyPromoteResponse = manageUrlRedirectService.checkRedirectRuleConsistency(mappingResource, path);
				break;
			case "overwrite":
				createApplyPromoteResponse = manageUrlRedirectService.overwriteUrlRedirects(mappingResource,path);
				break;
			default:
				log.debug("INVALID SELECTOR");
			}
			if (null != createApplyPromoteResponse) {
				response.getWriter().write(new Gson().toJson(createApplyPromoteResponse));
			} else {
				log.error("Response fetched as null hence throwing exception.");
				throw new NullPointerException();
			}
			if (Boolean.TRUE.equals(createApplyPromoteResponse.getStatus())) {
				manageUrlRedirectService.updateState(mappingResource, createApplyPromoteResponse.getState(),null);
			}
		} catch (RuntimeException e) {
			String selector = request.getRequestPathInfo().getSelectorString();
			log.error("Exception: {} occured in EnterpriseServicesRedirectRulesServlet doGet for selector: {}",
					e.getMessage(), selector, e);
			switch (selector) {
			case "apply":
				response.getWriter().write(new Gson().toJson(CreateApplyPromoteResponse.builder().status(false)
						.errorCode(-1).state(Types.States.DRAFT.toString()).message(ERROR_MESSAGE).build()));
				break;
			case "promote":
				response.getWriter().write(new Gson().toJson(CreateApplyPromoteResponse.builder().status(false)
						.errorCode(-1).state(Types.States.APPLIED.toString()).message(ERROR_MESSAGE).build()));
				break;
			case "save":
				response.getWriter().write(new Gson().toJson(CreateApplyPromoteResponse.builder().status(false)
						.errorCode(-1).state(Types.States.EDITED.toString()).message(ERROR_MESSAGE).build()));
				break;
			case "fetch":
				response.getWriter().write(new Gson().toJson(CreateApplyPromoteResponse.builder().status(false)
						.errorCode(-1).state("FETCH").message(ERROR_MESSAGE).build()));
				break;
			case "overwrite":
				response.getWriter().write(new Gson().toJson(CreateApplyPromoteResponse.builder().status(false)
						.errorCode(-1).state("OVERWRITE").message(ERROR_MESSAGE).build()));
				break;
			default:
				response.getWriter().write(new Gson().toJson(CreateApplyPromoteResponse.builder().status(false)
						.errorCode(-1).message(ERROR_MESSAGE).build()));
			}
		}

	}
}
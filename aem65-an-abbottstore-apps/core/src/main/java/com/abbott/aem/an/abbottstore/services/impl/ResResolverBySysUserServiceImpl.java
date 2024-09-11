package com.abbott.aem.an.abbottstore.services.impl;

import com.abbott.aem.an.abbottstore.services.ResResolverBySysUserService;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

@Component(service = ResResolverBySysUserService.class, immediate = true)
public class ResResolverBySysUserServiceImpl implements ResResolverBySysUserService {


	private static final Logger logger = LoggerFactory.getLogger(ResResolverBySysUserServiceImpl.class);

	@Reference
	private ResourceResolverFactory resourceResolverFactory;

	// this method returns a readOnly resource resolver
	public ResourceResolver getReadOnlyResourceResolver() {
		return getResourceResolver("readService");
	}

	// this method returns a readAndWrite resource resolver
	public ResourceResolver getReadAndWriteResourceResolver() {
		return getResourceResolver("writeService");
	}

	/**
	 * Purpose: To get resource resolver based on service Arguments: Service
	 * name configured in OSGI config manager.
	 *
	 * We have suppressed the warning of closing the resource resolver here because this resource resolver has been
	 * used in some other classes where it has already been closed explicitly in finally block or try-with-resource block. Below the class references.
	 * {@link com.abbott.aem.an.abbottstore.listeners.HeaderAndFooterHandler#handleEvent(org.osgi.service.event.Event) HeaderAndFooterHandler}
	 * {@link com.abbott.aem.an.abbottstore.scheduler.NutritionalAPIJobConsumer#process(org.apache.sling.event.jobs.Job) NutritionalAPIJobConsumer}
	 * {@link com.abbott.aem.an.abbottstore.servlets.AttributeUpdateServlet#doPost(org.apache.sling.api.SlingHttpServletRequest, org.apache.sling.api.SlingHttpServletResponse) AttributeUpdateServlet}
	 * {@link com.abbott.aem.an.abbottstore.servlets.MagentoProductDelete#doPost(org.apache.sling.api.SlingHttpServletRequest, org.apache.sling.api.SlingHttpServletResponse) MagentoProductDelete}
	 * {@link com.abbott.aem.an.abbottstore.servlets.MagentoProductUpdateServlet#doPost(org.apache.sling.api.SlingHttpServletRequest, org.apache.sling.api.SlingHttpServletResponse) MagentoProductUpdateServlet}
	 */
	@SuppressWarnings("CQRules:CQBP-72")
	public ResourceResolver getResourceResolver(String serviceName) {

		ResourceResolver resourceResolver = null;

		// create a parameter map and add a service
		Map<String, Object> userParamMap = new HashMap<>();
		userParamMap.put(ResourceResolverFactory.SUBSERVICE, serviceName);
		try {
			// get resource resolver object
			resourceResolver = resourceResolverFactory.getServiceResourceResolver(userParamMap);

			// log details of resource resolver object
			logger.debug("User ID used for Resource Resolver :: {} ", resourceResolver.getUserID());
		} catch (LoginException e) {
			logger.error("LoginException :: {}", e.getMessage());
		}
		return resourceResolver;
	}
}

package com.abbott.aem.an.division.core.services;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolverFactory;

import com.abbott.aem.an.division.api.jobs.EmailRunJobConfiguration;

public interface ProductListService {
	
	void getProducts(ResourceResolverFactory resourceResolverFactory, PIMConfigurationService pimConfigs, EmailRunJobConfiguration emailJobs) throws LoginException;

}

package com.abbott.aem.an.division.core.services;

import java.util.Map;

import org.apache.sling.api.resource.ResourceResolver;

public interface DeactivatePageService {

	void deactivatePages(String pdpWorkflowModel, String path, Map<String, String> discontinuedProds, ResourceResolver resolver, String environmentType);
	String sendEmailContent();
	
}

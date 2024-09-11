package com.abbott.aem.an.division.core.services;

import java.util.Map;

import org.apache.sling.api.resource.ResourceResolver;

public interface PublishPageService {

	void publishPages(String pdpWorkflowModel, String path, Map<String, String> activeProds, ResourceResolver resolver, String environmentType);
	String sendEmailContent();
}

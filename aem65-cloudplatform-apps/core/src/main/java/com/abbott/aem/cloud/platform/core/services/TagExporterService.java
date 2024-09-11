package com.abbott.aem.cloud.platform.core.services;

import org.apache.sling.api.resource.ResourceResolver;

import com.google.gson.JsonArray;

public interface TagExporterService {

	String getTagPath(String requestPath, String requestSelectorString);

	JsonArray getAllTags(String tagPath, String[] requestSelectors, ResourceResolver resourceResolver);

}

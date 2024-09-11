package com.abbott.aem.adc.freestylelibrede.services;

import java.util.List;

import org.apache.sling.api.resource.ResourceResolver;

import com.abbott.aem.adc.freestylelibrede.models.TreeTag;

import org.apache.sling.api.resource.Resource;

public interface TreeTagService {
	List<TreeTag> resolveTreeTags(ResourceResolver resolver, Resource resource, String rootPath, int depth, boolean useTitleAsValue);
}

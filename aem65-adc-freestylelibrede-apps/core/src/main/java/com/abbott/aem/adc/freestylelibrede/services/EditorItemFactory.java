package com.abbott.aem.adc.freestylelibrede.services;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;

import com.abbott.aem.adc.freestylelibrede.models.EditorItem;

public interface EditorItemFactory {

    EditorItem build(SlingHttpServletRequest request, Resource resource);
}

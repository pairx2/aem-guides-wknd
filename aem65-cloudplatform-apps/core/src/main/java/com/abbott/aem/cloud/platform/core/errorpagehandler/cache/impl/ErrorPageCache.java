/*
* Copyright (c) Abbott
*/
package com.abbott.aem.cloud.platform.core.errorpagehandler.cache.impl;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;

public interface ErrorPageCache {
    String get(String path, SlingHttpServletRequest request, SlingHttpServletResponse response);
}
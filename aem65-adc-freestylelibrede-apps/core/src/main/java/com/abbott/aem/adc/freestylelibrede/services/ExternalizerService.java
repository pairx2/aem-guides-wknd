package com.abbott.aem.adc.freestylelibrede.services;

import org.apache.sling.api.resource.ResourceResolver;

/**
 * Service that checks if a URL is internal or external, and when internal it will externalize the URL
 */
public interface ExternalizerService {
    /**
     * Transforms a URL to an external URL (if necessary)
     * @param path href element
     * @param resolver resource resolver of the current session
     * @return an external URL
     */
    String externalizeIfNecessary(String path, ResourceResolver resolver);
    String externalizeIfNecessaryRelativeUrl(String path, ResourceResolver resolver);
}

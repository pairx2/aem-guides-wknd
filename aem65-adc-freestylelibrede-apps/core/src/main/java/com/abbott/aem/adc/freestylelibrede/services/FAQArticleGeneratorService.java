package com.abbott.aem.adc.freestylelibrede.services;

import org.apache.sling.api.resource.ResourceResolver;

/**
 * Service that can generate FAQ Articles programmatically
 */
public interface FAQArticleGeneratorService {
    /**
     * Generated FAQ pages based on an input file in the JCR
     * @param resolver the resource resolver of the current user
     */
    void generateFromFile(ResourceResolver resolver);
}

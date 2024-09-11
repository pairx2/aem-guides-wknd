package com.abbott.aem.adc.freestylelibrede.services;

import org.apache.sling.api.resource.ResourceResolver;

/**
 * Service that allows you to read files from the JCR
 */
public interface FileReaderService {
    /**
     * Reads a text file from the JCR
     * @param path the path on which the text file is available
     * @param resolver the resource resolver of a user that has access to this file
     * @return a String that has the content of the text file in it
     */
    String readTextFile(String path, ResourceResolver resolver);
}

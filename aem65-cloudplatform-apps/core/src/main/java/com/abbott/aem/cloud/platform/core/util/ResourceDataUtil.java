/*
* Copyright (c) Abbott
*/
package com.abbott.aem.cloud.platform.core.util;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.annotation.versioning.ProviderType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.cloud.platform.core.util.BufferedServletOutput.ResponseWriteMethod;
import com.day.cq.commons.jcr.JcrConstants;

@ProviderType
@SuppressWarnings({"checkstyle:abbreviationaswordinname", "squid:S1118"})
public class ResourceDataUtil {
    public static final String ENCODING_UTF_8 = "UTF-8";
    private static final Logger log = LoggerFactory.getLogger(ResourceDataUtil.class);

    public static String getIncludeAsString(final String path, final SlingHttpServletRequest slingRequest,
                                            final SlingHttpServletResponse slingResponse) {
        BufferedSlingHttpServletResponse responseWrapper = null;

        try {
            responseWrapper = new BufferedSlingHttpServletResponse(slingResponse, new StringWriter(), null);
            final RequestDispatcher requestDispatcher = slingRequest.getRequestDispatcher(path);

            requestDispatcher.include(slingRequest, responseWrapper);
            if (responseWrapper.getBufferedServletOutput().getWriteMethod() == ResponseWriteMethod.WRITER) {
                return StringUtils.stripToNull(responseWrapper.getBufferedServletOutput().getBufferedString());
            }
        } catch (IOException | ServletException ex) {
            log.error("Error creating the String representation for: " + path, ex);
        } 
        

        return null;
    }

    public static InputStream getNTFileAsInputStream(final String path, final ResourceResolver resourceResolver) throws RepositoryException {
        return getNTFileAsInputStream(resourceResolver.resolve(path));
    }

    public static InputStream getNTFileAsInputStream(final Resource resource) throws RepositoryException {
        final Node node = resource.adaptTo(Node.class);
        final Node jcrContent = node.getNode(JcrConstants.JCR_CONTENT);
        return jcrContent.getProperty(JcrConstants.JCR_DATA).getBinary().getStream();
    }

    public static String getNTFileAsString(final String path, final ResourceResolver resourceResolver) throws RepositoryException, IOException {
        return getNTFileAsString(path, resourceResolver, ENCODING_UTF_8);
    }

    public static String getNTFileAsString(final String path, final ResourceResolver resourceResolver, final String encoding) throws RepositoryException, IOException {
        return getNTFileAsString(resourceResolver.resolve(path), encoding);
    }

    public static String getNTFileAsString(final Resource resource) throws RepositoryException, IOException {
        return getNTFileAsString(resource, ENCODING_UTF_8);
    }

    public static String getNTFileAsString(final Resource resource, final String encoding) throws RepositoryException, IOException {
        final InputStream inputStream = getNTFileAsInputStream(resource);
        return IOUtils.toString(inputStream, encoding);
    }
}
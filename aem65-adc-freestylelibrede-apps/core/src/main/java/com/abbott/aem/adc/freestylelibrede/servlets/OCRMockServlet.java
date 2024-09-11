package com.abbott.aem.adc.freestylelibrede.servlets;

import org.apache.commons.codec.CharEncoding;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.servlets.post.JSONResponse;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import javax.servlet.ServletException;

import java.io.IOException;

import static com.abbott.aem.adc.freestylelibrede.servlets.OCRMockResponse.POST_SUCCESS;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_METHODS;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_PATHS;

@Component(service = Servlet.class, property = {
        Constants.SERVICE_DESCRIPTION + "=Post Prescription Mock",
        SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_POST,
        SLING_SERVLET_PATHS + "=/bin/adc/freestylelibrede/prescription"
})
public class OCRMockServlet extends SlingAllMethodsServlet {
    private static final Logger LOGGER = LoggerFactory.getLogger(OCRMockServlet.class);

    @Override
    protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        response.setContentType(JSONResponse.RESPONSE_CONTENT_TYPE);
        response.setCharacterEncoding(CharEncoding.UTF_8);
        try {
            response.getWriter().write(POST_SUCCESS);
        } catch (IOException e) {
            LOGGER.error("error while writing response", e);
        }
    }
}

package com.abbott.aem.adc.freestylelibrede.servlets;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import org.apache.commons.codec.CharEncoding;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.ServletResolverConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.servlets.post.JSONResponse;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.abbott.aem.adc.freestylelibrede.models.SalesforceLeadRequest;
import com.abbott.aem.adc.freestylelibrede.services.SalesforceLeadService;


@Component(service = Servlet.class, property = {
        Constants.SERVICE_DESCRIPTION + "=Salesforce Lead Servlet",
        ServletResolverConstants.SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_POST,
        ServletResolverConstants.SLING_SERVLET_PATHS+"=/bin/adc/freestylelibrede/fsl/createLead"},configurationPolicy = ConfigurationPolicy.OPTIONAL)
public class SalesforceLeadServlet extends SlingAllMethodsServlet {

    private static final Logger logger = LoggerFactory.getLogger(SalesforceLeadServlet.class);
    public static final String POST_SUCCESS = "{\"success\":\"true\"}";
    @Reference
    private transient SalesforceLeadService leadService;

    @Override
    protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        logger.debug("doPost() => START");
        try {
            final SalesforceLeadRequest model = request.adaptTo(SalesforceLeadRequest.class);
            leadService.createLead(model);
			response.setContentType(JSONResponse.RESPONSE_CONTENT_TYPE);
			response.setCharacterEncoding(CharEncoding.UTF_8); 
            response.getWriter().write(POST_SUCCESS);
        } catch (RuntimeException e) {
            logger.error("Failed to submit lead to Salesforce", e);
        }
        logger.debug("doPost() => END");
    }

}

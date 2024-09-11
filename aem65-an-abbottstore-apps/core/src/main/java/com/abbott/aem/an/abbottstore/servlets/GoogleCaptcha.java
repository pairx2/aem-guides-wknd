package com.abbott.aem.an.abbottstore.servlets;

import com.abbott.aem.an.abbottstore.services.UrlConfigService;
import com.google.gson.JsonObject;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import java.io.IOException;

import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_METHODS;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_PATHS;

@Component(service = Servlet.class, immediate = true, property = { SLING_SERVLET_PATHS + "=/bin/getGoogleKeys",
        SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_GET })
public class GoogleCaptcha extends SlingAllMethodsServlet {

    private static Logger logger = LoggerFactory.getLogger(GoogleCaptcha.class);

    @Reference
    private transient UrlConfigService urlConfigService;

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
            throws IOException {
        logger.debug("Get google captcha secrets");
        JsonObject json = new JsonObject();
        json.addProperty("siteKey", urlConfigService.getSiteKey());
        logger.debug("google captcha keys {}",json);
        response.setStatus(200);
        response.getWriter().write(json.toString());
    }

}

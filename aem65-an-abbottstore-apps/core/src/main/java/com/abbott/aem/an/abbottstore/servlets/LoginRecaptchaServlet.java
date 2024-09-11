package com.abbott.aem.an.abbottstore.servlets;

import com.abbott.aem.an.abbottstore.services.UrlConfigService;
import com.abbott.aem.an.abbottstore.utils.RequestHandler;
import com.google.gson.JsonObject;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import java.io.IOException;
import java.io.PrintWriter;

import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_METHODS;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_PATHS;

@org.osgi.service.component.annotations.Component(service = Servlet.class, immediate = true, property = {SLING_SERVLET_PATHS + "=/bin/verify/loginRecaptcha",
        SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_POST})
public class LoginRecaptchaServlet extends SlingAllMethodsServlet {

    public static final String SITE_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
    private static final long serialVersionUID = 1L;
    private static final Logger log = LoggerFactory.getLogger(LoginRecaptchaServlet.class);

    @Reference
    private transient UrlConfigService urlConfigService;

    @Override
    protected void doPost(SlingHttpServletRequest req, SlingHttpServletResponse resp) throws IOException {
        log.debug("Inside doGet method of LoginRecaptchaServlet");
        String gRecaptchaResponse = req.getParameter("loginRecaptchaToken");
        PrintWriter out = null;
        JsonObject object = new JsonObject();
        resp.setContentType("application/json");
        out = resp.getWriter();
        String postParams = "secret=" + urlConfigService.getLoginSecretKey() + "&response=" + gRecaptchaResponse;
        Boolean response = RequestHandler.VerifyResponse(SITE_VERIFY_URL, postParams);
        if (response) {
            object.addProperty("status", "success");
            object.addProperty("captcha_response", Boolean.TRUE);
            object.addProperty("captcha_secret", urlConfigService.getLoginAemMagentoSecretKey());
        } else {
            object.addProperty("status", "failure");
            log.debug("LoginRecaptchaServlet verification failed");
        }

        if (null != out) {
            out.print(object.toString());
        }
    }
}
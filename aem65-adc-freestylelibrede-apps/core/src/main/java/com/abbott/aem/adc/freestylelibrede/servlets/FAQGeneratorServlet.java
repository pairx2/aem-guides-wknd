package com.abbott.aem.adc.freestylelibrede.servlets;

import com.abbott.aem.adc.freestylelibrede.services.FAQArticleGeneratorService;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;

import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_METHODS;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_PATHS;

@Component(
    service = Servlet.class,
    immediate = true,
    property = {
        Constants.SERVICE_DESCRIPTION + "=Create FAQ Pages",
        SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_GET,
        SLING_SERVLET_PATHS + "=/bin/adc/freestylelibrede/create-faq-pages"
    }
)
public class FAQGeneratorServlet extends SlingSafeMethodsServlet {
    @Reference
    private transient FAQArticleGeneratorService faqArticleGeneratorService;

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        faqArticleGeneratorService.generateFromFile(request.getResourceResolver());
        response.getWriter().write("Servlet successfully triggered. Please check the logs to make sure pages were successfully created!");
    }
}

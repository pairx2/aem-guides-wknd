package com.abbott.aem.platform.common.components.servlets;

import com.day.cq.commons.Externalizer;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.service.component.annotations.Component;
import javax.servlet.Servlet;
import java.io.IOException;
import java.util.Optional;

import static org.apache.sling.api.servlets.HttpConstants.METHOD_GET;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_METHODS;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_RESOURCE_TYPES;

@Slf4j
@Component(service = Servlet.class,
        property = {SLING_SERVLET_RESOURCE_TYPES + "=" + ExternalizerDataSourceServlet.RESOURCE_TYPE,
                SLING_SERVLET_METHODS + "=" + METHOD_GET})
public class ExternalizerDataSourceServlet extends SlingSafeMethodsServlet {

    private static final long serialVersionUID = -256425619548399065L;

    public static final String RESOURCE_TYPE = "abbott-platform/datasource/externalizer";

    @Override
    protected void doGet(final SlingHttpServletRequest request, final SlingHttpServletResponse response) throws IOException {

        ResourceResolver resourceResolver = request.getResourceResolver();
        Externalizer externalizer = resourceResolver.adaptTo(Externalizer.class);
        String domain = Optional.ofNullable(request.getParameter("domain"))
                .orElse("missingDomain");

        try {
            externalizer.externalLink(resourceResolver, domain, StringUtils.EMPTY);
        } catch (IllegalArgumentException e) {
            response.getWriter().write("Externalizer domain not found for this name.");
            log.warn("Externalizer domain not found for '{}' name", domain);
        }

    }

}

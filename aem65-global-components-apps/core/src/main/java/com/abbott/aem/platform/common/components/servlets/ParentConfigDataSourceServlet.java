package com.abbott.aem.platform.common.components.servlets;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.service.component.annotations.Component;

import javax.servlet.Servlet;
import java.io.IOException;
import java.util.Optional;

import static org.apache.sling.api.servlets.HttpConstants.METHOD_GET;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_METHODS;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_RESOURCE_TYPES;
import static com.day.cq.commons.jcr.JcrConstants.JCR_CONTENT;

@Slf4j
@Component(service = Servlet.class,
        property = {SLING_SERVLET_RESOURCE_TYPES + "=" + ParentConfigDataSourceServlet.RESOURCE_TYPE,
                SLING_SERVLET_METHODS + "=" + METHOD_GET})
public class ParentConfigDataSourceServlet extends SlingSafeMethodsServlet {

    private static final long serialVersionUID = -256425619548995514L;

    private static final String PROPERTY_MESSAGE_TEMPLATE = "%s (configured at: %s)";

    public static final String RESOURCE_TYPE = "abbott-platform/datasource/parentconfig";

    private static final int MINIMUM_DEPTH = 3;

    @Override
    protected void doGet(final SlingHttpServletRequest request, final SlingHttpServletResponse response) throws IOException {

        ResourceResolver resourceResolver = request.getResourceResolver();

        String property = request.getParameter("property");
        String path = request.getParameter("item");

        if (path != null && property != null) {
            Resource resource = resourceResolver.getResource(path);
            String propertyPagePath = getPropertyPagePath(resource, property);
            response.getWriter().write(propertyPagePath);
        }

    }

    private String getPropertyPagePath(Resource resource, String property) {
        if (resource == null || isMinimumDepth(resource)) {
            return StringUtils.EMPTY;
        }
        Optional<String> prop = Optional.ofNullable(resource.getChild(JCR_CONTENT))
                .map(Resource::getValueMap)
                .map(map -> map.get(property, String.class));
        return prop.isPresent() ?
                String.format(PROPERTY_MESSAGE_TEMPLATE, prop.get(), resource.getPath()) :
                getPropertyPagePath(resource.getParent(), property);
    }

    private boolean isMinimumDepth(Resource resource) {
        return resource.getPath().split("/").length <= MINIMUM_DEPTH;
    }

}

package com.abbott.aem.adc.freestylelibrede.filters;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.api.resource.SyntheticResource;
import org.apache.sling.engine.EngineConstants;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.*;
import java.io.IOException;

import static org.apache.sling.engine.EngineConstants.*;

@Component(service = Filter.class,
        property = {
                Constants.SERVICE_DESCRIPTION + "=Abbott - Provides synthetic resource to EditContextServlet for non-existing resources",
                EngineConstants.SLING_FILTER_SCOPE + "=" + EngineConstants.FILTER_SCOPE_REQUEST,
                Constants.SERVICE_RANKING + ":Integer=1000",
                SLING_FILTER_PATTERN + "=/content/(.*)",
                SLING_FILTER_SELECTORS + "=editcontext",
                SLING_FILTER_EXTENSIONS + "=json"

        })
@Designate(ocd = EditContextServletFilter.Config.class)
public class EditContextServletFilter implements Filter {

    private static final Logger LOG = LoggerFactory.getLogger(EditContextServletFilter.class);
    private static final String RESPONSIVE_GRID_RT = "wcm/foundation/components/responsivegrid";

    private Config config;

    @Activate
    protected void activate(Config config) {
        this.config = config;
        LOG.info("Activating Edit Context Servlet Filter");
    }

    @Override
    public void init(FilterConfig filterConfig) {
        LOG.info("Initializing Edit Context Servlet Filter");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {
        SlingHttpServletRequest slingRequest = (SlingHttpServletRequest) servletRequest;
        SlingHttpServletResponse slingResponse = (SlingHttpServletResponse) servletResponse;
        String resourceType = slingRequest.getParameter("resourceType");

        if (config.enabled()) {
            if (!ResourceUtil.isSyntheticResource(slingRequest.getResource())) {
                filterChain.doFilter(slingRequest, slingResponse);
                return;
            } else if (RESPONSIVE_GRID_RT.equals(resourceType)) {
                SyntheticResource syntheticResource = new SyntheticResource(slingRequest.getResourceResolver(),
                        slingRequest.getResource().getPath().replace(".editcontext.json", ""),
                        RESPONSIVE_GRID_RT);
                final RequestDispatcher dispatcher = slingRequest.getRequestDispatcher(syntheticResource, null);
                dispatcher.forward(servletRequest, servletResponse);
            } else {
                filterChain.doFilter(slingRequest, slingResponse);
            }
        } else {
            filterChain.doFilter(slingRequest, slingResponse);
            return;
        }
    }

    @Override
    public void destroy() {
        LOG.info("Destroying and removing evidence of Edit Context Servlet Filter");
    }

    @ObjectClassDefinition(
            name = "Configuration for Edit Context Servlet Filter"
    )
    public @interface Config {
        @AttributeDefinition(name = "Enable wrapping of request for non-existing resources")
        boolean enabled() default true;
    }
}

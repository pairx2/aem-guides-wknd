package com.abbott.aem.cloud.platform.core.environmentindicator;

import com.abbott.aem.cloud.platform.core.environmentindicator.AemEnvironmentIndicatorFilter.Config;
import com.abbott.aem.cloud.platform.core.environmentindicator.BufferedServletOutput.ResponseWriteMethod;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Dictionary;
import java.util.Hashtable;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.day.cq.wcm.api.WCMMode;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.text.lookup.StringLookupFactory;
import org.apache.commons.text.StringSubstitutor;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.engine.EngineConstants;
import org.apache.sling.xss.XSSAPI;
import org.osgi.framework.BundleContext;
import org.osgi.framework.Constants;
import org.osgi.framework.FrameworkUtil;
import org.osgi.framework.ServiceRegistration;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.http.whiteboard.HttpWhiteboardConstants;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * The Environment filter consists of 2 filters:
 * * the environment filter, which is registered directly to the HTTP whiteboard, and which can cover
 *   also non-Sling applications (like CRXDE and the OSGI webconsole)
 * * a Sling filter, which is required for the filtering based on the WCM modes.
 *
 * The environment indicator output is written by the "outer" filter, but its decision might be overwritten
 * by the Sling Filter. The status is stored as a request attribute.
 *
 *
 */

@Component(service = Filter.class, immediate = true)
@Designate(ocd = Config.class)
public class AemEnvironmentIndicatorFilter implements Filter {

    private static final Logger log = LoggerFactory.getLogger(AemEnvironmentIndicatorFilter.class);

    private static final String DIV_ID = "acs-commons-env-indicator";

    static final String INJECT_INDICATOR_PARAMETER = "AemEnvironmentIndicatorFilter.includeIndicator";

    private static final String BASE_DEFAULT_STYLE =
            ";background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5ZmViMDk1Ni00MTMwLTQ0NGMtYWM3Ny02MjU0NjY0OTczZWIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDk4RTBGQkYzMjA5MTFFNDg5MDFGQzVCQkEyMjY0NDQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDk4RTBGQkUzMjA5MTFFNDg5MDFGQzVCQkEyMjY0NDQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Mjc5NmRkZmItZDVlYi00N2RlLWI1NDMtNDgxNzU2ZjIwZDc1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjlmZWIwOTU2LTQxMzAtNDQ0Yy1hYzc3LTYyNTQ2NjQ5NzNlYiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ps64/vsAAAAkSURBVHjaYvz//z8DGjBmAAkiYWOwInQBZEFjZB0YAiAMEGAAVBk/wkPTSYQAAAAASUVORK5CYII=');"
                    + "border-bottom: 1px solid rgba(0, 0, 0, .25);"
                    + "box-sizing: border-box;"
                    + "-moz-box-sizing: border-box;"
                    + "-webkit-box-sizing: border-box;"
                    + "position: fixed;"
                    + "left: 0;"
                    + "top: 0;"
                    + "right: 0;"
                    + "height: 5px;"
                    + "z-index: 100000000000000;";

    private static final String TITLE_UPDATE_SCRIPT = "<script>(function() { var c = 0; t = '%s' + ' | ' + document.title, "
            + "i = setInterval(function() { if (document.title === t && c++ > 10) { clearInterval(i); } else { document.title = t; } }, 1500); "
            + "document.title = t; })();</script>\n";

    @Reference
    private XSSAPI xss;

    /* Property: Inner HTML */
    private String innerHTML = "";

    /* Property: Browser Title Prefix */
    private static final String DEFAULT_TITLE_PREFIX = "";

    private String titlePrefix = DEFAULT_TITLE_PREFIX;
    private String css = "";
    private ServiceRegistration<?> filterRegistration;
    private ServiceRegistration<?> innerFilterRegistration;

    @Override
    public void init(final FilterConfig filterConfig) throws ServletException {
        // no-op
    }

    @Override
    @SuppressWarnings("squid:S3776")
    public final void doFilter(final ServletRequest servletRequest, final ServletResponse servletResponse,
            final FilterChain filterChain) throws IOException, ServletException {

        if (!(servletRequest instanceof HttpServletRequest)
                || !(servletResponse instanceof HttpServletResponse)) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        final HttpServletRequest request = (HttpServletRequest) servletRequest;
        final HttpServletResponse response = (HttpServletResponse) servletResponse;

        if (!this.accepts(request)) {
            filterChain.doFilter(request, response);
            return;
        }

        try (BufferedHttpServletResponse capturedResponse =
                new BufferedHttpServletResponse(response, new StringWriter(), null)) {

            request.setAttribute(INJECT_INDICATOR_PARAMETER, Boolean.TRUE);

            log.debug("Executing the rest of the filter chain");
            filterChain.doFilter(request, capturedResponse);
            log.debug("Executing the rest of the filter chain");

            if (StringUtils.contains(response.getContentType(), "html") && innerFilterAcceptsInjection(request)) {
                // Get contents
                final String contents = capturedResponse.getBufferedServletOutput()
                        .getWriteMethod() == ResponseWriteMethod.WRITER
                        ? capturedResponse.getBufferedServletOutput().getBufferedString()
                        : null;

                if (contents != null) {
                    final int bodyIndex = contents.indexOf("</body>");

                    if (bodyIndex != -1) {
                        // prevent the captured response from being given out a 2nd time via the implicit close()
                        capturedResponse.setFlushBufferOnClose(false);
                        final PrintWriter printWriter = response.getWriter();
                        printWriter.write(contents.substring(0, bodyIndex));

                        writeEnvironmentIndicator(css, innerHTML, titlePrefix, printWriter);

                        printWriter.write(contents.substring(bodyIndex));
                    }
                }
            }
        }
    }

    boolean innerFilterAcceptsInjection(HttpServletRequest request) {
        return request.getAttribute(INJECT_INDICATOR_PARAMETER).equals(Boolean.TRUE);
    }

    void writeEnvironmentIndicator(String css, String innerHTML, String titlePrefix,
            PrintWriter printWriter) {
        if (StringUtils.isNotBlank(css)) {
            printWriter.write("<style>" + css + " </style>");
            printWriter.write("<div id=\"" + DIV_ID + "\">" + innerHTML + "</div>");
        }

        if (StringUtils.isNotBlank(titlePrefix)) {
            printWriter.printf(TITLE_UPDATE_SCRIPT, titlePrefix);
        }
    }

    @Override
    public void destroy() {
        // no-op
    }

    @SuppressWarnings("squid:S3923")
    boolean accepts(final HttpServletRequest request) {
        if (isImproperlyConfigured(css, titlePrefix)) {
            // Only accept is properly configured
            log.warn(
                    "AEM Environment Indicator is not properly configured; If this feature is unwanted, "
                            + "remove the OSGi configuration and disable completely.");
            return false;
        } else if (isUnsupportedRequestMethod(request.getMethod())) {
            log.debug("Request was not a GET request");
            return false;
        } else if (isXhr(request.getHeader("X-Requested-With"))) {
            log.debug("Request was an XHR");
            return false;
        } else if (hasAemEditorReferrer(request.getHeader("Referer"), request.getRequestURI())) {
            log.debug("Request was for a page in an editor");
            return false;
        }
        // Checking for WcmMode does not make sense, it is not available here
        log.debug("All checks pass, filter can execute");
        return true;
    }

    boolean isImproperlyConfigured(final String css, final String titlePrefix) {
        return StringUtils.isBlank(css) && StringUtils.isBlank(titlePrefix);
    }

    boolean isUnsupportedRequestMethod(final String requestMethod) {
        return !StringUtils.equalsIgnoreCase("get", requestMethod);
    }

    boolean isXhr(final String headerValue) {
        return StringUtils.equals(headerValue, "XMLHttpRequest");
    }

    boolean hasAemEditorReferrer(final String headerValue, final String requestUri) {
        return StringUtils.endsWith(headerValue, "/editor.html" + requestUri)
                || StringUtils.endsWith(headerValue, "/cf");
    }

    @Activate
    @SuppressWarnings("squid:S1149")
    protected final void activate(Config config) {
        String color = config.css_color();
        String cssOverride = config.css_override();
        innerHTML = config.inner_html();
        innerHTML = new StringSubstitutor(StringLookupFactory.INSTANCE.systemPropertyStringLookup()).replace(innerHTML);
        boolean alwaysIncludeBaseCss = config.always_include_base_css();
        boolean alwaysIncludeColorCss = config.always_include_color_css();

        StringBuilder cssSb = new StringBuilder();

        if (shouldUseBaseCss(alwaysIncludeBaseCss, cssOverride, color)) {
            cssSb.append(createBaseCss());
        }

        if (shouldUseColorCss(alwaysIncludeColorCss, cssOverride, color)) {
            cssSb.append(createColorCss(color));
        }

        if (StringUtils.isNotBlank(cssOverride)) {
            cssSb.append(cssOverride);
        }

        css = cssSb.toString();

        titlePrefix = xss.encodeForJSString(config.browser_title_prefix());

        String[] excludedWCMModes = config.excluded_wcm_modes();

        if (StringUtils.isNotBlank(css) || StringUtils.isNotBlank(titlePrefix)) {
            Dictionary<String, String> filterProps = new Hashtable<>();
            filterProps.put(HttpWhiteboardConstants.HTTP_WHITEBOARD_FILTER_PATTERN, "/");
            filterProps.put(HttpWhiteboardConstants.HTTP_WHITEBOARD_CONTEXT_SELECT,
                    "(" + HttpWhiteboardConstants.HTTP_WHITEBOARD_CONTEXT_NAME + "=*)");

            BundleContext ctx = FrameworkUtil.getBundle(getClass()).getBundleContext();
            filterRegistration = ctx.registerService(Filter.class.getName(),
                    this, filterProps);

            // Register the innerFilter so it is invoked after the WcmRequestFilter (Ranking = 2000)
            Dictionary<String, Object> innerFilterProps = new Hashtable<>();
            innerFilterProps.put(EngineConstants.SLING_FILTER_SCOPE,EngineConstants.FILTER_SCOPE_REQUEST);
            innerFilterProps.put(Constants.SERVICE_RANKING, 1000);
            Filter innerFilter = new InnerEnvironmentIndicatorFilter(excludedWCMModes);
            innerFilterRegistration = ctx.registerService(Filter.class.getName(), innerFilter, innerFilterProps);
        }
    }

    String createBaseCss() {
        return "#" + DIV_ID + " { "
                + BASE_DEFAULT_STYLE
                + " }";
    }

    String createColorCss(final String providedColor) {
        return "#" + DIV_ID + " { "
                + "background-color:" + providedColor
                + "; }";
    }

    boolean shouldUseBaseCss(boolean alwaysInclude, String cssOverride, String color) {
        return (alwaysInclude || StringUtils.isBlank(cssOverride)) && StringUtils.isNotBlank(color);
    }

    boolean shouldUseColorCss(boolean alwaysInclude, String cssOverride, String color) {
        return (alwaysInclude || StringUtils.isBlank(cssOverride)) && StringUtils.isNotBlank(color);
    }

    @Deactivate
    protected final void deactivate() {
        if (filterRegistration != null) {
            filterRegistration.unregister();
            filterRegistration = null;
        }
        if (innerFilterRegistration != null) {
            innerFilterRegistration.unregister();
            innerFilterRegistration = null;
        }

        // Reset CSS variable
        css = "";
    }

    WCMMode getWcmMode(HttpServletRequest request) {
        return WCMMode.fromRequest(request);
    }

    /*
     * Used for testing
     */
    String getCss() {
        return css;
    }

    String getTitlePrefix() {
        return titlePrefix;
    }

    protected static class InnerEnvironmentIndicatorFilter implements Filter {

        String[] excludedWcmModes;

        public InnerEnvironmentIndicatorFilter(String[] excludedWcmModes) {
            this.excludedWcmModes = excludedWcmModes;
        }

        @Override
        public void init(FilterConfig filterConfig) throws ServletException {
            // ignore
        }

        @Override
        public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
                throws IOException, ServletException {

            SlingHttpServletRequest req = (SlingHttpServletRequest) request;

            WCMMode mode = WCMMode.fromRequest(request);
            if (isDisallowedWcmMode(mode, excludedWcmModes)) {
                request.setAttribute(INJECT_INDICATOR_PARAMETER, Boolean.FALSE);
                String msg = String.format(
                        "reject inclusion of environment indicator, found wcmmode '%s' in exclusion list %s",
                        mode.name(), ArrayUtils.toString(excludedWcmModes));
                req.getRequestProgressTracker().log(msg);
            }
            chain.doFilter(request, response);
        }

        boolean isDisallowedWcmMode(WCMMode currentMode, String[] excludedWcmModes) {
            return currentMode == null || StringUtils.equalsAnyIgnoreCase(currentMode.name(), excludedWcmModes);
        }

        @Override
        public void destroy() {
            // ignore
        }
    }

    @ObjectClassDefinition(
            name = "ACS AEM Commons - AEM Environment Indicator",
            description = "Adds a visual cue to the AEM WebUI indicating which environment is being access"
                    + " (localdev, dev, qa, staging)"
    )
    public @interface Config {
        @AttributeDefinition(
                name = "Color",
                description = "The color of the indicator bar; takes any valid value"
                        + " for CSS's 'background-color' attribute."
                        + " This is only effective if no 'CSS Override' is provided or 'Always Include Color CSS'"
                        + " is set to true."
        )
        String css_color() default "";

        @AttributeDefinition(
                name = "CSS Override",
                description = "Accepts any valid CSS to style the AEM indicator div. All CSS rules must only be "
                        + "scoped to #" + DIV_ID + " { .. }"
        )
        String css_override() default "";

        @AttributeDefinition(
                name = "Inner HTML",
                description = "Any additional HTML required; Will be injected into a div with"
                        + " id='" + DIV_ID + "'"
        )
        String inner_html() default "";

        @AttributeDefinition(
                name = "Always Include Base CSS",
                description = "Always include the base CSS scoped to #" + DIV_ID + " { .. }"
        )
        boolean always_include_base_css() default false;

        @AttributeDefinition(
                name = "Always Include Color CSS",
                description = "Always include the color CSS scoped to #" + DIV_ID + " { .. }"
        )
        boolean always_include_color_css() default false;

        @AttributeDefinition(
                name = "Browser Title",
                description = "A prefix to add to the browser tab/window title; <THIS VALUE> | <ORIGINAL DOC TITLE>"
        )
        String browser_title_prefix() default DEFAULT_TITLE_PREFIX;

        @AttributeDefinition(
                name = "Excluded WCM modes",
                description = "Do not display the indicator when these WCM modes",
                cardinality = Integer.MAX_VALUE
        )
        String[] excluded_wcm_modes() default {"DISABLED"};
    }

}

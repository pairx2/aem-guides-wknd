package com.abbott.aem.adc.freestylelibrede.servlets;

import com.abbott.aem.adc.freestylelibrede.services.DictionaryJsonExporter;
import com.adobe.granite.i18n.LocaleUtil;
import org.apache.commons.codec.CharEncoding;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.servlets.post.JSONResponse;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import java.io.IOException;
import java.util.Locale;
import java.util.ResourceBundle;

import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_EXTENSIONS;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_PATHS;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_METHODS;

/**
 * Servlet to export i18N dictionary
 *
 * @author andhingra
 */
@Component(service = Servlet.class, property = {
        Constants.SERVICE_DESCRIPTION + "=Abbott i18N Dictionary JSON Exporter",
        SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_GET, SLING_SERVLET_PATHS + "=/bin/adc/freestylelibrede/i18n",
        SLING_SERVLET_EXTENSIONS + "=json"})
public class AbbottDictionaryExporter extends SlingSafeMethodsServlet {

    /**
     * Default serialization id
     */
    private static final long serialVersionUID = 1L;
    private static final Logger LOGGER = LoggerFactory.getLogger(AbbottDictionaryExporter.class);

    @Reference
    private transient DictionaryJsonExporter exporter;

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws IOException {

        String localeString = request.getRequestPathInfo().getSelectorString();
        LOGGER.debug("Locale String found as ::{}",localeString);
        Locale locale = localeString != null ? LocaleUtil.parseLocale(localeString) : null;
        if(null == locale){
            LOGGER.error("Local is null...Hence retuning.");
        }
            byte[] data = exporter.createJson(request,locale);
            response.setContentType(JSONResponse.RESPONSE_CONTENT_TYPE);
            response.setCharacterEncoding(CharEncoding.UTF_8);
            response.setContentLength(data.length);
            response.getOutputStream().write(data);
    }

    /**
     * Returns the resource bundle with defined basename property
     *
     * @param request
     * @return
     */
    private ResourceBundle getResourceBundle(SlingHttpServletRequest request) {
        String localeString = request.getRequestPathInfo().getSelectorString();
        Locale locale = localeString != null ? LocaleUtil.parseLocale(localeString) : null;
        if (null != locale) {
            return request.getResourceBundle(locale.getLanguage(), locale);
        }
        return null;
    }

}

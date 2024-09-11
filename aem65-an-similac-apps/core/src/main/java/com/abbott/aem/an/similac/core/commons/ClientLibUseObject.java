package com.abbott.aem.an.similac.core.commons;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.script.Bindings;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.scripting.SlingBindings;
import org.apache.sling.api.scripting.SlingScriptHelper;
import org.apache.sling.scripting.sightly.pojo.Use;
import org.apache.sling.xss.XSSAPI;
import org.slf4j.Logger;

import com.abbott.aem.an.similac.core.utils.CommonConstants;
import com.adobe.granite.ui.clientlibs.ClientLibrary;
import com.adobe.granite.ui.clientlibs.HtmlLibraryManager;
import com.adobe.granite.ui.clientlibs.LibraryType;


public class ClientLibUseObject implements Use {

    private static final String BINDINGS_CATEGORIES = "categories";
    private static final String BINDINGS_MODE = "mode";

    /**
     * Sightly parameter that becomes the script element void attribute such as
     * 'defer' and 'async'. Valid values are listed in {@link #VALID_JS_ATTRIBUTES}.
     */
    private static final String BINDINGS_LOADING = "loading";

    /**
     * Sightly parameter that becomes the javascript function value in the
     * script element's 'onload' attribute.
     */
    private static final String BINDINGS_ONLOAD = "onload";

    /**
     * Sightly parameter that becomes the value in the script and link elements'
     * 'crossorigin' attribute.
     */
    private static final String BINDINGS_CROSS_ORIGIN = "crossorigin";

    /**
     * HTML markup for javascript. Add 'type="text/javascript"' if you are not
     * using HTML 5.
     */
    private static final String TAG_JAVASCRIPT = "<script type=\"text/javascript\" src=\"%s\"%s></script>";

    /**
     * HTML markup for stylesheets.
     */
    private static final String TAG_STYLESHEET = "<link  rel=\"stylesheet\" href=\"%s\"%s type=\"text/css\" defer media=\"all\" >";

    /**
     * HTML markup for onload attribute of script element.
     */
    private static final String ONLOAD_ATTRIBUTE = " onload=\"%s\"";

    /**
     * HTML markup for crossorigin attribute of script and link elements.
     */
    private static final String CROSS_ORIGIN_ATTRIBUTE = " crossorigin=\"%s\"";

    /**
     * Valid void attributes for HTML markup of script element.
     */
    private static final List<String> VALID_JS_ATTRIBUTES = new ArrayList<>();
   
    /**
     * Valid values for crossorigin attribute for HTML markup of script and link
     * elements.
     */
    private static final List<String> VALID_CROSS_ORIGIN_VALUES = new ArrayList<>();

    private HtmlLibraryManager htmlLibraryManager = null;
    private String[] categories;
    private String mode;
    private String loadingAttribute;
    private String onloadAttribute;
    private String crossoriginAttribute;
    private SlingHttpServletRequest request;
    private Logger log;
    PrintWriter out;
    private XSSAPI xssAPI;

    /**
     * Same as AEM provided method with the addition of getting the XSSAPI
     * service and the two additional bindings for loading and onload.
     * 
     * @see libs.granite.sightly.templates.ClientLibUseObject#init(Bindings)
     */
    public void init(Bindings bindings) {
        loadingAttribute = (String) bindings.get(BINDINGS_LOADING);
        onloadAttribute = (String) bindings.get(BINDINGS_ONLOAD);
        crossoriginAttribute = (String) bindings.get(BINDINGS_CROSS_ORIGIN);
        
        Object categoriesObject = bindings.get(BINDINGS_CATEGORIES);
        log = (Logger) bindings.get(SlingBindings.LOG);
        if (categoriesObject != null) {
            getCategoriesObject(categoriesObject);
            if (categories != null && categories.length > 0) {
                mode = (String) bindings.get(BINDINGS_MODE);
                request = (SlingHttpServletRequest) bindings.get(SlingBindings.REQUEST);
                SlingScriptHelper sling = (SlingScriptHelper) bindings.get(SlingBindings.SLING);
                htmlLibraryManager = sling.getService(HtmlLibraryManager.class);
                xssAPI = sling.getService(XSSAPI.class);
            }
        }
    }

	private void getCategoriesObject(Object categoriesObject) {
		if (categoriesObject instanceof Object[]) {
		    Object[] categoriesArray = (Object[]) categoriesObject;
		    categories = new String[categoriesArray.length];
		    int i = 0;
		    for (Object o : categoriesArray) {
		        if (o instanceof String) {
		            categories[i++] = ((String) o).trim();
		        }
		    }
		} else if (categoriesObject instanceof String) {
		    categories = ((String) categoriesObject).split(",");
		    int i = 0;
		    for (String c : categories) {
		        categories[i++] = c.trim();
		    }
		}
	}

    /**
     * Essentially the same as the AEM provided method with the exception that
     * the HtmlLibraryManger's writeIncludes methods have been replaced with
     * calls to #includeLibraries.
     * 
     * @see libs.granite.sightly.templates.ClientLibUseObject#include()
     */
    public String include() {
        StringWriter sw = new StringWriter();

        if (categories == null || categories.length == 0)  {
            log.debug("'categories' option might be missing from the invocation of the {0}{1}" +
                    "client libraries template library. Please provide a CSV list or an array of categories to include.",CommonConstants.APPS_ROOT_PATH,"beagle/sightly/templates/clientlib.html");
        } else {
             out = new PrintWriter(sw);
            if ("js".equalsIgnoreCase(mode)) {
                includeLibraries(out, LibraryType.JS);
            } else if ("css".equalsIgnoreCase(mode)) {
                includeLibraries(out, LibraryType.CSS);
            } else {
                includeLibraries(out, LibraryType.CSS);
                includeLibraries(out, LibraryType.JS);
            }
        }

        return sw.toString();
    }

    /**
     * Construct the HTML markup for the script and link elements.
     *
     * @param out The PrintWriter object responsible for writing the HTML.
     * @param LibraryType The library type either CSS or JS.
     */
    private void includeLibraries(PrintWriter out, LibraryType libraryType) {
    	 VALID_JS_ATTRIBUTES.add("defer");
    	 VALID_JS_ATTRIBUTES.add("async");
    	 VALID_CROSS_ORIGIN_VALUES.add("anonymous");
    	 VALID_CROSS_ORIGIN_VALUES.add("use-credentials");
        if (htmlLibraryManager != null && libraryType != null && xssAPI != null) { 
            Collection<ClientLibrary> libs = htmlLibraryManager.getLibraries(categories, libraryType, false, false);

            String attribute = StringUtils.EMPTY;

            attribute = getJavascriptClientlibs(libraryType, attribute);

            if (StringUtils.isNotBlank(crossoriginAttribute) && VALID_CROSS_ORIGIN_VALUES.contains(crossoriginAttribute.toLowerCase())) {
                attribute = attribute.concat(String.format(CROSS_ORIGIN_ATTRIBUTE, crossoriginAttribute.toLowerCase()));
            }

            for (ClientLibrary lib : libs) {
                String path = getIncludePath(request, lib, libraryType, htmlLibraryManager.isMinifyEnabled());

                if (path != null) {
                    out.format(libraryType.equals(LibraryType.JS) ? TAG_JAVASCRIPT : TAG_STYLESHEET, path, attribute);
                }
            }
        }
    }

	private String getJavascriptClientlibs(LibraryType libraryType, String attribute) {
		if (libraryType.equals(LibraryType.JS)) {
		    if (StringUtils.isNotBlank(loadingAttribute) && VALID_JS_ATTRIBUTES.contains(loadingAttribute.toLowerCase())) {
		        attribute = " ".concat(loadingAttribute.toLowerCase());
		    }

		    if (StringUtils.isNotBlank(onloadAttribute)) {
		        String safeOnload = xssAPI.encodeForHTMLAttr(onloadAttribute);

		        if (StringUtils.isNotBlank(safeOnload)) {
		            attribute = attribute.concat(String.format(ONLOAD_ATTRIBUTE, safeOnload));
		        }
		    }
		}
		return attribute;
	}

    /**
     * Returns the include path for the given library and type, respecting the proxy settings.
     * @param lib library
     * @param type type
     * @param minify {@code true} for minify
     * @return the path
     *
     * @see com.adobe.granite.ui.clientlibs.impl.HtmlLibraryWriter#getIncludePath(SlingHttpServletRequest, ClientLibrary, LibraryType, boolean)
     */
    private String getIncludePath(SlingHttpServletRequest request, ClientLibrary lib, LibraryType type, boolean minify) {
        String path = lib.getIncludePath(type, minify);
        if (lib.allowProxy() && (path.startsWith(CommonConstants.LIBS_ROOT_PATH) || path.startsWith(CommonConstants.APPS_ROOT_PATH))) {
            path = "/etc.clientlibs" + path.substring(5);
        } else {
            // check if request session has access (GRANITE-4429)
            if (request.getResourceResolver().getResource(lib.getPath()) == null) {
                path = null;
            }
        }
        return path;
    }
}

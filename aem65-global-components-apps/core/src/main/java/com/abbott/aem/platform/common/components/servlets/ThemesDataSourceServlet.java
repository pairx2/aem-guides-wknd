package com.abbott.aem.platform.common.components.servlets;

import static org.apache.sling.api.servlets.HttpConstants.METHOD_GET;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_METHODS;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_RESOURCE_TYPES;

import java.util.HashMap;
import java.util.Map;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.servlet.Servlet;
import javax.xml.XMLConstants;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.abbott.aem.platform.common.constants.CommonConstants;
import com.abbott.aem.platform.common.util.ConvertToDropdown;
import com.abbott.aem.platform.common.util.ConvertToDropdownImpl;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;

import lombok.extern.slf4j.Slf4j;

/**
 * @author Pawan.Namagiri
 */
@Slf4j
@Component(service = Servlet.class,
        property = {SLING_SERVLET_RESOURCE_TYPES + "=" + CommonConstants.RESOURCE_TYPE_THEME_DROPDOWN,
                SLING_SERVLET_METHODS + "=" + METHOD_GET})
public class ThemesDataSourceServlet extends SlingSafeMethodsServlet {

    private static final long serialVersionUID = -256425613150999065L;
    public static final String CATEGORIES = "categories";
    private transient DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();

    public static final String PATH_PREFIX = "/";

    @SuppressWarnings("CQRules:CQBP-71")
    public static final String PATH_URL =  "apps";

    public static final String PATH = PATH_PREFIX + PATH_URL;
    @Reference
    private transient QueryBuilder builder;

    @Override
    protected void doGet(final SlingHttpServletRequest request, final SlingHttpServletResponse response) {

        /**
         * Get resource resolver instance
         */
        ResourceResolver resourceResolver = request.getResourceResolver();

        /**
         * Adapting the resource resolver to the session object
         */
        @SuppressWarnings("CQRules:CQBP-71")
        Session session = resourceResolver.adaptTo(Session.class);

        try {
            Map<String, String> map = new HashMap<>();
            map.put("path", PATH);
            map.put("type", "cq:ClientLibraryFolder");
            map.put("property", CATEGORIES);
            map.put("property.operation", "like");
            map.put("property.value", "abbott.theme%");
            map.put("p.limit", "-1");
            map.put("orderby", "path");

            Query query = builder.createQuery(PredicateGroup.create(map), session);

            SearchResult result = query.getResult();

            //Place the results in XML to return to client
            factory.setAttribute(XMLConstants.ACCESS_EXTERNAL_DTD, StringUtils.EMPTY);
            factory.setAttribute(XMLConstants.ACCESS_EXTERNAL_SCHEMA, StringUtils.EMPTY);

            DocumentBuilder documentBuilder = factory.newDocumentBuilder();
            Document doc = documentBuilder.newDocument();

            // Start building the XML to pass back to the AEM client
            Element root = doc.createElement("results");
            doc.appendChild(root);

            Map<String, String> dropDownMap = new HashMap<>();
            dropDownMap.put(StringUtils.EMPTY, "Select Theme");
            for (Hit hit : result.getHits()) {
                // Create a result element
                ValueMap valueMap = hit.getProperties();
                if (valueMap.containsKey(CATEGORIES)) {
                    dropDownMap.put(valueMap.get(CATEGORIES, StringUtils.EMPTY),
                            valueMap.containsKey(JcrConstants.JCR_TITLE) ? valueMap.get(JcrConstants.JCR_TITLE, StringUtils.EMPTY)
                                    : valueMap.get(CATEGORIES, StringUtils.EMPTY));
                }
            }

            ConvertToDropdown convertTodropdown = new ConvertToDropdownImpl();
            convertTodropdown.constructDataSource(request, resourceResolver, dropDownMap);


        } catch (RepositoryException | ParserConfigurationException e) {
            log.error("Exception in Themes Dropdown", e);
        }
    }

}
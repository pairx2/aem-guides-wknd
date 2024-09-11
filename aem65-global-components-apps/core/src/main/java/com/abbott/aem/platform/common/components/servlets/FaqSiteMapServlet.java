/*
 * Copyright (c) Abbott
 */
package com.abbott.aem.platform.common.components.servlets;

import com.abbott.aem.cloud.platform.core.util.PageUtil;
import com.day.cq.commons.Externalizer;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.DamConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.FastDateFormat;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletResourceTypes;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.xml.stream.XMLOutputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamWriter;
import java.io.IOException;
import java.util.*;

import static org.apache.sling.api.servlets.HttpConstants.METHOD_GET;

@Component(immediate = true, service = {Servlet.class})
@SlingServletResourceTypes(resourceTypes = "core/wcm/components/page/v2/page", methods = METHOD_GET, selectors = {"faqsitemap"}, extensions = {"xml"})

@Designate(ocd = FaqSiteMapServletConfiguration.class, factory = true)
public final class FaqSiteMapServlet extends SlingSafeMethodsServlet {

    public static final String QUERY_PARAM = "?q=";
    public static final String LASTMOD = "lastmod";
    public static final String FREQUENCY = "changeFrequency";
    private static final long serialVersionUID = 7568964383630165611L;
    private static final Logger logger = LoggerFactory.getLogger(FaqSiteMapServlet.class);
    private static final FastDateFormat DATE_FORMAT = FastDateFormat.getInstance("yyyy-MM-dd");
    private static final String NS = "http://www.sitemaps.org/schemas/sitemap/0.9";
    private static final String XHTML_NS = "http://www.w3.org/1999/xhtml";
    private static final String CHANGE_FREQUENCY = "changefreq";
    static final String PRIORITY = "priority";
    public static final String FAQ_FOLDER_PATH = "faqFolderPath";
    public static final String FAQ_PAGE_PATH = "faqPagePath";
    @Reference
    private transient Externalizer externalizer;

    private boolean includeLastModified;

    private boolean extensionlessUrls;

    private boolean removeTrailingSlash;

    private String characterEncoding;

    @Activate
    private void activate(FaqSiteMapServletConfiguration config) {
        this.includeLastModified = config.includeLastmod();
        this.extensionlessUrls = config.extensionlessUrls();
        this.removeTrailingSlash = config.removeSlash();
        this.characterEncoding = config.characterEncoding();
    }

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        response.setContentType(request.getResponseContentType());

        if (StringUtils.isNotEmpty(this.characterEncoding)) {
            response.setCharacterEncoding(characterEncoding);
        }

        ResourceResolver resourceResolver = request.getResourceResolver();
        Page page = Optional.ofNullable(resourceResolver.adaptTo(PageManager.class)).map(pm -> pm.getContainingPage(request.getResource())).orElse(null);
        XMLOutputFactory outputFactory = XMLOutputFactory.newFactory();

        try {

            if (page != null) {
                Resource resource = request.getResourceResolver().getResource(page.getProperties().get(FAQ_FOLDER_PATH).toString());
                XMLStreamWriter stream = outputFactory.createXMLStreamWriter(response.getWriter());
                stream.writeStartDocument("1.0");
                stream.writeStartElement("", "urlset", NS);
                stream.writeNamespace("", NS);

                // Adding namespace for xhtml prefix
                stream.writeNamespace("xhtml", XHTML_NS);
                writeAssets(stream, resource, resourceResolver, page);
                stream.writeEndDocument();
            }
        } catch (XMLStreamException e) {
            logger.error("FaqSiteMapServlet :: XMLStreamException found in doGet() method::{}", e.getMessage());
        }
    }

    private void writeAsset(Asset asset, XMLStreamWriter stream, ResourceResolver resolver, Page page) throws XMLStreamException {
        stream.writeStartElement(NS, "url");
        String loc;

        loc = PageUtil.getUrl(asset.getName(), resolver, externalizer, extensionlessUrls, removeTrailingSlash);
        loc = PageUtil.getUrl(page.getProperties().get(FAQ_PAGE_PATH).toString(), resolver) + QUERY_PARAM + loc;

        writeElement(stream, "loc", loc);

        if (includeLastModified) {
            long lastModified = asset.getLastModified();
            if (lastModified > 0) {
                writeElement(stream, LASTMOD, DATE_FORMAT.format(lastModified));
            }
        }

        writeElement(stream, CHANGE_FREQUENCY, page.getProperties().get(FREQUENCY).toString());
        writeElement(stream, PRIORITY, page.getProperties().get(PRIORITY).toString());
        stream.writeEndElement();
    }

    void writeAssets(final XMLStreamWriter stream, final Resource assetFolder, final ResourceResolver resolver, Page page) throws XMLStreamException {
        for (Iterator<Resource> children = assetFolder.listChildren(); children.hasNext(); ) {
            Resource assetFolderChild = children.next();
            if (assetFolderChild.isResourceType(DamConstants.NT_DAM_ASSET)) {
                Asset asset = assetFolderChild.adaptTo(Asset.class);
                writeAsset(asset, stream, resolver, page);
            } else {
                writeAssets(stream, assetFolderChild, resolver, page);
            }
        }
    }

    /**
     * This method writes the element and its value in xml using XMLStreamWriter
     *
     * @param stream      - XMLStreamWriter
     * @param elementName - Name of the element which needs to be written by stream
     * @param text        - Value of the element which needs to be written
     * @throws XMLStreamException - XMLStream Exception
     */
    public void writeElement(final XMLStreamWriter stream, final String elementName, final String text) throws XMLStreamException {
        stream.writeStartElement(NS, elementName);
        stream.writeCharacters(text);
        stream.writeEndElement();
    }
}
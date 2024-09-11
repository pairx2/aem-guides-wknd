package com.abbott.aem.cloud.platform.core.wcm.impl;

import com.day.cq.commons.Externalizer;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.DamConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageFilter;
import com.day.cq.wcm.api.PageManager;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.PathNotFoundException;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Workspace;
import javax.jcr.query.Query;
import javax.jcr.query.QueryManager;
import javax.jcr.query.QueryResult;
import java.io.PrintWriter;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Locale;
import java.util.Map;

import static org.mockito.Mockito.any;
import static org.mockito.Mockito.anyBoolean;
import static org.mockito.Mockito.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
@MockitoSettings(strictness = Strictness.LENIENT)
class SiteMapServletTest {

    @InjectMocks
    private SiteMapServlet siteMapServlet;

    private final AemContext context = new AemContext();

    @Mock
    private MockSlingHttpServletRequest req;

    @Mock
    private MockSlingHttpServletResponse res;

    @Mock
    private Externalizer externalizer;
    @Mock
    private Resource resource;
    @Mock
    private ResourceResolver resourceResolver;
    @Mock
    private PageManager pageManager;
    @Mock
    private Page page;
    @Mock
    private Node node;
    @Mock
    private ValueMap valueMap;
    @Mock
    private Iterator<Page> pageIterator;

    @BeforeEach
    void onBefore() {
        Map<String, Object> keyValueConfig = new HashMap<>();
        keyValueConfig.put("include.lastmod", true);
        keyValueConfig.put("url.rewrites", new String[] {"sitemap"});

        context.registerService(Externalizer.class, externalizer);
        context.registerInjectActivateService(siteMapServlet, keyValueConfig);

        when(req.getResponseContentType()).thenReturn("application/json");
        when(req.getResourceResolver()).thenReturn(resourceResolver);
        when(req.getRequestURL()).thenReturn(new StringBuffer("https://abbottprod.service-now.com/content/en.sitemap.xml"));
        //when(req.getRequestURI()).thenReturn("/content/en.sitemap.xml");
        when(req.getResource()).thenReturn(resource);
        when(res.getWriter()).thenReturn(mock(PrintWriter.class));

        when(resourceResolver.adaptTo(PageManager.class)).thenReturn(pageManager);
        when(pageManager.getContainingPage(resource)).thenReturn(page);

        when(resource.adaptTo(Page.class)).thenReturn(page);
        when(resource.adaptTo(Node.class)).thenReturn(node);
        when(page.getProperties()).thenReturn(valueMap);
        when(page.getContentResource()).thenReturn(resource);

        //mock for --iterates through all pages on AEM
        when(page.listChildren(any(PageFilter.class), anyBoolean())).thenReturn(pageIterator);
        when(pageIterator.hasNext()).thenReturn(false);

    }

    @Test
    void testDoGet_writeForCurrentPage_inheritance() throws Exception {
        //mock for write method
        Property property = mock(Property.class);
        when(valueMap.get(anyString(), anyBoolean())).thenReturn(false);

        when(page.getPath()).thenReturn("/content/en");
        when(req.getRequestURI()).thenReturn("/content/en.sitemap.xml");

        when(page.getContentResource()).thenReturn(resource);
        when(resource.adaptTo(Node.class)).thenReturn(node);
        when(node.hasProperty("hrefLangAlternateUrl")).thenReturn(true);
        when(node.getProperty("hrefLangAlternateUrl")).thenReturn(property);

        when(property.getString()).thenReturn("sitemap");
        when(resourceResolver.getResource("sitemap.xml")).thenReturn(resource);
        when(resource.getValueMap()).thenReturn(valueMap);

        //mock for writeElement method
        when(resourceResolver.getResource("/content/en")).thenReturn(resource);
        when(valueMap.get("rootSitePath", String.class)).thenReturn("/content/en");
        when(valueMap.get("changeFrequency", String.class)).thenReturn("5");
        when(page.getLastModified()).thenReturn(Calendar.getInstance());

        when(resource.getResourceResolver()).thenReturn(resourceResolver);
        when(resource.getPath()).thenReturn("/");

        //mock for getHreflangRootPaths
        Session session = mock(Session.class);
        Workspace workspace = mock(Workspace.class);
        QueryManager queryManager = mock(QueryManager.class);
        Query query = mock(Query.class);
        QueryResult queryResult = mock(QueryResult.class);
        NodeIterator nodeIterator = mock(NodeIterator.class);

        when(valueMap.get("rootSitePath", String.class)).thenReturn("/content/en");
        when(resourceResolver.adaptTo(Session.class)).thenReturn(session);
        when(session.getWorkspace()).thenReturn(workspace);
        when(workspace.getQueryManager()).thenReturn(queryManager);
        when(queryManager.createQuery(anyString(), anyString())).thenReturn(query);
        when(query.execute()).thenReturn(queryResult);
        when(query.execute()).thenReturn(queryResult);
        when(queryResult.getNodes()).thenReturn(nodeIterator);
        when(nodeIterator.hasNext()).thenReturn(true, false);
        when(nodeIterator.nextNode()).thenReturn(node);
        when(node.getPath()).thenReturn("/content/en/jcr:content/text");

        //mock for generateHreflangPagePaths
        Locale locale = mock(Locale.class);
        Property localeProp = mock(Property.class);
        when(pageManager.getPage("/content/en/")).thenReturn(page);
        when(page.isValid()).thenReturn(true);
        when(page.getLanguage()).thenReturn(locale);
        when(locale.getCountry()).thenReturn("US");
        when(locale.getLanguage()).thenReturn("en");
        when(node.hasProperty("hrefLangLocale")).thenReturn(true);
        when(node.getProperty("hrefLangLocale")).thenReturn(localeProp);
        when(localeProp.getString()).thenReturn("us");

        siteMapServlet.doGet(req, res);
        verify(locale, times(2)).getCountry();
    }

    @Test
    void testDoGet_writeForCurrentPage_inheritance_repositoryException() throws Exception {
        //mock for write method
        Property property = mock(Property.class);
        when(valueMap.get(anyString(), anyBoolean())).thenReturn(false);

        when(page.getPath()).thenReturn("/content/en");
        when(req.getRequestURI()).thenReturn("/content/en.sitemap.xml");

        when(page.getContentResource()).thenReturn(resource);
        when(resource.adaptTo(Node.class)).thenReturn(node);
        when(node.hasProperty("hrefLangAlternateUrl")).thenReturn(true);
        when(node.getProperty("hrefLangAlternateUrl")).thenReturn(property);

        when(property.getString()).thenReturn("sitemap");
        when(resourceResolver.getResource("sitemap.xml")).thenReturn(resource);
        when(resource.getValueMap()).thenReturn(valueMap);

        //mock for writeElement method
        when(resourceResolver.getResource("/content/en")).thenReturn(resource);
        when(valueMap.get("rootSitePath", String.class)).thenReturn("/content/en");
        when(valueMap.get("changeFrequency", String.class)).thenReturn("5");
        when(page.getLastModified()).thenReturn(Calendar.getInstance());

        when(resource.getResourceResolver()).thenReturn(resourceResolver);
        when(resource.getPath()).thenReturn("/");

        //mock for getHreflangRootPaths
        Session session = mock(Session.class);
        Workspace workspace = mock(Workspace.class);
        QueryManager queryManager = mock(QueryManager.class);

        when(valueMap.get("rootSitePath", String.class)).thenReturn("/content/en");
        when(resourceResolver.adaptTo(Session.class)).thenReturn(session);
        when(session.getWorkspace()).thenReturn(workspace);
        when(workspace.getQueryManager()).thenReturn(queryManager);
        when(queryManager.createQuery(anyString(), anyString())).thenThrow(new RepositoryException("RE"));

        siteMapServlet.doGet(req, res);
        verify(queryManager, times(1)).createQuery(anyString(), anyString());
    }

    @Test
    void testDoGet_writeForCurrentPage_noInheritance() throws Exception {
        context.registerInjectActivateService(siteMapServlet, "include.inherit", false);

        //mock for write method
        Property property = mock(Property.class);
        when(valueMap.get(anyString(), anyBoolean())).thenReturn(false);

        when(page.getPath()).thenReturn("/content/en");
        when(req.getRequestURI()).thenReturn("/content/en.sitemap.xml");

        when(page.getContentResource()).thenReturn(resource);

        when(resource.adaptTo(Node.class)).thenReturn(node);
        when(node.hasProperty("hrefLangAlternateUrl")).thenReturn(true);
        when(node.getProperty("hrefLangAlternateUrl")).thenReturn(property);
        when(property.getString()).thenReturn("sitemap");
        when(resourceResolver.getResource("sitemap.xml")).thenReturn(resource);
        when(resource.getValueMap()).thenReturn(valueMap);

        //mock for writeElement method
        when(valueMap.get("rootSitePath", String.class)).thenReturn("");
        when(valueMap.get("changeFrequency", String.class)).thenReturn("5");
        when(page.getLastModified()).thenReturn(Calendar.getInstance());

        when(resource.getResourceResolver()).thenReturn(resourceResolver);
        when(resource.getPath()).thenReturn("/");

        siteMapServlet.doGet(req, res);
        verify(property, times(1)).getString();
    }

    @Test
    void testDoGet_writeForCurrentPage_pageHidden() throws Exception {
        when(valueMap.get(anyString(), anyBoolean())).thenReturn(true);

        siteMapServlet.doGet(req, res);
        verify(valueMap, times(2)).get(anyString(), anyBoolean());
    }

    @Test
    void testDoGet_writeForCurrentPage_illegalArgumentException() throws Exception {
        context.registerInjectActivateService(siteMapServlet, "exclude.templates", new String[]{"/apps/cloudplatform/generic"}, "include.inherit", false);
        when(valueMap.get("hideInSitemap", Boolean.FALSE)).thenReturn(false);
        when(valueMap.get("cq:template", "")).thenReturn("/apps/cloudplatform/generic");
        when(valueMap.get("hideSubPages", Boolean.class)).thenReturn(true);

        when(page.getPath()).thenReturn("//");
        when(req.getRequestURI()).thenReturn("/content/en.sitemap.xml");

        siteMapServlet.doGet(req, res);
        verify(req, times(3)).getRequestURI();
    }

    @Test
    void testDoGet_writeForAllPages() throws Exception {
        context.registerInjectActivateService(siteMapServlet, "exclude.templates", null);
        when(valueMap.get(anyString(), anyBoolean())).thenReturn(true);

        //mock for iterate all page
        when(pageIterator.hasNext()).thenReturn(true, false);
        when(pageIterator.next()).thenReturn(page);
        when(page.getPath()).thenReturn("/content/en");
        when(resource.adaptTo(Node.class)).thenReturn(node);

        siteMapServlet.doGet(req, res);
        verify(pageIterator, times(2)).hasNext();
    }

    @Test
    void testDoGet_iterateDAMNodes() throws Exception {
        when(valueMap.get(anyString(), anyBoolean())).thenReturn(true);

        Property property = mock(Property.class);
        when(node.hasNode("assetsPath")).thenReturn(true);
        when(node.getNode("assetsPath")).thenReturn(node);

        when(node.hasProperty("priority")).thenReturn(true);
        when(node.getProperty("priority")).thenReturn(property);

        when(node.hasProperty("changeFrequency")).thenReturn(true);
        when(node.getProperty("changeFrequency")).thenReturn(property);

        when(property.getString()).thenReturn("assets");

        NodeIterator nodeIterator = mock(NodeIterator.class);
        when(node.getNodes()).thenReturn(nodeIterator);
        when(nodeIterator.hasNext()).thenReturn(true, false);
        when(nodeIterator.nextNode()).thenReturn(node);

        Property assetProperty = mock(Property.class);
        when(node.hasProperty("assetSectionPath")).thenReturn(true);
        when(node.getProperty("assetSectionPath")).thenReturn(assetProperty);
        when(assetProperty.getString()).thenReturn("/content/dam/assets");

        //mock for writeAssets
        when(resourceResolver.getResource("/content/dam/assets")).thenReturn(resource);
        Iterator<Resource> children = mock(Iterator.class);
        when(resource.listChildren()).thenReturn(children);
        when(children.hasNext()).thenReturn(true, true, false);
        when(children.next()).thenReturn(resource);
        when(resource.isResourceType(DamConstants.NT_DAM_ASSET)).thenReturn(true, false);

        Asset asset = mock(Asset.class);
        when(resource.isResourceType(DamConstants.NT_DAM_ASSET)).thenReturn(true, false);
        when(resource.adaptTo(Asset.class)).thenReturn(asset);
        when(asset.getPath()).thenReturn("/content/dam/assets/cloud");
        when(asset.getLastModified()).thenReturn(1693195450496L);

        siteMapServlet.doGet(req, res);
        verify(asset, times(1)).getLastModified();
    }

    @Test
    void testDoGet_damNodes_propRepositoryException() throws Exception {
        when(valueMap.get(anyString(), anyBoolean())).thenReturn(true);

        when(node.hasNode("assetsPath")).thenReturn(true);
        when(node.getNode("assetsPath")).thenReturn(node);

        when(node.hasProperty("changeFrequency")).thenThrow(new RepositoryException("RepositoryException"));

        siteMapServlet.doGet(req, res);
        verify(node, times(1)).hasProperty("changeFrequency");
    }

    @Test
    void testDoGet_damNodes_nodeRepositoryException() throws Exception {
        when(valueMap.get(anyString(), anyBoolean())).thenReturn(true);

        when(node.hasNode("assetsPath")).thenThrow(new RepositoryException("RepositoryException"));

        siteMapServlet.doGet(req, res);
        verify(node, times(1)).hasNode("assetsPath");
    }

    @Test
    void testDoGet_sitemapHrefPropException() throws Exception {
        when(valueMap.get(anyString(), anyBoolean())).thenReturn(true);

        when(node.hasNode("hrefLangUrls")).thenReturn(true);
        when(node.getNode("hrefLangUrls")).thenReturn(node);

        when(node.getNodes()).thenThrow(new RepositoryException("RepositoryException"));

        siteMapServlet.doGet(req, res);
        verify(node, times(1)).getNodes();
    }

    @Test
    void testDoGet_sitemapHrefProp() throws Exception {
        Property sitemapHrefProp = mock(Property.class);
        Property countryCodeProp = mock(Property.class);

        when(valueMap.get(anyString(), anyBoolean())).thenReturn(true);

        when(node.hasNode("hrefLangUrls")).thenReturn(true);
        when(node.getNode("hrefLangUrls")).thenReturn(node);

        NodeIterator nodeIterator = mock(NodeIterator.class);
        when(node.getNodes()).thenReturn(nodeIterator);
        when(nodeIterator.hasNext()).thenReturn(true, false);
        when(nodeIterator.nextNode()).thenReturn(node);

        when(node.hasProperty("sitemapHreflangUrl")).thenReturn(true);
        when(node.getProperty("sitemapHreflangUrl")).thenReturn(sitemapHrefProp);
        when(node.hasProperty("countryCode")).thenReturn(true);
        when(node.getProperty("countryCode")).thenReturn(countryCodeProp);

        when(sitemapHrefProp.getString()).thenReturn("sitemapHreflangUrl");
        when(countryCodeProp.getString()).thenReturn("countryCode");

        when(page.getProperties()).thenReturn(valueMap);
        when(valueMap.get("siteMapHref", String.class)).thenReturn("true");

        siteMapServlet.doGet(req, res);
        verify(sitemapHrefProp, times(1)).getString();
    }

    @Test
    void testDoGet_repositoryException() throws Exception {
        when(valueMap.get(anyString(), anyBoolean())).thenReturn(true);
        when(node.hasNode("hrefLangUrls")).thenThrow(new RepositoryException("RE"));

        siteMapServlet.doGet(req, res);
        verify(node, times(1)).hasNode("hrefLangUrls");
    }

    @Test
    void testDoGet_pathNotFoundException() throws Exception {
        when(valueMap.get(anyString(), anyBoolean())).thenReturn(true);
        when(node.hasNode("hrefLangUrls")).thenThrow(new PathNotFoundException("PNE"));

        siteMapServlet.doGet(req, res);
        verify(node, times(1)).hasNode("hrefLangUrls");
    }
}
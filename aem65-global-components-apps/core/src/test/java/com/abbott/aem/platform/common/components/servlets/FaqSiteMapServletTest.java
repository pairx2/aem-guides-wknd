package com.abbott.aem.platform.common.components.servlets;

import com.day.cq.commons.Externalizer;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.DamConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageFilter;
import com.day.cq.wcm.api.PageManager;

import javax.jcr.Node;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import lombok.SneakyThrows;
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

import javax.servlet.ServletException;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;


import static com.abbott.aem.platform.common.components.servlets.FaqSiteMapServlet.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
@MockitoSettings(strictness = Strictness.LENIENT)
class FaqSiteMapServletTest {

    @InjectMocks
    private FaqSiteMapServlet faqSiteMapServlet;

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
    private Resource assetFolder;
    @Mock
    private Page page;
    @Mock
    private Node node;
    @Mock
    private XMLStreamWriter stream;
    @Mock
    private Asset asset;
    @Mock
    private ValueMap valueMap;
    @Mock
    private Iterator<Page> pageIterator;

    @BeforeEach
    void setUp() throws Exception {
        Map<String, Object> config = new HashMap<>();
        config.put("includeLastmod", true);
        config.put("extensionlessUrls", true);
        config.put("removeSlash", true);
        config.put("characterEncoding", "UTF-8");

        context.registerService(Externalizer.class, externalizer);
        context.registerInjectActivateService(faqSiteMapServlet, config);
        when(req.getResponseContentType()).thenReturn("application/xml");
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
    void testDoGet_pageIsNull() throws ServletException, IOException {
        when(pageManager.getContainingPage(any(Resource.class))).thenReturn(null);

        faqSiteMapServlet.doGet(req, res);

        verify(res).setContentType("application/xml");
        verify(res).setCharacterEncoding("UTF-8");
    }

    @Test
    void testWriteAssets_noAssets() throws XMLStreamException {
        when(resource.listChildren()).thenReturn(mock(Iterator.class));
        when(resource.isResourceType(DamConstants.NT_DAM_ASSET)).thenReturn(false);

        faqSiteMapServlet.writeAssets(stream, resource, resourceResolver, page);

        verify(stream, never()).writeStartElement(anyString(), anyString());
        verify(stream, never()).writeCharacters(anyString());
        verify(stream, never()).writeEndElement();
    }

    @Test
    void testWriteElement() throws XMLStreamException {
        faqSiteMapServlet.writeElement(stream, "testElement", "testValue");

        verify(stream).writeStartElement(anyString(), anyString());
        verify(stream).writeCharacters("testValue");
        verify(stream).writeEndElement();
    }

    @SneakyThrows
    @Test
    void testWriteAssets_withAssets() {
        Resource childResource = mock(Resource.class);
        Iterator<Resource> children = mock(Iterator.class);
        when(asset.getName()).thenReturn("testAsset");
        when(childResource.isResourceType(DamConstants.NT_DAM_ASSET)).thenReturn(true);
        when(childResource.adaptTo(Asset.class)).thenReturn(asset);
        when(assetFolder.listChildren()).thenReturn(children);
        when(children.hasNext()).thenReturn(true, false);
        when(children.next()).thenReturn(childResource);
        when(resourceResolver.adaptTo(PageManager.class)).thenReturn(pageManager);
        when(pageManager.getContainingPage(any(Resource.class))).thenReturn(page);
        when(page.getProperties()).thenReturn(valueMap);
        when(valueMap.get(FAQ_PAGE_PATH)).thenReturn("/content/faq");
        when(valueMap.get(FREQUENCY)).thenReturn("daily");
        when(valueMap.get(PRIORITY)).thenReturn("0.8");


        faqSiteMapServlet.writeAssets(stream, assetFolder, resourceResolver, page);

        verify(stream, atLeastOnce()).writeStartElement(anyString(), eq("url"));
        verify(stream, atLeastOnce()).writeCharacters(anyString());
        verify(stream, atLeastOnce()).writeEndElement();
    }



}
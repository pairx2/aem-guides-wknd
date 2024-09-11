package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import com.adobe.cq.commerce.core.components.models.product.Product;
import com.adobe.cq.commerce.core.components.models.retriever.AbstractProductRetriever;
import com.adobe.cq.commerce.core.components.services.urls.UrlProvider;
import com.adobe.cq.commerce.magento.graphql.ProductInterface;
import com.adobe.cq.sightly.SightlyWCMMode;
import com.day.cq.commons.Externalizer;
import com.day.cq.wcm.api.Page;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.lenient;

@ExtendWith(MockitoExtension.class)
class ProductDetailImplTest {

    @InjectMocks
    private ProductDetailImpl productDetail;

    @Mock
    private AbstractProductRetriever productRetriever;

    @Mock
    private ProductInterface productInterface;

    @Mock
    private ResourceResolver resourceResolver;

    @Mock
    private SlingHttpServletRequest request;

    @Mock
    private Externalizer externalizer;

    @Mock
    private SightlyWCMMode wcmMode;

    @Mock
    private Resource resource;

    @Mock
    private Product product;

    @Mock
    private Page currentPage;

    @Mock
    private ValueMap properties;

    @Mock
    private UrlProvider urlProvider;

    @BeforeEach
    public void setUp() throws Exception {
        lenient().when(request.getAttribute("productRetriever")).thenReturn(productRetriever);
        lenient().when(product.getProductRetriever()).thenReturn(productRetriever);
        lenient().when(currentPage.getProperties()).thenReturn(properties);
        lenient().when(properties.get("selection")).thenReturn("TestProduct");
        lenient().when(urlProvider.getProductIdentifier(request)).thenReturn("TestProduct");
        lenient().when(resource.getResourceResolver()).thenReturn(resourceResolver);
        lenient().when(request.getRequestURI()).thenReturn("uri");
        lenient().when(productRetriever.fetchProduct()).thenReturn(productInterface);
    }

    @Test
    void testInitModel_WCMModeDisabled() {
        lenient().when(wcmMode.isDisabled()).thenReturn(true);
        productDetail.initModel();
        assertNotNull(productDetail);
    }

    @Test
    void testInitModel_WCMModeNotDisabled() {
        lenient().when(wcmMode.isDisabled()).thenReturn(false);
        productDetail.initModel();
        assertNotNull(productDetail);
    }

    @Test
    void testGetMetaDescription() {
        lenient().when(productRetriever.fetchProduct().getMetaDescription()).thenReturn("Meta Description");
        String expected = "Meta Description";
        productDetail.initModel();
        String actual = productDetail.getMetaDescription();
        assertEquals(expected, actual);
    }

    @Test
    void testGetMetaKeywords() {
        lenient().when(productRetriever.fetchProduct().getMetaKeyword()).thenReturn("Meta Keyword");
        String expected = "Meta Keyword";
        productDetail.initModel();
        String actual = productDetail.getMetaKeywords();
        assertEquals(expected, actual);
    }

    @Test
    void testGetMetaTitle() {
        lenient().when(productRetriever.fetchProduct().getMetaTitle()).thenReturn("Meta Title");
        String expected = "Meta Title";
        productDetail.initModel();
        String actual = productDetail.getMetaTitle();
        assertEquals(expected, actual);
    }

    @Test
    void testGetCanonicalUrl() {
        lenient().when(wcmMode.isDisabled()).thenReturn(false);
        lenient().when(externalizer.authorLink(resourceResolver, "uri")).thenReturn("/canonical/url");
        String expected = "/canonical/url";
        productDetail.initModel();
        String actual = productDetail.getCanonicalUrl();
        assertEquals(expected, actual);
    }
}

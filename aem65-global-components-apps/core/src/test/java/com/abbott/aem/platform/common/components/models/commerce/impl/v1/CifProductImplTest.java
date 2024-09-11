package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import com.adobe.cq.commerce.core.components.models.product.Product;
import com.adobe.cq.commerce.core.components.models.retriever.AbstractProductRetriever;
import com.adobe.cq.commerce.core.components.services.urls.UrlProvider;
import com.day.cq.wcm.api.Page;
import org.apache.sling.api.SlingHttpServletRequest;
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
class CifProductImplTest {

    @InjectMocks
    private CifProductImpl cifProduct;

    @Mock
    private AbstractProductRetriever productRetriever;

    @Mock
    private SlingHttpServletRequest request;

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
        lenient().when(properties.get("productTitle")).thenReturn("Product Title Example");
        lenient().when(urlProvider.getProductIdentifier(request)).thenReturn("TestProduct");
    }

    @Test
    void testInitModel() {
        cifProduct.initModel();
        assertNotNull(cifProduct);
    }

    @Test
    void testGetCtaOverride() {
        final String expected = "addToCart";
        cifProduct.initModel();
        String actual = cifProduct.getCtaOverride();
        assertEquals(expected, actual);
    }
}


package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import com.adobe.cq.commerce.core.components.models.product.Product;
import com.adobe.cq.commerce.core.components.models.retriever.AbstractProductRetriever;
import com.adobe.cq.commerce.core.components.services.urls.UrlProvider;
import com.adobe.cq.commerce.magento.graphql.ProductInterface;
import com.day.cq.wcm.api.Page;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.lenient;

@ExtendWith(MockitoExtension.class)
class ProductDetailsImplTest {

    @InjectMocks
    private ProductDetailsImpl productDetails;

    @Mock
    private AbstractProductRetriever productRetriever;

    @Mock
    private SlingHttpServletRequest request;

    @Mock
    private ProductInterface productInterface;

    @Mock
    private Product product;

    @Mock
    private Page currentPage;

    @Mock
    private ValueMap properties;

    @Mock
    private UrlProvider urlProvider;

    @BeforeEach
    void setUp() throws Exception {
        lenient().when(request.getAttribute("productRetriever")).thenReturn(productRetriever);
        lenient().when(product.getProductRetriever()).thenReturn(productRetriever);
        lenient().when(currentPage.getProperties()).thenReturn(properties);
        lenient().when(properties.get("selection")).thenReturn("TestProduct");
        lenient().when(productRetriever.fetchProduct()).thenReturn(productInterface);
        lenient().when(productRetriever.fetchProduct().getAsString("badge_text_value")).thenReturn("Product Badge");
        lenient().when(productRetriever.fetchProduct().getAsString("includes")).thenReturn("option1, option2, option3");
        lenient().when(urlProvider.getProductIdentifier(request)).thenReturn("TestProduct");
    }

    @Test
    void testInitModel(){
        productDetails.initModel();
        assertNotNull(productDetails);
    }
    @Test
    void testGetDisclaimer() {
        String expected="Disclaimer Test";
        lenient().when(properties.get(ProductDetailsImpl.PRODUCT_DISCLAIMER,String.class)).thenReturn("Disclaimer Test");
        productDetails.initModel();
        assertEquals(expected, productDetails.getDisclaimer());
    }

    @Test
    void testGetMaxSaleQuantity() {
        lenient().when(productRetriever.fetchProduct().get(ProductDetailsImpl.DEFAULT_QUANTITIES)).thenReturn(new Gson().fromJson("{\"max_sale_qty\":\"10\"}", JsonElement.class));
        assertEquals("10", productDetails.getMaxSaleQuantity());
    }
}
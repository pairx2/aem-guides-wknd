package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import com.abbott.aem.platform.common.components.models.commerce.utils.CommerceConstants;
import com.adobe.cq.commerce.core.components.models.product.Product;
import com.adobe.cq.commerce.core.components.models.retriever.AbstractProductRetriever;
import com.adobe.cq.commerce.core.components.services.urls.UrlProvider;
import com.adobe.cq.commerce.magento.graphql.ComplexTextValue;
import com.adobe.cq.commerce.magento.graphql.ProductInterface;
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
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CifAuthoredProductImplTest {

    @InjectMocks
    private CifAuthoredProductImpl cifAuthoredProduct;

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

    @Mock
    private ComplexTextValue description;

    @BeforeEach
    public void setUp() throws Exception {
        lenient().when(request.getAttribute("productRetriever")).thenReturn(productRetriever);
        lenient().when(product.getProductRetriever()).thenReturn(productRetriever);
        lenient().when(productRetriever.fetchProduct()).thenReturn(productInterface);
        lenient().when(productRetriever.fetchProduct().getName()).thenReturn("Product Name");
        lenient().when(productRetriever.fetchProduct().getDescription()).thenReturn(description);
        lenient().when(productRetriever.fetchProduct().getDescription().getHtml()).thenReturn("Product Long Description");
        lenient().when(currentPage.getProperties()).thenReturn(properties);
        lenient().when(properties.get("selection")).thenReturn("TestProduct");
        lenient().when(urlProvider.getProductIdentifier(request)).thenReturn("TestProduct");
    }

    @Test
    void testInitModel() {
        cifAuthoredProduct.initModel();
        assertNotNull(cifAuthoredProduct);
    }

    @Test
    void testGetName_Authored() {
        lenient().when(properties.get("productTitle")).thenReturn("Product Authored Name");
        final String expected = "Product Authored Name";
        cifAuthoredProduct.initModel();
        String actual = cifAuthoredProduct.getName();
        assertEquals(expected, actual);
    }

    @Test
    void testGetName_NotAuthored() {
        lenient().when(properties.get("productTitle")).thenReturn(null);
        final String expected = "Product Name";
        cifAuthoredProduct.initModel();
        String actual = cifAuthoredProduct.getName();
        assertEquals(expected, actual);
    }

    @Test
    void testGetDescription_Authored() {
        lenient().when(properties.get("productLongDescription")).thenReturn("Product Authored Description");
        final String expected = "Product Authored Description";
        cifAuthoredProduct.initModel();
        String actual = cifAuthoredProduct.getDescription();
        assertEquals(expected, actual);
    }

    @Test
    void testGetDescription_NotAuthored() {
        lenient().when(properties.get("productLongDescription")).thenReturn(null);
        final String expected = "Product Long Description";
        cifAuthoredProduct.initModel();
        String actual = cifAuthoredProduct.getDescription();
        assertEquals(expected, actual);
    }
    @Test
    void testGetDescription_Exception() {
        lenient().when(properties.get(CommerceConstants.PRODUCT_DESCRIPTION)).thenReturn(null);
        when(productRetriever.fetchProduct()).thenThrow(new RuntimeException("Test Exception"));
        final String expected = "";
        cifAuthoredProduct.initModel();
        String actual = cifAuthoredProduct.getDescription();
        assertEquals(expected, actual);
    }


    @Test
    void testGetName_Exception() {
        lenient().when(properties.get(CommerceConstants.PRODUCT_NAME)).thenReturn(null);
        when(productRetriever.fetchProduct()).thenThrow(new RuntimeException("Test Exception"));
        final String expected = "";
        cifAuthoredProduct.initModel();
        String actual = cifAuthoredProduct.getName();
        assertEquals(expected, actual);
    }
}
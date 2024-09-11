package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import com.adobe.cq.commerce.core.components.models.product.Product;
import com.adobe.cq.commerce.core.components.models.retriever.AbstractProductRetriever;
import com.adobe.cq.commerce.core.components.services.urls.UrlProvider;
import com.adobe.cq.commerce.magento.graphql.ProductInterface;
import com.day.cq.wcm.api.Page;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductTileImplTest {

    @InjectMocks
    private ProductTileImpl productTile;

    @Mock
    private AbstractProductRetriever productRetriever;

    @Mock
    private ResourceResolver resourceResolver;

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
    public void setUp() throws Exception {
        lenient().when(request.getAttribute("productRetriever")).thenReturn(productRetriever);
        lenient().when(product.getProductRetriever()).thenReturn(productRetriever);
        lenient().when(currentPage.getProperties()).thenReturn(properties);
        lenient().when(request.getResourceResolver()).thenReturn(resourceResolver);
        lenient().when(properties.get("selection", String.class)).thenReturn("TestProduct");
        lenient().when(productRetriever.fetchProduct()).thenReturn(productInterface);
        lenient().when(productRetriever.fetchProduct().getAsString("badge_text_value")).thenReturn("Product Badge");
        lenient().when(productRetriever.fetchProduct().getAsString("includes")).thenReturn("option1, option2, option3");
        lenient().when(urlProvider.getProductIdentifier(request)).thenReturn("TestProduct");
    }

    @Test
    void testInitModel() {
        productTile.initModel();
        assertNotNull(productTile);
    }

    @Test
    void testGetBadge_Authored() {
        lenient().when(properties.get("productBadge")).thenReturn("Authored Product Badge");
        String expected = "Authored Product Badge";
        productTile.initModel();
        String actual = productTile.getBadge();
        assertEquals(expected, actual);
    }

    @Test
    void testGetBadge_NotAuthored() {
        lenient().when(properties.get("productBadge")).thenReturn(null);
        String expected = "Product Badge";
        productTile.initModel();
        String actual = productTile.getBadge();
        assertEquals(expected, actual);
    }

    @Test
    void testGetIncludes() {
        List<String> expected = Arrays.asList("option1", "option2", "option3");
        productTile.initModel();
        List<String> actual = productTile.getIncludes();
        assertEquals(expected, actual);
    }

    @Test
    void testGetCtaOverride_Default() {
        lenient().when(properties.get("ctaOverride")).thenReturn(null);
        String expected = "addToCart";
        productTile.initModel();
        String actual = productTile.getCtaOverride();
        assertEquals(expected, actual);
    }

    @Test
    void testGetCtaOverride_Authored() {
        lenient().when(properties.get("ctaOverride")).thenReturn("CTA Authored");
        String expected = "CTA Authored";
        productTile.initModel();
        String actual = productTile.getCtaOverride();
        assertEquals(expected, actual);
    }

    @Test
    void testGetPdpLinkUrl_Default() {
        lenient().when(properties.get("pdpLinkUrl")).thenReturn(null);
        String expected = "";
        productTile.initModel();
        String actual = productTile.getPdpLinkUrl();
        assertEquals(expected, actual);
    }

    @Test
    void testGetPdpLinkUrl_Authored() {
        lenient().when(properties.get("pdpLinkUrl")).thenReturn("/pdp/link/url");
        lenient().when(request.getResourceResolver()).thenReturn(resourceResolver);
        String expected = "/pdp/link/url";
        productTile.initModel();
        String actual = productTile.getPdpLinkUrl();
        assertEquals(expected, actual);
    }

    @Test
    void testGetPriceToShow_Default() {
        lenient().when(properties.get("priceToShow")).thenReturn(null);
        String expected = "normal";
        productTile.initModel();
        String actual = productTile.getPriceToShow();
        assertEquals(expected, actual);
    }

    @Test
    void testGetPriceToShow_Authored() {
        lenient().when(properties.get("priceToShow")).thenReturn("Authored Price");
        String expected = "Authored Price";
        productTile.initModel();
        String actual = productTile.getPriceToShow();
        assertEquals(expected, actual);
    }

    @Test
    void testIsShowFreeDeliveryLabel_Default() {
        lenient().when(properties.get("showFreeDeliveryLabel")).thenReturn(null);
        String expected = null;
        productTile.initModel();
        String actual = productTile.isShowFreeDeliveryLabel();
        assertEquals(expected, actual);
    }

    @Test
    void testIsShowFreeDeliveryLabel_Authored() {
        lenient().when(properties.get("showFreeDeliveryLabel", String.class)).thenReturn("true");
        String expected = "true";
        productTile.initModel();
        String actual = productTile.isShowFreeDeliveryLabel();
        assertEquals(expected, actual);
    }

    @Test
    void testIsViewProductAATracking_Default() {
        lenient().when(properties.get("viewProductAATracking")).thenReturn(null);
        String expected = null;
        productTile.initModel();
        String actual = productTile.isViewProductAATracking();
        assertEquals(expected, actual);
    }

    @Test
    void testIsAddToCartAATracking_Default() {
        lenient().when(properties.get("addToCartAATracking")).thenReturn(null);
        String expected = null;
        productTile.initModel();
        String actual = productTile.isAddToCartAATracking();
        assertEquals(expected, actual);
    }

    @Test
    void testIsViewProductAATracking_Authored() {
        lenient().when(properties.get("viewProductAATracking", String.class)).thenReturn("true");
        String expected = "true";
        productTile.initModel();
        String actual = productTile.isViewProductAATracking();
        assertEquals(expected, actual);
    }

    @Test
    void testIsAddToCartAATracking_Authored() {
        lenient().when(properties.get("addToCartAATracking", String.class)).thenReturn("true");
        String expected = "true";
        productTile.initModel();
        String actual = productTile.isAddToCartAATracking();
        assertEquals(expected, actual);
    }
    
    @Test
    void testIsShowBuyNowButton_Default() {
        lenient().when(properties.get("showBuyNowButton")).thenReturn(null);
        String expected = null;
        productTile.initModel();
        String actual = productTile.isShowBuyNowButton();
        assertEquals(expected, actual);
    }

    @Test
    void testIsShowBuyNowButton_Authored() {
        lenient().when(properties.get("showBuyNowButton", String.class)).thenReturn("true");
        String expected = "true";
        productTile.initModel();
        String actual = productTile.isShowBuyNowButton();
        assertEquals(expected, actual);
    }

    @Test
    void testGetIncludes_RuntimeException() {
        lenient().when(productRetriever.fetchProduct()).thenThrow(new RuntimeException("error"));
        productTile.initModel();
        List<String> actual = productTile.getIncludes();
        assertEquals(new ArrayList<>(), actual);
    }

    @Test
    void testInitModel_ProductRetrieverIsNull() {
        lenient().when(product.getProductRetriever()).thenReturn(null);
        productTile.initModel();
        assertNotNull(productTile);
    }
    @Test
    void testGetSubscriptionOptions_Default() {
        lenient().when(properties.get("subscriptionOptions")).thenReturn(null);
        String expected = "singlePurchase";
        productTile.initModel();
        String actual = productTile.getSubscriptionOptions();
        assertEquals(expected, actual);
    }

    @Test
    void testGetSku() {
        lenient().when(properties.get("selection", String.class)).thenReturn("TestProduct");
        String expected = "TestProduct";
        productTile.initModel();
        String actual = productTile.getSku();
        assertEquals(expected, actual);
    }

    @Test
    void testGetOutOfStockTitle() {
        lenient().when(properties.get("outOfStockTitle", String.class)).thenReturn("Out of Stock Title");
        String expected = "Out of Stock Title";
        productTile.initModel();
        String actual = productTile.getOutOfStockTitle();
        assertEquals(expected, actual);
    }

    @Test
    void testGetOutOfStockMessage() {
        lenient().when(properties.get("outOfStockMessage", String.class)).thenReturn("Out of Stock Message");
        String expected = "Out of Stock Message";
        productTile.initModel();
        String actual = productTile.getOutOfStockMessage();
        assertEquals(expected, actual);
    }

    @Test
    void testGetStockAlertLinkText() {
        lenient().when(properties.get("stockAlertLinkText", String.class)).thenReturn("Stock Alert Link Text");
        String expected = "Stock Alert Link Text";
        productTile.initModel();
        String actual = productTile.getStockAlertLinkText();
        assertEquals(expected, actual);
    }

    @Test
    void testGetStockAlertStaticText() {
        lenient().when(properties.get("stockAlertStaticText", String.class)).thenReturn("Stock Alert Static Text");
        String expected = "Stock Alert Static Text";
        productTile.initModel();
        String actual = productTile.getStockAlertStaticText();
        assertEquals(expected, actual);
    }

    @Test
    void testIsEnableLoyaltyPoints_Default() {
        lenient().when(properties.get("enableLoyaltyPoints", String.class)).thenReturn(null);
        String expected = null;
        productTile.initModel();
        String actual = productTile.isEnableLoyaltyPoints();
        assertEquals(expected, actual);
    }

    @Test
    void testIsEnableLoyaltyPoints_Authored() {
        lenient().when(properties.get("enableLoyaltyPoints", String.class)).thenReturn("true");
        String expected = "true";
        productTile.initModel();
        String actual = productTile.isEnableLoyaltyPoints();
        assertEquals(expected, actual);
    }

    @Test
    void testGetSubscriptionOptionsWhenPropertyIsNotNullAndNotBlank() {
        String expectedValue = "singlePurchase";
        properties.put("SUBSCRIPTION_OPTIONS", expectedValue);
        productTile.initModel();
        String actualValue = productTile.getSubscriptionOptions();
        assertEquals(expectedValue, actualValue);
    }

    @Test
    void testGetSubscriptionOptionsWhenPropertyIsNull() {
        when(properties.get(ProductTileImpl.SUBSCRIPTION_OPTIONS)).thenReturn(null);
        String result = productTile.getSubscriptionOptions();
        assertEquals(ProductTileImpl.SINGLE_PURCHASE, result);
    }

    @Test
    void testGetSubscriptionOptionsWhenPropertyIsBlank() {
        when(properties.get(ProductTileImpl.SUBSCRIPTION_OPTIONS)).thenReturn("");
        String result = productTile.getSubscriptionOptions();
        assertEquals(ProductTileImpl.SINGLE_PURCHASE, result);
    }

    @Test
    void testGetPriceToShowWhenPropertyIsNotNullAndNotBlank() {
        String expectedValue = "normal";
        properties.put("PRICE_TO_SHOW", expectedValue);
        productTile.initModel();
        String actualValue = productTile.getPriceToShow();
        assertEquals(expectedValue, actualValue);
    }

    @Test
    void testGetPriceToShowWhenPropertyIsNull() {
        when(properties.get(ProductTileImpl.PRICE_TO_SHOW)).thenReturn(null);
        String result = productTile.getPriceToShow();
        assertEquals(ProductTileImpl.NORMAL, result);
    }

    @Test
    void testGetPriceToShowWhenPropertyIsBlank() {
        when(properties.get(ProductTileImpl.PRICE_TO_SHOW)).thenReturn("");
        String result = productTile.getPriceToShow();
        assertEquals(ProductTileImpl.NORMAL, result);
    }


}

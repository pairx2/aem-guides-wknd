package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import junitx.util.PrivateAccessor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
class OrderSummaryImplTest {

    @InjectMocks
    private OrderSummaryImpl ordersummary;

    @BeforeEach
    void setUp() throws Exception {
        PrivateAccessor.setField(ordersummary, "icon", "/icon/path");
        PrivateAccessor.setField(ordersummary, "header", "Header Text");
        PrivateAccessor.setField(ordersummary, "readAllowed", "Read Allowed Text");
        PrivateAccessor.setField(ordersummary, "cartHeader", "Cart Header Text");
        PrivateAccessor.setField(ordersummary, "priceToShow", "addToCart");
        PrivateAccessor.setField(ordersummary, "includeCartButton", "true");
        PrivateAccessor.setField(ordersummary, "promoCodeEnabled", true);
        PrivateAccessor.setField(ordersummary, "promoCodeText", "promo1");
        PrivateAccessor.setField(ordersummary, "emptyCartMessage", "Empty Cart Message Text");
        PrivateAccessor.setField(ordersummary, "numberOfButtons", 2);
        PrivateAccessor.setField(ordersummary, "promoCodeAATracking", true);
        PrivateAccessor.setField(ordersummary, "showSpaceInPrice", "true");
        PrivateAccessor.setField(ordersummary, "subtotalWithoutTax", "true");
        PrivateAccessor.setField(ordersummary, "promoCodeSuccessMsg", "promoCodeSuccessMsg");
        PrivateAccessor.setField(ordersummary, "promoCodeErrorMsg", "promoCodeErrorMsg");
    }

    @Test
    void testGetIcon() {
        final String expected = "/icon/path";
        String actual = ordersummary.getIcon();
        assertEquals(expected, actual);
    }

    @Test
    void testGetHeader() {
        final String expected = "Header Text";
        String actual = ordersummary.getHeader();
        assertEquals(expected, actual);
    }

    @Test
    void testGetReadAllowed() {
        final String expected = "Read Allowed Text";
        String actual = ordersummary.getReadAllowed();
        assertEquals(expected, actual);
    }

    @Test
    void testGetCartHeader() {
        final String expected = "Cart Header Text";
        String actual = ordersummary.getCartHeader();
        assertEquals(expected, actual);
    }

    @Test
    void testGetPriceToShow() {
        final String expected = "addToCart";
        String actual = ordersummary.getPriceToShow();
        assertEquals(expected, actual);
    }

    @Test
    void testGetIncludeCartButton() {
        final String expected = "true";
        String actual = ordersummary.getIncludeCartButton();
        assertEquals(expected, actual);
    }

    @Test
    void testGetEmptyCartMessage() {
        final String expected = "Empty Cart Message Text";
        String actual =ordersummary.getEmptyCartMessage();
        assertEquals(expected, actual);
    }

    @Test
    void testGetNumberOfButtons() {
        final int expected = 2;
        int actual = ordersummary.getNumberOfButtons();
        assertEquals(expected, actual);
    }
    @Test
    void testPromoCodeEnabled() {
        final boolean expected = true;
		boolean actual = ordersummary.isPromoCodeEnabled();
		assertEquals(expected, actual);
    }

    @Test
    void testGetPromoCodeText() {
        final String expected = "promo1";
        String actual = ordersummary.getPromoCodeText();
        assertEquals(expected, actual);
    }

    @Test
    void testGetListOfButtons() {
        final List<String> expected = Arrays.asList("button-0", "button-1");
        List<String> actual = ordersummary.getListOfButtons();
        assertEquals(expected, actual);
    }

    @Test
    void testIsPromoCodeAATracking() {
        final boolean expected = true;
		boolean actual = ordersummary.isPromoCodeAATracking();
		assertEquals(expected, actual);
    }

    @Test
    void testShowSpaceInPrice() {
        final String expected = "true";
        String actual = ordersummary.getShowSpaceInPrice();
        assertEquals(expected, actual);
    }

    @Test
    void testSubtotalWithoutTax() {
        final String expected = "true";
        String actual = ordersummary.getSubtotalWithoutTax();
        assertEquals(expected, actual);
    }

    @Test
    void testPromoCodeSuccessMsg() {
        final String expected = "promoCodeSuccessMsg";
        String actual = ordersummary.getPromoCodeSuccessMsg();
        assertEquals(expected, actual);
    }

    @Test
    void testPromoCodeErrorMsg() {
        final String expected = "promoCodeErrorMsg";
        String actual = ordersummary.getPromoCodeErrorMsg();
        assertEquals(expected, actual);
    }
}

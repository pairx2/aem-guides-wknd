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
class MiniCartImplTest {

    @InjectMocks
    private MiniCartImpl miniCart;

    @BeforeEach
    void setUp() throws Exception {
        PrivateAccessor.setField(miniCart, "icon", "/icon/path");
        PrivateAccessor.setField(miniCart, "header", "Header Text");
        PrivateAccessor.setField(miniCart, "readAllowed", "Read Allowed Text");
        PrivateAccessor.setField(miniCart, "cartHeader", "Cart Header Text");
        PrivateAccessor.setField(miniCart, "priceToShow", "addToCart");
        PrivateAccessor.setField(miniCart, "includeCartButton", "true");
        PrivateAccessor.setField(miniCart, "emptyCartMessage", "Empty Cart Message Text");
        PrivateAccessor.setField(miniCart, "numberOfButtons", 2);
        PrivateAccessor.setField(miniCart, "miniAddToCartAATracking", "true");
        PrivateAccessor.setField(miniCart, "miniRemoveCartAATracking", "true");
        PrivateAccessor.setField(miniCart, "showSpaceInPrice", "true");
        PrivateAccessor.setField(miniCart, "subtotalWithoutTax", "true");
    }

    @Test
    void testGetIcon() {
        final String expected = "/icon/path";
        String actual = miniCart.getIcon();
        assertEquals(expected, actual);
    }

    @Test
    void testGetHeader() {
        final String expected = "Header Text";
        String actual = miniCart.getHeader();
        assertEquals(expected, actual);
    }

    @Test
    void testGetReadAllowed() {
        final String expected = "Read Allowed Text";
        String actual = miniCart.getReadAllowed();
        assertEquals(expected, actual);
    }

    @Test
    void testGetCartHeader() {
        final String expected = "Cart Header Text";
        String actual = miniCart.getCartHeader();
        assertEquals(expected, actual);
    }

    @Test
    void testGetPriceToShow() {
        final String expected = "addToCart";
        String actual = miniCart.getPriceToShow();
        assertEquals(expected, actual);
    }

    @Test
    void testGetIncludeCartButton() {
        final String expected = "true";
        String actual = miniCart.getIncludeCartButton();
        assertEquals(expected, actual);
    }

    @Test
    void testGetEmptyCartMessage() {
        final String expected = "Empty Cart Message Text";
        String actual = miniCart.getEmptyCartMessage();
        assertEquals(expected, actual);
    }

    @Test
    void testGetNumberOfButtons() {
        final int expected = 2;
        int actual = miniCart.getNumberOfButtons();
        assertEquals(expected, actual);
    }

    @Test
    void testGetListOfButtons() {
        final List<String> expected = Arrays.asList("button-0", "button-1");
        List<String> actual = miniCart.getListOfButtons();
        assertEquals(expected, actual);
    }

    @Test
    void testGetMiniAddToCartAATracking() {
        final String expected = "true";
        String actual = miniCart.getMiniAddToCartAATracking();
        assertEquals(expected, actual);
    }

    @Test
    void testGetMiniRemoveCartAATracking() {
        final String expected = "true";
        String actual = miniCart.getMiniRemoveCartAATracking();
        assertEquals(expected, actual);
    }

    @Test
    void testShowSpaceInPrice() {
        final String expected = "true";
        String actual = miniCart.getShowSpaceInPrice();
        assertEquals(expected, actual);
    }

    @Test
    void testSubtotalWithoutTax() {
        final String expected = "true";
        String actual = miniCart.getSubtotalWithoutTax();
        assertEquals(expected, actual);
    }
}

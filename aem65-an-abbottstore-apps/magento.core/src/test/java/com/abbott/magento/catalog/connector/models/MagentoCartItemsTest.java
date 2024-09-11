package com.abbott.magento.catalog.connector.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class MagentoCartItemsTest {

    @InjectMocks
    MagentoCartItems magentoCartItems;

    ProductOption productOption;

    @BeforeEach
    void setUp() {
        magentoCartItems.setItemId("item");
        magentoCartItems.setName("name");
        magentoCartItems.setPrice(10.00);
        magentoCartItems.setQty(1);
        magentoCartItems.setProductType("abbott");
        magentoCartItems.setQuoteId("quote");
        magentoCartItems.setSku("12345");
        magentoCartItems.setProductOption(productOption);
    }

    @Test
    void getProductType() {
        assertEquals("abbott", magentoCartItems.getProductType());
    }

    @Test
    void getItemId() {
        assertEquals("item", magentoCartItems.getItemId());
    }

    @Test
    void getPrice() {
        assertEquals(10.00, magentoCartItems.getPrice());
    }

    @Test
    void getQty() {
        assertEquals(1, magentoCartItems.getQty());
    }

    @Test
    void getQuoteId() {
        assertEquals("quote", magentoCartItems.getQuoteId());
    }

    @Test
    void getName() {
        assertEquals("name", magentoCartItems.getName());
    }

    @Test
    void getSku() {
        assertEquals("12345", magentoCartItems.getSku());
    }

    @Test
    void getProductOption() {
        assertNull(magentoCartItems.getProductOption());
    }

    @Test
    void testToString() {
        assertTrue(!magentoCartItems.toString().isEmpty());
    }
}
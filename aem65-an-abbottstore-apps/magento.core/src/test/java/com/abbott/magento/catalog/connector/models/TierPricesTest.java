package com.abbott.magento.catalog.connector.models;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
class TierPricesTest {

    @InjectMocks
    TierPrices tierPrices;

    @Test
    void getQuantity() {
        tierPrices.setQuantity(5);
        assertEquals(5, tierPrices.getQuantity());
    }

    @Test
    void getCustomerGroup() {
        tierPrices.setCustomerGroup("emp");
        assertEquals("emp", tierPrices.getCustomerGroup());
    }

    @Test
    void getPrice() {
        tierPrices.setPrice(10.25);
        assertEquals(10.25, tierPrices.getPrice());
    }

    @Test
    void getPriceType() {
        tierPrices.setPriceType("Euro");
        assertEquals("Euro", tierPrices.getPriceType());
    }

    @Test
    void getSku() {
        tierPrices.setSku("Abb123");
        assertEquals("Abb123", tierPrices.getSku());
    }

    @Test
    void getWebsiteId() {
        tierPrices.setWebsiteId(123);
        assertEquals(123, tierPrices.getWebsiteId());
    }

    @Test
    void testToString() {
        assertNotNull(tierPrices.toString());
    }
}
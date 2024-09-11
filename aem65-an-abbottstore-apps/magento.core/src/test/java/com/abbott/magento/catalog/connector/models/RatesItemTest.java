package com.abbott.magento.catalog.connector.models;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
class RatesItemTest {

    @InjectMocks
    RatesItem ratesItem;

    @Test
    void getTitle() {
        ratesItem.setTitle("title");
        assertEquals("title", ratesItem.getTitle());
    }

    @Test
    void getPercent() {
        ratesItem.setPercent("10%");
        assertEquals("10%", ratesItem.getPercent());
    }

    @Test
    void testToString() {
        assertNotNull(ratesItem.toString());
    }
}
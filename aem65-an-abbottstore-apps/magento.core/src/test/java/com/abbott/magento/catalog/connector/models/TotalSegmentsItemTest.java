package com.abbott.magento.catalog.connector.models;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
class TotalSegmentsItemTest {

    @InjectMocks
    TotalSegmentsItem totalSegmentsItem;

    @InjectMocks
    ExtensionAttributes extensionAttributes;

    @Test
    void getCode() {
        totalSegmentsItem.setCode("abbott");
        assertEquals("abbott", totalSegmentsItem.getCode());
    }

    @Test
    void getTitle() {
        totalSegmentsItem.setTitle("title");
        assertEquals("title", totalSegmentsItem.getTitle());
    }

    @Test
    void getValue() {
        totalSegmentsItem.setValue(100);
        assertEquals(100, totalSegmentsItem.getValue());
    }

    @Test
    void getArea() {
        totalSegmentsItem.setArea("10 acre");
        assertEquals("10 acre", totalSegmentsItem.getArea());
    }

    @Test
    void getExtensionAttributes() {
        totalSegmentsItem.setExtensionAttributes(extensionAttributes);
        assertNotNull(totalSegmentsItem.getExtensionAttributes());
    }

    @Test
    void testToString() {
        assertNotNull(totalSegmentsItem.toString());
    }
}
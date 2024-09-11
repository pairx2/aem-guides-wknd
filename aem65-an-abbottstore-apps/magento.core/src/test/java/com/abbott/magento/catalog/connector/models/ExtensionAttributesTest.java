package com.abbott.magento.catalog.connector.models;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(MockitoExtension.class)
class ExtensionAttributesTest {

    @InjectMocks
    ExtensionAttributes attributes;

    @Test
    void testToString() {
        assertTrue(!attributes.toString().isEmpty());
    }

    @Test
    void getWebsiteId() {

        attributes.setWebsiteId(1);
        assertEquals(1, attributes.getWebsiteId());
    }

}
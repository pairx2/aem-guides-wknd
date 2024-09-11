package com.abbott.magento.core.connector.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(MockitoExtension.class)
class ExtensionAttributesTest {

    @InjectMocks
    ExtensionAttributes extensionAttributes;

    @BeforeEach
    void setUp() {
        extensionAttributes.setWebsiteId(1);
    }

    @Test
    void getWebsiteId() {
        assertEquals(1, extensionAttributes.getWebsiteId());
    }

    @Test
    void testToString() {
        assertTrue(!extensionAttributes.toString().isEmpty());
    }
}
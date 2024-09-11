package com.abbott.magento.catalog.connector.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(MockitoExtension.class)
class ProductOptionTest {

    @InjectMocks
    ExtensionAttributes extensionAttributes;

    @InjectMocks
    ProductOption productOption;

    @BeforeEach
    void setUp() {
        productOption.setExtensionAttributes(extensionAttributes);
    }

    @Test
    void getExtensionAttributes() {
        assertNotNull(productOption.getExtensionAttributes());
    }

    @Test
    void testToString() {
        assertTrue(!productOption.toString().isEmpty());
    }
}
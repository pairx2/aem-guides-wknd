package com.abbott.magento.catalog.connector.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertThrows;

@ExtendWith(MockitoExtension.class)
class MagentoAttributeOptionsTest {

    MagentoAttributeOptions magentoAttributeOptions;

    MagentoAttributeOptions.Option[] options;

    @BeforeEach
    @Test
    void setUp() {
        MagentoAttributeOptions.Option option = new MagentoAttributeOptions.Option("label", "value");
        options = new MagentoAttributeOptions.Option[]{option};
        magentoAttributeOptions = new MagentoAttributeOptions(1, "test", options);
        magentoAttributeOptions.getMap();
        assertThrows(UnsupportedOperationException.class, () -> {
            new MagentoAttributeOptions.ApplyTo();
        });
    }
}
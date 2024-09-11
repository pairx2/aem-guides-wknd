package com.abbott.magento.catalog.connector.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith({MockitoExtension.class})
class MagentoProductPriceOnlyTest {

    @InjectMocks
    MagentoProductPriceOnly magentoProductPriceOnly;

    @BeforeEach
    void setUp() {
        magentoProductPriceOnly.setPrice(100);
    }

    @Test
    void getPrice() {
        assertEquals(100, magentoProductPriceOnly.getPrice());
    }
}
package com.abbott.magento.core.connector.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class MagentoShippingCarrierTest {

    private static final String TEST_CODE = "cc";
    MagentoShippingCarrier magentoShippingCarrier;

    @BeforeEach
    @Test
    void setUp() {
        magentoShippingCarrier = new MagentoShippingCarrier(TEST_CODE, TEST_CODE, "title", "methodTitle", 1L, 2L, true, "err msg", 3L, 4L);
    }
}
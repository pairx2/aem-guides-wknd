package com.abbott.magento.core.connector.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class MagentoAddressTest {

    MagentoAddress magentoAddress;

    @BeforeEach
    @Test
    void setUp() {
        String[] street = {"test"};
        magentoAddress = new MagentoAddress("rc", "IN", street, "9999999999", "postcode", "city", "fname", "lname");
    }
}
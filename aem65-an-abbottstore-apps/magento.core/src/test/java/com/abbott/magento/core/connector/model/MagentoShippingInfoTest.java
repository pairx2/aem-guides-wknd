package com.abbott.magento.core.connector.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class MagentoShippingInfoTest {

    MagentoShippingInfo magentoShippingInfo;
    MagentoAddress magentoAddress;
    MagentoShippingInfo.AddressInformation addressInformation;

    @BeforeEach
    @Test
    void setUp() {
        magentoAddress = new MagentoAddress("rc", "IN", new String[]{"street"}, "9999999999", "postcode", "city", "name", "name");
        addressInformation = new MagentoShippingInfo.AddressInformation(magentoAddress, "shipping", "cc");
        magentoShippingInfo = new MagentoShippingInfo(addressInformation);
    }
}
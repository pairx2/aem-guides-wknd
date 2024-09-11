package com.abbott.magento.core.connector.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class MagentoPaymentInfoTest {

    MagentoPaymentInfo magentoPaymentInfo;

    MagentoAddress magentoAddress;

    MagentoPaymentInfo.PaymentMethod paymentMethod;

    @BeforeEach
    @Test
    void setUp() {
        paymentMethod = new MagentoPaymentInfo.PaymentMethod("method");
        paymentMethod = new MagentoPaymentInfo.PaymentMethod("method", new String[]{"data"});
        magentoAddress = new MagentoAddress("rc", "IN", new String[]{"street"}, "9999999999", "postcode", "city", "name", "name");
        magentoPaymentInfo = new MagentoPaymentInfo(paymentMethod, magentoAddress);
    }
}
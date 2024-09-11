package com.abbott.magento.core.connector.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertThrows;

class MagentoShippingResponseTest {
    private static final Long TEST_VALUE = 1L;
    private static final Double DOUBLE_TEST_VALUE = 1.00;
    MagentoShippingResponse magentoShippingResponse;
    MagentoShippingResponse.PaymentMethod paymentMethod;
    MagentoShippingResponse.Totals totals;
    MagentoShippingResponse.Totals.TotalSegment totalSegment;
    MagentoShippingResponse.Totals.Item item;
    MagentoShippingResponse.Totals.TotalSegment.ExtensionAttributes extensionAttributes;
    MagentoShippingResponse.Totals.TotalSegment.ExtensionAttributes.TaxGrandtotalDetail taxGrandtotalDetail;
    MagentoShippingResponse.Totals.WeeeAaxAppliedAmount weeeAaxAppliedAmount;

    @BeforeEach
    @Test
    void setUp() {
        paymentMethod = new MagentoShippingResponse.PaymentMethod("code", "title");
        MagentoShippingResponse.Totals.TotalSegment.ExtensionAttributes.TaxGrandtotalDetail[] taxGrandtotalDetails = {taxGrandtotalDetail};
        extensionAttributes = new MagentoShippingResponse.Totals.TotalSegment.ExtensionAttributes(taxGrandtotalDetails);
        totalSegment = new MagentoShippingResponse.Totals.TotalSegment("co", "abbott", 1L, extensionAttributes, "area");
        item = new MagentoShippingResponse.Totals.Item(TEST_VALUE, TEST_VALUE, TEST_VALUE, TEST_VALUE, TEST_VALUE, TEST_VALUE, TEST_VALUE, TEST_VALUE, TEST_VALUE, TEST_VALUE, TEST_VALUE, TEST_VALUE, TEST_VALUE, TEST_VALUE, TEST_VALUE, TEST_VALUE, TEST_VALUE, "option", "name");
        MagentoShippingResponse.Totals.Item[] items = {item};
        MagentoShippingResponse.Totals.TotalSegment[] totalSegments = {totalSegment};
        totals = new MagentoShippingResponse.Totals(DOUBLE_TEST_VALUE, DOUBLE_TEST_VALUE, TEST_VALUE, TEST_VALUE, DOUBLE_TEST_VALUE, DOUBLE_TEST_VALUE, DOUBLE_TEST_VALUE, DOUBLE_TEST_VALUE, TEST_VALUE, TEST_VALUE, TEST_VALUE, TEST_VALUE, TEST_VALUE, TEST_VALUE, weeeAaxAppliedAmount, TEST_VALUE, TEST_VALUE, TEST_VALUE, TEST_VALUE, TEST_VALUE, "CC", "qCC", TEST_VALUE, items, totalSegments);
        MagentoShippingResponse.PaymentMethod[] paymentMethods = {paymentMethod};
        magentoShippingResponse = new MagentoShippingResponse(paymentMethods, totals);
        assertThrows(UnsupportedOperationException.class, () -> {
            new MagentoShippingResponse.Totals.WeeeAaxAppliedAmount();
        });
        assertThrows(UnsupportedOperationException.class, () -> {
            new MagentoShippingResponse.Totals.TotalSegment.ExtensionAttributes.TaxGrandtotalDetail();
        });
    }
}
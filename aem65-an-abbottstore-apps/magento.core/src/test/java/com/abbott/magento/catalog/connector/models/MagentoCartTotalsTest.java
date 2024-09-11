package com.abbott.magento.catalog.connector.models;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class MagentoCartTotalsTest {

    private final String CURRENCY_CODE = "USD";
    private final int AMT = 100;

    @InjectMocks
    MagentoCartTotals magentoCartTotals;

    @Test
    void getBaseSubtotal() {
        magentoCartTotals.setBaseSubtotal(AMT);
        assertEquals(AMT, magentoCartTotals.getBaseSubtotal());
    }

    @Test
    void getBaseShippingAmount() {
        magentoCartTotals.setBaseShippingAmount(AMT);
        assertEquals(AMT, magentoCartTotals.getBaseShippingAmount());
    }

    @Test
    void getTotalSegments() {
        magentoCartTotals.setTotalSegments(null);
        assertNull(magentoCartTotals.getTotalSegments());
    }

    @Test
    void getDiscountAmount() {
        magentoCartTotals.setDiscountAmount(AMT);
        assertEquals(AMT, magentoCartTotals.getDiscountAmount());
    }

    @Test
    void getSubtotalWithDiscount() {
        magentoCartTotals.setSubtotalWithDiscount(AMT);
        assertEquals(AMT, magentoCartTotals.getSubtotalWithDiscount());
    }

    @Test
    void getShippingDiscountAmount() {
        magentoCartTotals.setShippingDiscountAmount(AMT);
        assertEquals(AMT, magentoCartTotals.getShippingDiscountAmount());
    }

    @Test
    void getQuoteCurrencyCode() {
        magentoCartTotals.setQuoteCurrencyCode(CURRENCY_CODE);
        assertEquals(CURRENCY_CODE, magentoCartTotals.getQuoteCurrencyCode());
    }

    @Test
    void getShippingAmount() {
        magentoCartTotals.setShippingAmount(AMT);
        assertEquals(AMT, magentoCartTotals.getShippingAmount());
    }

    @Test
    void getBaseShippingInclTax() {
        magentoCartTotals.setBaseShippingInclTax(AMT);
        assertEquals(AMT, magentoCartTotals.getBaseShippingInclTax());
    }

    @Test
    void getBaseShippingDiscountAmount() {
        magentoCartTotals.setBaseShippingDiscountAmount(AMT);
        assertEquals(AMT, magentoCartTotals.getBaseShippingDiscountAmount());
    }

    @Test
    void getWeeeTaxAppliedAmount() {
        magentoCartTotals.setWeeeTaxAppliedAmount(AMT);
        assertEquals(AMT, magentoCartTotals.getWeeeTaxAppliedAmount());
    }

    @Test
    void getBaseShippingTaxAmount() {
        magentoCartTotals.setBaseShippingTaxAmount(AMT);
        assertEquals(AMT, magentoCartTotals.getBaseShippingTaxAmount());
    }

    @Test
    void getGrandTotal() {
        magentoCartTotals.setGrandTotal(AMT);
        assertEquals(AMT, magentoCartTotals.getGrandTotal());
    }

    @Test
    void getExtensionAttributes() {
        magentoCartTotals.setExtensionAttributes(null);
        assertNull(magentoCartTotals.getExtensionAttributes());
    }

    @Test
    void getBaseSubtotalWithDiscount() {
        magentoCartTotals.setBaseSubtotalWithDiscount(AMT);
        assertEquals(AMT, magentoCartTotals.getBaseSubtotalWithDiscount());
    }

    @Test
    void getBaseSubtotalInclTax() {
        magentoCartTotals.setBaseSubtotalInclTax(AMT);
        assertEquals(AMT, magentoCartTotals.getBaseSubtotalInclTax());
    }

    @Test
    void getItemsQty() {
        magentoCartTotals.setItemsQty(1);
        assertEquals(1, magentoCartTotals.getItemsQty());
    }

    @Test
    void getBaseGrandTotal() {
        magentoCartTotals.setBaseGrandTotal(AMT);
        assertEquals(AMT, magentoCartTotals.getBaseGrandTotal());
    }

    @Test
    void getBaseTaxAmount() {
        magentoCartTotals.setBaseTaxAmount(AMT);
        assertEquals(AMT, magentoCartTotals.getBaseTaxAmount());
    }

    @Test
    void getSubtotalInclTax() {
        magentoCartTotals.setSubtotalInclTax(AMT);
        assertEquals(AMT, magentoCartTotals.getSubtotalInclTax());
    }

    @Test
    void getBaseDiscountAmount() {
        magentoCartTotals.setBaseDiscountAmount(AMT);
        assertEquals(AMT, magentoCartTotals.getBaseDiscountAmount());
    }

    @Test
    void getBaseCurrencyCode() {
        magentoCartTotals.setBaseCurrencyCode(CURRENCY_CODE);
        assertEquals(CURRENCY_CODE, magentoCartTotals.getBaseCurrencyCode());
    }

    @Test
    void getSubtotal() {
        magentoCartTotals.setSubtotal(AMT);
        assertEquals(AMT, magentoCartTotals.getSubtotal());
    }

    @Test
    void getTaxAmount() {
        magentoCartTotals.setTaxAmount(AMT);
        assertEquals(AMT, magentoCartTotals.getTaxAmount());
    }

    @Test
    void getCouponCode() {
        magentoCartTotals.setCouponCode(CURRENCY_CODE);
        assertEquals(CURRENCY_CODE, magentoCartTotals.getCouponCode());
    }

    @Test
    void getItems() {
        magentoCartTotals.setItems(null);
        assertNull(magentoCartTotals.getItems());
    }

    @Test
    void getShippingTaxAmount() {
        magentoCartTotals.setShippingTaxAmount(AMT);
        assertEquals(AMT, magentoCartTotals.getShippingTaxAmount());
    }

    @Test
    void getShippingInclTax() {
        magentoCartTotals.setShippingInclTax(AMT);
        assertEquals(AMT, magentoCartTotals.getShippingInclTax());
    }

    @Test
    void testToString() {
        assertTrue(!magentoCartTotals.toString().isEmpty());
    }
}
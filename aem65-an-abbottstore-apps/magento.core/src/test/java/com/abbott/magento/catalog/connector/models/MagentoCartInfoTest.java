package com.abbott.magento.catalog.connector.models;

import com.abbott.magento.core.connector.model.ItemsItem;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class MagentoCartInfoTest {

    private final String CURRENCY_CODE = "USD";
    private final Double AMOUNT = 10.00;
    private final int AMT = 100;

    @InjectMocks
    MagentoCartInfo magentoCartInfo;

    @InjectMocks
    ExtensionAttributes extensionAttributes;

    @Mock
    ItemsItem itemsItem;

    @InjectMocks
    TotalSegmentsItem totalSegmentsItem;

    List<TotalSegmentsItem> totalSegments;


    List<ItemsItem> items;

    @BeforeEach
    void setUp() {
        magentoCartInfo.setBaseCurrencyCode(CURRENCY_CODE);
        magentoCartInfo.setBaseDiscountAmount(AMOUNT);
        magentoCartInfo.setBaseGrandTotal(AMT);
        magentoCartInfo.setBaseShippingAmount(AMOUNT);
        magentoCartInfo.setBaseShippingDiscountAmount(AMT);
        magentoCartInfo.setBaseShippingInclTax(AMOUNT);
        magentoCartInfo.setBaseSubtotalWithDiscount(AMOUNT);
        magentoCartInfo.setBaseTaxAmount(AMOUNT);
        magentoCartInfo.setBaseSubtotal(AMOUNT);
        magentoCartInfo.setBaseShippingTaxAmount(AMOUNT);
        magentoCartInfo.setCouponCode("ABBOTT");
        magentoCartInfo.setDiscountAmount(AMOUNT);
        magentoCartInfo.setGrandTotal(AMOUNT);
        magentoCartInfo.setItemsQty(1);
        magentoCartInfo.setQuoteCurrencyCode(CURRENCY_CODE);
        magentoCartInfo.setShippingAmount(AMOUNT);
        magentoCartInfo.setShippingDiscountAmount(AMOUNT);
        magentoCartInfo.setShippingInclTax(AMT);
        magentoCartInfo.setSubtotal(AMOUNT);
        magentoCartInfo.setShippingTaxAmount(AMOUNT);
        magentoCartInfo.setSubtotalInclTax(AMOUNT);
        magentoCartInfo.setSubtotalWithDiscount(AMOUNT);
        magentoCartInfo.setTaxAmount(AMOUNT);
        magentoCartInfo.setWeeeTaxAppliedAmount("");
        magentoCartInfo.setExtensionAttributes(extensionAttributes);
    }

    @Test
    void getTaxAmount() {
        assertEquals(AMOUNT, magentoCartInfo.getTaxAmount());
    }

    @Test
    void getShippingDiscountAmount() {
        assertEquals(AMOUNT, magentoCartInfo.getShippingDiscountAmount());
    }

    @Test
    void getDiscountAmount() {
        assertEquals(AMOUNT, magentoCartInfo.getDiscountAmount());
    }

    @Test
    void getItemsQty() {
        assertEquals(1, magentoCartInfo.getItemsQty());
    }

    @Test
    void getCouponCode() {
        assertEquals("ABBOTT", magentoCartInfo.getCouponCode());
    }

    @Test
    void getQuoteCurrencyCode() {
        assertEquals(CURRENCY_CODE, magentoCartInfo.getQuoteCurrencyCode());
    }

    @Test
    void getBaseSubtotalWithDiscount() {
        assertEquals(AMOUNT, magentoCartInfo.getBaseSubtotalWithDiscount());
    }

    @Test
    void getWeeeTaxAppliedAmount() {
        assertNotNull(magentoCartInfo.getWeeeTaxAppliedAmount());
    }

    @Test
    void getShippingTaxAmount() {
        assertEquals(AMOUNT, magentoCartInfo.getShippingTaxAmount());
    }

    @Test
    void getBaseShippingDiscountAmount() {
        assertEquals(AMT, magentoCartInfo.getBaseShippingDiscountAmount());
    }

    @Test
    void getGrandTotal() {
        assertEquals(AMOUNT, magentoCartInfo.getGrandTotal());
    }

    @Test
    void getBaseCurrencyCode() {
        assertEquals(CURRENCY_CODE, magentoCartInfo.getBaseCurrencyCode());
    }

    @Test
    void getBaseTaxAmount() {
        assertEquals(AMOUNT, magentoCartInfo.getBaseTaxAmount());
    }

    @Test
    void getBaseShippingTaxAmount() {
        assertEquals(AMOUNT, magentoCartInfo.getBaseShippingTaxAmount());
    }

    @Test
    void getBaseGrandTotal() {
        assertEquals(AMT, magentoCartInfo.getBaseGrandTotal());
    }

    @Test
    void getBaseDiscountAmount() {
        assertEquals(AMOUNT, magentoCartInfo.getBaseDiscountAmount());
    }

    @Test
    void getExtensionAttributes() {
        assertNotNull(magentoCartInfo.getExtensionAttributes());
    }

    @Test
    void getShippingAmount() {
        assertEquals(AMOUNT, magentoCartInfo.getShippingAmount());
    }

    @Test
    void getBaseShippingAmount() {
        assertEquals(AMOUNT, magentoCartInfo.getBaseShippingAmount());
    }

    @Test
    void getSubtotalInclTax() {
        assertEquals(AMOUNT, magentoCartInfo.getSubtotalInclTax());
    }

    @Test
    void getSubtotalWithDiscount() {
        assertEquals(AMOUNT, magentoCartInfo.getSubtotalWithDiscount());
    }

    @Test
    void getSubtotal() {
        assertEquals(AMOUNT, magentoCartInfo.getSubtotal());
    }

    @Test
    void getBaseSubtotal() {
        assertEquals(AMOUNT, magentoCartInfo.getBaseSubtotal());
    }

    @Test
    void getBaseShippingInclTax() {
        assertEquals(AMOUNT, magentoCartInfo.getBaseShippingInclTax());
    }

    @Test
    void getShippingInclTax() {
        assertEquals(AMT, magentoCartInfo.getShippingInclTax());
    }

    @Test
    void testToString() {
        assertTrue(!magentoCartInfo.toString().isEmpty());
    }
}
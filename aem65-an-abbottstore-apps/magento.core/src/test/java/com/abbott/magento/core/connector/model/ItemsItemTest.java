package com.abbott.magento.core.connector.model;

import com.abbott.magento.catalog.connector.models.ExtensionAttributes;
import com.abbott.magento.catalog.connector.models.TotalSegmentsItem;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class ItemsItemTest {

    private final Double AMOUNT = 10.00;
    private final int AMT = 100;

    @InjectMocks
    ItemsItem itemsItem;

    @InjectMocks
    ExtensionAttributes extensionAttributes;

    @InjectMocks
    TotalSegmentsItem totalSegmentsItem;

    List<TotalSegmentsItem> totalSegments;

    List<ItemsItem> items;

    @BeforeEach
    void setUp() {
        itemsItem.setBasePrice(AMOUNT);
        itemsItem.setBaseDiscountAmount(AMOUNT);
        itemsItem.setBasePriceInclTax(AMOUNT);
        itemsItem.setBasePrice(AMOUNT);
        itemsItem.setBaseRowTotal(AMOUNT);
        itemsItem.setBaseRowTotalInclTax(AMOUNT);
        itemsItem.setBaseTaxAmount(AMOUNT);
        itemsItem.setDiscountAmount(AMOUNT);
        itemsItem.setDiscountPercent(AMT);
        itemsItem.setBaseDiscountAmount(AMOUNT);
        itemsItem.setItemId(AMT);
        itemsItem.setName("ABBOTT");
        itemsItem.setOptions("AMOUNT");
        itemsItem.setPrice(AMOUNT);
        itemsItem.setPriceInclTax(AMOUNT);
        itemsItem.setQty(1);
        itemsItem.setRowTotal(AMOUNT);
        itemsItem.setRowTotalInclTax(AMOUNT);
        itemsItem.setRowTotalWithDiscount(AMOUNT);
        itemsItem.setTaxAmount(AMOUNT);
        itemsItem.setTaxPercent(AMOUNT);
        itemsItem.setWeeeTaxAppliedAmount("");
        itemsItem.setWeeeTaxApplied("");
    }

    @Test
    void getTaxAmount() {
        assertEquals(AMOUNT, itemsItem.getTaxAmount());
    }

    @Test
    void getBaseDiscountAmount() {
        assertEquals(AMOUNT, itemsItem.getBaseDiscountAmount());
    }

    @Test
    void getBaseTaxAmount() {
        assertEquals(10, itemsItem.getBaseTaxAmount());
    }

    @Test
    void getBasePrice() {
        assertEquals(AMOUNT, itemsItem.getBasePrice());
    }

    @Test
    void getBasePriceInclTax() {
        assertEquals(AMOUNT, itemsItem.getBasePriceInclTax());
    }

    @Test
    void getBaseRowTotal() {
        assertEquals(AMOUNT, itemsItem.getBaseRowTotal());
    }

    @Test
    void getBaseRowTotalInclTax() {
        assertEquals(AMOUNT, itemsItem.getBaseRowTotalInclTax());
    }

    @Test
    void getWeeeTaxAppliedAmount() {
        assertNotNull(itemsItem.getWeeeTaxAppliedAmount());
    }

    @Test
    void getWeeeTaxApplied() {
        assertNotNull(itemsItem.getWeeeTaxApplied());
    }

    @Test
    void getDiscountAmount() {
        assertEquals(AMOUNT, itemsItem.getDiscountAmount());
    }

    @Test
    void getDiscountPercent() {
        assertEquals(AMT, itemsItem.getDiscountPercent());
    }


    @Test
    void getItemId() {
        assertEquals(AMT, itemsItem.getItemId());
    }

    @Test
    void getName() {
        assertEquals("ABBOTT", itemsItem.getName());
    }

    @Test
    void getOptions() {
        assertEquals("AMOUNT", itemsItem.getOptions());
    }

    @Test
    void getPrice() {
        assertEquals(AMOUNT, itemsItem.getPrice());
    }

    @Test
    void getPriceInclTax() {
        assertEquals(AMOUNT, itemsItem.getPriceInclTax());
    }

    @Test
    void getQty() {
        assertEquals(1, itemsItem.getQty());
    }

    @Test
    void getRowTotal() {
        assertEquals(AMOUNT, itemsItem.getRowTotal());
    }

    @Test
    void getRowTotalInclTax() {
        assertEquals(AMOUNT, itemsItem.getRowTotalInclTax());
    }

    @Test
    void getRowTotalWithDiscount() {
        assertEquals(AMOUNT, itemsItem.getRowTotalWithDiscount());
    }

    @Test
    void getTaxPercent() {
        assertEquals(AMOUNT, itemsItem.getTaxPercent());
    }

    @Test
    void testToString() {
        assertTrue(!itemsItem.toString().isEmpty());
    }

}
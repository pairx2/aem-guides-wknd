package com.abbott.magento.catalog.connector.models;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class TaxGrandtotalDetailsItemTest {

    @InjectMocks
    TaxGrandtotalDetailsItem taxGrandtotalDetailsItem;

    @InjectMocks
    RatesItem ratesItem;

    @Mock
    List<RatesItem> ratesItemList;

    @Test
    void getAmount() {
        taxGrandtotalDetailsItem.setAmount(100);
        assertEquals(100, taxGrandtotalDetailsItem.getAmount());
    }

    @Test
    void getRates() {
        ratesItemList.add(ratesItem);
        taxGrandtotalDetailsItem.setRates(ratesItemList);
        assertNotNull(taxGrandtotalDetailsItem.getRates());
    }

    @Test
    void getGroupId() {
        taxGrandtotalDetailsItem.setGroupId(1);
        assertEquals(1, taxGrandtotalDetailsItem.getGroupId());
    }

    @Test
    void testToString() {
        assertTrue(!taxGrandtotalDetailsItem.toString().isEmpty());
    }
}
package com.abbott.magento.identity.models;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class StockItemTest {

    @InjectMocks
    StockItem stockItem;

    @Test
    void getMinSaleQty() {
        stockItem.setMinSaleQty(1);
        assertEquals(1, stockItem.getMinSaleQty());
    }

    @Test
    void getQtyIncrements() {
        stockItem.setQtyIncrements(2);
        assertEquals(2, stockItem.getQtyIncrements());
    }

    @Test
    void getStockStatusChangedAuto() {
        stockItem.setStockStatusChangedAuto(0);
        assertEquals(0, stockItem.getStockStatusChangedAuto());
    }

    @Test
    void isIsInStock() {
        stockItem.setIsInStock(true);
        assertTrue(stockItem.isIsInStock());
    }

    @Test
    void isShowDefaultNotificationMessage() {
        stockItem.setShowDefaultNotificationMessage(false);
        assertFalse(stockItem.isShowDefaultNotificationMessage());
    }

    @Test
    void isUseConfigMaxSaleQty() {
        stockItem.setUseConfigMaxSaleQty(true);
        assertTrue(stockItem.isUseConfigMaxSaleQty());
    }

    @Test
    void getProductId() {
        stockItem.setProductId(777);
        assertEquals(777, stockItem.getProductId());
    }

    @Test
    void isUseConfigQtyIncrements() {
        stockItem.setUseConfigQtyIncrements(false);
        assertFalse(stockItem.isUseConfigQtyIncrements());
    }

    @Test
    void getNotifyStockQty() {
        stockItem.setNotifyStockQty(5);
        assertEquals(5, stockItem.getNotifyStockQty());
    }

    @Test
    void isManageStock() {
        stockItem.setManageStock(true);
        assertTrue(stockItem.isManageStock());
    }

    @Test
    void getItemId() {
        stockItem.setItemId(4321);
        assertEquals(4321, stockItem.getItemId());
    }

    @Test
    void getMinQty() {
        stockItem.setMinQty(2);
        assertEquals(2, stockItem.getMinQty());
    }

    @Test
    void isUseConfigMinQty() {
        stockItem.setUseConfigMinQty(false);
        assertFalse(stockItem.isUseConfigMinQty());
    }

    @Test
    void isUseConfigNotifyStockQty() {
        stockItem.setUseConfigNotifyStockQty(true);
        assertTrue(stockItem.isUseConfigNotifyStockQty());
    }

    @Test
    void getStockId() {
        stockItem.setStockId(5555);
        assertEquals(5555, stockItem.getStockId());
    }

    @Test
    void isUseConfigBackorders() {
        stockItem.setUseConfigBackorders(false);
        assertFalse(stockItem.isUseConfigBackorders());
    }

    @Test
    void getMaxSaleQty() {
        stockItem.setMaxSaleQty(1000);
        assertEquals(1000, stockItem.getMaxSaleQty());
    }

    @Test
    void getBackorders() {
        stockItem.setBackorders(7);
        assertEquals(7, stockItem.getBackorders());
    }

    @Test
    void getQty() {
        stockItem.setQty(5000);
        assertEquals(5000, stockItem.getQty());
    }

    @Test
    void isUseConfigEnableQtyInc() {
        stockItem.setUseConfigEnableQtyInc(true);
        assertTrue(stockItem.isUseConfigEnableQtyInc());
    }

    @Test
    void isIsDecimalDivided() {
        stockItem.setIsDecimalDivided(true);
        assertTrue(stockItem.isIsDecimalDivided());
    }

    @Test
    void isEnableQtyIncrements() {
        stockItem.setEnableQtyIncrements(true);
        assertTrue(stockItem.isEnableQtyIncrements());
    }

    @Test
    void isIsQtyDecimal() {
        stockItem.setIsQtyDecimal(true);
        assertTrue(stockItem.isIsQtyDecimal());
    }

    @Test
    void isUseConfigManageStock() {
        stockItem.setUseConfigManageStock(true);
        assertTrue(stockItem.isUseConfigManageStock());
    }

    @Test
    void getLowStockDate() {
        stockItem.setLowStockDate(null);
        assertNull(stockItem.getLowStockDate());
    }

    @Test
    void getUseConfigMinSaleQty() {
        stockItem.setUseConfigMinSaleQty(15);
        assertEquals(15, stockItem.getUseConfigMinSaleQty());
    }

    @Test
    void testToString() {
        assertNotNull(stockItem.toString());
    }
}
package com.abbott.magento.identity.models;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
class ProductStockTest {

    @InjectMocks
    ProductStock productStock;

    @InjectMocks
    StockItem stockItem;

    @Test
    void getStockItem() {
        productStock.setStockItem(stockItem);
        assertNotNull(productStock.getStockItem());
    }

    @Test
    void getStockStatus() {
        productStock.setStockStatus(1);
        assertEquals(1, productStock.getStockStatus());
    }

    @Test
    void getProductId() {
        productStock.setProductId(12345);
        assertEquals(12345, productStock.getProductId());
    }

    @Test
    void getQty() {
        productStock.setQty(10);
        assertEquals(10, productStock.getQty());
    }

    @Test
    void getStockId() {
        productStock.setStockId(999);
        assertEquals(999, productStock.getStockId());
    }

    @Test
    void testToString() {
        assertNotNull(productStock.toString());
    }
}
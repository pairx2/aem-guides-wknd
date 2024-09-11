package com.abbott.aem.platform.common.components.models.commerce;

import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;


public class OrderDetailsDataDisplayTest implements OrderDetailsDataDisplay{
	
	@Test
    void testGetTitle() {
        assertThrows(UnsupportedOperationException.class, () ->  OrderDetailsDataDisplay.super.getTitle());
    }
	
	@Test
    void testGetDataSource() {
        assertThrows(UnsupportedOperationException.class, () ->  OrderDetailsDataDisplay.super.getDataSource());
    }

	@Test
    void testGetDisplayOutput() {
        assertThrows(UnsupportedOperationException.class, () ->  OrderDetailsDataDisplay.super.getDisplayOutput());
    }
}

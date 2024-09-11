package com.abbott.aem.platform.common.components.models.commerce;

import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;


public class OrderDetailsContainerTest implements OrderDetailsContainer{
	
	@Test
    void testGetOrderLabel() {
        assertThrows(UnsupportedOperationException.class, () ->  OrderDetailsContainer.super.getOrderLabel());
    }
	
	@Test
    void testGetIcon() {
        assertThrows(UnsupportedOperationException.class, () ->  OrderDetailsContainer.super.getIcon());
    }

	@Test
    void testGetPrintInvoiceText() {
        assertThrows(UnsupportedOperationException.class, () ->  OrderDetailsContainer.super.getPrintInvoiceText());
    }
	
	@Test
    void tesGetPrintCreditMemoText() {
        assertThrows(UnsupportedOperationException.class, () ->  OrderDetailsContainer.super.getPrintCreditMemoText());
    }

}

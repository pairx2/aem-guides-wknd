package com.abbott.aem.platform.common.components.models.commerce;

import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;


public class OrderDetailsShipmentTrackingTest implements OrderDetailsShipmentTracking{
	
	@Test
    void testGetArrivalTextPrefix() {
        assertThrows(UnsupportedOperationException.class, () ->  OrderDetailsShipmentTracking.super.getArrivalTextPrefix());
    }
	
	@Test
    void testGetTrackingNumberTextPrefix() {
        assertThrows(UnsupportedOperationException.class, () ->  OrderDetailsShipmentTracking.super.getTrackingNumberTextPrefix());
    }

    @Test
    void testGetArvatoScriptTrackURL() {
        assertThrows(UnsupportedOperationException.class, () ->  OrderDetailsShipmentTracking.super.getArvatoScriptTrackURL());
    }

    @Test
    void testGetEnableArvatoTrackingWidget() {
        assertThrows(UnsupportedOperationException.class, () ->  OrderDetailsShipmentTracking.super.getEnableArvatoTrackingWidget());
    }
}

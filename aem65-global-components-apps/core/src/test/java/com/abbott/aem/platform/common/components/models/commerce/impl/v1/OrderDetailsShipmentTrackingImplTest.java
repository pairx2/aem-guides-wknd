package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import junitx.util.PrivateAccessor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
class OrderDetailsShipmentTrackingImplTest {

    @InjectMocks
    private OrderDetailsShipmentTrackingImpl orderDetailsShipmentTracking;

    @BeforeEach
    void setUp() throws Exception {
        PrivateAccessor.setField(orderDetailsShipmentTracking, "arrivalTextPrefix", "Arrival Text Prefix");
        PrivateAccessor.setField(orderDetailsShipmentTracking, "trackingNumberTextPrefix", "Tracking Number Text Prefix");
        PrivateAccessor.setField(orderDetailsShipmentTracking, "enableArvatoTrackingWidget", "Enable Arvato Tracking Widegt");
        PrivateAccessor.setField(orderDetailsShipmentTracking, "arvatoScriptTrackURL", "Arvato Tracking Script URL");
    }

    @Test
    void testGetArrivalTextPrefix() {
        final String expected = "Arrival Text Prefix";
        String actual = orderDetailsShipmentTracking.getArrivalTextPrefix();
        assertEquals(expected, actual);
    }

    @Test
    void testGetTrackingNumberTextPrefix() {
        final String expected = "Tracking Number Text Prefix";
        String actual = orderDetailsShipmentTracking.getTrackingNumberTextPrefix();
        assertEquals(expected, actual);
    }

    @Test
    void testGetArvatoScriptTrackURL() {
        final String expected = "Arvato Tracking Script URL";
        String actual = orderDetailsShipmentTracking.getArvatoScriptTrackURL();
        assertEquals(expected, actual);
    }

    @Test
    void testGetEnableArvatoTrackingWidget() {
        final String expected = "Enable Arvato Tracking Widegt";
        String actual = orderDetailsShipmentTracking.getEnableArvatoTrackingWidget();
        assertEquals(expected, actual);
    }
}

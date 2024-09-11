package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import junitx.util.PrivateAccessor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
class OrderDetailsContainerImplTest {

    @InjectMocks
    private OrderDetailsContainerImpl orderDetailsContainer;

    @BeforeEach
    void setUp() throws Exception {
        PrivateAccessor.setField(orderDetailsContainer, "icon", "abt-icon");
        PrivateAccessor.setField(orderDetailsContainer, "orderLabel", "Order Label");
        PrivateAccessor.setField(orderDetailsContainer, "printInvoiceText", "Print Invoice Text");
        PrivateAccessor.setField(orderDetailsContainer, "printCreditMemoText", "Print Credit Text");
    }

    @Test
    void testGetIcon() {
        final String expected = "abt-icon";
        String actual = orderDetailsContainer.getIcon();
        assertEquals(expected, actual);
    }

    @Test
    void testGetOrderLabel() {
        final String expected = "Order Label";
        String actual = orderDetailsContainer.getOrderLabel();
        assertEquals(expected, actual);
    }

    @Test
    void testGetPrintInvoiceText() {
        final String expected = "Print Invoice Text";
        String actual = orderDetailsContainer.getPrintInvoiceText();
        assertEquals(expected, actual);
    }

    @Test
    void testGetPrintCreditMemoText() {
        final String expected = "Print Credit Text";
        String actual = orderDetailsContainer.getPrintCreditMemoText();
        assertEquals(expected, actual);
    }
}

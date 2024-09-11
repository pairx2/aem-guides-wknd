package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import junitx.util.PrivateAccessor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
class SubscriptionDetailsContainerImplTest {

    @InjectMocks
    private SubscriptionDetailsContainerImpl subscriptionDetailsContainer;

    @BeforeEach
    void setUp() throws Exception {
        PrivateAccessor.setField(subscriptionDetailsContainer, "subscriptionLabel", "label");
        PrivateAccessor.setField(subscriptionDetailsContainer, "icon", "icon");
        PrivateAccessor.setField(subscriptionDetailsContainer, "printInvoiceText", "invoice");
        PrivateAccessor.setField(subscriptionDetailsContainer, "printCreditMemoText", "creditText");
    }

    @Test
    void testGetSubscriptionLabel() {
        final String expected = "label";
        String  actual = subscriptionDetailsContainer.getSubscriptionLabel();
        assertEquals(expected, actual);
    }

    @Test
    void testGetIcon() {
        final String expected = "icon";
        String  actual = subscriptionDetailsContainer.getIcon();
        assertEquals(expected, actual);
    }

    @Test
    void testGetPrintInvoiceText() {
        final String expected = "invoice";
        String  actual = subscriptionDetailsContainer.getPrintInvoiceText();
        assertEquals(expected, actual);
    }

    @Test
    void testGetPrintCreditMemoText() {
        final String expected = "creditText";
        String  actual = subscriptionDetailsContainer.getPrintCreditMemoText();
        assertEquals(expected, actual);
    }


}

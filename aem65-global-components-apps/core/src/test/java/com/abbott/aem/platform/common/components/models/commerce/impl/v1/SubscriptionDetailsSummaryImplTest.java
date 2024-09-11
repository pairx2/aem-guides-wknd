package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import junitx.util.PrivateAccessor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
class SubscriptionDetailsSummaryImplTest {

    @InjectMocks
    private SubscriptionDetailsSummaryImpl subscriptionDetailsSummary;

    @BeforeEach
    void setUp() throws Exception {
        PrivateAccessor.setField(subscriptionDetailsSummary, "showSpaceInPrice", "showSpaceInPrice");

    }

    @Test
    void testGetShowSpaceInPrice() {
        final String expected = "showSpaceInPrice";
        String  actual = subscriptionDetailsSummary.getShowSpaceInPrice();
        assertEquals(expected, actual);
    }
}

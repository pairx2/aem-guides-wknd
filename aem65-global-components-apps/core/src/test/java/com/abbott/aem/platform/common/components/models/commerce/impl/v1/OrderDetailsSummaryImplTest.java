package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import junitx.util.PrivateAccessor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
class OrderDetailsSummaryImplTest {

    @InjectMocks
    private OrderDetailsSummaryImpl orderDetailsSummary;

    @BeforeEach
    void setUp() throws Exception {
        PrivateAccessor.setField(orderDetailsSummary, "showSpaceInPrice", "true");
    }

    @Test
    void testShowSpaceInPrice() {
        final String expected = "true";
        String actual = orderDetailsSummary.getShowSpaceInPrice();
        assertEquals(expected, actual);
    }
}
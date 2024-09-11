package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import junitx.util.PrivateAccessor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
class OrderDetailsDataDisplayImplTest {

    @InjectMocks
    private OrderDetailsDataDisplayImpl orderDetailsDataDisplay;

    @BeforeEach
    void setUp() throws Exception {
        PrivateAccessor.setField(orderDetailsDataDisplay, "title", "title");
        PrivateAccessor.setField(orderDetailsDataDisplay, "dataSource", "dataSource");
        PrivateAccessor.setField(orderDetailsDataDisplay, "displayOutput", "displayOutput");
    }

    @Test
    void testGetTitle() {
        final String expected = "title";
        String actual = orderDetailsDataDisplay.getTitle();
        assertEquals(expected, actual);
    }

    @Test
    void testGetDataSource() {
        final String expected = "dataSource";
        String actual = orderDetailsDataDisplay.getDataSource();
        assertEquals(expected, actual);
    }

    @Test
    void testGetDisplayOutput() {
        final String expected = "displayOutput";
        String actual = orderDetailsDataDisplay.getDisplayOutput();
        assertEquals(expected, actual);
    }

}

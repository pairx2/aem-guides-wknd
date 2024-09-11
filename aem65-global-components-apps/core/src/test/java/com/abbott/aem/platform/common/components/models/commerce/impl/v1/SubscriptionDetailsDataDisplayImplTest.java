package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import junitx.util.PrivateAccessor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
class SubscriptionDetailsDataDisplayImplTest {

    @InjectMocks
    private SubscriptionDetailsDataDisplayImpl subscriptionDetailsDataDisplay;

    @BeforeEach
    void setUp() throws Exception {
        PrivateAccessor.setField(subscriptionDetailsDataDisplay, "title", "title");
        PrivateAccessor.setField(subscriptionDetailsDataDisplay, "dataSource", "data");
        PrivateAccessor.setField(subscriptionDetailsDataDisplay, "displayOutput", "display");
    }

    @Test
    void testGetTitle() {
        final String expected = "title";
        String  actual = subscriptionDetailsDataDisplay.getTitle();
        assertEquals(expected, actual);
    }

    @Test
    void testGetDataSource() {
        final String expected = "data";
        String  actual = subscriptionDetailsDataDisplay.getDataSource();
        assertEquals(expected, actual);
    }

    @Test
    void testGetDisplayOutput() {
        final String expected = "display";
        String  actual = subscriptionDetailsDataDisplay.getDisplayOutput();
        assertEquals(expected, actual);
    }
}

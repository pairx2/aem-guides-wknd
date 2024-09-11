package com.abbott.magento.catalog.connector.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class MagentoSubscriptionTest {

    @BeforeEach
    @Test
    void setUp() {
        new MagentoSubscription("planId", "name", "10%");
    }
}
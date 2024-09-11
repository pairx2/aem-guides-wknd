package com.abbott.magento.catalog.connector.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(MockitoExtension.class)
class ConfigurableItemOptionsItemTest {

    @InjectMocks
    ConfigurableItemOptionsItem configurableItemOptionsItem;

    @BeforeEach
    void setUp() {
        configurableItemOptionsItem.setOptionId("option Id");
        configurableItemOptionsItem.setOptionValue(2);
    }

    @Test
    void getOptionValue() {
        assertEquals(2, configurableItemOptionsItem.getOptionValue());
    }

    @Test
    void getOptionId() {
        assertEquals("option Id", configurableItemOptionsItem.getOptionId());
    }

    @Test
    void testToString() {
        assertTrue(!configurableItemOptionsItem.toString().isEmpty());
    }
}
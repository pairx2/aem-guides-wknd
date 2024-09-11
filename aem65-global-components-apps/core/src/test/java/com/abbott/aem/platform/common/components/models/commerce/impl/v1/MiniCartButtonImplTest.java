package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import junitx.util.PrivateAccessor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;


import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
class MiniCartButtonImplTest {

    @InjectMocks
    private MiniCartButtonImpl miniCartButton;

    @BeforeEach
    void setUp() throws Exception {
        PrivateAccessor.setField(miniCartButton, "commerceInfoExpireAfterDays", 30);
    }

    @Test
    void testCommerceInfoExpireAfterDays() {
        final int expected = 30;
        int actual = miniCartButton.getCommerceInfoExpireAfterDays();
        assertEquals(expected, actual);
    }

}

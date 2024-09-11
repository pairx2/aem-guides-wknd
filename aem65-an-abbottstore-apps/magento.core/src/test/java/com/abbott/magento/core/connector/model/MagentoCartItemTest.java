package com.abbott.magento.core.connector.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class MagentoCartItemTest {

    MagentoCartItem magentoCartItem;

    MagentoCartItem.CartItem cartItem;

    @BeforeEach
    @Test
    void setUp() {

        cartItem = new MagentoCartItem.CartItem("sku", 1L, "id");
        new MagentoCartItem(cartItem);
    }
}
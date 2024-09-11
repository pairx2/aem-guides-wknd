package com.abbott.magento.core.connector.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public final class MagentoCartItem {
    public final CartItem cartItem;

    @JsonCreator
    public MagentoCartItem(@JsonProperty("cartItem") CartItem cartItem){
        this.cartItem = cartItem;
    }

    public static final class CartItem {
        public final String sku;
        public final long qty;
        public final String quoteId;

        @JsonCreator
        public CartItem(@JsonProperty("sku") String sku, @JsonProperty("qty") long qty, @JsonProperty("quoteId") String quoteId){
            this.sku = sku;
            this.qty = qty;
            this.quoteId = quoteId;
        }
    }
}
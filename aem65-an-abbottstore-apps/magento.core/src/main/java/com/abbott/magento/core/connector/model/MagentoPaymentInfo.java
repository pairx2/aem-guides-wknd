package com.abbott.magento.core.connector.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

@SuppressWarnings("ALL")
public final class MagentoPaymentInfo {
    public final PaymentMethod paymentMethod;
    public final MagentoAddress billingAddress;

    @JsonCreator
    public MagentoPaymentInfo(@JsonProperty("paymentMethod") PaymentMethod paymentMethod, @JsonProperty("billingAddress") MagentoAddress billingAddress){
        this.paymentMethod = paymentMethod;
        this.billingAddress = billingAddress;
    }

    public static final class PaymentMethod {
        public final String method;
         String [] additionalData;

        @JsonCreator
        public PaymentMethod(@JsonProperty("method") String method, @JsonProperty("additionalData") String [] additionalData) {
            this.method = method;
            this.additionalData = additionalData;
        }

        @JsonCreator
        public PaymentMethod(@JsonProperty("method") String method) {
            this.method = method;
        }
    }

}
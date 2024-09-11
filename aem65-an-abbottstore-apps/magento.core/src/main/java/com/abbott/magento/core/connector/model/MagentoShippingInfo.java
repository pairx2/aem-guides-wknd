package com.abbott.magento.core.connector.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

@SuppressWarnings("ALL")
public final class MagentoShippingInfo {
    public final AddressInformation addressInformation;

    @JsonCreator
    public MagentoShippingInfo(@JsonProperty("addressInformation") AddressInformation addressInformation){
        this.addressInformation = addressInformation;
    }

    public static final class AddressInformation {
        public final MagentoAddress shippingAddress;
        public final String shippingMethodCode;
        public final String shippingCarrierCode;

        @JsonCreator
        public AddressInformation(@JsonProperty("shippingAddress") MagentoAddress shippingAddress, @JsonProperty("shippingMethodCode") String shippingMethodCode, @JsonProperty("shippingCarrierCode") String shippingCarrierCode){
            this.shippingAddress = shippingAddress;
            this.shippingMethodCode = shippingMethodCode;
            this.shippingCarrierCode = shippingCarrierCode;
        }
    }
}

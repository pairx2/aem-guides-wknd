package com.abbott.magento.core.connector.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public final class MagentoShippingCarrier {
    public final String carrierCode;
    public final String methodCode;
    public final String carrierTitle;
    public final String methodTitle;
    public final double amount;
    public final double baseAmount;
    public final boolean available;
    public final String errorMessage;
    public final double priceExclTax;
    public final double priceInclTax;

    @JsonCreator
    public MagentoShippingCarrier(@JsonProperty("carrierCode") String carrierCode, @JsonProperty("methodCode") String methodCode, @JsonProperty("carrierTitle") String carrierTitle, @JsonProperty("methodTitle") String methodTitle, @JsonProperty("amount") double amount, @JsonProperty("baseAmount") double baseAmount, @JsonProperty("available") boolean available, @JsonProperty("errorMessage") String errorMessage, @JsonProperty("priceExclTax") double priceExclTax, @JsonProperty("priceInclTax") double priceInclTax){
        this.carrierCode = carrierCode;
        this.methodCode = methodCode;
        this.carrierTitle = carrierTitle;
        this.methodTitle = methodTitle;
        this.amount = amount;
        this.baseAmount = baseAmount;
        this.available = available;
        this.errorMessage = errorMessage;
        this.priceExclTax = priceExclTax;
        this.priceInclTax = priceInclTax;
    }
}

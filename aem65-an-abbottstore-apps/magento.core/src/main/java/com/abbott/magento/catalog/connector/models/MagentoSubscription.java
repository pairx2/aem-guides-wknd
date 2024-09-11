package com.abbott.magento.catalog.connector.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MagentoSubscription {

    public final String planId;
    public final String name;
    public final String regularpricePatternpercent;

    @JsonCreator
    public MagentoSubscription(@JsonProperty("plan_id") String planId, @JsonProperty("name") String name,  @JsonProperty("regular_price_pattern_percent") String regularpricePatternpercent) {
    	this.planId = planId;
        this.name = name;
        this.regularpricePatternpercent = regularpricePatternpercent;
    }
}

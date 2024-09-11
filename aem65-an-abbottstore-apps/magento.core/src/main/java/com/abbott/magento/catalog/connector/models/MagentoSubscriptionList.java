package com.abbott.magento.catalog.connector.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MagentoSubscriptionList {

	@JsonProperty("items")
	public MagentoSubscription [] items;


	@JsonCreator
    public MagentoSubscriptionList(@JsonProperty("items") MagentoSubscription[] items) {
        this.items = items;

    }

}

package com.abbott.magento.catalog.connector.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.annotation.Generated;

@Generated("com.robohorse.robopojogenerator")
public class ExtensionAttributes{

	@JsonProperty("website_id")
	private int websiteId;

	public void setWebsiteId(int websiteId){
		this.websiteId = websiteId;
	}

	public int getWebsiteId(){
		return this.websiteId;
	}

	@Override
 	public String toString(){
		return 
			"ExtensionAttributes{" + 
			"website_id = '" + this.websiteId + '\'' +
			"}";
		}
}
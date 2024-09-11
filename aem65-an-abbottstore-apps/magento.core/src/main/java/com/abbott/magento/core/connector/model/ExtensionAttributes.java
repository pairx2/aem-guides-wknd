package com.abbott.magento.core.connector.model;

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
		return websiteId;
	}

	@Override
 	public String toString(){
		return 
			"ExtensionAttributes{" + 
			"website_id = '" + websiteId + '\'' + 
			"}";
		}
}
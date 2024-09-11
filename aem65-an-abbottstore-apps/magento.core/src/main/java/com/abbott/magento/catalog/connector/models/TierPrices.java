package com.abbott.magento.catalog.connector.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.annotation.Generated;

@Generated("com.robohorse.robopojogenerator")
public class TierPrices{

	@JsonProperty("quantity")
	private int quantity;

	@JsonProperty("customer_group")
	private String customerGroup;

	@JsonProperty("price")
	private double price;

	@JsonProperty("price_type")
	private String priceType;

	@JsonProperty("sku")
	private String sku;

	@JsonProperty("website_id")
	private int websiteId;

	public void setQuantity(int quantity){
		this.quantity = quantity;
	}

	public int getQuantity(){
		return quantity;
	}

	public void setCustomerGroup(String customerGroup){
		this.customerGroup = customerGroup;
	}

	public String getCustomerGroup(){
		return customerGroup;
	}

	public void setPrice(double price){
		this.price = price;
	}

	public double getPrice(){
		return price;
	}

	public void setPriceType(String priceType){
		this.priceType = priceType;
	}

	public String getPriceType(){
		return priceType;
	}

	public void setSku(String sku){
		this.sku = sku;
	}

	public String getSku(){
		return sku;
	}

	public void setWebsiteId(int websiteId){
		this.websiteId = websiteId;
	}

	public int getWebsiteId(){
		return websiteId;
	}

	@Override
 	public String toString(){
		return 
			"TierPrices{" + 
			"quantity = '" + quantity + '\'' + 
			",customer_group = '" + customerGroup + '\'' + 
			",price = '" + price + '\'' + 
			",price_type = '" + priceType + '\'' + 
			",sku = '" + sku + '\'' + 
			",website_id = '" + websiteId + '\'' + 
			"}";
		}
}
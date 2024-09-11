package com.abbott.magento.catalog.connector.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.annotation.Generated;

@Generated("com.robohorse.robopojogenerator")
public class MagentoProductPriceOnly{

	@JsonProperty("price")
	private int price;



	public void setPrice(int price){
		this.price = price;
	}

	public int getPrice(){
		return price;
	}



}
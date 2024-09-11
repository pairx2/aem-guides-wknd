package com.abbott.magento.catalog.connector.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MagentoCartItems{

	@JsonProperty("product_type")
	private String productType;

	@JsonProperty("item_id")
	private String itemId;

	@JsonProperty("price")
	private double price;

	@JsonProperty("qty")
	private int qty;

	@JsonProperty("quote_id")
	private String quoteId;

	@JsonProperty("name")
	private String name;

	@JsonProperty("sku")
	private String sku;

	@JsonProperty("product_option")
	private ProductOption productOption;

	public void setProductType(String productType){
		this.productType = productType;
	}

	public String getProductType(){
		return productType;
	}

	public void setItemId(String itemId){
		this.itemId = itemId;
	}

	public String getItemId(){
		return itemId+"";
	}

	public void setPrice(double price){
		this.price = price;
	}

	public double getPrice(){
		return price;
	}

	public void setQty(int qty){
		this.qty = qty;
	}

	public int getQty(){
		return qty;
	}

	public void setQuoteId(String quoteId){
		this.quoteId = quoteId;
	}

	public String getQuoteId(){
		return quoteId;
	}

	public void setName(String name){
		this.name = name;
	}

	public String getName(){
		return name;
	}

	public void setSku(String sku){
		this.sku = sku;
	}

	public String getSku(){
		return sku;
	}

	public void setProductOption(ProductOption productOption){
		this.productOption = productOption;
	}

	public ProductOption getProductOption(){
		return productOption;
	}

	@Override
	public String toString(){
		return
				"{" +
						"product_type = '" + productType + '\'' +
						",item_id = '" + itemId + '\'' +
						",price = '" + price + '\'' +
						",qty = '" + qty + '\'' +
						",quote_id = '" + quoteId + '\'' +
						",name = '" + name + '\'' +
						",sku = '" + sku + '\'' +
						",product_option = '" + productOption + '\'' +
						"}";
	}

}
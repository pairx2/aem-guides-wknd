package com.abbott.magento.identity.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.annotation.Generated;

@Generated("com.robohorse.robopojogenerator")
public class ProductStock{

	@JsonProperty("stock_item")
	private StockItem stockItem;

	@JsonProperty("stock_status")
	private int stockStatus;

	@JsonProperty("product_id")
	private int productId;

	@JsonProperty("qty")
	private int qty;

	@JsonProperty("stock_id")
	private int stockId;

	public void setStockItem(StockItem stockItem){
		this.stockItem = stockItem;
	}

	public StockItem getStockItem(){
		return stockItem;
	}

	public void setStockStatus(int stockStatus){
		this.stockStatus = stockStatus;
	}

	public int getStockStatus(){
		return stockStatus;
	}

	public void setProductId(int productId){
		this.productId = productId;
	}

	public int getProductId(){
		return productId;
	}

	public void setQty(int qty){
		this.qty = qty;
	}

	public int getQty(){
		return qty;
	}

	public void setStockId(int stockId){
		this.stockId = stockId;
	}

	public int getStockId(){
		return stockId;
	}

	@Override
 	public String toString(){
		return 
			"ProductStock{" + 
			"stock_item = '" + stockItem + '\'' + 
			",stock_status = '" + stockStatus + '\'' + 
			",product_id = '" + productId + '\'' + 
			",qty = '" + qty + '\'' + 
			",stock_id = '" + stockId + '\'' + 
			"}";
		}
}
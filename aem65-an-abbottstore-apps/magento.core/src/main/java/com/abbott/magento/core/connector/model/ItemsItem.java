package com.abbott.magento.core.connector.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.annotation.Generated;

@Generated("com.robohorse.robopojogenerator")
public class ItemsItem{

	@JsonProperty("tax_amount")
	private double taxAmount;

	@JsonProperty("item_id")
	private int itemId;

	@JsonProperty("discount_amount")
	private double discountAmount;

	@JsonProperty("base_discount_amount")
	private double baseDiscountAmount;

	@JsonProperty("row_total")
	private double rowTotal;

	@JsonProperty("row_total_with_discount")
	private double rowTotalWithDiscount;

	@JsonProperty("weee_tax_applied_amount")
	private Object weeeTaxAppliedAmount;

	@JsonProperty("tax_percent")
	private double taxPercent;

	@JsonProperty("base_row_total_incl_tax")
	private double baseRowTotalInclTax;

	@JsonProperty("base_price_incl_tax")
	private double basePriceInclTax;

	@JsonProperty("price_incl_tax")
	private double priceInclTax;

	@JsonProperty("price")
	private double price;

	@JsonProperty("weee_tax_applied")
	private Object weeeTaxApplied;

	@JsonProperty("qty")
	private int qty;

	@JsonProperty("base_price")
	private double basePrice;

	@JsonProperty("options")
	private String options;

	@JsonProperty("name")
	private String name;

	@JsonProperty("base_row_total")
	private double baseRowTotal;

	@JsonProperty("discount_percent")
	private int discountPercent;

	@JsonProperty("row_total_incl_tax")
	private double rowTotalInclTax;

	@JsonProperty("base_tax_amount")
	private double baseTaxAmount;

	public void setTaxAmount(double taxAmount){
		this.taxAmount = taxAmount;
	}

	public double getTaxAmount(){
		return taxAmount;
	}

	public void setItemId(int itemId){
		this.itemId = itemId;
	}

	public int getItemId(){
		return itemId;
	}

	public void setDiscountAmount(double discountAmount){
		this.discountAmount = discountAmount;
	}

	public double getDiscountAmount(){
		return discountAmount;
	}

	public void setBaseDiscountAmount(double baseDiscountAmount){
		this.baseDiscountAmount = baseDiscountAmount;
	}

	public double getBaseDiscountAmount(){
		return baseDiscountAmount;
	}

	public void setRowTotal(double rowTotal){
		this.rowTotal = rowTotal;
	}

	public double getRowTotal(){
		return rowTotal;
	}

	public void setRowTotalWithDiscount(double rowTotalWithDiscount){
		this.rowTotalWithDiscount = rowTotalWithDiscount;
	}

	public double getRowTotalWithDiscount(){
		return rowTotalWithDiscount;
	}

	public void setWeeeTaxAppliedAmount(Object weeeTaxAppliedAmount){
		this.weeeTaxAppliedAmount = weeeTaxAppliedAmount;
	}

	public Object getWeeeTaxAppliedAmount(){
		return weeeTaxAppliedAmount;
	}

	public void setTaxPercent(double taxPercent){
		this.taxPercent = taxPercent;
	}

	public double getTaxPercent(){
		return taxPercent;
	}

	public void setBaseRowTotalInclTax(double baseRowTotalInclTax){
		this.baseRowTotalInclTax = baseRowTotalInclTax;
	}

	public double getBaseRowTotalInclTax(){
		return baseRowTotalInclTax;
	}

	public void setBasePriceInclTax(double basePriceInclTax){
		this.basePriceInclTax = basePriceInclTax;
	}

	public double getBasePriceInclTax(){
		return basePriceInclTax;
	}

	public void setPriceInclTax(double priceInclTax){
		this.priceInclTax = priceInclTax;
	}

	public double getPriceInclTax(){
		return priceInclTax;
	}

	public void setPrice(double price){
		this.price = price;
	}

	public double getPrice(){
		return price;
	}

	public void setWeeeTaxApplied(Object weeeTaxApplied){
		this.weeeTaxApplied = weeeTaxApplied;
	}

	public Object getWeeeTaxApplied(){
		return weeeTaxApplied;
	}

	public void setQty(int qty){
		this.qty = qty;
	}

	public int getQty(){
		return qty;
	}

	public void setBasePrice(double basePrice){
		this.basePrice = basePrice;
	}

	public double getBasePrice(){
		return basePrice;
	}

	public void setOptions(String options){
		this.options = options;
	}

	public String getOptions(){
		return options;
	}

	public void setName(String name){
		this.name = name;
	}

	public String getName(){
		return name;
	}

	public void setBaseRowTotal(double baseRowTotal){
		this.baseRowTotal = baseRowTotal;
	}

	public double getBaseRowTotal(){
		return baseRowTotal;
	}

	public void setDiscountPercent(int discountPercent){
		this.discountPercent = discountPercent;
	}

	public int getDiscountPercent(){
		return discountPercent;
	}

	public void setRowTotalInclTax(double rowTotalInclTax){
		this.rowTotalInclTax = rowTotalInclTax;
	}

	public double getRowTotalInclTax(){
		return rowTotalInclTax;
	}

	public void setBaseTaxAmount(double baseTaxAmount){
		this.baseTaxAmount = baseTaxAmount;
	}

	public double getBaseTaxAmount(){
		return baseTaxAmount;
	}

	@Override
 	public String toString(){
		return 
			"ItemsItem{" + 
			"tax_amount = '" + taxAmount + '\'' + 
			",item_id = '" + itemId + '\'' + 
			",discount_amount = '" + discountAmount + '\'' + 
			",base_discount_amount = '" + baseDiscountAmount + '\'' + 
			",row_total = '" + rowTotal + '\'' + 
			",row_total_with_discount = '" + rowTotalWithDiscount + '\'' + 
			",weee_tax_applied_amount = '" + weeeTaxAppliedAmount + '\'' + 
			",tax_percent = '" + taxPercent + '\'' + 
			",base_row_total_incl_tax = '" + baseRowTotalInclTax + '\'' + 
			",base_price_incl_tax = '" + basePriceInclTax + '\'' + 
			",price_incl_tax = '" + priceInclTax + '\'' + 
			",price = '" + price + '\'' + 
			",weee_tax_applied = '" + weeeTaxApplied + '\'' + 
			",qty = '" + qty + '\'' + 
			",base_price = '" + basePrice + '\'' + 
			",options = '" + options + '\'' + 
			",name = '" + name + '\'' + 
			",base_row_total = '" + baseRowTotal + '\'' + 
			",discount_percent = '" + discountPercent + '\'' + 
			",row_total_incl_tax = '" + rowTotalInclTax + '\'' + 
			",base_tax_amount = '" + baseTaxAmount + '\'' + 
			"}";
		}
}
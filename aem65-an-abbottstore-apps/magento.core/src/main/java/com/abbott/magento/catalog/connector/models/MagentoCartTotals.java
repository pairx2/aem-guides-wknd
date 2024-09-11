package com.abbott.magento.catalog.connector.models;

import com.abbott.magento.core.connector.model.ItemsItem;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.annotation.Generated;
import java.util.List;

@Generated("com.robohorse.robopojogenerator")
public class MagentoCartTotals{

	@JsonProperty("baseSubtotal")
	private int baseSubtotal;

	@JsonProperty("baseShippingAmount")
	private int baseShippingAmount;

	@JsonProperty("totalSegments")
	private List<TotalSegmentsItem> totalSegments;

	@JsonProperty("discountAmount")
	private int discountAmount;

	@JsonProperty("subtotalWithDiscount")
	private int subtotalWithDiscount;

	@JsonProperty("shippingDiscountAmount")
	private int shippingDiscountAmount;

	@JsonProperty("quoteCurrencyCode")
	private String quoteCurrencyCode;

	@JsonProperty("shippingAmount")
	private int shippingAmount;

	@JsonProperty("baseShippingInclTax")
	private int baseShippingInclTax;

	@JsonProperty("baseShippingDiscountAmount")
	private int baseShippingDiscountAmount;

	@JsonProperty("weeeTaxAppliedAmount")
	private int weeeTaxAppliedAmount;

	@JsonProperty("baseShippingTaxAmount")
	private int baseShippingTaxAmount;

	@JsonProperty("grandTotal")
	private int grandTotal;

	@JsonProperty("extensionAttributes")
	private ExtensionAttributes extensionAttributes;

	@JsonProperty("baseSubtotalWithDiscount")
	private int baseSubtotalWithDiscount;

	@JsonProperty("baseSubtotalInclTax")
	private int baseSubtotalInclTax;

	@JsonProperty("itemsQty")
	private int itemsQty;

	@JsonProperty("baseGrandTotal")
	private int baseGrandTotal;

	@JsonProperty("baseTaxAmount")
	private int baseTaxAmount;

	@JsonProperty("subtotalInclTax")
	private int subtotalInclTax;

	@JsonProperty("baseDiscountAmount")
	private int baseDiscountAmount;

	@JsonProperty("baseCurrencyCode")
	private String baseCurrencyCode;

	@JsonProperty("subtotal")
	private int subtotal;

	@JsonProperty("taxAmount")
	private int taxAmount;

	@JsonProperty("couponCode")
	private String couponCode;

	@JsonProperty("items")
	private List<ItemsItem> items;

	@JsonProperty("shippingTaxAmount")
	private int shippingTaxAmount;

	@JsonProperty("shippingInclTax")
	private int shippingInclTax;

	public void setBaseSubtotal(int baseSubtotal){
		this.baseSubtotal = baseSubtotal;
	}

	public int getBaseSubtotal(){
		return baseSubtotal;
	}

	public void setBaseShippingAmount(int baseShippingAmount){
		this.baseShippingAmount = baseShippingAmount;
	}

	public int getBaseShippingAmount(){
		return baseShippingAmount;
	}

	public void setTotalSegments(List<TotalSegmentsItem> totalSegments){
		this.totalSegments = totalSegments;
	}

	public List<TotalSegmentsItem> getTotalSegments(){
		return totalSegments;
	}

	public void setDiscountAmount(int discountAmount){
		this.discountAmount = discountAmount;
	}

	public int getDiscountAmount(){
		return discountAmount;
	}

	public void setSubtotalWithDiscount(int subtotalWithDiscount){
		this.subtotalWithDiscount = subtotalWithDiscount;
	}

	public int getSubtotalWithDiscount(){
		return subtotalWithDiscount;
	}

	public void setShippingDiscountAmount(int shippingDiscountAmount){
		this.shippingDiscountAmount = shippingDiscountAmount;
	}

	public int getShippingDiscountAmount(){
		return shippingDiscountAmount;
	}

	public void setQuoteCurrencyCode(String quoteCurrencyCode){
		this.quoteCurrencyCode = quoteCurrencyCode;
	}

	public String getQuoteCurrencyCode(){
		return quoteCurrencyCode;
	}

	public void setShippingAmount(int shippingAmount){
		this.shippingAmount = shippingAmount;
	}

	public int getShippingAmount(){
		return shippingAmount;
	}

	public void setBaseShippingInclTax(int baseShippingInclTax){
		this.baseShippingInclTax = baseShippingInclTax;
	}

	public int getBaseShippingInclTax(){
		return baseShippingInclTax;
	}

	public void setBaseShippingDiscountAmount(int baseShippingDiscountAmount){
		this.baseShippingDiscountAmount = baseShippingDiscountAmount;
	}

	public int getBaseShippingDiscountAmount(){
		return baseShippingDiscountAmount;
	}

	public void setWeeeTaxAppliedAmount(int weeeTaxAppliedAmount){
		this.weeeTaxAppliedAmount = weeeTaxAppliedAmount;
	}

	public int getWeeeTaxAppliedAmount(){
		return weeeTaxAppliedAmount;
	}

	public void setBaseShippingTaxAmount(int baseShippingTaxAmount){
		this.baseShippingTaxAmount = baseShippingTaxAmount;
	}

	public int getBaseShippingTaxAmount(){
		return baseShippingTaxAmount;
	}

	public void setGrandTotal(int grandTotal){
		this.grandTotal = grandTotal;
	}

	public int getGrandTotal(){
		return grandTotal;
	}

	public void setExtensionAttributes(ExtensionAttributes extensionAttributes){
		this.extensionAttributes = extensionAttributes;
	}

	public ExtensionAttributes getExtensionAttributes(){
		return extensionAttributes;
	}

	public void setBaseSubtotalWithDiscount(int baseSubtotalWithDiscount){
		this.baseSubtotalWithDiscount = baseSubtotalWithDiscount;
	}

	public int getBaseSubtotalWithDiscount(){
		return baseSubtotalWithDiscount;
	}

	public void setBaseSubtotalInclTax(int baseSubtotalInclTax){
		this.baseSubtotalInclTax = baseSubtotalInclTax;
	}

	public int getBaseSubtotalInclTax(){
		return baseSubtotalInclTax;
	}

	public void setItemsQty(int itemsQty){
		this.itemsQty = itemsQty;
	}

	public int getItemsQty(){
		return itemsQty;
	}

	public void setBaseGrandTotal(int baseGrandTotal){
		this.baseGrandTotal = baseGrandTotal;
	}

	public int getBaseGrandTotal(){
		return baseGrandTotal;
	}

	public void setBaseTaxAmount(int baseTaxAmount){
		this.baseTaxAmount = baseTaxAmount;
	}

	public int getBaseTaxAmount(){
		return baseTaxAmount;
	}

	public void setSubtotalInclTax(int subtotalInclTax){
		this.subtotalInclTax = subtotalInclTax;
	}

	public int getSubtotalInclTax(){
		return subtotalInclTax;
	}

	public void setBaseDiscountAmount(int baseDiscountAmount){
		this.baseDiscountAmount = baseDiscountAmount;
	}

	public int getBaseDiscountAmount(){
		return baseDiscountAmount;
	}

	public void setBaseCurrencyCode(String baseCurrencyCode){
		this.baseCurrencyCode = baseCurrencyCode;
	}

	public String getBaseCurrencyCode(){
		return baseCurrencyCode;
	}

	public void setSubtotal(int subtotal){
		this.subtotal = subtotal;
	}

	public int getSubtotal(){
		return subtotal;
	}

	public void setTaxAmount(int taxAmount){
		this.taxAmount = taxAmount;
	}

	public int getTaxAmount(){
		return taxAmount;
	}

	public void setCouponCode(String couponCode){
		this.couponCode = couponCode;
	}

	public String getCouponCode(){
		return couponCode;
	}

	public void setItems(List<ItemsItem> items){
		this.items = items;
	}

	public List<ItemsItem> getItems(){
		return items;
	}

	public void setShippingTaxAmount(int shippingTaxAmount){
		this.shippingTaxAmount = shippingTaxAmount;
	}

	public int getShippingTaxAmount(){
		return shippingTaxAmount;
	}

	public void setShippingInclTax(int shippingInclTax){
		this.shippingInclTax = shippingInclTax;
	}

	public int getShippingInclTax(){
		return shippingInclTax;
	}

	@Override
 	public String toString(){
		return 
			"MagentoCartTotals{" + 
			"baseSubtotal = '" + baseSubtotal + '\'' + 
			",baseShippingAmount = '" + baseShippingAmount + '\'' + 
			",totalSegments = '" + totalSegments + '\'' + 
			",discountAmount = '" + discountAmount + '\'' + 
			",subtotalWithDiscount = '" + subtotalWithDiscount + '\'' + 
			",shippingDiscountAmount = '" + shippingDiscountAmount + '\'' + 
			",quoteCurrencyCode = '" + quoteCurrencyCode + '\'' + 
			",shippingAmount = '" + shippingAmount + '\'' + 
			",baseShippingInclTax = '" + baseShippingInclTax + '\'' + 
			",baseShippingDiscountAmount = '" + baseShippingDiscountAmount + '\'' + 
			",weeeTaxAppliedAmount = '" + weeeTaxAppliedAmount + '\'' + 
			",baseShippingTaxAmount = '" + baseShippingTaxAmount + '\'' + 
			",grandTotal = '" + grandTotal + '\'' + 
			",extensionAttributes = '" + extensionAttributes + '\'' + 
			",baseSubtotalWithDiscount = '" + baseSubtotalWithDiscount + '\'' + 
			",baseSubtotalInclTax = '" + baseSubtotalInclTax + '\'' + 
			",itemsQty = '" + itemsQty + '\'' + 
			",baseGrandTotal = '" + baseGrandTotal + '\'' + 
			",baseTaxAmount = '" + baseTaxAmount + '\'' + 
			",subtotalInclTax = '" + subtotalInclTax + '\'' + 
			",baseDiscountAmount = '" + baseDiscountAmount + '\'' + 
			",baseCurrencyCode = '" + baseCurrencyCode + '\'' + 
			",subtotal = '" + subtotal + '\'' + 
			",taxAmount = '" + taxAmount + '\'' + 
			",couponCode = '" + couponCode + '\'' + 
			",items = '" + items + '\'' + 
			",shippingTaxAmount = '" + shippingTaxAmount + '\'' + 
			",shippingInclTax = '" + shippingInclTax + '\'' + 
			"}";
		}
}
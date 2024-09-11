package com.abbott.magento.catalog.connector.models;

import com.abbott.magento.core.connector.model.ItemsItem;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MagentoCartInfo{

    @JsonProperty("tax_amount")
    private double taxAmount;

    @JsonProperty("coupon_code")
    private String couponCode;

    @JsonProperty("shipping_discount_amount")
    private double shippingDiscountAmount;

    public void setShippingDiscountAmount(double shippingDiscountAmount) {
        this.shippingDiscountAmount = shippingDiscountAmount;
    }

    @JsonProperty("discount_amount")
    private double discountAmount;

    @JsonProperty("items_qty")
    private int itemsQty;

    @JsonProperty("quote_currency_code")
    private String quoteCurrencyCode;

    @JsonProperty("base_subtotal_with_discount")
    private double baseSubtotalWithDiscount;

    @JsonProperty("weee_tax_applied_amount")
    private Object weeeTaxAppliedAmount;

    @JsonProperty("shipping_tax_amount")
    private double shippingTaxAmount;

    @JsonProperty("base_shipping_discount_amount")
    private double baseShippingDiscountAmount;

    @JsonProperty("grand_total")
    private double grandTotal;

    @JsonProperty("base_currency_code")
    private String baseCurrencyCode;

    @JsonProperty("base_tax_amount")
    private double baseTaxAmount;

    @JsonProperty("base_shipping_tax_amount")
    private double baseShippingTaxAmount;

    @JsonProperty("base_grand_total")
    private double baseGrandTotal;

    @JsonProperty("base_discount_amount")
    private double baseDiscountAmount;

    @JsonProperty("extension_attributes")
    private ExtensionAttributes extensionAttributes;

    @JsonProperty("shipping_amount")
    private double shippingAmount;

    @JsonProperty("base_shipping_amount")
    private double baseShippingAmount;

    @JsonProperty("subtotal_incl_tax")
    private double subtotalInclTax;

    @JsonProperty("subtotal_with_discount")
    private double subtotalWithDiscount;

    @JsonProperty("subtotal")
    private double subtotal;

    @JsonProperty("base_subtotal")
    private double baseSubtotal;

    @JsonProperty("base_shipping_incl_tax")
    private double baseShippingInclTax;

    @JsonProperty("items")
    private List<ItemsItem> items;

    @JsonProperty("total_segments")
    private List<TotalSegmentsItem> totalSegments;

    @JsonProperty("shipping_incl_tax")
    private double shippingInclTax;

    public void setTaxAmount(double taxAmount){
        this.taxAmount = taxAmount;
    }

    public double getTaxAmount(){
        return taxAmount;
    }

    public double getShippingDiscountAmount(){
        return shippingDiscountAmount;
    }

    public void setDiscountAmount(double discountAmount){
        this.discountAmount = discountAmount;
    }

    public double getDiscountAmount(){
        return discountAmount;
    }

    public void setItemsQty(int itemsQty){
        this.itemsQty = itemsQty;
    }

    public int getItemsQty(){
        return itemsQty;
    }

    public void setCouponCode(String couponCode){
        this.couponCode = couponCode;
    }

    public String getCouponCode(){
        return couponCode;
    }

    public void setQuoteCurrencyCode(String quoteCurrencyCode){
        this.quoteCurrencyCode = quoteCurrencyCode;
    }

    public String getQuoteCurrencyCode(){
        return quoteCurrencyCode;
    }

    public void setBaseSubtotalWithDiscount(double baseSubtotalWithDiscount){
        this.baseSubtotalWithDiscount = baseSubtotalWithDiscount;
    }

    public double getBaseSubtotalWithDiscount(){
        return baseSubtotalWithDiscount;
    }

    public void setWeeeTaxAppliedAmount(Object weeeTaxAppliedAmount){
        this.weeeTaxAppliedAmount = weeeTaxAppliedAmount;
    }

    public Object getWeeeTaxAppliedAmount(){
        return weeeTaxAppliedAmount;
    }

    public void setShippingTaxAmount(double shippingTaxAmount){
        this.shippingTaxAmount = shippingTaxAmount;
    }

    public double getShippingTaxAmount(){
        return shippingTaxAmount;
    }

    public void setBaseShippingDiscountAmount(int baseShippingDiscountAmount){
        this.baseShippingDiscountAmount = baseShippingDiscountAmount;
    }

    public double getBaseShippingDiscountAmount(){
        return baseShippingDiscountAmount;
    }

    public void setGrandTotal(double grandTotal){
        this.grandTotal = grandTotal;
    }

    public double getGrandTotal(){
        return grandTotal;
    }

    public void setBaseCurrencyCode(String baseCurrencyCode){
        this.baseCurrencyCode = baseCurrencyCode;
    }

    public String getBaseCurrencyCode(){
        return baseCurrencyCode;
    }

    public void setBaseTaxAmount(double baseTaxAmount){
        this.baseTaxAmount = baseTaxAmount;
    }

    public double getBaseTaxAmount(){
        return baseTaxAmount;
    }

    public void setBaseShippingTaxAmount(double baseShippingTaxAmount){
        this.baseShippingTaxAmount = baseShippingTaxAmount;
    }

    public double getBaseShippingTaxAmount(){
        return baseShippingTaxAmount;
    }

    public void setBaseGrandTotal(int baseGrandTotal){
        this.baseGrandTotal = baseGrandTotal;
    }

    public double getBaseGrandTotal(){
        return baseGrandTotal;
    }

    public void setBaseDiscountAmount(double baseDiscountAmount){
        this.baseDiscountAmount = baseDiscountAmount;
    }

    public double getBaseDiscountAmount(){
        return baseDiscountAmount;
    }

    public void setExtensionAttributes(ExtensionAttributes extensionAttributes){
        this.extensionAttributes = extensionAttributes;
    }

    public ExtensionAttributes getExtensionAttributes(){
        return extensionAttributes;
    }

    public void setShippingAmount(double shippingAmount){
        this.shippingAmount = shippingAmount;
    }

    public double getShippingAmount(){
        return shippingAmount;
    }

    public void setBaseShippingAmount(double baseShippingAmount){
        this.baseShippingAmount = baseShippingAmount;
    }

    public double getBaseShippingAmount(){
        return baseShippingAmount;
    }

    public void setSubtotalInclTax(double subtotalInclTax){
        this.subtotalInclTax = subtotalInclTax;
    }

    public double getSubtotalInclTax(){
        return subtotalInclTax;
    }

    public void setSubtotalWithDiscount(double subtotalWithDiscount){
        this.subtotalWithDiscount = subtotalWithDiscount;
    }

    public double getSubtotalWithDiscount(){
        return subtotalWithDiscount;
    }

    public void setSubtotal(double subtotal){
        this.subtotal = subtotal;
    }

    public double getSubtotal(){
        return subtotal;
    }

    public void setBaseSubtotal(double baseSubtotal){
        this.baseSubtotal = baseSubtotal;
    }

    public double getBaseSubtotal(){
        return baseSubtotal;
    }

    public void setBaseShippingInclTax(double baseShippingInclTax){
        this.baseShippingInclTax = baseShippingInclTax;
    }

    public double getBaseShippingInclTax(){
        return baseShippingInclTax;
    }

    public void setItems(List<ItemsItem> items){
    	List<ItemsItem> itemList=new ArrayList<>(items);
        this.items = itemList ;
    }

    public List<ItemsItem> getItems(){
        return Collections.unmodifiableList(items);
    }

    public void setTotalSegments(List<TotalSegmentsItem> totalSegments){
    	List<TotalSegmentsItem> segmentList=new ArrayList<>(totalSegments);
        this.totalSegments = segmentList;
    }

    public List<TotalSegmentsItem> getTotalSegments(){
        return Collections.unmodifiableList(totalSegments);
    }

    public void setShippingInclTax(int shippingInclTax){
        this.shippingInclTax = shippingInclTax;
    }

    public double getShippingInclTax(){
        return shippingInclTax;
    }

    @Override
    public String toString() {
        return "MagentoCartInfo{" +
                "taxAmount=" + taxAmount +
                ", shippingDiscountAmount=" + shippingDiscountAmount +
                ", discountAmount=" + discountAmount +
                ", itemsQty=" + itemsQty +
                ", quoteCurrencyCode='" + quoteCurrencyCode + '\'' +
                ", baseSubtotalWithDiscount=" + baseSubtotalWithDiscount +
                ", weeeTaxAppliedAmount=" + weeeTaxAppliedAmount +
                ", shippingTaxAmount=" + shippingTaxAmount +
                ", baseShippingDiscountAmount=" + baseShippingDiscountAmount +
                ", grandTotal=" + grandTotal +
                ", baseCurrencyCode='" + baseCurrencyCode + '\'' +
                ", baseTaxAmount=" + baseTaxAmount +
                ", baseShippingTaxAmount=" + baseShippingTaxAmount +
                ", baseGrandTotal=" + baseGrandTotal +
                ", baseDiscountAmount=" + baseDiscountAmount +
                ", extensionAttributes=" + extensionAttributes +
                ", shippingAmount=" + shippingAmount +
                ", baseShippingAmount=" + baseShippingAmount +
                ", subtotalInclTax=" + subtotalInclTax +
                ", subtotalWithDiscount=" + subtotalWithDiscount +
                ", subtotal=" + subtotal +
                ", baseSubtotal=" + baseSubtotal +
                ", baseShippingInclTax=" + baseShippingInclTax +
                ", items=" + items +
                ", totalSegments=" + totalSegments +
                ", shippingInclTax=" + shippingInclTax +
                '}';
    }
}
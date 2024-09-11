package com.abbott.magento.core.connector.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;


@JsonIgnoreProperties(ignoreUnknown = true)
public final class MagentoShippingResponse {
    public final PaymentMethod [] paymentMethods;
    public final Totals totals;

    @JsonCreator
    public MagentoShippingResponse(@JsonProperty("paymentMethods") PaymentMethod [] paymentMethods, @JsonProperty("totals") Totals totals){
        this.paymentMethods = paymentMethods;
        this.totals = totals;
    }

    public static final class PaymentMethod {
        public final String code;
        public final String title;

        @JsonCreator
        public PaymentMethod(@JsonProperty("code") String code, @JsonProperty("title") String title){
            this.code = code;
            this.title = title;
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class Totals {
        public final double grandTotal;
        public final double baseGrandTotal;
        public final long subtotal;
        public final long baseSubtotal;
        public final double discountAmount;
        public final double baseDiscountAmount;
        public final double subtotalWithDiscount;
        public final double baseSubtotalWithDiscount;
        public final long shippingAmount;
        public final long baseShippingAmount;
        public final long shippingDiscountAmount;
        public final long baseShippingDiscountAmount;
        public final long taxAmount;
        public final long baseTaxAmount;
        public final WeeeAaxAppliedAmount weeeTaxAppliedAmount;
        public final long shippingTaxAmount;
        public final long baseShippingTaxAmount;
        public final long subtotalInclTax;
        public final long shippingInclTax;
        public final long baseShippingInclTax;
        public final String baseCurrencyCode;
        public final String quoteCurrencyCode;
        public final long itemsQty;
        public final Item [] items;
        public final TotalSegment [] totalSegments;

        @JsonCreator
        public Totals(@JsonProperty("grandTotal") double grandTotal, @JsonProperty("baseGrandTotal") double baseGrandTotal, @JsonProperty("subtotal") long subtotal, @JsonProperty("baseSubtotal") long baseSubtotal, @JsonProperty("discountAmount") double discountAmount, @JsonProperty("baseDiscountAmount") double baseDiscountAmount, @JsonProperty("subtotalWithDiscount") double subtotalWithDiscount, @JsonProperty("baseSubtotalWithDiscount") double baseSubtotalWithDiscount, @JsonProperty("shippingAmount") long shippingAmount, @JsonProperty("baseShippingAmount") long baseShippingAmount, @JsonProperty("shippingDiscountAmount") long shippingDiscountAmount, @JsonProperty("baseShippingDiscountAmount") long baseShippingDiscountAmount, @JsonProperty("taxAmount") long taxAmount, @JsonProperty("baseTaxAmount") long baseTaxAmount, @JsonProperty("weeeTaxAppliedAmount") WeeeAaxAppliedAmount weeeTaxAppliedAmount, @JsonProperty("shippingTaxAmount") long shippingTaxAmount, @JsonProperty("baseShippingTaxAmount") long baseShippingTaxAmount, @JsonProperty("subtotalInclTax") long subtotalInclTax, @JsonProperty("shippingInclTax") long shippingInclTax, @JsonProperty("baseShippingInclTax") long baseShippingInclTax, @JsonProperty("baseCurrencyCode") String baseCurrencyCode, @JsonProperty("quoteCurrencyCode") String quoteCurrencyCode, @JsonProperty("itemsQty") long itemsQty, @JsonProperty("items") Item[] items, @JsonProperty("totalSegments") TotalSegment[] totalSegments){
            this.grandTotal = grandTotal;
            this.baseGrandTotal = baseGrandTotal;
            this.subtotal = subtotal;
            this.baseSubtotal = baseSubtotal;
            this.discountAmount = discountAmount;
            this.baseDiscountAmount = baseDiscountAmount;
            this.subtotalWithDiscount = subtotalWithDiscount;
            this.baseSubtotalWithDiscount = baseSubtotalWithDiscount;
            this.shippingAmount = shippingAmount;
            this.baseShippingAmount = baseShippingAmount;
            this.shippingDiscountAmount = shippingDiscountAmount;
            this.baseShippingDiscountAmount = baseShippingDiscountAmount;
            this.taxAmount = taxAmount;
            this.baseTaxAmount = baseTaxAmount;
            this.weeeTaxAppliedAmount = weeeTaxAppliedAmount;
            this.shippingTaxAmount = shippingTaxAmount;
            this.baseShippingTaxAmount = baseShippingTaxAmount;
            this.subtotalInclTax = subtotalInclTax;
            this.shippingInclTax = shippingInclTax;
            this.baseShippingInclTax = baseShippingInclTax;
            this.baseCurrencyCode = baseCurrencyCode;
            this.quoteCurrencyCode = quoteCurrencyCode;
            this.itemsQty = itemsQty;
            this.items = items;
            this.totalSegments = totalSegments;
        }

        @JsonIgnoreProperties(ignoreUnknown = true)
        public static final class WeeeAaxAppliedAmount {

            @JsonCreator
            public WeeeAaxAppliedAmount(){
            	throw new UnsupportedOperationException();
            }
        }


        @JsonIgnoreProperties(ignoreUnknown = true)
        public static final class Item {
            public final long itemId;
            public final long price;
            public final long basePrice;
            public final long qty;
            public final long rowTotal;
            public final long baseRowTotal;
            public final long rowTotalWithDiscount;
            public final long taxAmount;
            public final long baseTaxAmount;
            public final long taxPercent;
            public final long discountAmount;
            public final long baseDiscountAmount;
            public final long discountPercent;
            public final long priceInclTax;
            public final long basePriceInclTax;
            public final long rowTotalInclTax;
            public final long baseRowTotalInclTax;
            public final String options;
            public final String name;

            @JsonCreator
            public Item(@JsonProperty("itemId") long itemId, @JsonProperty("price") long price, @JsonProperty("basePrice") long basePrice, @JsonProperty("qty") long qty, @JsonProperty("rowTotal") long rowTotal, @JsonProperty("baseRowTotal") long baseRowTotal, @JsonProperty("rowTotalWithDiscount") long rowTotalWithDiscount, @JsonProperty("taxAmount") long taxAmount, @JsonProperty("baseTaxAmount") long baseTaxAmount, @JsonProperty("taxPercent") long taxPercent, @JsonProperty("discountAmount") long discountAmount, @JsonProperty("baseDiscountAmount") long baseDiscountAmount, @JsonProperty("discountPercent") long discountPercent, @JsonProperty("priceInclTax") long priceInclTax, @JsonProperty("basePriceInclTax") long basePriceInclTax, @JsonProperty("rowTotalInclTax") long rowTotalInclTax, @JsonProperty("baseRowTotalInclTax") long baseRowTotalInclTax, @JsonProperty("options") String options, @JsonProperty("name") String name){
                this.itemId = itemId;
                this.price = price;
                this.basePrice = basePrice;
                this.qty = qty;
                this.rowTotal = rowTotal;
                this.baseRowTotal = baseRowTotal;
                this.rowTotalWithDiscount = rowTotalWithDiscount;
                this.taxAmount = taxAmount;
                this.baseTaxAmount = baseTaxAmount;
                this.taxPercent = taxPercent;
                this.discountAmount = discountAmount;
                this.baseDiscountAmount = baseDiscountAmount;
                this.discountPercent = discountPercent;
                this.priceInclTax = priceInclTax;
                this.basePriceInclTax = basePriceInclTax;
                this.rowTotalInclTax = rowTotalInclTax;
                this.baseRowTotalInclTax = baseRowTotalInclTax;
                this.options = options;
                this.name = name;
            }
        }


        @JsonIgnoreProperties(ignoreUnknown = true)
        public static final class TotalSegment {
            public final String code;
            public final String title;
            public final double value;
            public final ExtensionAttributes extensionAttributes;
            public final String area;

            @JsonCreator
            public TotalSegment(@JsonProperty("code") String code, @JsonProperty("title") String title, @JsonProperty("value") double value, @JsonProperty(value="extensionAttributes", required=false) ExtensionAttributes extensionAttributes, @JsonProperty(value="area", required=false) String area){
                this.code = code;
                this.title = title;
                this.value = value;
                this.extensionAttributes = extensionAttributes;
                this.area = area;
            }

            @JsonIgnoreProperties(ignoreUnknown = true)
            public static final class ExtensionAttributes {
                public final TaxGrandtotalDetail [] taxGrandTotalDetails;

                @JsonCreator
                public ExtensionAttributes(@JsonProperty("taxGrandTotalDetails") TaxGrandtotalDetail[] taxGrandTotalDetails){
                    this.taxGrandTotalDetails = taxGrandTotalDetails;
                }

                @JsonIgnoreProperties(ignoreUnknown = true)
                public static final class TaxGrandtotalDetail {

                    @JsonCreator
                    public TaxGrandtotalDetail(){
                    	throw new UnsupportedOperationException();
                    }
                }
            }
        }
    }
}

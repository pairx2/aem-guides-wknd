package com.abbott.aem.adc.freestylelibrede.dto;
import lombok.Setter;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

public class ProductDto {

	@Getter
	@Setter
	private String productBadgev2;

	@Getter
	@Setter
	private String productHeadlinev2;

	@Getter
	@Setter
	private String productDescriptionv2;

	@Getter
	@Setter
	private String selectionSublinev2;

	private String productDescription;
	@Getter
	@Setter
	private String[] productImage;

	@Getter
	@Setter
	private String variantDescription;

	@Getter
	@Setter
	private String variantHeading;

	@Getter
	@Setter
	private String[] productSku;
	@Getter
	@Setter
	private List<VideoList> videoList = new ArrayList<>();

	private String quantityOrder;

	private String commonImage;

	private String productUrl;

	@Getter
	@Setter
	private String label;

	@Getter
	@Setter
	private String variantHeadlinev2;

	@Getter
	@Setter
	private String variantDescriptionv2;

	@Getter
	@Setter
	private String variantBadgev2;

	@Getter
	@Setter
	private String variantPriceSublinev2;

	@Getter
	@Setter
	private String variantPriceDescriptionv2;

	@Getter
	@Setter
	private String variantButtonLabelv2;

	@Getter
	@Setter
	private String variantButtonUrlv2;	
	
	/**
	 * @return the quantityOrder
	 */
	public String getQuantityOrder() {
		return quantityOrder;
	}

	/**
	 * @return the productDescription
	 */
	public String getProductDescription() {
		return productDescription;
	}

	/**
	 * @return the productUrl
	 */
	public String getProductUrl() {
		return productUrl;
	}

	/**
	 * @return the productUrl
	 */
	public String getCommonImage() {
		return commonImage;
	}

	public void setProductDescription(String productDescription) {
		this.productDescription = productDescription;
	}

	public void setQuantityOrder(String quantityOrder) {
		this.quantityOrder = quantityOrder;
	}

	public void setCommonImage(String commonImage) {
		this.commonImage = commonImage;
	}

	public void setProductUrl(String productUrl) {
		this.productUrl = productUrl;
	}

}

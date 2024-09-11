/*
 * 
 */
package com.abbott.aem.an.abbottstore.beans;

import org.apache.sling.api.resource.ValueMap;

/**
 * The Class ProductListBean.
 */
public class ProductListBean {

	/** The name. */
	private String name;

	/** The description. */
	private String description;

	/** The cans X. */
	private String cansX;

	/** The cans Y. */
	private String cansY;

	/** The price. */
	private double price;

	/** The special price. */
	private String specialPrice;

	/** The image. */
	private String image;

	/** The size or weight. */
	private String sizeOrWeight;

	/** The custom discount. */
	private String customDiscount;

	/** The Sku. */
	private String skuId;

	/** The page path. */
	private String pagePath;

	private ValueMap properties;

	/**
	 * Gets the name.
	 *
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * Gets the description.
	 *
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * Sets the description.
	 *
	 * @param description the new description
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * Sets the name.
	 *
	 * @param name the new name
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * Gets the cans X.
	 *
	 * @return the cans X
	 */
	public String getCansX() {
		return cansX;
	}

	/**
	 * Sets the cans X.
	 *
	 * @param cansX the new cans X
	 */
	public void setCansX(String cansX) {
		this.cansX = cansX;
	}

	/**
	 * Gets the cans Y.
	 *
	 * @return the cans Y
	 */
	public String getCansY() {
		return cansY;
	}

	/**
	 * Sets the cans Y.
	 *
	 * @param cansY the new cans Y
	 */
	public void setCansY(String cansY) {
		this.cansY = cansY;
	}

	/**
	 * Gets the price.
	 *
	 * @return the price
	 */
	public double getPrice() {
		return price;
	}

	/**
	 * Sets the price.
	 *
	 * @param price the new price
	 */
	public void setPrice(double price) {
		this.price = price;
	}

	/**
	 * Gets the special price.
	 *
	 * @return the special price
	 */
	public String getSpecialPrice() {
		return specialPrice;
	}

	/**
	 * Sets the special price.
	 *
	 * @param specialPrice the new special price
	 */
	public void setSpecialPrice(String specialPrice) {
		this.specialPrice = specialPrice;
	}

	/**
	 * Gets the images.
	 *
	 * @return the images
	 */
	public String getImage() {
		return image;
	}

	/**
	 * Sets the image.
	 *
	 * @param image the new image
	 */
	public void setImage(String image) {
		this.image = image;
	}

	/**
	 * Gets the size or weight.
	 *
	 * @return the size or weight
	 */
	public String getSizeOrWeight() {
		return sizeOrWeight;
	}

	/**
	 * Sets the size or weight.
	 *
	 * @param sizeOrWeight the new size or weight
	 */
	public void setSizeOrWeight(String sizeOrWeight) {
		this.sizeOrWeight = sizeOrWeight;
	}

	/**
	 * Gets the custom discount.
	 *
	 * @return the custom discount
	 */
	public String getCustomDiscount() {
		return customDiscount;
	}

	/**
	 * Sets the custom discount.
	 *
	 * @param customDiscount the new custom discount
	 */
	public void setCustomDiscount(String customDiscount) {
		this.customDiscount = customDiscount;
	}

	/**
	 * Gets the sku id.
	 *
	 * @return the sku id
	 */
	public String getSkuId() {
		return skuId;
	}

	/**
	 * Sets the sku id.
	 *
	 * @param skuId the new sku id
	 */
	public void setSkuId(String skuId) {
		this.skuId = skuId;
	}

	/**
	 * Gets the page path.
	 *
	 * @return the page path
	 */
	public String getPagePath() {
		return pagePath;
	}

	/**
	 * Sets the page path.
	 *
	 * @param pagePath the new page path
	 */
	public void setPagePath(String pagePath) {
		this.pagePath = pagePath;
	}

	public ValueMap getProperties() {
		return properties;
	}

	public void setProperties(ValueMap properties) {
		this.properties = properties;
	}
}

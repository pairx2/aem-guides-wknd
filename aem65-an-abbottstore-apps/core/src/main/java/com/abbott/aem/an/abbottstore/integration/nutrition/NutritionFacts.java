package com.abbott.aem.an.abbottstore.integration.nutrition;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import lombok.Getter;
import lombok.Setter;

import java.util.Arrays;

/**
 *
 * @author bhano.r, saikrishna.s
 * 
 *         NutritionFacts
 * 
 *         NutritionFacts is the Pojo class to hold the details of individual
 *         NutritionFacts.
 * 
 *         Version Number: 1.0
 */
public class NutritionFacts {

	/** The brand. */
	@SerializedName("Brand")
	@Expose
	private String brand;

	/** The product name. */
	@SerializedName("ProductName")
	@Expose
	private String productName;

	/** The flavors. */
	@SerializedName("Flavors")
	@Expose
	@Getter
	@Setter
	private Flavors[] flavors;

	/** The a P igenerated at. */
	@SerializedName("APIgeneratedAt")
	@Expose
	private String aPIgeneratedAt;

	/** The published at. */
	@SerializedName("PublishedAt")
	@Expose
	private String publishedAt;

	/**
	 * Gets the brand.
	 *
	 * @return the brand
	 */
	public String getBrand() {
		return brand;
	}

	/**
	 * Sets the brand.
	 *
	 * @param brand the new brand
	 */
	public void setBrand(String brand) {
		this.brand = brand;
	}

	/**
	 * Gets the product name.
	 *
	 * @return the product name
	 */
	public String getProductName() {
		return productName;
	}

	/**
	 * Sets the product name.
	 *
	 * @param productName the new product name
	 */
	public void setProductName(String productName) {
		this.productName = productName;
	}


	/**
	 * Gets the a P igenerated at.
	 *
	 * @return the a P igenerated at
	 */
	public String getAPIgeneratedAt() {
		return aPIgeneratedAt;
	}

	/**
	 * Sets the a P igenerated at.
	 *
	 * @param aPIgeneratedAt the new a P igenerated at
	 */
	public void setAPIgeneratedAt(String aPIgeneratedAt) {
		this.aPIgeneratedAt = aPIgeneratedAt;
	}

	/**
	 * Gets the published at.
	 *
	 * @return the published at
	 */
	public String getPublishedAt() {
		return publishedAt;
	}

	/**
	 * Sets the published at.
	 *
	 * @param publishedAt the new published at
	 */
	public void setPublishedAt(String publishedAt) {
		this.publishedAt = publishedAt;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "NutritionFacts [brand=" + brand + ", productName=" + productName + ", flavors="
				+ Arrays.toString(flavors) + ", aPIgeneratedAt=" + aPIgeneratedAt + ", publishedAt=" + publishedAt
				+ "]";
	}
}

package com.abbott.aem.an.similac.integration.nutrition;

import java.util.Arrays;
import java.util.Objects;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import lombok.Getter;
import lombok.Setter;

/**
 * NutritionFacts <br>
 * NutritionFacts is the Pojo class to hold the details of individual
 * NutritionFacts. <br>
 * Version Number: 1.0
 *
 * @author bhano.r, saikrishna.s
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
	@Setter
	@Getter
	private Flavors[] flavors;

	/** The API generated at. */
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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + Arrays.hashCode(flavors);
		result = prime * result + Objects.hash(aPIgeneratedAt, brand, productName, publishedAt);
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!(obj instanceof NutritionFacts)) {
			return false;
		}
		NutritionFacts other = (NutritionFacts) obj;
		return Objects.equals(aPIgeneratedAt, other.aPIgeneratedAt) && Objects.equals(brand, other.brand)
				&& Arrays.equals(flavors, other.flavors) && Objects.equals(productName, other.productName)
				&& Objects.equals(publishedAt, other.publishedAt);
	}
}

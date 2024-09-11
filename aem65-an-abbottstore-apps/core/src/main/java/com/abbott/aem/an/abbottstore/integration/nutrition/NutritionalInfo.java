package com.abbott.aem.an.abbottstore.integration.nutrition;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 *
 * @author bhano.r, saikrishna.s
 * 
 *         NutritionalInfo
 * 
 *         NutritionalInfo is the Pojo class to hold the details of individual
 *         NutritionalInfo.
 * 
 *         Version Number: 1.0
 */
public class NutritionalInfo {

	/** The nutrition value. */
	@SerializedName("NutritionValue")
	@Expose
	private String nutritionValue;

	/** The nutrition category. */
	@SerializedName("NutritionCategory")
	@Expose
	private String nutritionCategory;

	/** The nutrition name. */
	@SerializedName("NutritionName")
	@Expose
	private String nutritionName;

	/** The percent DV. */
	@SerializedName("PercentDV")
	@Expose
	private String percentDV;

	/** The percent RDI. */
	@SerializedName("PercentRDI")
	@Expose
	private String percentRDI;

	/** The line number. */
	@SerializedName("LineNumber")
	@Expose
	private String lineNumber;

	/**
	 * Gets the nutrition value.
	 *
	 * @return the nutrition value
	 */
	public String getNutritionValue() {
		return nutritionValue;
	}

	/**
	 * Sets the nutrition value.
	 *
	 * @param nutritionValue the new nutrition value
	 */
	public void setNutritionValue(String nutritionValue) {
		this.nutritionValue = nutritionValue;
	}

	/**
	 * Gets the nutrition category.
	 *
	 * @return the nutrition category
	 */
	public String getNutritionCategory() {
		return nutritionCategory;
	}

	/**
	 * Sets the nutrition category.
	 *
	 * @param nutritionCategory the new nutrition category
	 */
	public void setNutritionCategory(String nutritionCategory) {
		this.nutritionCategory = nutritionCategory;
	}

	/**
	 * Gets the nutrition name.
	 *
	 * @return the nutrition name
	 */
	public String getNutritionName() {
		return nutritionName;
	}

	/**
	 * Sets the nutrition name.
	 *
	 * @param nutritionName the new nutrition name
	 */
	public void setNutritionName(String nutritionName) {
		this.nutritionName = nutritionName;
	}

	/**
	 * Gets the percent DV.
	 *
	 * @return the percent DV
	 */
	public String getPercentDV() {
		return percentDV;
	}

	/**
	 * Sets the percent DV.
	 *
	 * @param percentDV the new percent DV
	 */
	public void setPercentDV(String percentDV) {
		this.percentDV = percentDV;
	}

	/**
	 * Gets the percent RDI.
	 *
	 * @return the percent RDI
	 */
	public String getPercentRDI() {
		return percentRDI;
	}

	/**
	 * Sets the percent RDI.
	 *
	 * @param percentRDI the new percent RDI
	 */
	public void setPercentRDI(String percentRDI) {
		this.percentRDI = percentRDI;
	}

	/**
	 * Gets the line number.
	 *
	 * @return the line number
	 */
	public String getLineNumber() {
		return lineNumber;
	}

	/**
	 * Sets the line number.
	 *
	 * @param lineNumber the new line number
	 */
	public void setLineNumber(String lineNumber) {
		this.lineNumber = lineNumber;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "NutritionalInfo [nutritionValue=" + nutritionValue + ", nutritionCategory=" + nutritionCategory
				+ ", nutritionName=" + nutritionName + ", percentDV=" + percentDV + ", percentRDI=" + percentRDI
				+ ", lineNumber=" + lineNumber + "]";
	}
}

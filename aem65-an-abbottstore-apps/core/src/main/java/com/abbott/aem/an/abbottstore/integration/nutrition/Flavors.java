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
 *         Flavors
 * 
 *         Flavors is the Pojo class to hold the details of individual Flavor.
 * 
 *         Version Number: 1.0
 */
public class Flavors {

	/** The flavor name. */
	@SerializedName("FlavorName")
	@Expose
	private String flavorName;

	/** The dietary categories. */
	@SerializedName("DietaryCategories")
	@Expose
	@Getter
	@Setter
	private String[] dietaryCategories;

	/** The packages. */
	@SerializedName("Packages")
	@Expose
	@Getter
	@Setter
	private String[] packages;

	/** The ingredients. */
	@SerializedName("Ingredients")
	@Expose
	private String ingredients;

	/** The serving sizes. */
	@SerializedName("ServingSizes")
	@Expose
	@Getter
	@Setter
	private ServingSizes[] servingSizes;

	/** The a code. */
	@SerializedName("ACode")
	@Expose
	private String aCode;

	/** The allergen statement. */
	@SerializedName("AllergenStatement")
	@Expose
	private String allergenStatement;

	/**
	 * Gets the flavor name.
	 *
	 * @return the flavor name
	 */
	public String getFlavorName() {
		return flavorName;
	}

	/**
	 * Sets the flavor name.
	 *
	 * @param flavorName the new flavor name
	 */
	public void setFlavorName(String flavorName) {
		this.flavorName = flavorName;
	}

	/**
	 * Gets the ingredients.
	 *
	 * @return the ingredients
	 */
	public String getIngredients() {
		return ingredients;
	}

	/**
	 * Sets the ingredients.
	 *
	 * @param ingredients the new ingredients
	 */
	public void setIngredients(String ingredients) {
		this.ingredients = ingredients;
	}

	/**
	 * Gets the a code.
	 *
	 * @return the a code
	 */
	public String getACode() {
		return aCode;
	}

	/**
	 * Sets the acode.
	 *
	 * @param aCode the new acode
	 */
	public void setACode(String aCode) {
		this.aCode = aCode;
	}

	/**
	 * Gets the allergen statement.
	 *
	 * @return the allergen statement
	 */
	public String getAllergenStatement() {
		return allergenStatement;
	}

	/**
	 * Sets the allergen statement.
	 *
	 * @param allergenStatement the new allergen statement
	 */
	public void setAllergenStatement(String allergenStatement) {
		this.allergenStatement = allergenStatement;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "Flavors [flavorName=" + flavorName + ", dietaryCategories=" + Arrays.toString(dietaryCategories)
				+ ", packages=" + Arrays.toString(packages) + ", ingredients=" + ingredients + ", servingSizes="
				+ Arrays.toString(servingSizes) + ", aCode=" + aCode + ", allergenStatement=" + allergenStatement + "]";
	}

}

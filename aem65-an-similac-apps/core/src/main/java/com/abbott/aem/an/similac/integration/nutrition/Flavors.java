package com.abbott.aem.an.similac.integration.nutrition;

import java.util.Arrays;
import java.util.Objects;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import lombok.Getter;
import lombok.Setter;

/**
 * Flavors
 * <br>
 * Flavors is the Pojo class to hold the details of individual Flavor.
 * <br>
 * Version Number: 1.0
 *
 * @author bhano.r, saikrishna.s
 */
public class Flavors {

	/** The flavor name. */
	@SerializedName("FlavorName")
	@Expose
	private String flavorName;

	/** The dietary categories. */
	@SerializedName("DietaryCategories")
	@Expose
	@Setter
	@Getter
	private String[] dietaryCategories;

	/** The packages. */
	@SerializedName("Packages")
	@Expose
	@Setter
	@Getter
	private String[] packages;

	/** The ingredients. */
	@SerializedName("Ingredients")
	@Expose
	private String ingredients;

	/** The serving sizes. */
	@SerializedName("ServingSizes")
	@Expose
	@Setter
	@Getter
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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + Arrays.hashCode(dietaryCategories);
		result = prime * result + Arrays.hashCode(packages);
		result = prime * result + Arrays.hashCode(servingSizes);
		result = prime * result + Objects.hash(aCode, allergenStatement, flavorName, ingredients);
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!(obj instanceof Flavors)) {
			return false;
		}
		Flavors other = (Flavors) obj;
		return Objects.equals(aCode, other.aCode) && Objects.equals(allergenStatement, other.allergenStatement)
				&& Arrays.equals(dietaryCategories, other.dietaryCategories)
				&& Objects.equals(flavorName, other.flavorName) && Objects.equals(ingredients, other.ingredients)
				&& Arrays.equals(packages, other.packages) && Arrays.equals(servingSizes, other.servingSizes);
	}

}

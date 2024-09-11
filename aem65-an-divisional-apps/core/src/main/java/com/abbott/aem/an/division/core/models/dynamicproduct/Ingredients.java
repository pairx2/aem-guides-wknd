
package com.abbott.aem.an.division.core.models.dynamicproduct;

import com.abbott.aem.an.division.core.utils.Utils;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Ingredients {
	
	@JsonProperty("ACode")
	private String aCode;

	@JsonProperty("FlavorName")
	private String flavorName;	

	private String flavorNameOverride;

	@JsonProperty("Ingredients")
	private String ingredientsData;

	
	@JsonProperty("formulationType")
	private String formulationType;
	
	@JsonProperty("AllergenStatement")
	private String allergenStatement;

	@JsonProperty("image")
	private String image;

	@JsonProperty("FlavorName")
	public String getFlavorName() {
		return flavorName;
	}

	@JsonProperty("FlavorName")
	public void setFlavorName(String flavorName) {
		this.flavorName = flavorName;
	}

	public String getFlavorNameOverride() {
		if (null != flavorNameOverride && !flavorNameOverride.isEmpty()) {
			return flavorNameOverride;
		} else {
			return flavorName;
		}
	}

	public void setFlavorNameOverride(String flavorNameOverride) {
		this.flavorNameOverride = flavorNameOverride;
	}

	@JsonProperty("ACode")
	public void setACode(String aCode) {
		this.aCode = aCode;
	}
	
	@JsonProperty("ACode")
	public String getACode() {
		return aCode;
	}

	@JsonProperty("Ingredients")
	public void setIngredients(String ingredients) {
		this.ingredientsData = ingredients;
	}

	@JsonProperty("Ingredients")
	public String getIngredients() {
		return ingredientsData;
	}
	
	@JsonProperty("AllergenStatement")
	public void setAllergenStatement(String allergenStatement) {
		this.allergenStatement = allergenStatement;
	}

	@JsonProperty("AllergenStatement")
	public String getAllergenStatement() {
		return allergenStatement;
	}
	
	@JsonProperty("image")
	public void setImage(String image) {
		Utils objUtils = new Utils();
		this.image = objUtils.getImagePathUrl(image);
	}


	@JsonProperty("image")
	public String getImage() {
		return image;
	}

	@JsonProperty("formulationType")
	public void setFormulationType(String formulationType) {
		this.formulationType = formulationType;
	}
	
	@JsonProperty("formulationType")
	public String getFormulationType() {
		return formulationType;
	}


}


package com.abbott.aem.an.division.core.models.dynamicproduct;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class NutritionalInfo implements Comparable<NutritionalInfo> {

	@JsonProperty("LineNumber")
	private Integer lineNumber;

	@JsonProperty("NutritionName")
	private String nutritionName;

	@JsonProperty("NutritionCategory")
	private String nutritionCategory;

	@JsonProperty("NutritionValue")
	private String nutritionValue;

	@JsonProperty("PercentDV")
	private String percentDV;

	@JsonProperty("IndentCount")
	private String indentCount;

	@JsonProperty("PercentRDI")
	private String percentRDI;

	@JsonProperty("LineNumber")
	public Integer getLineNumber() {
		return lineNumber;
	}

	@JsonProperty("LineNumber")
	public void setLineNumber(Integer lineNumber) {
		this.lineNumber = lineNumber;
	}

	@JsonProperty("NutritionName")
	public String getNutritionName() {
		return nutritionName;
	}

	@JsonProperty("NutritionName")
	public void setNutritionName(String nutritionName) {
		this.nutritionName = nutritionName;
	}

	@JsonProperty("NutritionCategory")
	public String getNutritionCategory() {
		return nutritionCategory;
	}

	@JsonProperty("NutritionCategory")
	public void setNutritionCategory(String nutritionCategory) {
		this.nutritionCategory = nutritionCategory;
	}

	@JsonProperty("NutritionValue")
	public String getNutritionValue() {
		return nutritionValue;
	}

	@JsonProperty("NutritionValue")
	public void setNutritionValue(String nutritionValue) {
		this.nutritionValue = nutritionValue;
	}

	@JsonProperty("PercentDV")
	public String getPercentDV() {
		return percentDV;
	}

	@JsonProperty("PercentDV")
	public void setPercentDV(String percentDV) {
		this.percentDV = percentDV;
		
	}@JsonProperty("IndentCount")
	public String getIndentCount() {
		return indentCount;
	}

	@JsonProperty("IndentCount")
	public void setIndentCount(String indentCount) {
		this.indentCount = indentCount;
	}

	@JsonProperty("PercentRDI")
	public String getPercentRDI() {
		return percentRDI;
	}

	@JsonProperty("PercentRDI")
	public void setPercentRDI(String percentRDI) {
		this.percentRDI = percentRDI;
	}

	@Override
	public int compareTo(NutritionalInfo e) {
		return this.getLineNumber().compareTo(e.getLineNumber());
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == null)
			return false;
		if (this.getClass() != obj.getClass())
			return false;
		NutritionalInfo nutritionalInfo = (NutritionalInfo) obj;
		return lineNumber.equals(nutritionalInfo.getLineNumber());
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((lineNumber == null) ? 0 : lineNumber.hashCode());
		return result;
	}
}

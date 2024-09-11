
package com.abbott.aem.an.division.core.models.product;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class NutritionalInfo {

    @JsonProperty("LineNumber")
    private Integer lineNumber;
    @JsonProperty("NutritionCategory")
    private String nutritionCategory;
    @JsonProperty("NutritionName")
    private String nutritionName;
    @JsonProperty("NutritionValue")
    private String nutritionValue;
    @JsonProperty("PercentDV")
    private Object percentDV;
    @JsonProperty("PercentRDI")
    private Object percentRDI;

    @JsonProperty("LineNumber")
    public Integer getLineNumber() {
        return lineNumber;
    }

    @JsonProperty("LineNumber")
    public void setLineNumber(Integer lineNumber) {
        this.lineNumber = lineNumber;
    }

    @JsonProperty("NutritionCategory")
    public String getNutritionCategory() {
        return nutritionCategory;
    }

    @JsonProperty("NutritionCategory")
    public void setNutritionCategory(String nutritionCategory) {
        this.nutritionCategory = nutritionCategory;
    }

    @JsonProperty("NutritionName")
    public String getNutritionName() {
        return nutritionName;
    }

    @JsonProperty("NutritionName")
    public void setNutritionName(String nutritionName) {
        this.nutritionName = nutritionName;
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
    public Object getPercentDV() {
        return percentDV;
    }

    @JsonProperty("PercentDV")
    public void setPercentDV(Object percentDV) {
        this.percentDV = percentDV;
    }

    @JsonProperty("PercentRDI")
    public Object getPercentRDI() {
        return percentRDI;
    }

    @JsonProperty("PercentRDI")
    public void setPercentRDI(Object percentRDI) {
        this.percentRDI = percentRDI;
    }

}

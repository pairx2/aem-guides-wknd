
package com.abbott.aem.an.division.core.models.product;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Flavor {

    @JsonProperty("ACode")
    private String aCode;
    @JsonProperty("FlavorName")
    private String flavorName;
    private String flavorNameOverride;
    @JsonProperty("Ingredients")
    private String ingredients;
    @JsonProperty("AllergenStatement")
    private String allergenStatement;
    @JsonProperty("Packages")
    private List<String> packages = Collections.emptyList();
    @JsonProperty("DietaryCategories")
    private List<String> dietaryCategories = Collections.emptyList();
    @JsonProperty("ServingSizes")
    private List<ServingSize> servingSizes = Collections.emptyList();
    
    @JsonProperty("FlavorName")
    public String getFlavorName() {
        return flavorName;
    }

    @JsonProperty("FlavorName")
    public void setFlavorName(String flavorName) {
        this.flavorName = flavorName;
    }

    @JsonProperty("ACode")
    public String getACode() {
        return aCode;
    }

    @JsonProperty("ACode")
    public void setACode(String aCode) {
        this.aCode = aCode;
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

    @JsonProperty("Ingredients")
    public String getIngredients() {
        return ingredients;
    }

    @JsonProperty("Ingredients")
    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    @JsonProperty("AllergenStatement")
    public String getAllergenStatement() {
        return allergenStatement;
    }

    @JsonProperty("AllergenStatement")
    public void setAllergenStatement(String allergenStatement) {
        this.allergenStatement = allergenStatement;
    }

    @JsonProperty("Packages")
    public List<String> getPackages() {
        return new ArrayList<>(packages);
    }

    @JsonProperty("Packages")
    public void setPackages(List<String> packages) {
        packages = new ArrayList<>(packages);
        this.packages = Collections.unmodifiableList(packages);
    }

    @JsonProperty("DietaryCategories")
    public List<String> getDietaryCategories() {
        return new ArrayList<>(dietaryCategories);
    }

    @JsonProperty("DietaryCategories")
    public void setDietaryCategories(List<String> dietaryCategories) {
        dietaryCategories = new ArrayList<>(dietaryCategories);
        this.dietaryCategories = Collections.unmodifiableList(dietaryCategories);
    }

    @JsonProperty("ServingSizes")
    public List<ServingSize> getServingSizes() {
        return new ArrayList<>(servingSizes);
    }

    @JsonProperty("ServingSizes")
    public void setServingSizes(List<ServingSize> servingSizes) {
        servingSizes = new ArrayList<>(servingSizes);
        this.servingSizes = Collections.unmodifiableList(servingSizes);
    }

}

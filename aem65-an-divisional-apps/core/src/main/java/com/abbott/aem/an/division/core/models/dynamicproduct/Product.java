
package com.abbott.aem.an.division.core.models.dynamicproduct;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Product {

	@JsonProperty("Id")
	private String id;
	
	@JsonProperty("ProductName")
	private String productName;
	
	@JsonProperty("CommonName")
	private String commonName;

	@JsonProperty("Description")
	private String description;

	@JsonProperty("Learnmore")
	private String learnmore;

	@JsonProperty("ProductJson")
	private String productJson;

	@Inject
	@JsonProperty("Product")
	private Product productInfo;

	@JsonProperty("Brand")
	private String brand;

	@JsonProperty("defaultFormulationCode")
	private String defaultFormulationCode;	
	
	@JsonProperty("approvalDateTime")
	private String approvalDateTime;
	
	@JsonProperty("publishedDateTime")
	private String publishedDateTime;
	
	@JsonProperty("Images")
	private List<Image> images = Collections.emptyList();
	@JsonProperty("Category")
	private List<String> category = Collections.emptyList();
	@JsonProperty("ServingSize")
	private List<ServingSize> servingSize = Collections.emptyList();
	@JsonProperty("Features")
	private List<ProductInformationClaim> features = Collections.emptyList();
	@JsonProperty("FeatureReferences")
	private List<ProductInformationReference> featureReferences = Collections.emptyList();
	@JsonProperty("Precautions")
	private List<ProductInformationClaim> precautions = Collections.emptyList();
	@JsonProperty("PrecautionReferences")
	private List<ProductInformationReference> precautionReferences = Collections.emptyList();
	@JsonProperty("Usage")
	private List<ProductInformationClaim> usage = Collections.emptyList();
	@JsonProperty("UsageReferences")
	private List<ProductInformationReference> usageReferences = Collections.emptyList();
	@JsonProperty("Instructions")
	private List<Instructions> instructions = Collections.emptyList();
	@JsonProperty("Availability")
	private List<Availability> availability = Collections.emptyList();
	@JsonProperty("Ingredients")
	private List<Ingredients> ingredients = Collections.emptyList();
	@JsonProperty("MasterNutrientData")
	private Map<String, String> masterNutrientData;
	@JsonProperty("MasterVitamins")
	private Map<String, String> masterVitamins;
	@JsonProperty("MasterMinerals")
	private Map<String, String> masterMinerals;

	@JsonProperty("Id")
	public String getId() {
		return id;
	}

	@JsonProperty("Id")
	public void setId(String id) {
		this.id = id;
	}
	
	@JsonProperty("approvalDateTime")
	public String getApprovalDateTime() {
		return approvalDateTime;
	}
	
	@JsonProperty("approvalDateTime")
	public void setApprovalDateTime(String approvalDateTime) {
		this.approvalDateTime = approvalDateTime;
	}

	@JsonProperty("publishedDateTime")
	public String getPublishedDateTime() {
		return publishedDateTime;
	}
	
	@JsonProperty("publishedDateTime")
	public void setPublishedDateTime(String publishedDateTime) {
		this.publishedDateTime = publishedDateTime;
	}

	@JsonProperty("ProductName")
	public String getProductName() {
		return replaceReg(productName);
	}

	@JsonProperty("ProductName")
	public void setProductName(String productName) {
		this.productName = productName;
	}

	@JsonProperty("Brand")
	public String getBrand() {
		return replaceReg(brand);
	}

	@JsonProperty("Brand")
	public void setBrand(String brand) {
		this.brand = brand;
	}

	@JsonProperty("Images")
	public List<Image> getImages() {
		return new ArrayList<>(images);
	}

	@JsonProperty("Images")
	public void setImages(List<Image> images) {
		images = new ArrayList<>(images);
		this.images = Collections.unmodifiableList(images);
	}
	
	@JsonProperty("CommonName")
	public String getCommonName() {
		return commonName;
	}

	@JsonProperty("CommonName")
	public void setCommonName(String commonName) {
		this.commonName = commonName;
	}

	@JsonProperty("Category")
	public List<String> getCategory() {
		return new ArrayList<>(category);
	}

	@JsonProperty("Category")
	public void setCategory(List<String> category) {
		category = new ArrayList<>(category);
		this.category = Collections.unmodifiableList(category);
	}

	@JsonProperty("ServingSize")
	public List<ServingSize> getServingSize() {
		return new ArrayList<>(servingSize);
	}

	@JsonProperty("ServingSize")
	public void setServingSize(List<ServingSize> servingSize) {
		servingSize = new ArrayList<>(servingSize);
		this.servingSize = Collections.unmodifiableList(servingSize);
	}

	@JsonProperty("Features")
	public List<ProductInformationClaim> getFeatures() {
		return new ArrayList<>(features);
	}

	@JsonProperty("Features")
	public void setFeatures(List<ProductInformationClaim> features) {
		features = new ArrayList<>(features);
		this.features = Collections.unmodifiableList(features);
	}

	@JsonProperty("FeatureReferences")
	public List<ProductInformationReference> getFeatureReferences() {
		return new ArrayList<>(featureReferences);
	}

	@JsonProperty("FeatureReferences")
	public void setFeatureReferences(List<ProductInformationReference> featureReferences) {
		featureReferences = new ArrayList<>(featureReferences);
		this.featureReferences = Collections.unmodifiableList(featureReferences);
	}

	@JsonProperty("Precautions")
	public List<ProductInformationClaim> getPrecautions() {
		return new ArrayList<>(precautions);
	}

	@JsonProperty("Precautions")
	public void setPrecautions(List<ProductInformationClaim> precautions) {
		precautions = new ArrayList<>(precautions);
		this.precautions = Collections.unmodifiableList(precautions);
	}

	@JsonProperty("PrecautionReferences")
	public List<ProductInformationReference> getPrecautionReferences() {
		return new ArrayList<>(precautionReferences);
	}

	@JsonProperty("PrecautionReferences")
	public void setPrecautionReferences(List<ProductInformationReference> precautionReferences) {
		precautionReferences = new ArrayList<>(precautionReferences);
		this.precautionReferences = Collections.unmodifiableList(precautionReferences);
	}

	@JsonProperty("Usage")
	public List<ProductInformationClaim> getUsage() {
		return new ArrayList<>(usage);
	}

	@JsonProperty("Usage")
	public void setUsage(List<ProductInformationClaim> usage) {
		usage = new ArrayList<>(usage);
		this.usage = Collections.unmodifiableList(usage);
	}

	@JsonProperty("UsageReferences")
	public List<ProductInformationReference> getUsageReferences() {
		return new ArrayList<>(usageReferences);
	}

	@JsonProperty("UsageReferences")
	public void setUsageReferences(List<ProductInformationReference> usageReferences) {
		usageReferences = new ArrayList<>(usageReferences);
		this.usageReferences = Collections.unmodifiableList(usageReferences);
	}

	@JsonProperty("Instructions")
	public List<Instructions> getInstructions() {
		return new ArrayList<>(instructions);
	}

	@JsonProperty("Instructions")
	public void setInstructions(List<Instructions> instructions) {
		instructions = new ArrayList<>(instructions);
		this.instructions = Collections.unmodifiableList(instructions);
	}

	@JsonProperty("Ingredients")
	public List<Ingredients> getIngredients() {
		return new ArrayList<>(ingredients);
	}

	@JsonProperty("Ingredients")
	public void setIngredients(List<Ingredients> ingredients) {
		ingredients = new ArrayList<>(ingredients);
		this.ingredients = Collections.unmodifiableList(ingredients);
	}

	@JsonProperty("Availability")
	public List<Availability> getAvailability() {
		return new ArrayList<>(availability);
	}

	@JsonProperty("Availability")
	public void setAvailability(List<Availability> availability) {
		availability = new ArrayList<>(availability);
		this.availability = Collections.unmodifiableList(availability);
	}

	private String replaceReg(String string) {
		return string.replace("&reg;", "<sup>&reg;</sup>");
	}

	@JsonProperty("Description")
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@JsonProperty("defaultFormulationCode")
	public String getDefaultFormulationCode() {
		return defaultFormulationCode;
	}

	public void setDefaultFormulationCode(String defaultFormulationCode) {
		this.defaultFormulationCode = defaultFormulationCode;
	}

	@JsonProperty("MasterNutrientData")
	public Map<String, String> getMasterNutrientData() {
		return this.masterNutrientData;
	}

	public void setMasterNutrientData(Map<String, String> masterNutrientData) {
		this.masterNutrientData = masterNutrientData;
	}

	@JsonProperty("MasterVitamins")
	public Map<String, String> getMasterVitamins() {
		return masterVitamins;
	}

	public void setMasterVitamins(Map<String, String> masterVitamins) {
		this.masterVitamins = masterVitamins;
	}

	@JsonProperty("MasterMinerals")
	public Map<String, String> getMasterMinerals() {
		return this.masterMinerals;
	}

	public void setMasterMinerals(Map<String, String> masterMinerals) {
		this.masterMinerals = masterMinerals;
	}

	@JsonProperty("ProductJson")
	public String getProductJson() {
		return productJson;
	}

	public void setProductJson(String productJson) {
		this.productJson = productJson;
	}

	@JsonProperty("Learnmore")
	public String getLearnmore() {
		return learnmore;
	}

	public void setLearnmore(String learnmore) {
		this.learnmore = learnmore;
	}

}

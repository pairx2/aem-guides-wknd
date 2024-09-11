
package com.abbott.aem.an.division.core.models.product;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Product {

    @JsonProperty("APIgeneratedAt")
    private String aPIgeneratedAt;
    @JsonProperty("PublishedAt")
    private String publishedAt;
    @JsonProperty("Id")
    private String id;
    @JsonProperty("ProductName")
    private String productName;
    @JsonProperty("CommonName")
    private String commonName;
    @JsonProperty("Brand")
    private String brand;
    @JsonProperty("Images")
    private List<Image> images = Collections.emptyList();
    @JsonProperty("Category")
    private List<String> category = Collections.emptyList();
    @JsonProperty("NutritionalUsage")
    private List<String> nutritionalUsage = Collections.emptyList();
    @JsonProperty("Features")
    private List<Claim> features = Collections.emptyList();
    @JsonProperty("FeatureReferences")
    private List<ClaimReference> featureReferences = Collections.emptyList();
    @JsonProperty("Precautions")
    private List<Claim> precautions = Collections.emptyList();
    @JsonProperty("PrecautionReferences")
    private List<ClaimReference> precautionReferences = Collections.emptyList();
    @JsonProperty("Usage")
    private List<Claim> usage = Collections.emptyList();
    @JsonProperty("UsageReferences")
    private List<ClaimReference> usageReferences = Collections.emptyList();
    @JsonProperty("Preparation")
    private List<String> preparation = Collections.emptyList();
    @JsonProperty("SafetyInformation")
    private List<String> safetyInformation = Collections.emptyList();
    @JsonProperty("Flavors")
    private List<Flavor> flavors = Collections.emptyList();
    @JsonProperty("Availability")
    private List<Availability> availability = Collections.emptyList();

    @JsonProperty("APIgeneratedAt")
    public String getAPIgeneratedAt() {
        return aPIgeneratedAt;
    }

    @JsonProperty("APIgeneratedAt")
    public void setAPIgeneratedAt(String aPIgeneratedAt) {
        this.aPIgeneratedAt = aPIgeneratedAt;
    }

    @JsonProperty("PublishedAt")
    public String getPublishedAt() {
        return publishedAt;
    }

    @JsonProperty("PublishedAt")
    public void setPublishedAt(String publishedAt) {
        this.publishedAt = publishedAt;
    }

    @JsonProperty("Id")
    public String getId() {
        return id;
    }

    @JsonProperty("Id")
    public void setId(String id) {
        this.id = id;
    }

    @JsonProperty("Brand")
    public String getBrand() {
        return replaceReg(brand);
    }

    @JsonProperty("Brand")
    public void setBrand(String brand) {
        this.brand = brand;
    }

    @JsonProperty("ProductName")
    public String getProductName() {
        return replaceReg(productName);
    }

    @JsonProperty("ProductName")
    public void setProductName(String productName) {
        this.productName = productName;
    }

    @JsonProperty("CommonName")
    public String getCommonName() {
        return commonName;
    }

    @JsonProperty("CommonName")
    public void setCommonName(String commonName) {
        this.commonName = commonName;
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

    @JsonProperty("Category")
    public List<String> getCategory() {
        return new ArrayList<>(category);
    }

    @JsonProperty("Category")
    public void setCategory(List<String> category) {
        category = new ArrayList<>(category);
        this.category = Collections.unmodifiableList(category);
    }

    @JsonProperty("NutritionalUsage")
    public List<String> getNutritionalUsage() {
        return new ArrayList<>(nutritionalUsage);
    }

    @JsonProperty("NutritionalUsage")
    public void setNutritionalUsage(List<String> nutritionalUsage) {
        nutritionalUsage = new ArrayList<>(nutritionalUsage);
        this.nutritionalUsage = Collections.unmodifiableList(nutritionalUsage);
    }

    @JsonProperty("Features")
    public List<Claim> getFeatures() {
        return new ArrayList<>(features);
    }

    @JsonProperty("Features")
    public void setFeatures(List<Claim> features) {
        features = new ArrayList<>(features);
        this.features = Collections.unmodifiableList(features);
    }

    @JsonProperty("FeatureReferences")
    public List<ClaimReference> getFeatureReferences() {
        return new ArrayList<>(featureReferences);
    }

    @JsonProperty("FeatureReferences")
    public void setFeatureReferences(List<ClaimReference> featureReferences) {
        featureReferences = new ArrayList<>(featureReferences);
        this.featureReferences = Collections.unmodifiableList(featureReferences);
    }

    @JsonProperty("Precautions")
    public List<Claim> getPrecautions() {
        return new ArrayList<>(precautions);
    }

    @JsonProperty("Precautions")
    public void setPrecautions(List<Claim> precautions) {
        precautions = new ArrayList<>(precautions);
        this.precautions = Collections.unmodifiableList(precautions);
    }

    @JsonProperty("PrecautionReferences")
    public List<ClaimReference> getPrecautionReferences() {
        return new ArrayList<>(precautionReferences);
    }

    @JsonProperty("PrecautionReferences")
    public void setPrecautionReferences(List<ClaimReference> precautionReferences) {
        precautionReferences = new ArrayList<>(precautionReferences);
        this.precautionReferences = Collections.unmodifiableList(precautionReferences);
    }

    @JsonProperty("Usage")
    public List<Claim> getUsage() {
        return new ArrayList<>(usage);
    }

    @JsonProperty("Usage")
    public void setUsage(List<Claim> usage) {
        usage = new ArrayList<>(usage);
        this.usage = Collections.unmodifiableList(usage);
    }

    @JsonProperty("UsageReferences")
    public List<ClaimReference> getUsageReferences() {
        return new ArrayList<>(usageReferences);
    }

    @JsonProperty("UsageReferences")
    public void setUsageReferences(List<ClaimReference> usageReferences) {
        usageReferences = new ArrayList<>(usageReferences);
        this.usageReferences = Collections.unmodifiableList(usageReferences);
    }

    @JsonProperty("Preparation")
    public List<String> getPreparation() {
        return new ArrayList<>(preparation);
    }

    @JsonProperty("Preparation")
    public void setPreparation(List<String> preparation) {
        preparation = new ArrayList<>(preparation);
        this.preparation = Collections.unmodifiableList(preparation);
    }

    @JsonProperty("SafetyInformation")
    public List<String> getSafetyInformation() {
        return new ArrayList<>(safetyInformation);
    }

    @JsonProperty("SafetyInformation")
    public void setSafetyInformation(List<String> safetyInformation) {
        safetyInformation = new ArrayList<>(safetyInformation);
        this.safetyInformation = Collections.unmodifiableList(safetyInformation);
    }

    @JsonProperty("Flavors")
    public List<Flavor> getFlavors() {
        return new ArrayList<>(flavors);
    }

    @JsonProperty("Flavors")
    public void setFlavors(List<Flavor> flavors) {
        flavors = new ArrayList<>(flavors);
        this.flavors = Collections.unmodifiableList(flavors);
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

}

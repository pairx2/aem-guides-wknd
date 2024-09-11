package com.abbott.aem.an.division.core.dto;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import com.abbott.aem.an.division.core.utils.Utils;

public class ProductDTO implements Comparable<ProductDTO> {

	private String productPageName;

	private String productPageTitle;

	private String productID;

	private String businessUnit;

	private String[] productImage;

	private String[] productSku;

	private List<String> productRefrenceValue = Collections.emptyList();

	private String commonImage;

	private boolean isActiveProduct;

	private Date approvalDate;

	private String commonName;

	private String description;

	private String productBrands;

	private String productMetabolics;

	private String productIngestionMethod;

	private String productFormFactor;

	private String productDietaryRestriction;

	private String productPatientAge;

	private String productDefaultformualtionCode;

	private List<String> skuContainerSize = Collections.emptyList();

	private List<String> productImageList = Collections.emptyList();

	private List<String> skuServingSize = Collections.emptyList();

	private List<String> skuServingSizeId = Collections.emptyList();

	private String listNumber;

	private String lastModifiedTime;

	private List<String> formulationType = Collections.emptyList();

	private List<String> flavor = Collections.emptyList();

	private List<String> formulationTypeandflavor = Collections.emptyList();

	private List<String> formulationCode = Collections.emptyList();	

	private String learnMore;
	
	public String getLearnMore() {
		return learnMore;
	}

	public void setLearnMore(String learnMore) {
		this.learnMore = learnMore;
	}

	public List<String> getProductImageList() {
		return new ArrayList<>(productImageList);
	}

	public void setProductImageList(List<String> productImageList) {
		productImageList = new ArrayList<>(productImageList);
		this.productImageList =Collections.unmodifiableList(productImageList); 
	}

	public List<String> getFormulationTypeandflavor() {
		return new ArrayList<>(formulationTypeandflavor);
	}

	public void setFormulationTypeandflavor(List<String> formulationTypeandflavor) {
		formulationTypeandflavor = new ArrayList<>(formulationTypeandflavor);
		this.formulationTypeandflavor = Collections.unmodifiableList(formulationTypeandflavor);
	}

	public List<String> getProductRefrenceValue() {
		return new ArrayList<>(productRefrenceValue);
	}

	public void setProductRefrenceValue(List<String> productRefrenceValue) {
		productRefrenceValue = new ArrayList<>(productRefrenceValue);
		this.productRefrenceValue = Collections.unmodifiableList(productRefrenceValue);
	}

	public List<String> getFormulationType() {
		return new ArrayList<>(formulationType);
	}

	public void setFormulationType(List<String> formulationType) {
		formulationType = new ArrayList<>(formulationType);
		this.formulationType = Collections.unmodifiableList(formulationType);
	}

	public List<String> getFlavor() {
		return new ArrayList<>(flavor);
	}

	public void setFlavor(List<String> flavor) {
		flavor = new ArrayList<>(flavor);
		this.flavor = Collections.unmodifiableList(flavor);
	}

	public String getProductPageName() {
		return productPageName;
	}

	public void setProductPageName(String productPageName) {
		this.productPageName = productPageName;
	}

	public String getProductPageTitle() {
		return productPageTitle;
	}

	public void setProductPageTitle(String productPageTitle) {
		this.productPageTitle = productPageTitle;
	}

	public String getProductID() {
		return productID;
	}

	public void setProductID(String productID) {
		this.productID = productID;
	}

	/**
	 * @return the productImages
	 */
	public String[] getProductImage() {
		return Arrays.copyOf(productImage, productImage.length);
	}

	/**
	 * @return the productSkus
	 */
	public String[] getProductSku() {
		return Arrays.copyOf(productSku, productSku.length);
	}

	public String getCommonImage() {
		Utils objUtils = new Utils();
		commonImage = objUtils.getImagePathUrl(commonImage);
		return commonImage;
	}

	public void setProductImage(String[] productImage) {
		if (productImage == null) {
			this.productImage = new String[0];
		} else {
			this.productImage = Arrays.copyOf(productImage, productImage.length);
		}
	}

	public void setProductSku(String[] productSku) {
		if (productSku == null) {
			this.productSku = new String[0];
		} else {
			this.productSku = Arrays.copyOf(productSku, productSku.length);
		}
	}

	public void setCommonImage(String commonImage) {
		this.commonImage = commonImage;
	}

	public boolean isActiveProduct() {
		return isActiveProduct;
	}

	public void setActiveProduct(boolean isActiveProduct) {
		this.isActiveProduct = isActiveProduct;
	}

	public Date getApprovalDate() {
		return new Date(this.approvalDate.getTime());
	}

	public void setApprovalDate(Date approvalDate) {
		this.approvalDate = new Date(approvalDate.getTime());
	}

	public String getBusinessUnit() {
		return businessUnit;
	}

	public void setBusinessUnit(String businessUnit) {
		this.businessUnit = businessUnit;
	}

	public String getCommonName() {
		return commonName;
	}

	public void setCommonName(String commonName) {
		this.commonName = commonName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<String> getSkuContainerSize() {
		return new ArrayList<>(skuContainerSize);
	}

	public void setSkuContainerSize(List<String> skuContainerSize) {
		skuContainerSize = new ArrayList<>(skuContainerSize);
		this.skuContainerSize = Collections.unmodifiableList(skuContainerSize);
	}

	public List<String> getSkuServingSize() {
		return new ArrayList<>(skuServingSize);
	}

	public void setSkuServingSize(List<String> skuServingSize) {
		skuServingSize = new ArrayList<>(skuServingSize);
		this.skuServingSize = Collections.unmodifiableList(skuServingSize);
	}

	public String getListNumber() {
		return listNumber;
	}

	public void setListNumber(String listNumber) {
		this.listNumber = listNumber;
	}

	public String getProductBrands() {
		return productBrands;
	}

	public void setProductBrands(String productBrands) {
		this.productBrands = productBrands;
	}

	public String getProductMetabolics() {
		return productMetabolics;
	}

	public void setProductMetabolics(String productMetabolics) {
		this.productMetabolics = productMetabolics;
	}

	public String getProductIngestionMethod() {
		return productIngestionMethod;
	}

	public void setProductIngestionMethod(String productIngestionMethod) {
		this.productIngestionMethod = productIngestionMethod;
	}

	public String getProductFormFactor() {
		return productFormFactor;
	}

	public void setProductFormFactor(String productFormFactor) {
		this.productFormFactor = productFormFactor;
	}

	public String getProductDietaryRestriction() {
		return productDietaryRestriction;
	}

	public void setProductDietaryRestriction(String productDietaryRestriction) {
		this.productDietaryRestriction = productDietaryRestriction;
	}

	public String getProductPatientAge() {
		return productPatientAge;
	}

	public void setProductPatientAge(String productPatientAge) {
		this.productPatientAge = productPatientAge;
	}

	public String getProductDefaultformualtionCode() {
		return productDefaultformualtionCode;
	}

	public void setProductDefaultformualtionCode(String productDefaultformualtionCode) {
		this.productDefaultformualtionCode = productDefaultformualtionCode;
	}

	public List<String> getFormulationCode() {
		return new ArrayList<>(formulationCode);
	}

	public void setFormulationCode(List<String> formulationCode) {
		formulationCode = new ArrayList<>(formulationCode);
		this.formulationCode = Collections.unmodifiableList(formulationCode);
	}

	public List<String> getSkuServingSizeId() {
		return new ArrayList<>(skuServingSizeId);
	}

	public void setSkuServingSizeId(List<String> skuServingSizeId) {
		skuServingSizeId = new ArrayList<>(skuServingSizeId);
		this.skuServingSizeId = Collections.unmodifiableList(skuServingSizeId);

	}

	public String getLastmodifiedTime() {
		return lastModifiedTime;
	}

	public void setLastmodifiedTime(String lastmodifiedTime) {
		this.lastModifiedTime = lastmodifiedTime;
	}

	@Override
	public int compareTo(ProductDTO e) {
		return this.getProductPageTitle().compareTo(e.getProductPageTitle());
	}
	@Override
	public boolean equals(Object obj)
	{
	    if(obj == null)
	    	return false;
	    if (this.getClass() != obj.getClass())
	        return false;
	    ProductDTO ss = (ProductDTO)obj;
	    return productPageTitle.equals(ss.getProductPageTitle());
	}	
	 @Override
	 public int hashCode() {
		 final int prime = 31;
		    int result = 1;
		    result = prime * result + ((productPageTitle == null) ? 0 : productPageTitle.hashCode());
		    return result;	   
	  }

}
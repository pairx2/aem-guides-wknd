
package com.abbott.aem.an.division.core.models.dynamicproduct;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Instructions {

	@JsonProperty("productInstructions")
	private String productInstructions;
	@JsonProperty("publishedDateTime")
	private String publishedDateTime;
	
	@JsonProperty("category")
	private String category;
	

	public String getProductInstructions() {
		return productInstructions;
	}

	public void setProductInstructions(String productInstructions) {
		this.productInstructions = productInstructions;
	}

	public String getPublishedDateTime() {
		return publishedDateTime;
	}

	public void setPublishedDateTime(String publishedDateTime) {
		this.publishedDateTime = publishedDateTime;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}
	
	

}

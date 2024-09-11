
package com.abbott.aem.an.division.core.models.dynamicproduct;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductInformationClaim implements Comparable<ProductInformationClaim> {

	@JsonProperty("ClaimText")
	private String claimText;
	
	@JsonProperty("LineNumber")
	private Integer lineNumber;
	

	@JsonProperty("ClaimText")
	public String getClaimText() {
		return claimText;
	}

	@JsonProperty("ClaimText")
	public void setClaimText(String claimText) {
		this.claimText = claimText;
	}
	
	@JsonProperty("LineNumber")
	public Integer getLineNumber() {
		return lineNumber;
	}

	@JsonProperty("LineNumber")
	public void setLineNumber(Integer lineNumber) {
		this.lineNumber = lineNumber;
	}
	
	@Override
	public int compareTo(ProductInformationClaim e) {
		return this.getLineNumber().compareTo(e.getLineNumber());
	}
	
	@Override
	public boolean equals(Object obj)
	{
	    if(obj == null)
	    	return false;
	    if (this.getClass() != obj.getClass())
	        return false;
	    ProductInformationClaim productInformationClaim = (ProductInformationClaim)obj;
	    return lineNumber.equals(productInformationClaim.getLineNumber());
	}	
	 @Override
	 public int hashCode() {
		 final int prime = 31;
		    int result = 1;
		    result = prime * result + ((lineNumber == null) ? 0 : lineNumber.hashCode());
		    return result;	   
	  }
}

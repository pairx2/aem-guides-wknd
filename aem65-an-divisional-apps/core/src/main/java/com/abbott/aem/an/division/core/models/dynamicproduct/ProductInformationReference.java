
package com.abbott.aem.an.division.core.models.dynamicproduct;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductInformationReference implements Comparable<ProductInformationReference> {

	@JsonProperty("LineNumber")
	private Integer lineNumber;
	
	@JsonProperty("ReferenceSymbol")
	private String referenceSymbol;

	@JsonProperty("ReferenceText")
	private String referenceText;
	
	@JsonProperty("LineNumber")
	public Integer getLineNumber() {
		return lineNumber;
	}

	@JsonProperty("LineNumber")
	public void setLineNumber(Integer lineNumber) {
		this.lineNumber = lineNumber;
	}
	
	@JsonProperty("ReferenceSymbol")
	public String getReferenceSymbol() {
		return referenceSymbol;
	}

	@JsonProperty("ReferenceSymbol")
	public void setReferenceSymbol(String referenceSymbol) {
		this.referenceSymbol = referenceSymbol;
	}

	@JsonProperty("ReferenceText")
	public String getReferenceText() {
		return referenceText;
	}

	@JsonProperty("ReferenceText")
	public void setReferenceText(String referenceText) {
		this.referenceText = referenceText;
	}

	@Override
	public int compareTo(ProductInformationReference e) {
		return this.getLineNumber().compareTo(e.getLineNumber());
	}
		
	@Override
	public boolean equals(Object obj)
	{
	    if(obj == null)
	    	return false;
	    if (this.getClass() != obj.getClass())
	        return false;
	    ProductInformationReference productInformationReference = (ProductInformationReference)obj;
	    return lineNumber.equals(productInformationReference.getLineNumber());
	}	
	 @Override
	 public int hashCode() {
		 final int prime = 31;
		    int result = 1;
		    result = prime * result + ((lineNumber == null) ? 0 : lineNumber.hashCode());
		    return result;	   
	  }
}

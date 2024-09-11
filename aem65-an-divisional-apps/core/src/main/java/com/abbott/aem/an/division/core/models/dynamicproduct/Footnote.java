
package com.abbott.aem.an.division.core.models.dynamicproduct;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Footnote implements Comparable<Footnote> {

	@JsonProperty("FootnoteSymbol")
	private String footnoteSymbol;

	@JsonProperty("LineNumber")
	private Integer lineNumber;
	
	@JsonProperty("FootnoteValue")
	private String footnoteValue;	
	
	@JsonProperty("LineNumber")
	public Integer getLineNumber() {
		return lineNumber;
	}

	@JsonProperty("LineNumber")
	public void setLineNumber(Integer lineNumber) {
		this.lineNumber = lineNumber;
	}
	
	@JsonProperty("FootnoteSymbol")
	public String getFootnoteSymbol() {
		return footnoteSymbol;
	}

	@JsonProperty("FootnoteSymbol")
	public void setFootnoteSymbol(String footnoteSymbol) {
		this.footnoteSymbol = footnoteSymbol;
	}
	
	@JsonProperty("FootnoteValue")
	public String getFootnoteValue() {
		return footnoteValue;
	}

	@JsonProperty("FootnoteValue")
	public void setFootnoteValue(String footnoteValue) {
		this.footnoteValue = footnoteValue;
	}
	
	@Override
	public boolean equals(Object obj)
	{
	    if(obj == null)
	    	return false;
	    if (this.getClass() != obj.getClass())
	        return false;
	    Footnote footnote = (Footnote)obj;
	    return lineNumber.equals(footnote.getLineNumber());
	}	

	@Override
	public int compareTo(Footnote e) {
		return this.getLineNumber().compareTo(e.getLineNumber());
	}
		
	 @Override
	 public int hashCode() {
		 final int prime = 31;
		    int result = 1;
		    result = prime * result + ((lineNumber == null) ? 0 : lineNumber.hashCode());
		    return result;	   
	  }
}


package com.abbott.aem.an.division.core.models.dynamicproduct;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Availability implements Comparable<Availability> {

	@JsonProperty("ListNumber")
	private Integer listNumber;
	
	@JsonProperty("DisplayListNumber")
	private String displayListNumber;
	
	@JsonProperty("Description")
	private String description;
	@JsonProperty("MarketSegment")
	private String marketSegment;
	@JsonProperty("id")
	private String id;
	@JsonProperty("aCode")
	private String aCode;

	@JsonProperty("ListNumber")
	public Integer getListNumber() {
		return listNumber;
	}

	@JsonProperty("ListNumber")
	public void setListNumber(Integer listNumber) {
		this.listNumber = listNumber;
	}
	
	@JsonProperty("DisplayListNumber")
	public String getDisplayListNumber() {
		return displayListNumber;
	}

	@JsonProperty("DisplayListNumber")
	public void setDisplayListNumber(String displayListNumber) {
		this.displayListNumber = displayListNumber;
	}

	@JsonProperty("Description")
	public String getDescription() {
		return description;
	}

	@JsonProperty("Description")
	public void setDescription(String description) {
		this.description = description;
	}

	@JsonProperty("MarketSegment")
	public String getMarketSegment() {
		return marketSegment;
	}

	@JsonProperty("marketSegment")
	public void setMarketSegment(String marketSegment) {
		this.marketSegment = marketSegment;
	}

	@JsonProperty("id")
	public String getId() {
		return id;
	}

	@JsonProperty("id")
	public void setId(String id) {
		this.id = id;
	}

	@JsonProperty("aCode")
	public String getAcode() {
		return aCode;
	}

	@JsonProperty("aCode")
	public void setAcode(String aCode) {
		this.aCode = aCode;
	}
	
	@Override
	public int compareTo(Availability e) {
		return this.getListNumber().compareTo(e.getListNumber());
	}
	
	@Override
	public boolean equals(Object obj)
	{
	    if(obj == null)
	    	return false;
	    if (this.getClass() != obj.getClass())
	        return false;
	    Availability ss = (Availability)obj;
	    return listNumber.equals(ss.getListNumber());
	}	
	 @Override
	 public int hashCode() {
		 final int prime = 31;
		    int result = 1;
		    result = prime * result + ((listNumber == null) ? 0 : listNumber.hashCode());
		    return result;	   
	  }

}

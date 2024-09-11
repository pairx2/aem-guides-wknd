
package com.abbott.aem.an.division.core.models.dynamicproduct;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ServingSize implements Comparable<ServingSize> {

	@JsonProperty("id")
	private String id;
	
	@JsonProperty("lineNumber")
	private Integer lineNumber;

	@JsonProperty("aCode")
	private String aCode;

	@JsonProperty("ServingSizeName")
	private String servingSizeName;
	
	@JsonProperty("PercentRDISymbol")
	private String percentRDISymbol;
	
	@JsonProperty("PercentDVSymbol")
	private String percentDVSymbol;
	
	@JsonProperty("Footnotes")
	private List<Footnote> footnotes = Collections.emptyList();
	
	@JsonProperty("NutritionalInfoData")
	private List<NutritionalInfo> nutritionalInfoData = Collections.emptyList();

	@JsonProperty("NutritionalInfo")
	private List<NutritionalInfo> nutritionalInfo = Collections.emptyList();

	@JsonProperty("NutritionalInfoVitamins")
	private List<NutritionalInfo> nutritionalInfoVitamins = Collections.emptyList();

	@JsonProperty("NutritionalInfoMinerals")
	private List<NutritionalInfo> nutritionalInfoMinerals = Collections.emptyList();

	@JsonProperty("ServingSizeName")
	public String getServingSizeName() {
		return servingSizeName;
	}

	@JsonProperty("ServingSizeName")
	public void setServingSizeName(String servingSizeName) {
		this.servingSizeName = servingSizeName;
	}	
	
	@JsonProperty("PercentRDISymbol")
	public String getPercentRDISymbol() {
		return percentRDISymbol;
	}
	
	@JsonProperty("PercentRDISymbol")
	public void setPercentRDISymbol(String percentRDISymbol) {
		this.percentRDISymbol = percentRDISymbol;
	}
	
	@JsonProperty("PercentDVSymbol")
	public String getPercentDVSymbol() {
		return percentDVSymbol;
	}
	
	@JsonProperty("PercentDVSymbol")
	public void setPercentDVSymbol(String percentDVSymbol) {
		this.percentDVSymbol = percentDVSymbol;
	}

	@JsonProperty("Footnotes")
	public List<Footnote> getFootnotes() {
		return new ArrayList<>(footnotes);
	}

	@JsonProperty("Footnotes")
	public void setFootnotes(List<Footnote> footnotes) {
		footnotes = new ArrayList<>(footnotes);
		this.footnotes = Collections.unmodifiableList(footnotes);
	}
	
	@JsonProperty("NutritionalInfoData")
	public List<NutritionalInfo> getNutritionalInfoData() {
		return new ArrayList<>(nutritionalInfoData);
	}

	@JsonProperty("NutritionalInfoData")
	public void setNutritionalInfoData(List<NutritionalInfo> nutritionalInfoData) {
		nutritionalInfoData = new ArrayList<>(nutritionalInfoData);
		this.nutritionalInfoData =  Collections.unmodifiableList(nutritionalInfoData);		
	}

	@JsonProperty("NutritionalInfo")
	public List<NutritionalInfo> getNutritionalInfo() {
		return new ArrayList<>(nutritionalInfo);
	}

	@JsonProperty("NutritionalInfo")
	public void setNutritionalInfo(List<NutritionalInfo> nutritionalInfo) {
		nutritionalInfo = new ArrayList<>(nutritionalInfo);
		this.nutritionalInfo = Collections.unmodifiableList(nutritionalInfo);
	}

	public Map<String, List<NutritionalInfo>> getGroupedNutritionalInfo() {
		return getNutritionalInfo().stream().collect(
				Collectors.groupingBy(NutritionalInfo::getNutritionCategory, LinkedHashMap::new, Collectors.toList()));
	}

	@JsonProperty("NutritionalInfoVitamins")
	public List<NutritionalInfo> getNutritionalInfoVitamins() {
		return new ArrayList<>(nutritionalInfoVitamins);
	}

	@JsonProperty("NutritionalInfoVitamins")
	public void setNutritionalInfoVitamins(List<NutritionalInfo> nutritionalInfoVitamins) {
		nutritionalInfoVitamins = new ArrayList<>(nutritionalInfoVitamins);
		this.nutritionalInfoVitamins =  Collections.unmodifiableList(nutritionalInfoVitamins);
	}

	@JsonProperty("NutritionalInfoMinerals")
	public List<NutritionalInfo> getNutritionalInfoMinerals() {
		return new ArrayList<>(nutritionalInfoMinerals);
	}

	@JsonProperty("NutritionalInfoMinerals")
	public void setNutritionalInfoMinerals(List<NutritionalInfo> nutritionalInfoMinerals) {
		nutritionalInfoMinerals = new ArrayList<>(nutritionalInfoMinerals);
		this.nutritionalInfoMinerals =  Collections.unmodifiableList(nutritionalInfoMinerals);	
	}

	@JsonProperty("id")
	public String getId() {
		return id;
	}

	@JsonProperty("id")
	public void setId(String id) {
		this.id = id;
	}

	@JsonProperty("LineNumber")
	public Integer getLineNumber() {
		return lineNumber;
	}

	@JsonProperty("LineNumber")
	public void setLineNumber(Integer lineNumber) {
		this.lineNumber = lineNumber;
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
	public int compareTo(ServingSize e) {
		return this.getLineNumber().compareTo(e.getLineNumber());
	}
	
	@Override
	public boolean equals(Object obj)
	{
	    if(obj == null)
	    	return false;
	    if (this.getClass() != obj.getClass())
	        return false;
	    ServingSize servingSize = (ServingSize)obj;
	    return lineNumber.equals(servingSize.getLineNumber());
	}	
	 @Override
	 public int hashCode() {
		 final int prime = 31;
		    int result = 1;
		    result = prime * result + ((lineNumber == null) ? 0 : lineNumber.hashCode());
		    return result;	   
	  }

}

package com.abbott.magento.catalog.connector.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.annotation.Generated;

@Generated("com.robohorse.robopojogenerator")
public class TotalSegmentsItem{

	@JsonProperty("code")
	private String code;

	@JsonProperty("title")
	private String title;

	@JsonProperty("value")
	private int value;

	@JsonProperty("area")
	private String area;

	@JsonProperty("extension_attributes")
	private ExtensionAttributes extensionAttributes;

	public void setCode(String code){
		this.code = code;
	}

	public String getCode(){
		return code;
	}

	public void setTitle(String title){
		this.title = title;
	}

	public String getTitle(){
		return title;
	}

	public void setValue(int value){
		this.value = value;
	}

	public int getValue(){
		return value;
	}

	public void setArea(String area){
		this.area = area;
	}

	public String getArea(){
		return area;
	}

	public void setExtensionAttributes(ExtensionAttributes extensionAttributes){
		this.extensionAttributes = extensionAttributes;
	}

	public ExtensionAttributes getExtensionAttributes(){
		return extensionAttributes;
	}

	@Override
 	public String toString(){
		return 
			"TotalSegmentsItem{" + 
			"code = '" + code + '\'' + 
			",title = '" + title + '\'' + 
			",value = '" + value + '\'' + 
			",area = '" + area + '\'' + 
			",extension_attributes = '" + extensionAttributes + '\'' + 
			"}";
		}
}
package com.abbott.magento.catalog.connector.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.annotation.Generated;

@Generated("com.robohorse.robopojogenerator")
public class RatesItem{

	@JsonProperty("title")
	private String title;

	@JsonProperty("percent")
	private String percent;

	public void setTitle(String title){
		this.title = title;
	}

	public String getTitle(){
		return title;
	}

	public void setPercent(String percent){
		this.percent = percent;
	}

	public String getPercent(){
		return percent;
	}

	@Override
 	public String toString(){
		return 
			"RatesItem{" + 
			"title = '" + title + '\'' + 
			",percent = '" + percent + '\'' + 
			"}";
		}
}
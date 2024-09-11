package com.abbott.magento.catalog.connector.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.annotation.Generated;

@Generated("com.robohorse.robopojogenerator")
public class ConfigurableItemOptionsItem{

	@JsonProperty("option_value")
	private int optionValue;

	@JsonProperty("option_id")
	private String optionId;

	public void setOptionValue(int optionValue){
		this.optionValue = optionValue;
	}

	public int getOptionValue(){
		return optionValue;
	}

	public void setOptionId(String optionId){
		this.optionId = optionId;
	}

	public String getOptionId(){
		return optionId;
	}

	@Override
 	public String toString(){
		return 
			"ConfigurableItemOptionsItem{" + 
			"option_value = '" + optionValue + '\'' + 
			",option_id = '" + optionId + '\'' + 
			"}";
		}
}
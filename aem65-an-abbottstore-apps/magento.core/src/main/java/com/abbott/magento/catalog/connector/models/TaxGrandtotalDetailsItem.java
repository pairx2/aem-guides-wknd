package com.abbott.magento.catalog.connector.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.annotation.Generated;
import java.util.List;

@Generated("com.robohorse.robopojogenerator")
public class TaxGrandtotalDetailsItem{

	@JsonProperty("amount")
	private int amount;

	@JsonProperty("rates")
	private List<RatesItem> rates;

	@JsonProperty("groupId")
	private int groupId;

	public void setAmount(int amount){
		this.amount = amount;
	}

	public int getAmount(){
		return amount;
	}

	public void setRates(List<RatesItem> rates){
		this.rates = rates;
	}

	public List<RatesItem> getRates(){
		return rates;
	}

	public void setGroupId(int groupId){
		this.groupId = groupId;
	}

	public int getGroupId(){
		return groupId;
	}

	@Override
 	public String toString(){
		return 
			"TaxGrandtotalDetailsItem{" + 
			"amount = '" + amount + '\'' + 
			",rates = '" + rates + '\'' + 
			",groupId = '" + groupId + '\'' + 
			"}";
		}
}
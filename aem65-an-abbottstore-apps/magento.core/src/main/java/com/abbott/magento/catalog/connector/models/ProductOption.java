package com.abbott.magento.catalog.connector.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.annotation.Generated;

@Generated("com.robohorse.robopojogenerator")
public class ProductOption{

	@JsonProperty("extension_attributes")
	private ExtensionAttributes extensionAttributes;

	public void setExtensionAttributes(ExtensionAttributes extensionAttributes){
		this.extensionAttributes = extensionAttributes;
	}

	public ExtensionAttributes getExtensionAttributes(){
		return extensionAttributes;
	}

	@Override
 	public String toString(){
		return 
			"ProductOption{" + 
			"extension_attributes = '" + extensionAttributes + '\'' + 
			"}";
		}
}
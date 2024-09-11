package com.abbott.magento.services;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Similac Product Root Category Configs")
public @interface ProductRootCatConfigs {

	@AttributeDefinition(name = "Store Name", description = "Configure the store name")
	String getStoreName() default "storename";

	@AttributeDefinition(name = "Category Id", description = "Configure the category id")
	String getCategoryId() default "category id";
	
	@AttributeDefinition(name = "Default Category", description = "Configure the default category")
	String getDefaultCategory() default "default category";
	
	@AttributeDefinition(name = "Store ID", description = "Configure the Store ID")
	String storeId() default "storeid";

}
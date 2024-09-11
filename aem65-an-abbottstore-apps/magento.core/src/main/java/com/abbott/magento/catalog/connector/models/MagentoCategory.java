package com.abbott.magento.catalog.connector.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;


@JsonIgnoreProperties(ignoreUnknown = true)
public final class MagentoCategory {
    public final long id;
    public final long parentId;
    public final String name;
    public final boolean isActive;
    public final long position;
    public final long level;
    public final long productCount;
    public final MagentoCategory [] childCategories;
    public final CustomAttribute [] customAttributes;
    private String path;

    @JsonCreator
    public MagentoCategory(@JsonProperty("id") long id, @JsonProperty("parentId") long parentId, @JsonProperty("name") String name,
                           @JsonProperty("isActive") boolean isActive,
                           @JsonProperty("position") long position,
                           @JsonProperty("level") long level,
                           @JsonProperty("productCount") long productCount,
                           @JsonProperty("customAttributes") CustomAttribute[] customAttributes,
                           @JsonProperty("children_data") MagentoCategory[] childCategories){
        this.id = id;
        this.parentId = parentId;
        this.name = name;
        this.isActive = isActive;
        this.position = position;
        this.level = level;
        this.productCount = productCount;
        this.childCategories = childCategories;
        this.customAttributes = customAttributes;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class CustomAttribute {
        public final String attributeCode;
        public final String[] value;

        @JsonCreator
        public CustomAttribute(@JsonProperty("attributeCode") String attributeCode, @JsonProperty("value") String[] value){
            this.attributeCode = attributeCode;
            this.value = value;
        }
    }

    public String getAttribute(String name){
        String value = "";
        if(this.customAttributes != null && this.customAttributes.length > 0){
        	for(CustomAttribute attribute: this.customAttributes){
            	if(attribute.attributeCode.equalsIgnoreCase(name)){
            		getAttributeValue(attribute);
                    break;
                }
            	}
        }
        return value;
    }

    public String getAttributeValue(CustomAttribute attribute)
    {
    	String value=null;
    	if(attribute.value.length < 2){
    		value = attribute.value[0];
        }else{
            String returnValue = "";
            for(String s: attribute.value){
                returnValue = s + " ";
            }
            value = returnValue;
        }
    	return value;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}

package com.abbott.magento.catalog.connector.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Collections;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public final class MagentoProductCategories {
    public final long id;
    public final String sku;
    public final String name;
    public final CustomAttribute [] customAttributes;

    @JsonCreator
    public MagentoProductCategories(@JsonProperty("id") long id, @JsonProperty("sku") String sku, @JsonProperty("name") String name, @JsonProperty("customAttributes") CustomAttribute[] customAttributes){
        this.id = id;
        this.sku = sku;
        this.name = name;
        this.customAttributes = customAttributes;
    }


    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class CustomAttribute {
        public final String attributeCode;
        public final List<String> value;

        @JsonCreator
        public CustomAttribute(@JsonProperty("attributeCode") String attributeCode, @JsonProperty("value") List<String> value){
            this.attributeCode = attributeCode;
            this.value = value;
        }
    }


    public List<String> getCategoryIds(){
            if(null!=customAttributes){
                for(CustomAttribute attribute: customAttributes){
                    if(attribute.attributeCode.equalsIgnoreCase("category_ids")) {
                        return attribute.value;
                    }
                }
            }

        return Collections.emptyList();



    }



}

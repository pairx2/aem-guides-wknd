package com.abbott.magento.catalog.connector.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.HashMap;
import java.util.Map;


@JsonIgnoreProperties(ignoreUnknown = true)
public final class MagentoAttributeOptions {

    public final long attributeId;
    public final String attributeCode;
    public final Option [] options;

    @JsonCreator
    @JsonIgnoreProperties(ignoreUnknown = true)
    public MagentoAttributeOptions(@JsonProperty("attribute_id") long attributeId, @JsonProperty("attribute_code") String attributeCode, @JsonProperty("options") Option[] options){

        this.attributeId = attributeId;
        this.attributeCode = attributeCode;
        this.options = options;
    }

	public static final class ApplyTo {

    	@JsonCreator
		public ApplyTo() {
        	throw new UnsupportedOperationException();
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class Option {
        public final String label;
        public final String value;

        @JsonCreator
        public Option(@JsonProperty("label") String label, @JsonProperty("value") String value){
            this.label = label;
            this.value = value;
        }
    }


    public Map<String, String> getMap(){

        HashMap<String, String> values = new HashMap<>();
        for(Option option: options){
            values.put(option.value, option.label);
        }
        return values;
    }

}
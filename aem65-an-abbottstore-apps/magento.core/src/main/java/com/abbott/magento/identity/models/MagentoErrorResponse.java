package com.abbott.magento.identity.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;


@JsonIgnoreProperties(ignoreUnknown = true)
public final class MagentoErrorResponse {
    public final String message;
    public final Error [] errors;
    public final long code;
    public final Parameter [] parameters;
    public final String trace;

    @JsonCreator
    public MagentoErrorResponse(@JsonProperty("message") String message, @JsonProperty("errors") Error[] errors, @JsonProperty("code") long code, @JsonProperty("parameters") Parameter[] parameters, @JsonProperty("trace") String trace){
        this.message = message;
        this.errors = errors;
        this.code = code;
        this.parameters = parameters;
        this.trace = trace;
    }


    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class Error {
        public final String message;
        public final Parameter [] parameters;

        @JsonCreator
        public Error(@JsonProperty("message") String message, @JsonProperty("parameters") Parameter[] parameters){
            this.message = message;
            this.parameters = parameters;
        }

        public static final class Parameter {
            public final String resources;
            public final String fieldName;
            public final String fieldValue;

            @JsonCreator
            public Parameter(@JsonProperty("resources") String resources, @JsonProperty("fieldName") String fieldName, @JsonProperty("fieldValue") String fieldValue){
                this.resources = resources;
                this.fieldName = fieldName;
                this.fieldValue = fieldValue;
            }
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class Parameter {
        public final String resources;
        public final String fieldName;
        public final String fieldValue;

        @JsonCreator
        public Parameter(@JsonProperty("resources") String resources, @JsonProperty("fieldName") String fieldName, @JsonProperty("fieldValue") String fieldValue){
            this.resources = resources;
            this.fieldName = fieldName;
            this.fieldValue = fieldValue;
        }
    }
}

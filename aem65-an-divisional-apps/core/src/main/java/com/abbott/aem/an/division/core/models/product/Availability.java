
package com.abbott.aem.an.division.core.models.product;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Availability {

    @JsonProperty("ListNumber")
    private String listNumber;
    @JsonProperty("Description")
    private String description;

    @JsonProperty("ListNumber")
    public String getListNumber() {
        return listNumber;
    }

    @JsonProperty("ListNumber")
    public void setListNumber(String listNumber) {
        this.listNumber = listNumber;
    }

    @JsonProperty("Description")
    public String getDescription() {
        return description;
    }

    @JsonProperty("Description")
    public void setDescription(String description) {
        this.description = description;
    }

}

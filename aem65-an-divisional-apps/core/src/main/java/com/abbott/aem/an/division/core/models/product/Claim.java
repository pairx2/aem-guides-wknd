
package com.abbott.aem.an.division.core.models.product;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Claim {

    @JsonProperty("LineNumber")
    private Integer lineNumber;
    @JsonProperty("ClaimText")
    private String claimText;

    @JsonProperty("LineNumber")
    public Integer getLineNumber() {
        return lineNumber;
    }

    @JsonProperty("LineNumber")
    public void setLineNumber(Integer lineNumber) {
        this.lineNumber = lineNumber;
    }

    @JsonProperty("ClaimText")
    public String getClaimText() {
        return claimText;
    }

    @JsonProperty("ClaimText")
    public void setClaimText(String claimText) {
        this.claimText = claimText;
    }
}

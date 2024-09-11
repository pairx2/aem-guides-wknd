
package com.abbott.aem.an.division.core.models.product;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ClaimReference {

    @JsonProperty("LineNumber")
    private Integer lineNumber;
    @JsonProperty("ReferenceText")
    private String referenceText;
    @JsonProperty("ReferenceSymbol")
    private String referenceSymbol;

    @JsonProperty("LineNumber")
    public Integer getLineNumber() {
        return lineNumber;
    }

    @JsonProperty("LineNumber")
    public void setLineNumber(Integer lineNumber) {
        this.lineNumber = lineNumber;
    }

    @JsonProperty("ReferenceText")
    public String getReferenceText() {
        return referenceText;
    }

    @JsonProperty("ReferenceText")
    public void setReferenceText(String referenceText) {
        this.referenceText = referenceText;
    }

    @JsonProperty("ReferenceSymbol")
    public String getReferenceSymbol() {
        return referenceSymbol;
    }

    @JsonProperty("ReferenceSymbol")
    public void setReferenceSymbol(String referenceSymbol) {
        this.referenceSymbol = referenceSymbol;
    }
}

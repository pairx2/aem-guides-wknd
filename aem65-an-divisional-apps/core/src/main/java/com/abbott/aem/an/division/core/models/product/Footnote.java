
package com.abbott.aem.an.division.core.models.product;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Footnote {

    @JsonProperty("LineNumber")
    private Integer lineNumber;
    @JsonProperty("FootnoteValue")
    private String footnoteValue;
    @JsonProperty("FootnoteSymbol")
    private String footnoteSymbol;

    @JsonProperty("LineNumber")
    public Integer getLineNumber() {
        return lineNumber;
    }

    @JsonProperty("LineNumber")
    public void setLineNumber(Integer lineNumber) {
        this.lineNumber = lineNumber;
    }

    @JsonProperty("FootnoteValue")
    public String getFootnoteValue() {
        return footnoteValue;
    }

    @JsonProperty("FootnoteValue")
    public void setFootnoteValue(String footnoteValue) {
        this.footnoteValue = footnoteValue;
    }

    @JsonProperty("FootnoteSymbol")
    public String getFootnoteSymbol() {
        return footnoteSymbol;
    }

    @JsonProperty("FootnoteSymbol")
    public void setFootnoteSymbol(String footnoteSymbol) {
        this.footnoteSymbol = footnoteSymbol;
    }
}

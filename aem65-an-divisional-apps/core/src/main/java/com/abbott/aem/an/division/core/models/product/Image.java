
package com.abbott.aem.an.division.core.models.product;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Image {

    @JsonProperty("Filename")
    private String filename;
    @JsonProperty("Filetype")
    private String filetype;

    @JsonProperty("Filename")
    public String getFilename() {
        return filename;
    }

    @JsonProperty("Filename")
    public void setFilename(String filename) {
        this.filename = filename;
    }

    @JsonProperty("Filetype")
    public String getFiletype() {
        return filetype;
    }

    @JsonProperty("Filetype")
    public void setFiletype(String filetype) {
        this.filetype = filetype;
    }
}

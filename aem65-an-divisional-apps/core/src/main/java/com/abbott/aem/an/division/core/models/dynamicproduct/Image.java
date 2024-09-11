
package com.abbott.aem.an.division.core.models.dynamicproduct;

import com.abbott.aem.an.division.core.utils.Utils;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Image {

	@JsonProperty("Filetype")
	private String filetype;

	@JsonProperty("Filename")
	private String filename;

	@JsonProperty("Filetype")
	public String getFiletype() {
		return filetype;
	}

	@JsonProperty("Filetype")
	public void setFiletype(String filetype) {
		this.filetype = filetype;
	}

	@JsonProperty("Filename")
	public String getFilename() {
		return filename;
	}

	@JsonProperty("Filename")
	public void setFilename(String filename) {
		Utils objUtils = new Utils();
		this.filename = objUtils.getImagePathUrl(filename);
	}

}

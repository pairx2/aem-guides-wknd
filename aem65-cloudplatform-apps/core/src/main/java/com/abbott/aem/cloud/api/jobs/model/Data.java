package com.abbott.aem.cloud.api.jobs.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Data implements Serializable {
	private static final long serialVersionUID = -4400294789199572364L;
	private String aemExternalId;
	private String pepperUrl;
	private Website website;
	
	public Data() {
		super();
	}

	public Data(String aemExternalId, String pepperUrl) {
		super();
		this.aemExternalId = aemExternalId;
		this.pepperUrl = pepperUrl;
	}

	public String getAemExternalId() {
		return aemExternalId;
	}

	public void setAemExternalId(String aemExternalId) {
		this.aemExternalId = aemExternalId;
	}

	public String getPepperUrl() {
		return pepperUrl;
	}

	public void setPepperUrl(String pepperUrl) {
		this.pepperUrl = pepperUrl;
	}

	public Website getWebsite() {
		return website;
	}

	public void setWebsite(Website website) {
		this.website = website;
	}
}
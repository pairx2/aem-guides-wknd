package com.abbott.aem.cloud.api.jobs.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MainData implements Serializable {
	private static final long serialVersionUID = -5413050046426707085L;
	private DocumentCollection aemWebCollection;
	
	public MainData() {
		super();
	}

	public MainData(DocumentCollection aemWebCollection) {
		super();
		this.aemWebCollection = aemWebCollection;
	}

	public DocumentCollection getAemWebCollection() {
		return aemWebCollection;
	}

	public void setAemWebCollection(DocumentCollection aemWebCollection) {
		this.aemWebCollection = aemWebCollection;
	}
}
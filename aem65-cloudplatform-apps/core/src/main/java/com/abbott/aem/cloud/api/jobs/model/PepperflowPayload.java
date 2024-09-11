package com.abbott.aem.cloud.api.jobs.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PepperflowPayload implements Serializable {
	private static final long serialVersionUID = -5603579040543076205L;
	private MainData data;

	public PepperflowPayload() {
		super();
	}

	public PepperflowPayload(MainData data) {
		super();
		this.data = data;
	}

	public MainData getData() {
		return data;
	}

	public void setData(MainData data) {
		this.data = data;
	}
}
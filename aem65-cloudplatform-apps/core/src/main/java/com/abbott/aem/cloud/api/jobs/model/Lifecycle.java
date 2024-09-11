package com.abbott.aem.cloud.api.jobs.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Lifecycle implements Serializable {
	private static final long serialVersionUID = 6030591704547967050L;
	private String state;
	private String stateDisplay;
	private String date;
	
	public Lifecycle() {
		super();
	}

	public Lifecycle(String state, String stateDisplay, String date) {
		super();
		this.state = state;
		this.stateDisplay = stateDisplay;
		this.date = date;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getStateDisplay() {
		return stateDisplay;
	}

	public void setStateDisplay(String stateDisplay) {
		this.stateDisplay = stateDisplay;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}
}
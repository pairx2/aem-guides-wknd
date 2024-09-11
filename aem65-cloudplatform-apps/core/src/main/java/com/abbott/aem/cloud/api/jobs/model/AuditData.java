package com.abbott.aem.cloud.api.jobs.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AuditData implements Serializable {
	private static final long serialVersionUID = 7687122114081272233L;
	private String oldState;
	private String newState;
	
	public AuditData() {
		super();
	}

	public AuditData(String oldState, String newState) {
		super();
		this.oldState = oldState;
		this.newState = newState;
	}
	
	public String getOldState() {
		return oldState;
	}
	
	public void setOldState(String oldState) {
		this.oldState = oldState;
	}
	
	public String getNewState() {
		return newState;
	}
	
	public void setNewState(String newState) {
		this.newState = newState;
	}
}
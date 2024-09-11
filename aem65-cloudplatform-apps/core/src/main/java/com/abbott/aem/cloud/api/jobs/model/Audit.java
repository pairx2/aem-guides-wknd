package com.abbott.aem.cloud.api.jobs.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Audit implements Serializable {
	private static final long serialVersionUID = 5338809690168462596L;
	private String id;
	private String series;
	private String timestamp;
	private Version version;
	private String auditAction;
	private AuditData data;
	
	public Audit() {
		super();
	}

	public Audit(String id, String series, String timestamp, Version version, String auditAction, AuditData data) {
		super();
		this.id = id;
		this.series = series;
		this.timestamp = timestamp;
		this.version = version;
		this.auditAction = auditAction;
		this.data = data;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getSeries() {
		return series;
	}

	public void setSeries(String series) {
		this.series = series;
	}

	public String getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	public Version getVersion() {
		return version;
	}

	public void setVersion(Version version) {
		this.version = version;
	}

	public String getAuditAction() {
		return auditAction;
	}

	public void setAuditAction(String auditAction) {
		this.auditAction = auditAction;
	}

	public AuditData getData() {
		return data;
	}

	public void setData(AuditData data) {
		this.data = data;
	}
}
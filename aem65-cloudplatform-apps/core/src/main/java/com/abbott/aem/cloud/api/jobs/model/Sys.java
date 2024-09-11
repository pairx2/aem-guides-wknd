package com.abbott.aem.cloud.api.jobs.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Sys implements Serializable {
	private static final long serialVersionUID = 7568694066463350632L;
	private String id;
	private String documentId;
	private String createdDate;
	private Lifecycle lifecycle;
	private String lastModifiedDate;
	private Version version;
	private boolean currentVersion;
	
	public Sys() {
		super();
	}

	public Sys(String id, String documentId, String createdDate, Lifecycle lifecycle, String lastModifiedDate,
			Version version, boolean currentVersion) {
		super();
		this.id = id;
		this.documentId = documentId;
		this.createdDate = createdDate;
		this.lifecycle = lifecycle;
		this.lastModifiedDate = lastModifiedDate;
		this.version = version;
		this.currentVersion = currentVersion;
	}

	public String getDocumentId() {
		return documentId;
	}

	public void setDocumentId(String documentId) {
		this.documentId = documentId;
	}

	public Lifecycle getLifecycle() {
		return lifecycle;
	}

	public void setLifecycle(Lifecycle lifecycle) {
		this.lifecycle = lifecycle;
	}

	public String getLastModifiedDate() {
		return lastModifiedDate;
	}

	public void setLastModifiedDate(String lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}

	public Version getVersion() {
		return version;
	}

	public void setVersion(Version version) {
		this.version = version;
	}

	public boolean getCurrentVersion() {
		return currentVersion;
	}

	public void setCurrentVersion(boolean currentVersion) {
		this.currentVersion = currentVersion;
	}
}
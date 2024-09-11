package com.abbott.aem.cloud.api.jobs.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Fields implements Serializable {
	private static final long serialVersionUID = -7619745461003606503L;
	private String kind;
	private String displayName;
	private ContentOwner contentOwner;
	private String expirationDate;
	
	public Fields() {
		super();
	}

	public Fields(String kind, String displayName) {
		super();
		this.kind = kind;
		this.displayName = displayName;
	}

	public String getKind() {
		return kind;
	}

	public void setKind(String kind) {
		this.kind = kind;
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public ContentOwner getContentOwner() {
		return contentOwner;
	}

	public void setContentOwner(ContentOwner contentOwner) {
		this.contentOwner = contentOwner;
	}

	public String getExpirationDate() {
		return expirationDate;
	}

	public void setExpirationDate(String expirationDate) {
		this.expirationDate = expirationDate;
	}
}
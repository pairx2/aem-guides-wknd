package com.abbott.aem.cloud.api.jobs.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Version implements Serializable {
	private static final long serialVersionUID = 9179064518283114907L;
	private int major;
	private int minor;
	
	
	public Version() {
		super();
	}

	public Version(int major, int minor) {
		super();
		this.major = major;
		this.minor = minor;
	}

	public int getMajor() {
		return major;
	}

	public void setMajor(int major) {
		this.major = major;
	}

	public int getMinor() {
		return minor;
	}

	public void setMinor(int minor) {
		this.minor = minor;
	}
}
package com.abbott.aem.cloud.api.jobs.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PFNode implements Serializable {
	private static final long serialVersionUID = 1590074936802445769L;
	private Sys sys;
	private Fields fields;
	private Data data;
	private List<Audit> audit;
	
	public PFNode() {
		super();
	}

	public PFNode(Sys sys, Fields fields, Data data, List<Audit> audit) {
		super();
		this.sys = sys;
		this.fields = fields;
		this.data = data;
		this.audit = new ArrayList<> (audit);
	}

	public Sys getSys() {
		return sys;
	}

	public void setSys(Sys sys) {
		this.sys = sys;
	}

	public Fields getFields() {
		return fields;
	}

	public void setFields(Fields fields) {
		this.fields = fields;
	}

	public Data getData() {
		return data;
	}

	public void setData(Data data) {
		this.data = data;
	}

	public List<Audit> getAudit() {
		
		return new ArrayList<> (audit);
	}

	public void setAudit(List<Audit> audit) {
		this.audit = new ArrayList<> (audit);
	}
}
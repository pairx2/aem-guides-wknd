package com.abbott.aem.cloud.api.jobs.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DocumentCollection implements Serializable {
	private static final long serialVersionUID = -4716249109641100283L;
	private int skip;
	private int limit;
	private int total;
	private List<PFNode> nodes;
	
	public DocumentCollection() {
		super();
	}

	public DocumentCollection(int skip, int limit, int total, List<PFNode> nodes) {
		super();
		this.skip = skip;
		this.limit = limit;
		this.total = total;
		this.nodes = new ArrayList<> (nodes);
	}
	
	public int getSkip() {
		return skip;
	}
	
	public void setSkip(int skip) {
		this.skip = skip;
	}
	
	public int getLimit() {
		return limit;
	}
	
	public void setLimit(int limit) {
		this.limit = limit;
	}
	
	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public List<PFNode> getNodes() {
		
		return new ArrayList<> (nodes);
	}
	
	public void setNodes(List<PFNode> nodes) {
		
		this.nodes = new ArrayList<> (nodes);
	}
}
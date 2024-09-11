package com.abbott.aem.an.similac.core.beans;

public class AnalyticsBean {

	private String submissionType;

	private String eventCategory;

	private String eventLabel;

	private String eventAction;

	public String getSubmissionType() {
		return submissionType;
	}

	public void setSubmissionType(String submissionType) {
		this.submissionType = submissionType;
	}

	public String getEventCategory() {
		return eventCategory;
	}

	public void setEventCategory(String eventCategory) {
		this.eventCategory = eventCategory;
	}

	public String getEventLabel() {
		return eventLabel;
	}

	public void setEventLabel(String eventLabel) {
		this.eventLabel = eventLabel;
	}

	public String getEventAction() {
		return eventAction;
	}

	public void setEventAction(String eventAction) {
		this.eventAction = eventAction;
	}

	public boolean testNull() {
		return this.submissionType == null && this.eventAction == null && this.eventCategory == null
				&& this.eventLabel == null;
	}
}

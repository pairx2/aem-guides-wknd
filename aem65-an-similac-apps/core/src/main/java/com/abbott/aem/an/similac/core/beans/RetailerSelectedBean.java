package com.abbott.aem.an.similac.core.beans;

import java.util.LinkedHashMap;
import java.util.Map;

public class RetailerSelectedBean {
	private String selectedRetailer;
	private String selectedRetailerNote;
	private String amazonNote;
	private String targetInStoreNote;
	private String targetOnlineNote;
	private String tpgNote;
	private String submitButtonLabel;
	private String cancelButtonLabel;
	private Map<String, String> retailerOption = new LinkedHashMap<>();

	public String getSelectedRetailer() {
		return selectedRetailer;
	}

	public void setSelectedRetailer(String selectedRetailer) {
		this.selectedRetailer = selectedRetailer;
	}

	public String getSelectedRetailerNote() {
		return selectedRetailerNote;
	}

	public void setSelectedRetailerNote(String selectedRetailerNote) {
		this.selectedRetailerNote = selectedRetailerNote;
	}

	public String getAmazonNote() {
		return amazonNote;
	}

	public void setAmazonNote(String amazonNote) {
		this.amazonNote = amazonNote;
	}

	public String getTargetInStoreNote() {
		return targetInStoreNote;
	}

	public void setTargetInStoreNote(String targetInStoreNote) {
		this.targetInStoreNote = targetInStoreNote;
	}

	public String getTargetOnlineNote() {
		return targetOnlineNote;
	}

	public void setTargetOnlineNote(String targetOnlineNote) {
		this.targetOnlineNote = targetOnlineNote;
	}

	public String getTpgNote() {
		return tpgNote;
	}

	public void setTpgNote(String tpgNote) {
		this.tpgNote = tpgNote;
	}

	public String getSubmitButtonLabel() {
		return submitButtonLabel;
	}

	public void setSubmitButtonLabel(String submitButtonLabel) {
		this.submitButtonLabel = submitButtonLabel;
	}

	public String getCancelButtonLabel() {
		return cancelButtonLabel;
	}

	public void setCancelButtonLabel(String cancelButtonLabel) {
		this.cancelButtonLabel = cancelButtonLabel;
	}

	public Map<String, String> getRetailerOption() {
		return retailerOption;
	}

	public void setRetailerOption(Map<String, String> retailerOption) {
		this.retailerOption = retailerOption;
	}
}

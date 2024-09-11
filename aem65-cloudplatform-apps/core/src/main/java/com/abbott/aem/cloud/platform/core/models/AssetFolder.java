package com.abbott.aem.cloud.platform.core.models;

import java.io.Serializable;

public class AssetFolder implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 3620512289346703072L;
	private String assetFolderPath;
	private String priority;
	private String changeFrequency;
	/**
	 * @return the assetFolderPath
	 */
	public String getAssetFolderPath() {
		return assetFolderPath;
	}
	/**
	 * @param assetFolderPath the assetFolderPath to set
	 */
	public void setAssetFolderPath(String assetFolderPath) {
		this.assetFolderPath = assetFolderPath;
	}
	/**
	 * @return the priority
	 */
	public String getPriority() {
		return priority;
	}
	/**
	 * @param priority the priority to set
	 */
	public void setPriority(String priority) {
		this.priority = priority;
	}
	/**
	 * @return the changeFrequency
	 */
	public String getChangeFrequency() {
		return changeFrequency;
	}
	/**
	 * @param changeFrequency the changeFrequency to set
	 */
	public void setChangeFrequency(String changeFrequency) {
		this.changeFrequency = changeFrequency;
	}

}
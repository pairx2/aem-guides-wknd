package com.abbott.aem.an.division.core.components.models;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface ImageVideoSliderItem {

	String getLargeImage();

	String getSmallImage();

	String getAltText();

	String getAssetType();
	
	String getVideoUrl();
	
	String getVideoTitle();

}
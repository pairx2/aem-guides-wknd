package com.abbott.aem.cv.division.core.components.models;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Image;

@ConsumerType
public interface ImageDivisional extends Image{
	public String getCaptionAlignment();
	
	public String getUrlAction();
	public String getUrl();
	public String getAnchorName();
	public String getAssetUrl();
	public String getCaptionPlacement();
	public String getImageAlignment();
	public String getImageWidth();
	public String getImageHeight();
	public String getLimelightPlayerId();
	public String getLimelightMediaId();
	public String getOrgId();
	public String getYouTubeUrl();
	public String getFileReference();
	public String getParallaxFileReference();
	public String getCheckbox();
	public String getExternal();
	public String getDisplayOriginalImage();
	
}



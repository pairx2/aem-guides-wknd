package com.abbott.aem.cv.division.core.components.models;

/**
 * Model used by VideoCarouselImpl to create a list of chapters
 */

public interface VideoCarouselItem {

	public String getVideoType();
	public String getOrgID();
	public String getMediaID();
	public String getLimelightPlayerID();
	public String getVideoURL();
	public String getChapterImage();
	public String getAltText();
	public String getAlt();
	public String getIsDecorative();
	public String getAltValueFromDAM();
	public String getChapterTitle();
	public String getChapterDescription();

	public String getVideoCarouselAccountID();
	public String getVideoCarouselBrightVideoID();
	public String getVideoCarouselBrightPlayerID();
	public String getUniqueId();
}

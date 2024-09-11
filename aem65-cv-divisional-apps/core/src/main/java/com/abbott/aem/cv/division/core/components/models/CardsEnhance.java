package com.abbott.aem.cv.division.core.components.models;

import com.abbott.aem.platform.common.components.models.Cards;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface CardsEnhance extends Cards {
	
	public String getLinkType();
	public String getAnchorName();
	public String getMediaID();
	public String getLimelightPlayerID();
	public String getOrgID();
	public String getVideoURL();
	public String getImage();
	public String getPhoneNumber();
}
package com.abbott.aem.corp.division.core.components.models;

import org.osgi.annotation.versioning.ConsumerType;
import com.adobe.cq.wcm.core.components.models.Component;

@ConsumerType
public interface BannerDetails extends Component{
	
	String getBannerType();

	String getLink();

	String getText();

	String getVideoScript();

	String getVideoType();

	String getCerosNeeded();

	String getCerosScript();

	String getAutoPlay();

	String getTextPosition();

	String getHubModelPopup();

	String getPlayerId();

	String getMediaId();

	String getColorType();

	String getImagePath();

	String getAltText();
	
	String getNewTab();

}

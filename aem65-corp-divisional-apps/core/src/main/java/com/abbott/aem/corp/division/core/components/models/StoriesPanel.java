package com.abbott.aem.corp.division.core.components.models;

import org.osgi.annotation.versioning.ConsumerType;
import com.adobe.cq.wcm.core.components.models.Component;

@ConsumerType
public interface StoriesPanel extends Component{
	
	String getTitleColor();

	String getStoryHeadline();

	String getReadMore();

	String getStoryImage();

	String getStoryTitle();

	String getStoryType();

	String getVideoType();
	
	String getStoryDescription();
	
	String getRootPath();
	
	String getMediaId();
	
	String getVideoScript();
	
	String getStoryDate();
	
	String getDynamicData();
	
	String getAltText();
	
	String getPlayerId();
	
	String getStoryLink();
	
	String getNewTab();

	String getColor();
	
	String getAssetLink();

	String getStoriesDynamicPath();
		
}

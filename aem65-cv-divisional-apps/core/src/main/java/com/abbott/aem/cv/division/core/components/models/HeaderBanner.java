package com.abbott.aem.cv.division.core.components.models;

import java.util.List;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Component;
@ConsumerType
public interface HeaderBanner extends Component {
	
	public String getBannerHeight();
	
	public String getBackgroundColor();
	
	public String getBackgroundType();
	
	public String getTopMargin();
	
	public String getHideMobile();
	
	public String getBottomMargin();
	
	public String getTextContainerWidth();
	
	public String getStopCarouselAutoRotate();
	
	public List<HeaderBannerItem> getImageTextlist();
    
}

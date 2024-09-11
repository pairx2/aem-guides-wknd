package com.abbott.aem.cv.division.core.components.models;

import java.util.List;

import org.osgi.annotation.versioning.ConsumerType;
import com.adobe.cq.wcm.core.components.models.Component;

/**
 * Model used by HeaderbannerImpl to create a list of img
 */
@ConsumerType
public interface HeaderBannerItem extends Component {

	public String getTitle();
	
	
	public String getImageFileReference();

	public String getDecorative();

	public String getAltText();
	

	public String getTitleTag();
	

	public String getTitleColor();
	
	
	public String getSubtitle();
	
	public String getSubtitleTag();

	public String getSubtitleColor();


	public List<Button> getButtonList();

}
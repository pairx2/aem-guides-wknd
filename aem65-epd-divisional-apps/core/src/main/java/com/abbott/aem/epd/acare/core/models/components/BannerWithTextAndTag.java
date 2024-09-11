package com.abbott.aem.epd.acare.core.models.components;

import com.adobe.cq.sightly.SightlyWCMMode;
import org.osgi.annotation.versioning.ConsumerType;
import org.apache.sling.api.resource.Resource;

import com.adobe.cq.wcm.core.components.models.Teaser;

/**
 *
 * Model for Banner with text and tag component
 */
 
@ConsumerType
public interface BannerWithTextAndTag extends Teaser {

	/**
	 * 
	 * @return the Link associated to banner of this component
	 */
	public String getBannerLink();

	/**
	 * 
	 * @return the Image of this component
	 */
	public String getBannerImage();

	public void setLinkURL(String linkURL);

	public String getFileReference();
	public void setFileReference(String fileReference);

	public boolean getDescriptionFromPage();
	public void setDescriptionFromPage(boolean descriptionFromPage);

	public String getPadding();
	public void setPadding(String padding);
	public String getBannerAlignment();
	public void setBannerAlignment(String bannerAlignment);

	public String getBannerAltText();
	public void setBannerAltText(String bannerAltText);
	public void setWcmmode(SightlyWCMMode wcmmode);
	public void setResource(Resource resource);





}
package com.abbott.aem.epd.acare.core.models.components;

import org.osgi.annotation.versioning.ConsumerType;
/**
 *
 * Model for Email tag component
 */
 
@ConsumerType
public interface EmailTag {
	
	/**	 
	 * @return the Tag Link of this component
	 */
	public String getTagLink();
	public void setTagLink(String tagLink);
	
	/**	 
	 * @return the Tag Image of this component
	 */
	public String getTagIcon();
	public void setTagIcon(String tagIcon);


	
	/**	 
	 * @return the Tag Link text of this component
	 */
	public String getTagLinkText();
	public void setTagLinkText(String tagLinkText);
	
	/**	 
	 * @return the Tag alt text of this component
	 */
	public String getTagAltText();
	public void setTagAltText(String tagAltText);

	public String getTextColor();
	public void setTextColor(String textColor);

	public String getTagBGColor();
	public void setTagBGColor(String tagBGColor);
}
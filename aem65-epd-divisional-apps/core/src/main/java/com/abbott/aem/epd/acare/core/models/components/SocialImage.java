package com.abbott.aem.epd.acare.core.models.components;

import org.osgi.annotation.versioning.ConsumerType;

/**
 *
 * Model used by Footer EMail to create a list of Social Images and Links
 */
@ConsumerType
public interface SocialImage {
	
	/**
	 * 
	 * @return the social icon.
	 */
	public String getSocialIcon();
	
	/**
	 * 
	 * Set the social icon.
	 */
	public void setSocialIcon(String socialIcon);
	
	/**
	 * 
	 * @return the item link.
	 */
	public String getLink();
	
	/**
	 * 
	 * Set the item link.
	 */
	public void setLink(String link);
	
	/**
	 * 
	 * @return the socialIcon alt text.
	 */
	public String getSocialAltText();
	
	/**
	 * 
	 * Set the socialIcon alt text.
	 */
	public void setSocialAltText(String socialAltText);
	
}


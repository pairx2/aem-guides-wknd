package com.abbott.aem.epd.acare.core.models.components;

import org.osgi.annotation.versioning.ConsumerType;

/**
 *
 * Model used by Footer EMail to create a list of Item Link and text
 */
@ConsumerType
public interface LinkItem {
	
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
	 * @return the item text.
	 */
	public String getText();
	
	/**
	 * 
	 * Set the item text.
	 */
	public void setText(String text);
}


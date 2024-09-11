package com.abbott.aem.epd.acare.core.models.components;

import org.osgi.annotation.versioning.ConsumerType;

/**
 *
 * Model for Body text with tag component
 */
 
@ConsumerType
public interface BodyTextWithTag {
	
	/**	 
	 * @return the text property value of this component
	 */
	public String getText();

	/**
	 * This method returns the text with link configured reforemd with externalized
	 * value
	 * 
	 * @return String text
	 * 
	 * 
	 */

	

	String getNeedNonRichText();

	String getNonRichText();
}
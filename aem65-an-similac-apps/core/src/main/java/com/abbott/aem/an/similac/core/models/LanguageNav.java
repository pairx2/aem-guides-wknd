package com.abbott.aem.an.similac.core.models;

import com.adobe.cq.wcm.core.components.models.LanguageNavigation;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * The interface Custom language navigation.
 */
@ConsumerType
public interface LanguageNav extends LanguageNavigation {

	/**
	 * Gets placeholder.
	 *
	 * @return the placeholder
	 */
	public String getPlaceholder();

}

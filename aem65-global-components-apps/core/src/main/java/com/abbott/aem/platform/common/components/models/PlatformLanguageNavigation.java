package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.LanguageNavigation;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * The interface Custom language navigation.
 */
@ConsumerType
public interface PlatformLanguageNavigation extends LanguageNavigation {

	/**
	 * Gets placeholder.
	 *
	 * @return the placeholder
	 */
	public String getPlaceholder();

	/**
	 * Gets placeholder.
	 *
	 * @return the placeholder
	 */
	public String getAscendingOrder();

	/**
	 * Gets search required.
	 *
	 * @return the search required
	 */
	public String getSearchRequired();

	/**
	 * Gets hide language key.
	 *
	 * @return the hide language key
	 */
	public String getHideLanguage();

	/**
	 * Gets hide country key.
	 *
	 * @return the hide country key
	 */
	public String getHideCountry();
	
	/**
	 * Gets navigator type
	 *
	 * @return the navigator type
	 */
	public String getNavigatorType();

	/**
	 * Gets show hyphen between language and country keys.
	 *
	 * @return the show hyphen between language and country keys
	 */
	public Boolean getShowHyphen();

	/**
	 * Gets show parenthesis around language and country keys.
	 *
	 * @return the show parenthesis around language and country keys
	 */
	public Boolean getShowParenthesis();
	
	/**
	 * Checks whether column header is required
	 *
	 * @return the column header selection
	 */
	public String getColumnHeaderRequired();
}

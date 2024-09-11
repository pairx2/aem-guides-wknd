package com.abbott.aem.platform.common.components.models;

import java.util.List;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * Interface that models the top search list component. This
 * component contains a headline and a list of search keywords.
 */
@ConsumerType
public interface TopSearchList {
	/**
	 * @return the headline for this top search list component.
	 */
	public String getHeadline();

	/**
	 * @return the list of search keywords.
	 */
	public List<SearchKeyword> getSearchKeywords();
}

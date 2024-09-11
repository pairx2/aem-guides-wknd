package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * Model used by TopSearchList to create a list of search keywords
 */
@ConsumerType
public interface SearchKeyword {

	/**
	 * @return the search keyword.
	 */
	public String getSearchKeyword();
}


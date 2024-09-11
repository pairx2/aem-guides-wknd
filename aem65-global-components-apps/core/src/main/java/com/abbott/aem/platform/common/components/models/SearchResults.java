package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;


/**
 * The Interface SearchResults.
 */
@ConsumerType
public interface SearchResults extends Component {

	/**
	 * Gets the search type.
	 *
	 * @return the search type
	 */
	default String getSearchType() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns the Search Results Heading.
	 *
	 * @return the searh results heading.
	 */
	default String getSearchResultsHeading() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns the No Search Results Text.
	 *
	 * @return the no search results text.
	 */
	default String getNoSearchResultsText() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns the Search results per page.
	 *
	 * @return the search results per page
	 */
	default String getSearchResultsPerPage() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns the Show Result Count.
	 *
	 * @return the Show Result Count
	 */
	default boolean isShowResultCount() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns the Search Filters.
	 *
	 * @return the Search Filters
	 */
	default String getSearchFiltersProperties() { throw new UnsupportedOperationException(); }

	/**
	 * Returns the Best Match Label.
	 *
	 * @return the Best Match Label
	 */
	default String getBestMatchLabel() { throw new UnsupportedOperationException(); }

	/**
	 * Returns the Ascending Label.
	 *
	 * @return the Ascending Label
	 */
	default String getAscendingLabel() { throw new UnsupportedOperationException(); }

	/**
	 * Returns the Descending Label.
	 *
	 * @return the Descending Label
	 */
	default String getDescendingLabel() { throw new UnsupportedOperationException(); }

	/**
	 * Returns the Default Sorting Order.
	 *
	 * @return the Default Sorting Order
	 */
	default String getDefaultSortingOrder() { throw new UnsupportedOperationException(); }
	
	/**
	 * Returns the EnableStaticContent.
	 *
	 * @return the EnableStaticContent
	 */
	default String isEnableStaticContent() { throw new UnsupportedOperationException(); }

	/**
	 * Returns the Enable Sticky Filter flag.
	 *
	 * @return the Enable Sticky Filter
	 */
	default boolean isEnableStickyFilter() {
		throw new UnsupportedOperationException();
	}
	
	default String getSortFiltersProperties() { throw new UnsupportedOperationException(); }
	
	default String getShowTitle() { throw new UnsupportedOperationException(); }
	
	default String getPageTitle() { throw new UnsupportedOperationException(); }
	
	default String getSearchPredictive() { throw new UnsupportedOperationException(); }

	default String getOnSuccess() {
		throw new UnsupportedOperationException();
	}

}

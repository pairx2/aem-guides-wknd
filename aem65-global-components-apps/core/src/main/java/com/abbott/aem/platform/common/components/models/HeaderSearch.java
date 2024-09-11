package com.abbott.aem.platform.common.components.models;

import java.util.List;

import com.adobe.cq.wcm.core.components.models.Component;

import org.apache.sling.api.resource.Resource;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface HeaderSearch extends Component {

	/**
	 * Returns the Search Title Place Holder value.
	 *
	 * @return the search title value.
	 */
	default String getSearchTitle() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns the Search Icon value.
	 *
	 * @return the search icon value.
	 */
	default String getSearchIcon() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns the Close Icon value.
	 *
	 * @return the close icon value.
	 */
	default String getCloseIcon() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Returns the Search Results Page.
	 *
	 * @return the search results page.
	 */
	default String getSearchResultsPage() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Search Filters.
	 *
	 * @return the List
	 */
	default List<Resource> getFilters() {
		throw new UnsupportedOperationException();
	}

	/**
	 * Search Sorting List.
	 *
	 * @return the List
	 */
	default List<Resource> getSortOrder() {
		throw new UnsupportedOperationException();
	}
	/**
	 * Check to enable Predictive Search
	 *
	 * @return  boolean check value
	 */
	default boolean getEnablePredictiveSearch() {
		throw new UnsupportedOperationException();
	}
	default String getSuggestEndPointUrl() {
		throw new UnsupportedOperationException();
	}

	default String getSecuredSiteSearch() {
		throw new UnsupportedOperationException();
	}
	
	default String getSecuredQuerySuggest() {
		throw new UnsupportedOperationException();
	}
	
	default String getSearchHeading() {
		throw new UnsupportedOperationException();
	}

	default boolean getEnableSearchReset() {
		throw new UnsupportedOperationException();
	}
}

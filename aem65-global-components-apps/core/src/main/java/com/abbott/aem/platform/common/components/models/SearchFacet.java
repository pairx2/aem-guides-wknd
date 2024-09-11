package com.abbott.aem.platform.common.components.models;

import java.util.List;

import org.osgi.annotation.versioning.ConsumerType;

import com.abbott.aem.platform.common.components.models.impl.v2.SearchFacetItem;
import com.adobe.cq.wcm.core.components.models.Component;

/**
 * The Interface SearchFacet.
 */
@ConsumerType
public interface SearchFacet extends Component {

	/**
	 * Gets the search facet properties.
	 *
	 * @return the search facet properties
	 */
	default List<SearchFacetItem> getSearchFacetProperties() { throw new UnsupportedOperationException(); }

	/**
	 * Gets the search facet properties.
	 *
	 * @return the search facet properties
	 */
	default String getIsSearchBarEnable() { throw new UnsupportedOperationException(); }

	/**
	 * Gets the search facet properties.
	 *
	 * @return the search facet properties
	 */
	default String getIsAutoHidingEnable() { throw new UnsupportedOperationException(); }

	/**
	 * Gets the search facet properties.
	 *
	 * @return the search facet properties
	 */
	default String getSearchHeading() { throw new UnsupportedOperationException(); }

	/**
	 * Gets the search facet properties.
	 *
	 * @return the search facet properties
	 */
	default String getSearchPlaceholder() { throw new UnsupportedOperationException(); }

	/**
	 * Gets the search facet properties.
	 *
	 * @return the search facet properties
	 */
	default String getIcon() { throw new UnsupportedOperationException(); }
	
	/**
	 * Gets the hide  SearchCategory Facet.
	 *
	 * @return the hide SearchCategory Facet
	 */
	default String getDisableSearchCategoryFacet() { throw new UnsupportedOperationException(); }
}

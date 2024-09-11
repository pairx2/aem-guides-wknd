package com.abbott.aem.platform.common.components.models.impl.v2;

import lombok.Getter;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.Objects;

/**
 * The Class SearchFacetItem.
 */
@Model(adaptables = Resource.class,
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SearchFacetItem extends com.abbott.aem.platform.common.components.models.impl.v1.SearchFacetV1Item implements Comparable<SearchFacetItem> {

	private static final String STR_TRUE = "true";

	/**
	 * The is checkbox enable
	 */
	@ValueMapValue
	@Getter
	private String isCheckboxEnable;

	/**
	 * The is truncation enable.
	 */
	@ValueMapValue
	@Getter
	private String isTruncationEnable;
	@Getter
	String tagFacetTitle;

	/**
	 * The is default sorting order.
	 */
	@ValueMapValue
	@Getter
	private String defaultSortingOrder;
	@Getter
	String allTagFacets;
	/**
	 * The is sorting enable.
	 */

	@ValueMapValue
	@Getter
	private String isSortingEnable;
	/**
	 * The facetTag.
	 */
	@ValueMapValue
	private String facetTagID;
	/**
	 * The isTagChildrenFacets.
	 */
	@ValueMapValue
	private String isTagChildrenFacets;

	/**
	 * The is primary category.
	 */
	@ValueMapValue
	@Getter
	private String isPrimary;

	/**
	 * The is secondary category.
	 */
	@ValueMapValue
	@Getter
	private String isSecondary;

	public String getFacetTagID() {
		return facetTagID;
	}

	public String getTagFacetTitle() {
		return tagFacetTitle;
	}

	public void setTagFacetTitle(String tagTitle) {
		tagFacetTitle = tagTitle;
	}

	public boolean isTagChildrenAsfacets() {
		return StringUtils.isNotBlank(isTagChildrenFacets) && isTagChildrenFacets.equalsIgnoreCase(STR_TRUE);
	}

	public void setAllTagFacets(String tagJson) {
		allTagFacets = tagJson;
	}

	public String getIsCheckboxEnable() {
		return isCheckboxEnable;
	}

	public void setIsCheckboxEnable(String isCheckboxEnable) {
		this.isCheckboxEnable = isCheckboxEnable;
	}

	@Override
	public String getIsTruncationEnable() {
		return isTruncationEnable;
	}

	@Override
	public void setIsTruncationEnable(String isTruncationEnable) {
		this.isTruncationEnable = isTruncationEnable;
	}

	public String getIsSortingEnable() {
		return isSortingEnable;
	}

	public void setIsSortingEnable(String isSortingEnable) {
		this.isSortingEnable = isSortingEnable;
	}

	public String getIsTagChildrenFacets() {
		return isTagChildrenFacets;
	}

	public String getDefaultSortingOrder() {
		return defaultSortingOrder;
	}

	public void setDefaultSortingOrder(String defaultSortingOrder) {
		this.defaultSortingOrder = defaultSortingOrder;
	}

    public String getIsPrimary() {
		return isPrimary;
	}

	public void setIsPrimary(String isPrimary) {
		this.isPrimary = isPrimary;
	}

	public String getIsSecondary() {
		return isSecondary;
	}

	public void setIsSecondary(String isSecondary) {
		this.isSecondary = isSecondary;
	}
	@Override
	public int compareTo(SearchFacetItem facetItem) {
		return this.getTagFacetTitle().compareToIgnoreCase(facetItem.getTagFacetTitle());
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null || getClass() != obj.getClass()) {
			return false;
		}
		SearchFacetItem other = (SearchFacetItem) obj;
		return this.getTagFacetTitle().equalsIgnoreCase(other.getTagFacetTitle());
	}
	@Override
	public int hashCode() {
		return Objects.hash(tagFacetTitle != null ? tagFacetTitle.toLowerCase() : null);
	}
	
}
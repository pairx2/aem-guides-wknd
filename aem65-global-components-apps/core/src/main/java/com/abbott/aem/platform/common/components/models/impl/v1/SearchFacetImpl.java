package com.abbott.aem.platform.common.components.models.impl.v1;

import java.util.ArrayList;
import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import com.abbott.aem.platform.common.components.models.SearchFacet;
import com.abbott.aem.platform.common.components.models.impl.v2.SearchFacetItem;
import com.adobe.cq.export.json.ExporterConstants;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The Class SearchFacetImpl.
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { SearchFacet.class }, resourceType = {
		SearchFacetImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class SearchFacetImpl implements SearchFacet {

	/**
	 * The Constant RESOURCE_TYPE.
	 */
	protected static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/searchfacet/v1/searchfacet";

	/**
	 * The category.
	 */
	@ChildResource(name = "categoryFacets")
	@Setter(AccessLevel.NONE)
	private List<Resource> categoryFacets;
	
	/**
	 * The is disable SearchCategory Facet.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String disableSearchCategoryFacet;

	/**
	 * Gets the search facet properties.
	 *
	 * @return the search facet properties
	 */
	@Override
	public List<SearchFacetItem> getSearchFacetProperties() {
		List<SearchFacetItem> searchFacetList = new ArrayList<>();
		if (null != categoryFacets) {
			for (Resource childRes : categoryFacets) {
				SearchFacetItem searchFacetBean = childRes.adaptTo(SearchFacetItem.class);
				searchFacetList.add(searchFacetBean);
			}
		}
		return searchFacetList;
	}
}

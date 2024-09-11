package com.abbott.aem.platform.common.components.models.impl.v1;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;
import org.apache.commons.lang3.StringUtils;

import com.abbott.aem.platform.common.components.models.SearchResults;
import com.abbott.aem.platform.common.components.services.APILookupService;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import javax.annotation.OverridingMethodsMustInvokeSuper;

import java.util.List;
import org.apache.commons.lang3.StringUtils;

/**
 * The Class SearchResultsImpl.
 */
@Data
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { SearchResults.class,
		ComponentExporter.class }, resourceType = {
				SearchResultsImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class SearchResultsImpl extends ComponentProxyImpl implements SearchResults {

	/**
	 * The Constant RESOURCE_TYPE.
	 */
	public static final String RESOURCE_TYPE = "abbott-platform/components/content/organism/searchresults/v1/searchresults";

	/**
	 * The Constant SEARCH_API_KEY.
	 */
	public static final String SEARCH_API_KEY = "siteSearch";

	/**
	 * The component.
	 */
	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;

	/**
	 * The api lookup service.
	 */
	@OSGiService
	private APILookupService apiLookupService;

	/**
	 * The search type.
	 */
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String searchType;

	/**
	 * The search results heading.
	 */
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String searchResultsHeading;

	/**
	 * The no search results text.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String noSearchResultsText;

	/**
	 * The search results per page.
	 */
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String searchResultsPerPage;

	/**
	 * The search end pt url.
	 */
	@Setter(AccessLevel.NONE)
	private String searchEndPtUrl;

	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private boolean showResultCount;

	@ChildResource(name = "searchFilters")
	@Setter(AccessLevel.NONE)
	private List<Resource> searchFilters;

	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String bestMatchLabel;

	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String ascendingLabel;

	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String descendingLabel;

	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String defaultSortingOrder;
	
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	@Default(values="false")
	private String enableStaticContent;

	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	@Default(booleanValues = false)
	private boolean enableStickyFilter;

	@ChildResource(name = "sortFilters")
	@Setter(AccessLevel.NONE)
	private List<Resource> sortFilters;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String showTitle;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String pageTitle;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String searchPredictive;
	
	

	@Override
	public String getShowTitle() {
		if(this.showTitle!=null) {
			return this.showTitle;
			}
			return StringUtils.EMPTY;
	}
	
	@Override
	public String getPageTitle() {
		if(this.pageTitle!=null) {
			return this.pageTitle;
			}
			return StringUtils.EMPTY;
	}
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String onSuccess;

	/**
	 * Returns the Search End Point URL.
	 *
	 * @return the search end pt url
	 */
	public String getSearchEndPtUrl() {
		searchEndPtUrl = apiLookupService.getAPIEndpointForKey(SEARCH_API_KEY);
		return searchEndPtUrl;
	}
	@Override
	public String getSearchType() {
		if(this.searchType!=null) {
		return this.searchType;
		}
		return StringUtils.EMPTY;
	}
	
	@Override
	public String getSearchPredictive() {
		if(this.searchPredictive!=null) {
		return this.searchPredictive;
		}
		return StringUtils.EMPTY;
	}
	
	
	@Override
	public String getSearchResultsHeading() {
		if(this.searchResultsHeading!=null) {
		return this.searchResultsHeading;
		}
		return StringUtils.EMPTY;
	}
	
	@Override
	public String getNoSearchResultsText() {
		if(this.noSearchResultsText!=null) {
		return this.noSearchResultsText;
		}
		return StringUtils.EMPTY;
	}
	
	@Override
	public String getSearchResultsPerPage() {
		if(this.searchResultsPerPage!=null) {
		return this.searchResultsPerPage;
		}
		return StringUtils.EMPTY;
	}
	
	@Override
	public boolean isShowResultCount() {
	
		return this.showResultCount;
	}
	
	@Override
	public String getBestMatchLabel() {
		if(this.bestMatchLabel!=null) {
		return this.bestMatchLabel;
		}
		return StringUtils.EMPTY;
	}
	
	@Override
	public String getAscendingLabel() {
		if(this.ascendingLabel!=null) {
		return this.ascendingLabel;
		}
		return StringUtils.EMPTY;
	}
	
	@Override
	public String getDescendingLabel() {
		if(this.descendingLabel!=null) {
		return this.descendingLabel;
		}
		return StringUtils.EMPTY;
	}
	@Override
	public String getDefaultSortingOrder() {
		if(this.defaultSortingOrder!=null) {
		return this.defaultSortingOrder;
		}
		return StringUtils.EMPTY;
	}
	
	@Override
	public String isEnableStaticContent() {
		
		return this.enableStaticContent;
		}
	
	@Override
	public boolean isEnableStickyFilter() {
	
		return this.enableStickyFilter;
	}

	/**
	 * Gets the search filters.
	 *
	 * @return the search filters
	 */
	@Override
	@OverridingMethodsMustInvokeSuper
	public String getSearchFiltersProperties() {
		JsonArray searchFilterList = new JsonArray();
		if (null != searchFilters) {
			for (Resource childRes : searchFilters) {
				JsonObject searchFilterObj = new JsonObject();
				SearchFilter searchFilterBean = childRes.adaptTo(SearchFilter.class);
				searchFilterObj.addProperty(searchFilterBean.getFieldName(), searchFilterBean.getFieldValue());
				searchFilterList.add(searchFilterObj);
			}
		}
		return new Gson().toJson(searchFilterList);
	}

	/**
	 * Gets the sort filters.
	 *
	 * @return the sort filters
	 */
	@Override
	@OverridingMethodsMustInvokeSuper
	public String getSortFiltersProperties() {
		JsonArray sortFilterList = new JsonArray();
		if (null != sortFilters) {
			JsonObject sortFilterObj = new JsonObject();
			for (Resource childRes : sortFilters) {
				SortFilter sortFilterBean = childRes.adaptTo(SortFilter.class);
				sortFilterObj.addProperty(sortFilterBean.getFieldName(), sortFilterBean.getFieldValue());
			}
			sortFilterList.add(sortFilterObj);
		}
		return new Gson().toJson(sortFilterList);
	}
	
	
	@Override
	public String getOnSuccess() {
		if (this.onSuccess != null) {
			return this.onSuccess;
		}
		return StringUtils.EMPTY;
	}

}

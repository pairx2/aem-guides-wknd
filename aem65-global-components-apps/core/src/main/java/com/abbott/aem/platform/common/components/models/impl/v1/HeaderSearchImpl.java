package com.abbott.aem.platform.common.components.models.impl.v1;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import javax.inject.Inject;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;
import org.apache.commons.lang3.StringUtils;
import com.abbott.aem.platform.common.components.models.HeaderSearch;
import com.abbott.aem.platform.common.components.services.APILookupService;
import com.abbott.aem.platform.common.constants.CommonConstants;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.wcm.api.Page;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Data
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { HeaderSearch.class, ComponentExporter.class },
	   resourceType = { HeaderSearchImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class HeaderSearchImpl extends ComponentProxyImpl implements HeaderSearch {

	
	public static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/headersearch/v1/headersearch";

	/**
	 * The Constant SUGGEST_API_KEY.
	 */
	public static final String SUGGEST_API_KEY = "querySuggest";
	public static final String SECURED_SITE_SEARCH = "securedSiteSearch";
	public static final String SECURED_QUERY_SUGGEST = "securedQuerySuggest";

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

	@Inject
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Page currentPage;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String searchTitle;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String searchIcon;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String closeIcon;

	@ChildResource(name = "filters")
	@Setter(AccessLevel.NONE)
	private List<Resource> filters;

	@ChildResource(name = "sortOrder")
	@Setter(AccessLevel.NONE)
	private List<Resource> sortOrder;

    @ValueMapValue
	@Setter(AccessLevel.NONE)
	private boolean enablePredictiveSearch;
	 
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String searchHeading;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private boolean enableSearchReset;

	@Setter(AccessLevel.NONE)
	private String searchResultsPage;

	/**
	 * The suggest end point url.
	 */
	@Setter(AccessLevel.NONE)
	private String suggestEndPointUrl;

	@Setter(AccessLevel.NONE)
	private String seacuredSiteSearch;
	
	@Setter(AccessLevel.NONE)
	private String securedQuerySuggest;
	
		
	@Override
	public List<Resource> getFilters() {
		return (this.filters != null && !this.filters.isEmpty()) ?
				new ArrayList<>(this.filters) : Collections.emptyList();
	}

	@Override
	public List<Resource> getSortOrder() {
		return (this.sortOrder != null && !this.sortOrder.isEmpty()) ?
				new ArrayList<>(this.sortOrder) : Collections.emptyList();
	}

	/**
	 * Returns the Search Results Page
	 */
	@Override
	public String getSearchResultsPage() {
		InheritanceValueMap inheritedProperties = new HierarchyNodeInheritanceValueMap(currentPage.adaptTo(Resource.class));
		searchResultsPage = inheritedProperties.getInherited(CommonConstants.SEARCH_RESULTS_PAGE, String.class);
		searchResultsPage = searchResultsPage + CommonConstants.HTML_EXTENSION;
		return searchResultsPage;
	}

	/**
	 * Gets the suggest end point url.
	 *
	 * @return the suggest end point url
	 */
	@Override
	public String getSuggestEndPointUrl() {
		
		return apiLookupService.getAPIEndpointForKey(SUGGEST_API_KEY);
	}

	@Override
	public String getSecuredSiteSearch() {
		return apiLookupService.getAPIEndpointForKey(SECURED_SITE_SEARCH);
	}
	
	@Override
	public String getSecuredQuerySuggest() {
		
		return apiLookupService.getAPIEndpointForKey(SECURED_QUERY_SUGGEST);
	}
	
	@Override
	public String getSearchTitle() {
		if(this.searchTitle!=null) {
		return this.searchTitle;
		}
		return StringUtils.EMPTY;
	}
	
	@Override
	public String getSearchIcon() {
		if(this.searchIcon!=null) {
		return this.searchIcon;
		}
		return StringUtils.EMPTY;
	}
	
	@Override
	public String getCloseIcon() {
		if(this.closeIcon!=null) {
		return this.closeIcon;
		}
		return StringUtils.EMPTY;
	}
	
	@Override
	public String getSearchHeading() {
		if(this.searchHeading!=null) {
		return this.searchHeading;
		}
		return StringUtils.EMPTY;
	}
	
	
	@Override
	public boolean getEnablePredictiveSearch() {
		
		return this.enablePredictiveSearch;
	}
	
	@Override
	public boolean getEnableSearchReset() {
	
		return this.enableSearchReset;
	}
}

package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.POILocator;
import com.abbott.aem.platform.common.components.services.APILookupService;
import com.abbott.aem.platform.common.constants.CommonConstants;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.wcm.api.Page;

import javax.inject.Inject;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The Class SearchResultsImpl.
 */
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { POILocator.class, ComponentExporter.class },
	   resourceType = { POILocatorImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class POILocatorImpl extends ComponentProxyImpl implements POILocator {

	/**
	 * The Constant RESOURCE_TYPE.
	 */
	public static final String RESOURCE_TYPE = "abbott-platform/components/content/organism/poilocator/v1/poilocator";


	/**
	 * The component.
	 */
	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;
   
	/**
	 * The locator type.
	 */
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String locatorType;
  
    
	@Inject
	@Setter(AccessLevel.NONE)
	@Getter
	private Page currentPage;
	
	/**
	 * Radius
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String mapRadius;


	private String currentPagePath;

	@OSGiService
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private APILookupService apiLookupService;

	/**
	 * Radius
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String mapZoom;
	
	/**
	 * Enter City or state name to display results on page load
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String enterCityOrStateNameOnPageLoad;
	
	/**
	 * Enter Update Request Function name here
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String updateRequest;
	
	/**
	 * Show Result on page load
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private boolean showResultOnPageLoad;

	/**
	 * Show Duplicate Number Result on page load
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private boolean showDuplicateResultNumber;
	
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String mapMarkerTextColor;

	/**
	 * Get mapMarkerImage
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String mapMarkerImage;


	
	@Override
	public String getGoogleMapApiKey() {
		InheritanceValueMap inheritedProperties = new HierarchyNodeInheritanceValueMap(currentPage.adaptTo(Resource.class));
		return inheritedProperties.getInherited(CommonConstants.GOOGLE_MAP_API_KEY, String.class);
	}

	@Override
	public String getGoogleMapApiUrl() {
		InheritanceValueMap inheritedProperties = new HierarchyNodeInheritanceValueMap(currentPage.adaptTo(Resource.class));
		return inheritedProperties.getInherited(CommonConstants.GOOGLE_MAP_API_URL, String.class);
	}
	
	@Override
	public String getUpdateRequest() {
		if (this.updateRequest != null) {
			return this.updateRequest;
		}
		return StringUtils.EMPTY;
	}

    @Override
	public String getDomainName() {
		return apiLookupService.getRequestEndpoint(StringUtils.EMPTY);
    }

	@Override
	public String getCurrentPagePath() {
		return currentPagePath;
	}


}

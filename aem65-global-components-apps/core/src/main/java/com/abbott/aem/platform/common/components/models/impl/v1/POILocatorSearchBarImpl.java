package com.abbott.aem.platform.common.components.models.impl.v1;

import javax.inject.Inject;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.POILocatorSearchBar;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;
import com.day.cq.wcm.api.Page;

import org.apache.sling.api.SlingHttpServletRequest;

import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { POILocatorSearchBar.class, ComponentExporter.class },
	   resourceType = { POILocatorSearchBarImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class POILocatorSearchBarImpl extends ComponentProxyImpl implements POILocatorSearchBar {

	public static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/poilocatorsearchbar/v1/poilocatorsearchbar";

	
	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;

	@Inject
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Page currentPage;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String searchPlaceHolderText;

	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String searchLabelText;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String inputFieldErrorMessage;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private boolean hideUseMyLocation;
	
}

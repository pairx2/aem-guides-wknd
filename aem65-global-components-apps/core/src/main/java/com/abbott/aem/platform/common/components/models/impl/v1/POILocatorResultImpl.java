package com.abbott.aem.platform.common.components.models.impl.v1;

import java.util.List;

import javax.inject.Inject;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.POILocatorResult;
import com.abbott.aem.platform.common.components.models.POILocatorResultItems;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;
import com.day.cq.wcm.api.Page;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { POILocatorResult.class, ComponentExporter.class },
	   resourceType = { POILocatorResultImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class POILocatorResultImpl extends ComponentProxyImpl implements POILocatorResult {

	public static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/poilocatorresult/v1/poilocatorresult";

	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String mapAlignment;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String doctorName;

	@Inject
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Page currentPage;


	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String deviceType;
			
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String searchResultText;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String noResultFoundText;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String distanceLabelText;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String addressLabelText;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String telephoneLabelText;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String emailAddressLabelText;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String getWebsiteIcon;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String websiteUrlLabelText;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String getDirectionIcon;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String getDirectionsLinkLabelText;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String pageResult;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String resultLabel;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String showPagination;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String listLabel;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String gridLabel;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String printLabel;

	@ChildResource
    @Setter(AccessLevel.NONE)
	@Getter
    public List<POILocatorResultItems> poiLocatorResultList;
	
}

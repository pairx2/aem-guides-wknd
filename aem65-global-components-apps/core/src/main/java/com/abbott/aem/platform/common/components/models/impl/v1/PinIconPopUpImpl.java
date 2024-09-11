package com.abbott.aem.platform.common.components.models.impl.v1;

import java.util.List;

import javax.inject.Inject;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.PinIconPopUp;
import com.abbott.aem.platform.common.components.models.PinIconPopUpItems;
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
	   adapters = { PinIconPopUp.class, ComponentExporter.class },
	   resourceType = { PinIconPopUpImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PinIconPopUpImpl extends ComponentProxyImpl implements PinIconPopUp {

	public static final String RESOURCE_TYPE = "abbott-platform/components/content/atoms/piniconpopup/v1/piniconpopup";

    
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String pinPopupDistanceLabelText;

	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String pinPopupAddressLabelText;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String pinPopupPhoneLabelText;

	@Inject
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Page currentPage;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String pinPopupGetDirectionsLinkText;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String pinPopupDescriptionLabelText;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String pinPopupOperatingHoursLabelText;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String pinPopupEmailLabelText;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String overridePinIconPopItem;

	@ChildResource
    @Setter(AccessLevel.NONE)
	@Getter
    public List<PinIconPopUpItems> overridePinIconPopUpList;
		
	}

package com.abbott.aem.an.division.core.components.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.an.division.core.services.PIMConfigurationService;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { ComparePopup.class }, resourceType = {
		ComparePopup.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)

public class ComparePopup {
	public static final String RESOURCE_TYPE = "an/division/components/content/comparepopup";

	@OSGiService
	private PIMConfigurationService pimConfigs;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String compareLabel;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String buttonLabel;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String buttonUrl;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String removeAll;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String removeLabel;
    
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String alertMessage;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String minItems;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String maxItems;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String compareWidgetIcon;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String imgRemoveIcon;
	

}

package com.abbott.aem.ardx.division.core.components.models.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import com.abbott.aem.ardx.division.core.components.models.CountrySpecific;
import com.abbott.aem.platform.common.components.models.utils.PlatformUtil;
import com.adobe.cq.export.json.ExporterConstants;

import lombok.AccessLevel;
import lombok.Setter;

@Model(adaptables = Resource.class, adapters = CountrySpecific.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = CountrySpecificImpl.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class CountrySpecificImpl implements CountrySpecific {

	public static final String RESOURCE_TYPE = "ardx/division/components/content/countryspecific";

	private static final String COUNTRY_CODES = "countryCodes";

	@ChildResource
	@Setter(AccessLevel.NONE)
	private List<Resource> countryList;

	@Override
	public String getCountryCode() {
		List<String> countryCode = new ArrayList<>();
		for (Resource res : countryList) {
			ValueMap properties = res.adaptTo(ValueMap.class);
			countryCode.add(PlatformUtil.getPropertyValue(properties, COUNTRY_CODES));
		}
		return countryCode.toString();
	}
}

package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/data-processing-consent")
public interface DataProcessingConsentModel extends BaseComponentProperties {

	@Inject
	String getDataProcessingConsentHeading();

	@Inject
	String getDataProcessingConsentBody();

}
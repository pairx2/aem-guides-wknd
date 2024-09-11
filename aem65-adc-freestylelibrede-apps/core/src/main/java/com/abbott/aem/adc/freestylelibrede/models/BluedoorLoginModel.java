package com.abbott.aem.adc.freestylelibrede.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/bluedoor-login")
public interface BluedoorLoginModel {
	@Inject
	String getHeading();

	@Inject
	String getInstruction();

	@Inject
	String getInformation();

	@Inject
	String getBlueDoorImage();

	@Inject
	String getButtonText();

	@Externalize
	String getLoginSuccessLink();

}
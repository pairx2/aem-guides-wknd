package com.abbott.aem.adc.freestylelibrede.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface CtaList {
	@Inject
	String getCtaText();

	@Inject
	String getCtaStyle();

	@Externalize
	String getCtaLink();
	
	@Inject
	String getCtaAction();

}
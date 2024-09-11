package com.abbott.aem.adc.freestylelibrede.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Class SocialShareModel.
 *
 * @author vikkaush
 */
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/social-share")
public interface SocialShareModel{

	@Inject
	String getCtaYesText();

	@Inject
	String getCtaYesType();

	@Inject
	String getCtaNoText();

	@Inject
	String getCtaNoType();

	@Inject
	String getModalMessage();
	
	}

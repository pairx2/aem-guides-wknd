package com.abbott.aem.adc.freestylelibrede.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/social-login-registration")
public interface SocialLoginRegistration {
	@Inject
	String getSaveCtaStyle();
}

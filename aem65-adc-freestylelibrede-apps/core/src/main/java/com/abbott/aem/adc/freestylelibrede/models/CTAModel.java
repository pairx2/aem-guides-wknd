package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface CTAModel {

    @Inject
    String getCtaText();

    @Externalize
    String getCtaURL();

    @Inject
    String getCtaAction();

    @Inject
    String getCtaType();

    @Inject
    String getCtaColorPrimaryLarge();

    @Inject
    String getCtaColorPrimarySmall();

    @Inject
    String getCtaColorSecondaryLarge();

    @Inject
    String getCtaColorSecondarySmall();

    @Inject
    String getTextType();
	
	@Inject
    boolean getImageDownloadButton();
	
	@Inject
    boolean getCtaModelWindow();
	
	@Inject
    String getCtaModelDescription();
	
}

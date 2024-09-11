package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/logo")
public interface LogoModel {

    @Inject
    String getLogoImage();

    @Inject
    String getAltText();

    @Externalize
    String getLogoTarget();

    @Inject
    String getOpenTab();

    @Inject
    String getCssClassName();

    @Inject
    String getLogoEvent();

}
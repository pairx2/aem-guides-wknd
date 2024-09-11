package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface CookieBannerModel {

    @Inject
    String getAcceptCookieText();

    @Inject
    String getTitle();

    @Inject
    String getLinkText();

    @Externalize
    String getLinkPath();

    @Inject
    String getMessage();

    @Inject
    String getCountrySelectorMessage();

}

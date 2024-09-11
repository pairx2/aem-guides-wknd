package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface AppStoreLinksModel {

    @Inject
    String getAppStoreLink();

    @Inject
    String getGooglePlayLink();


    @Inject
    String getAppStoreAltText();

    @Inject
    String getGooglePlayAltText();

}

package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface StickyNoticeBannerModel {

    @Inject
    String getTitle();

    @Inject
    String getDescription();

    @Inject
    String getVersion();

    @Inject
    String getColor();

    @Inject
    boolean isShowOnce();

    @Inject
    boolean isShowAfterLogin();

    @Inject
    boolean isShowCloseBtn();

}

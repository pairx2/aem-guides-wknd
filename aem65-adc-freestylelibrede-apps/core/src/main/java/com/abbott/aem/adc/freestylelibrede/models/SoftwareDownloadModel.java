package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/account/software-download")
public interface SoftwareDownloadModel extends BaseComponentProperties{

    @Inject
    boolean isDontCheckPurchase();

    @Inject
    String getHeading();

    @Inject
    String getSoftwareInfo();

    @Externalize
    String getWindowsUrl();

    @Inject
    String getWindowsStyle();

    @Externalize
    String getMacUrl();

    @Inject
    String getMacStyle();

    @Inject
    String getNoDownloadError();

}

package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.via.ChildResource;

import javax.inject.Inject;
import java.util.List;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface HelpNavModel {

    @Inject
    String getVariationType();


    @Inject
    @Via(type = ChildResource.class)
    List<HelpNavLinks> getImageVariation();


    @Inject
    @Via(type = ChildResource.class)
    List<HelpNavLinks> getResourceIconVariation();


    @Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
    interface HelpNavLinks {

        @Inject
        String getImagePath();

        @Inject
        String getIcon();

        @Inject
        String getTitle();

        @Externalize
        String getLink();

        @Inject
        String getOpenTab();

        @Inject
        String getMobileNavText();

    }
}
package com.abbott.aem.adc.freestylelibrede.models;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class NavLinksModel extends CardModel {

    /**
     * The target link.
     */
    @Externalize
    private String targetLink;

    /**
     * The side nav card icon img.
     */

    @Inject
    private String sideNavCardIconImg;

    @Inject
    private String targetLinkParameters;

    @Inject
    private ResourceResolver resolver;


    /**
     * Gets the target link.
     *
     * @return the target link
     */
    public String getTargetLink() {
        if (targetLink != null && targetLinkParameters != null) {
            return targetLink.concat(targetLinkParameters);
        }

        return targetLink;
    }


    /**
     * Gets the side nav card icon img.
     *
     * @return the side nav card icon img
     */
    public String getSideNavCardIconImg() {
        return sideNavCardIconImg;
    }

    public String getTargetLinkParameters() {
        return targetLinkParameters;
    }
}
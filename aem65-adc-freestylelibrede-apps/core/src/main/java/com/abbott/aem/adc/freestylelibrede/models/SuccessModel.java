package com.abbott.aem.adc.freestylelibrede.models;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;


@Model(adaptables = {Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/success")
public interface SuccessModel extends BaseComponentProperties {

    /**
     * The Success Page Type.
     */
    @Inject
    String getSuccessPageType();

    /**
     * The Heading.
     */
    @Inject
    String getHeading();

    /**
     * The Subheading.
     */
    @Inject
    String getSubheading();

    /**
     * The Image.
     */
    @Inject
    String getImage();

    /**
     * The Reader Information Message
     */
    @Inject
    String getInformationMessage();

    /**
     * The New Message CTA Style
     */
    @Inject
    String getNewMessageCtaStyle();

    /**
     * The New Message CTA URL
     */
    @Externalize
    String getNewMessageCtaUrl();

    /**
     * The Home CTA Style
     */
    @Inject
    String getHomeCtaStyle();

    /**
     * The Home CTA URL
     */
    @Externalize
    String getHomeCtaUrl();

}
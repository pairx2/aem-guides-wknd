package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/address-verification")
public interface AddressVerificationModel extends BaseComponentProperties{

    /**
     * The Verification Modal Heading.
     */
    @Inject
    String getVerificationModelHeading();

    /**
     * The Cancel CTA Style.
     */
    @Inject
    String getCancelCtaStyle();

    /**
     * The Continue CTA Style.
     */
    @Inject
    String getContinueCtaStyle();

}

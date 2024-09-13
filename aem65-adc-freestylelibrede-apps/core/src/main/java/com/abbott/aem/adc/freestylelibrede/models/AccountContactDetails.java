package com.abbott.aem.adc.freestylelibrede.models;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/account/account-contact-details")
public interface AccountContactDetails {

    @Inject
    String getHeading();

    @Inject
    String getCommunicationType();

    @Externalize
    String getCommunicationPrefLink();

    @Inject
    String getAbortCtaStyle();

    @Inject
    String getSaveCtaStyle();

}
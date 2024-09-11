package com.abbott.aem.adc.freestylelibrede.models;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.ExternalizeRelativeUrl;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/wizard-selector")
public interface WizardSelectorModel extends BaseComponentProperties{

    @Inject
    String getHeading();

    @Inject
    String getPublicPrescriptionImage();

    @Inject
    String getPublicPrescriptionButtonText();

    @Inject
    String getPublicPrescriptionButtonCta();

    @ExternalizeRelativeUrl
    String getPublicPrescriptionButtonLink();

    @Inject
    String getPrivatePrescriptionImage();

    @Inject
    String getPrivatePrescriptionButtonText();

    @Inject
    String getPrivatePrescriptionButtonCta();

    @ExternalizeRelativeUrl
    String getPrivatePrescriptionButtonLink();

    @Inject
    String getNoPrescriptionButtonText();

    @Inject
    String getNoPrescriptionButtonCta();

    @ExternalizeRelativeUrl
    String getNoPrescriptionButtonLink();

    @Inject
    String getGoBackText();

    @Externalize
    String getGoBackLink();


    @Externalize
    String getLoginPagePath();

}

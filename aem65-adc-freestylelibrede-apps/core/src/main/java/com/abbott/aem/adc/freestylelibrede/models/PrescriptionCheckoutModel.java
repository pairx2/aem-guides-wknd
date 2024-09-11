package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/prescription-checkout")
public interface PrescriptionCheckoutModel extends BaseComponentProperties{

    @Inject
    String getPrescriptionHeading();

    @Inject
    String getPublicPrescriptionImage();

    @Inject
    String getPrivatePrescriptionImage();

    @Inject
    String getMeasurementInstructions();

    @Inject
    String getMeasurementHints();

}

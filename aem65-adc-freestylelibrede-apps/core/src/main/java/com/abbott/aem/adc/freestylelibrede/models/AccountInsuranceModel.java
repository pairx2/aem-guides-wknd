package com.abbott.aem.adc.freestylelibrede.models;
import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/account/account-insurance-display")
public interface AccountInsuranceModel{
	/**
     * The Field heading
     */
    @Inject
    String getHeading();

    /**
     * The field Info Icon
     */
    @Inject
    String getInfoIcon();

    /**
     * The field No Insurance Heading
     */
    @Inject
    String getNoInsuranceHeading();

    /**
     * The field No Insurance Description
     */
    @Inject
    String getNoInsuranceDescription();

    /**
     * The field No Insurance Icon
     */
    @Inject
    String getNoInsuranceIcon();

    /**
     * The field Secure Data Message
     */
    @Inject
    String getSecureDataMessage();

    /**
     * The field Secure Icon
     */
    @Inject
    String getSecureIcon();

    /**
     * The field Secure Icon
     */
    @Inject
    String getModelHeading();
    
    /**
     * The field Secure Icon
     */
    @Inject
    String getDescription();
    
    /**
     * The field Secure Icon
     */
    @Inject
    String getButtonLabel();
   
}

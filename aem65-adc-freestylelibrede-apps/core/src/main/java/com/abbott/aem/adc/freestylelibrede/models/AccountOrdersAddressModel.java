package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/account/account-orders-address")
public interface AccountOrdersAddressModel extends BaseComponentProperties{

    /**
     * The Change Address Heading.
     */
    @Inject
    String getChangeHeading();

    /**
     * The Saved Address SubHeading.
     */
    @Inject
    String getSavedSubheading();

    /**
     * The New Address SubHeading.
     */
    @Inject
    String getNewSubheading();

    /**
     * The Edit Address Heading.
     */
    @Inject
    String getEditHeading();

    /**
     * The Edit Address Description
     */
    @Inject
    String getEditDescription();

    /**
     * The Save To Account Checkbox
     */
    @Inject
    String getSaveToAccount();

}

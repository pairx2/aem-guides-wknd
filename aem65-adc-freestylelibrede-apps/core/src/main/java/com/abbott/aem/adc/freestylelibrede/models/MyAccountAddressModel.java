package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/account/myaccount-address")
public interface MyAccountAddressModel extends BaseComponentProperties{

    @Inject
    Boolean getShowAllAddresses();

    @Inject
    String getHeading();

    @Inject
    String getSubHeading();

    @Inject
    String getNoAddressHeading();

    @Inject
    String getNoAddressImage();

}

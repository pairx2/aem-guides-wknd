package com.abbott.aem.adc.freestylelibrede.models;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/cart-overview")
public interface CartOverviewModel extends BaseComponentProperties{

    @Inject
    String getOverviewHeading();

    @Inject
    @JsonProperty("isReimbursement")
    boolean getReimbursement();

    @Externalize
    String getEditLink();

    @Inject
    String getInformationMessageHeading();

    @Inject
    String getInformationMessage();

    @Inject
    String getProductHeading();

    @Inject
    String getRxImg();

    @Inject
    @JsonProperty("isRedirectToShoppingCart")
    boolean getRedirectToShoppingCart();

}
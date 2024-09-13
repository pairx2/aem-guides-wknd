package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/coupon-code")
public interface CouponCodeModel extends BaseComponentProperties{

    @Inject
    String getComponentHeading();

    @Inject
    String getRedeemCtaStyling();

    @Inject
    String getConfirmationHeading();

    @Inject
    String getConfirmCtaStyling();

}
package com.abbott.aem.adc.freestylelibrede.models;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.ExternalizeRelativeUrl;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/cart-list")
public interface CartList extends BaseComponentProperties {

    @Inject
    String getCartHeading();

    @Inject
    String getProductColHeading();

    @Inject
    String getQtyColHeading();

    @Inject
    String getPriceColHeading();

    @ExternalizeRelativeUrl
    String getCheckoutPage();

    @Externalize
    String getLoginPage();

    @Inject
    String getEmptyCartMsg();

    @Inject
    String getEmptyCartImg();

    @Externalize
    String getEmptyCartCtaDest();

    @Inject
    String getEmptyCartCtaTarget();

    @Inject
    String getEmptyCartCtaStyle();

}
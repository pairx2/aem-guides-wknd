package com.abbott.aem.adc.freestylelibrede.models;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.ExternalizeRelativeUrl;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/minicartpopup")
public interface MiniCartPopupModel extends BaseComponentProperties{

    @Inject
    String getSubTotalLabel();

    @Inject
    String getDownloadAppImage();

    @Inject
    String getDownloadAppText();

    @Inject
    String getLearnMoreLinkText();

    @Externalize
    String getLearnMoreLinkDestination();

    @Inject
    String getCartHeading();

    @Inject
    String getOpenTab();

    @Inject
    String getEmptyCartMessage();

    @Inject
    String getLabel();

    @Inject
    String getIcon();

    @Inject
    String getAlt();

    @ExternalizeRelativeUrl
    String getCheckoutPage();

    @Externalize
    String getLoginPage();

    @Externalize
    String getShoppingcartPage();

    @Inject
    boolean getHideShowAppDetails();

    @Inject
    String getMiniCartEvent();

}

package com.abbott.aem.adc.freestylelibrede.models;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import javax.inject.Inject;
import java.util.List;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/account/order-overview")
public interface OrderOverviewModel extends CurrentOrderModel,AccountPrescriptionModel{

    @Inject
    String getSubscriptionHeading();

    @Inject
    String getSubscriptionImage();

    @Inject
    String getInformationalHeading();

    @Inject
    String getInformationalDesc();

    @Inject
    String getProductSku();

    @Externalize
    String getMoreInfoPath();

    @Inject
    String getMoreInfoStyle();

    @Inject
    String getInformationalMessage();

    @Externalize
    String getBookServicePath();

    @Externalize
    String getPrivacyPolicyPath();

    @Externalize
    String getTermsAndConditionPath();

    @Externalize
    String getTrainingMaterialsPath();

    @Externalize
    String getPlusServiceConfirmationPath();

    @ChildResource
    List<PaymentCheckboxModel> getPlusServiceCheckboxes();

    @Inject
    String getPlusServiceTabName();
    @Inject
    String getAddressHeading();
    @Inject
    String getDescription();

    @ChildResource
    List<AddressCardModel> getAddressCards();
}

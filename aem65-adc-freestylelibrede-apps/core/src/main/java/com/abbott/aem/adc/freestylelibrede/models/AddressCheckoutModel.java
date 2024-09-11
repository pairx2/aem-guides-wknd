package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/address-checkout")
public class AddressCheckoutModel{

    @Inject
    String saveAddressCheckbox;

    @Inject
    String informationalMessage;

    @Inject
    boolean enableNewPaymentFlow;

    public String getSaveAddressCheckbox(){
        return saveAddressCheckbox;
    }

    public String getInformationalMessage(){
        return informationalMessage;
    }

    public boolean isEnableNewPaymentFlow(){
        return enableNewPaymentFlow;
    }

}

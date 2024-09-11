package com.abbott.aem.adc.freestylelibrede.models;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
import com.abbott.aem.adc.freestylelibrede.services.PaymentConfigurationService;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import javax.inject.Inject;
import java.util.List;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = {"adc/freestylelibrede/components/content/payment","adc/freestylelibrede/components/content/account/payment-display-edit"})
public class PaymentModel {
    @Getter
    @ChildResource
    private List<PaymentCheckboxModel> checkboxes;

    @Externalize
    private String confirmationPage;
    
    @Externalize
    private String accountPagePath;
    
    @Inject
    private String accountPageTab;

    @Inject
    private PaymentConfigurationService paymentConfigurationService;
    
    @Inject
	private boolean enableDesign;
    
    @Inject
    private boolean enableCreateOrderCall;

    @Inject
    private boolean enableNewPaymentFlow;
    
    public String getConfirmationPage() {
        return confirmationPage;
    }

    public String getPayonEndpoint(){
        if (paymentConfigurationService != null) {
            return paymentConfigurationService.getPayonEndpoint();
        }

        return null;
    }

	public String getAccountPagePath() {
		return accountPagePath;
	}

	public String getAccountPageTab() {
		return accountPageTab;
	}

	@JsonProperty("isEnableDesign")
	public boolean isEnableDesign() {
		return enableDesign;
	}

	public boolean isEnableCreateOrderCall() {
		return enableCreateOrderCall;
	}

    public boolean isEnableNewPaymentFlow(){
        return enableNewPaymentFlow;
    }
    
}

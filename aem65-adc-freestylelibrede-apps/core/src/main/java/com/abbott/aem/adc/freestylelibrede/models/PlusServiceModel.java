package com.abbott.aem.adc.freestylelibrede.models;

import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/account/plus-service")
public class PlusServiceModel extends BaseComponentPropertiesImpl{

    @Inject
    private String subscriptionHeading;

    @Inject
    private String subscriptionImage;

    @Inject
    private String informationalHeading;

    @Inject
    private String informationalDesc;

    @Inject
    private String productSku;

    @Externalize
    private String moreInfoPath;

    @Inject
    private String moreInfoStyle;

    @Inject
    private String informationalPriceSuperscript;

    @Inject
    private String informationalMessage;

    @Externalize
    private String bookServicePath;

    @Externalize
    private String privacyPolicyPath;

    @Externalize
    private String termsAndConditionPath;

    @Externalize
    private String trainingMaterialsPath;
	
	@Externalize
    private String confirmationPath;
	
	@ChildResource
    private List<PaymentCheckboxModel> checkboxes;
	
	@Inject
    private String tabName;

    public String getSubscriptionHeading(){
        return this.subscriptionHeading ;
    }

    public String getSubscriptionImage(){
        return this.subscriptionImage ;
    }

    public String getInformationalHeading(){
        return this.informationalHeading ;
    }

    public String getInformationalDesc(){
        return this.informationalDesc ;
    }

    public String getProductSku(){
        return this.productSku ;
    }

    public String getMoreInfoPath(){
        return this.moreInfoPath ;
    }

    public String getMoreInfoStyle(){
        return this.moreInfoStyle ;
    }

    public String getInformationalPriceSuperscript(){
        return this.informationalPriceSuperscript ;
    }

    public String getInformationalMessage(){
        return this.informationalMessage ;
    }

    public String getBookServicePath(){
        return this.bookServicePath ;
    }

    public String getPrivacyPolicyPath(){
        return this.privacyPolicyPath ;
    }

    public String getTermsAndConditionPath(){
        return this.termsAndConditionPath ;
    }

    public String getTrainingMaterialsPath(){
        return this.trainingMaterialsPath ;
    }
	
    public String getConfirmationPath(){
        return this.confirmationPath ;
    }
	
    public List<PaymentCheckboxModel> getCheckboxes(){
        return Collections.unmodifiableList(new ArrayList<>(this.checkboxes)) ;
    }
	
    public String getTabName(){
        return this.tabName ;
    }
}
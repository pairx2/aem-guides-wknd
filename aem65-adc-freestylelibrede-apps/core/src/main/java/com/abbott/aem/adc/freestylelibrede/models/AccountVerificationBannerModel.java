package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import javax.inject.Inject;
import java.util.List;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/account-verification-banner")
public class AccountVerificationBannerModel extends BaseComponentPropertiesImpl{

    @Inject
    private String heading;

    @Inject
    private String bannerDescription;

    @Inject
    private String subHeading;

    @Inject
    private String bannerSubHeadingInfoText;

    @Inject
    private String subDescription;

    @Inject
    private String hmmUrl;

    @Inject
    private boolean disableTraining;

    @ChildResource
    public List<AccountVerificationBannerButtonsModel> bannerButtons;

    public String getHeading(){
        return this.heading;
    }

    public String getBannerDescription(){
        return this.bannerDescription;
    };

    public String getSubHeading(){
        return this.subHeading;
    }

    public String getBannerSubHeadingInfoText(){
        return this.bannerSubHeadingInfoText;
    }

    public String getSubDescription(){
        return this.subDescription;
    }

    public String getHmmUrl(){
        return this.hmmUrl;
    }

    public boolean isDisableTraining() {return this.disableTraining;}

    public List<AccountVerificationBannerButtonsModel> getBannerButtons(){
        return this.bannerButtons;
    }

}

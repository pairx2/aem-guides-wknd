package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AccountVerificationBannerButtonsModel{

    @Inject
    private String ctaTargetSectiontId;

    @Inject
    private String ctaSection;

    @ChildResource
    private BaseCTAModel cta;

    public String getCtaTargetSectiontId(){
        return this.ctaTargetSectiontId;
    }

    public String getCtaSection(){
        return this.ctaSection;
    }

    public BaseCTAModel getCta(){
        return this.cta;
    }

}

package com.abbott.aem.adc.division.models;

import lombok.Getter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AccountVerificationBannerButtonsModel{

    @Getter
    @Inject
    String ctaTargetSectiontId;

    @Getter
    @Inject
    String ctaSection;

    @Getter
    @ChildResource
    BaseCTAModel cta;

}

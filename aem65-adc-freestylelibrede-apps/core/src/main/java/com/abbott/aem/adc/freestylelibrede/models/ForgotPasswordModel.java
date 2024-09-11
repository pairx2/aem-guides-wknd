package com.abbott.aem.adc.freestylelibrede.models;


import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;
import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/forgot-password")
public interface ForgotPasswordModel extends BaseComponentProperties{

    @Inject
    String getForgotPasswordHeading();

    @Inject
    String getForgotPasswordSubheading();

    @Inject
    String getBackToLogin();

    @Externalize
    String getBackToLoginUrl();

    @Externalize
    String getAccountLink();

    @Inject
    String getSubmitCtaText();

    @Inject
    String getConfirmationPageHeading();

    @Inject
    String getConfirmationPageSubheading();

    @Inject
    String getForgotPasswordConfirmationImage();

    @Inject
    String getReaderInformationalText();

}

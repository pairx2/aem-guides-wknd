package com.abbott.aem.adc.freestylelibrede.models;


import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.ExternalizeRelativeUrl;
import com.fasterxml.jackson.annotation.JsonProperty;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/login")
public interface LoginModel extends BaseComponentProperties{

    @Inject
    String getLoginHeading();

    @Inject
    String getLoginSubHeading();

    @Inject
    String getLoginSectionText();

    @Inject
    String getLoginButtonText();

    @Inject
    String getForgotPasswordText();

    @Externalize
    String getForgotPasswordLink();

    @ExternalizeRelativeUrl
    String getLoginSuccessLink();

    @Inject
    String getSignUpHeading();

    @Inject
    String getCreateAccount();

    @Inject
    String getSignUpButton();

    @ExternalizeRelativeUrl
    String getCreateAccountLink();

    @Externalize
    String getCheckoutLink();

    @Inject
    String getFacebookEndpoint();

    @Inject
    String getGoogleEndpoint();
	
	@Inject
    @Named("disableRegistration")
    @JsonProperty("isDisableRegistration")
    boolean isDisableRegistration();
	
	@Inject
    @Named("greyLoginShowMsg")
    @JsonProperty("isGreyLoginShowMsg")
    boolean isGreyLoginShowMsg();

    @Inject
    @Named("disableRecaptcha")
    @JsonProperty("isDisableRecaptcha")
    boolean isDisableRecaptcha();

    @Inject
    String getHeaderCode();

    @Inject
    @Named("disableSocialLogin")
    @JsonProperty("isDisableSocialLogin")
    boolean isDisableSocialLogin();

}

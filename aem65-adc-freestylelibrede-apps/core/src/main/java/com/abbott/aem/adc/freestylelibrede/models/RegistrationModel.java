package com.abbott.aem.adc.freestylelibrede.models;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.via.ChildResource;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.List;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = {"adc/freestylelibrede/components/content/registration", "adc/freestylelibrede/components/content/registration-rx"})
public interface RegistrationModel extends BaseComponentProperties{

    @Inject
    @Named("eApply")
    @JsonProperty("isEApply")
    boolean iseApply();
	
	@Inject
    @Named("disableRegistration")
    @JsonProperty("isDisableRegistration")
    boolean isDisableRegistration();

    @Inject
    String getRegistrationHeading();

    @Inject
    String getRegistrationSubheading();

    @Inject
    String getContinueCtastyle();

    @Externalize
    String getLoginLink();

    @Inject
    String getAccountHeading();

    @Inject
    String getAccountSubheading();

    @Inject
    String getAccountCancelCtastyle();

    @Inject
    String getAccountRegisterCtaStyle();

    @Inject
    String getContactHeading();

    @Inject
    String getContactSubHeading();

    @Inject
    String getInformationalMsg();

    @Inject
    String getContactBackCtaStyle();

    @Inject
    String getContactContinueCtaStyle();

    @Inject
    String getInsuranceHeading();

    @Inject
    String getInsuranceSubHeading();

    @Externalize
    String getCheckoutLink();

    @Externalize
    String getRxLink();

    @Externalize
    String getDefaultLink();

    @Externalize
    String getAccountLink();

    @Inject
    String getReaderInfoText();

    @Inject
    String getInsuranceBackCtaStyle();

    @Inject
    String getInsuranceContinueCtaStyle();
	
	@Inject
	String getReaderInfoTextUnit();
	
	@Externalize
    String getPrivacyPolicy();
	
	@Externalize
    String getTermsAndConditions();
	
	@Externalize
    String getTrainingLink();

    @Externalize
    String getAccountDisclaimer();	
	
    @Inject
    @Via(type = ChildResource.class)
    List<InsuranceOptions> getInsuranceOptions();

    @Inject
	String getRegistrationSubheadingDescription();

    @Inject
	String getInformationText();

    @Inject
	String getCustomerNumberRegex();

    @Inject
	String getKvnrRegex();

    @Inject
    String getOfflineRegistrationSuccessHeading();

    @Inject
    String getOfflineRegistrationSuccessSubheading();

    @Inject
    String getAccountSubHeadingDescription();

    @Inject
	boolean isEnableCaptcha();

    @Inject
    @Named("disableSocialRegistration")
    @JsonProperty("isDisableSocialRegistration")
    boolean isDisableSocialRegistration();

    @Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
    interface InsuranceOptions {

        @Inject
        String getInsuranceOption();

        @Inject
        String getInsuranceKey();

    }

}
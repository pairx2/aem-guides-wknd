package com.abbott.aem.adc.freestylelibrede.models;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/newsletter-signup")
public class NewsletterSignupModel {

    @Inject
    String heading;

    @Inject
    String subheading;

    @Externalize
    String privacyPolicy;

    @Externalize
    String termsAndConditions;

    public String getHeading(){
        return this.heading;
    }

    public String getSubheading(){
        return this.subheading;
    }

    public String getPrivacyPolicy(){
        return this.privacyPolicy;
    }

    public String getTermsAndConditions(){
        return this.termsAndConditions;
    }
}
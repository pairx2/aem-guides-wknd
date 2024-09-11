package com.abbott.aem.adc.freestylelibrede.models;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import javax.inject.Inject;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/call-back")
public class CallBackModel extends CsrConfigModel {

    @Self
    private Resource resource;

    @Inject
    private String heading;

    @Externalize
    private String privacyPolicy;

    @Inject
    private String firstNameID;

    @Inject
    private String lastNameID;

    @Inject
    private String customerID;

    @Inject
    private String callTimeID;

    @Inject
    private String callBackCaseID;

    @Externalize
    private String retURL;

    @Inject
    private String submitCtaStyle;


    public String getHeading() {
        return heading;
    }

    public String getFirstNameID() {
        return firstNameID;
    }

    public String getLastNameID() {
        return lastNameID;
    }

    public String getCustomerID() {
        return customerID;
    }

    public String getCallTimeID() {
        return callTimeID;
    }

    public String getCallBackCaseID() {
        return callBackCaseID;
    }

    public String getRetURL() {
        return retURL;
    }

    public String getSubmitCtaStyle() {
        return submitCtaStyle;
    }

    public String getPrivacyPolicy() {
        return privacyPolicy;
    }

    public String getPath() {
        return resource.getPath();
    }
}
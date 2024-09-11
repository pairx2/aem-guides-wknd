package com.abbott.aem.adc.freestylelibrede.models;

import com.abbott.aem.adc.freestylelibrede.services.OCRConfigurationService;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;

import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/ocr-registration")
public class OCRRegistrationModel {
    @Inject
    private String heading;

    @Inject
    private String subheading;

    @Inject
    private String uploadStyle;

    @Externalize
    private String rxCheckoutPageURL;

    @Inject
    private OCRConfigurationService ocrConfigurationService;

    public String getHeading(){
        return heading;
    }

    public String getSubheading() {
        return subheading;
    }

    public String getUploadStyle(){
        return uploadStyle;
    }

    public String getRxCheckoutPageURL() {
        return rxCheckoutPageURL;
    }

    public String getEndpoint(){
        if (ocrConfigurationService != null) {
            return ocrConfigurationService.getEndpoint();
        }

        return null;
    }
}

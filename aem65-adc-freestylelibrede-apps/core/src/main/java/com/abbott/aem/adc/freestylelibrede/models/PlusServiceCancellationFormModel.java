package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import java.util.List;
import java.util.ArrayList;
import java.util.Collections;
import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/plus-service-cancellation")
public class PlusServiceCancellationFormModel extends BaseComponentPropertiesImpl{

    @ChildResource
    private List<PlusServiceCancellationFormFieldModel> fields = new ArrayList<>();

    @Inject
    private boolean enablecaptcha;

    @Inject
    private String serviceEndpoint;

    @Inject
    private String endpointpath;

    @Inject
    private String disclaimerText;

    @ChildResource
    private BaseCTAModel cta;

    @Inject
    private String plusServiceCancellationErrorMessage;

    @Inject
    private String confirmationPageTitle;

    @Inject
    private String confirmationPageDescription;

    @ChildResource
    private BaseCTAModel confirmationPageCta;

    @Inject
    private String confirmationPageCancellationDateLabel;

    public List<PlusServiceCancellationFormFieldModel> getFields(){
        return Collections.unmodifiableList(new ArrayList<>(this.fields));
    }

    public String getServiceEndpoint(){
        return this.serviceEndpoint;
    }

    public String getEndpointpath(){
        return this.endpointpath;
    }

    public boolean isEnablecaptcha(){
        return this.enablecaptcha;
    }

    public String getDisclaimerText(){
        return this.disclaimerText;
    }

    public BaseCTAModel getCta(){
        return this.cta;
    }

    public String getPlusServiceCancellationErrorMessage(){
        return this.plusServiceCancellationErrorMessage;
    }

    public String getConfirmationPageTitle(){
        return this.confirmationPageTitle;
    }

    public String getConfirmationPageDescription(){
        return this.confirmationPageDescription;
    }

    public BaseCTAModel getConfirmationPageCta(){
        return this.confirmationPageCta;
    }

    public String getConfirmationPageCancellationDateLabel(){
        return this.confirmationPageCancellationDateLabel;
    }

}
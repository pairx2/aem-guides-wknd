package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import javax.inject.Inject;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/account/customer-info")
public class CustomerInfoModel extends BaseComponentPropertiesImpl{

    @Inject
    String heading;

    @Inject
    String deactivateHeading;

    @Inject
    String deactivateDescription;

    @Inject
    String deactivateConfirmation;

    @Externalize
    String deactivateRedirect;

    @Inject
    @Default(values = "false")
    Boolean enableTechnicalTrainingPopUp;

    @Inject
    String technicalTrainingPopUpHeading;

    @Inject
    String technicalTrainingPopUpMessage;

    @ChildResource
    private BaseCTAModel cta;

    public String getHeading(){
        return this.heading;
    }

    public String getDeactivateHeading(){
        return this.deactivateHeading;
    }

    public String getDeactivateDescription(){
        return this.deactivateDescription;
    }

    public String getDeactivateConfirmation(){
        return this.deactivateConfirmation;
    }

    public String getDeactivateRedirect(){
        return this.deactivateRedirect;
    }

    public boolean getEnableTechnicalTrainingPopUp(){
        return this.enableTechnicalTrainingPopUp;
    }

    public String getTechnicalTrainingPopUpHeading(){
        return this.technicalTrainingPopUpHeading;
    }

    public String getTechnicalTrainingPopUpMessage(){
        return this.technicalTrainingPopUpMessage;
    }

    public BaseCTAModel getCta(){
        return this.cta;
    }

}

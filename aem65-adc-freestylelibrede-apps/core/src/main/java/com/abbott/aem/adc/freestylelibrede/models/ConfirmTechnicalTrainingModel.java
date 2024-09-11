package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import javax.inject.Inject;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/account/confirm-technical-training")
public class ConfirmTechnicalTrainingModel extends BaseComponentPropertiesImpl{

    @ChildResource
    private List<ProductTrainingModel> productTrainings;

    @Inject
    private String banner;

    @Inject
    private String hmmUrl;

    @Inject String technicalTrainingTabMapping;

    public List<ProductTrainingModel> getProductTrainings(){
        return Collections.unmodifiableList(new ArrayList<>(this.productTrainings));
    }

    public String getBanner(){
        return this.banner;
    }  

    public String getHmmUrl(){
        return this.hmmUrl;
    }

    public String getTechnicalTrainingTabMapping(){
        return this.technicalTrainingTabMapping;
    }
 
}
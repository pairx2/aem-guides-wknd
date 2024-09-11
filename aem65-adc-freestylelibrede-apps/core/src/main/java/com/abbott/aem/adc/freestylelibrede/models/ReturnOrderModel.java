package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/account/return-order")
public interface ReturnOrderModel extends BaseComponentProperties{

    @Inject
    String getHeading();


    @Inject
    String getTermsAndConditions();


    @Inject
    String getReturnInstructions();


    @Inject
    String getReturnTimeline();


    @Inject
    String getReturnForm();
	
    @Inject
    String getReturnOrderReaderText();

    @Inject
    String getContinueStyle();


    @Inject
    String getDownloadStyle();


    @Inject
    String getSendMailStyle();

    @Inject
    String getCancelStyle();

}

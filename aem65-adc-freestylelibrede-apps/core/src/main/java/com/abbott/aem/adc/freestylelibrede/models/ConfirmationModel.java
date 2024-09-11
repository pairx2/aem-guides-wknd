package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/confirmation")
public interface ConfirmationModel extends BaseComponentProperties{

    @Inject
    String getMoreInfoIcon();

    @Inject
    String getMoreInfoDescription();

    @Inject
    String getMoreInfoLabel();

    @Externalize
    String getMoreInfoLink();

    @Inject
    String getMoreCTAStyle();

    @Externalize
    String getOrderTrackPath();

    @Inject
    String getOrderTrackCtaText();

    @Inject
    String getUrlHashKey();

    @Inject
    String getOrderTrackCtaStyle();

    @Inject
    String getModalHeading();

    @Inject
    String getReaderInformation();

    @Inject
    String getServiceText();

    @Inject
    String getHelplineNumber();

    @Inject
    String getEmailCTAStyle();

    @Inject
    String getCallCTAStyle();

    @Inject
    String getEmail();

    @Inject
    Boolean getIsReimbursment();
	
	@Inject
    String getHeading();

    @Inject
    String getDescription();

    @Inject
    String getIconPath();

    @Inject
    String getButtonText();  

	@Externalize
	String getButtonAction();
	
	@Inject
    String getOnlineInfoIcon(); 
	
	@Inject
    String getOnlineDescription();  
	
	@Inject
    String getOnlineCtaInfoLabel();  
	
	@Externalize
    String getOnlineCtaInfoLink();  
	
	@Inject
    String getOnlineMoreCTAStyle();  
	
}

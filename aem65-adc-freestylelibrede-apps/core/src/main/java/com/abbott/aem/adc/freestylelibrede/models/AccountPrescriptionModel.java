package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
import javax.inject.Inject;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/account/prescription")
public interface AccountPrescriptionModel extends BaseComponentProperties{

    @Inject
    String getStatusLabel();

    @Inject
    String getTitle();

    @Inject
    String getExpenseLabel();

    @Inject
    String getReceiptCodeLabel();

    @Inject
    String getInsuranceLabel();

    @Inject
    String getInsuranceNumberLabel();

    @Inject
    String getStatusDescription();

    @Inject
    String getStatusMessage();

    @Inject
    String getDownloadLabel();

    @Inject
    String getNoPrescriptionTitle();

    @Inject
    String getNoPrescriptionDescription();
	
	@Externalize
    String getNoprescriptionlink();
	
	@Inject
    String getImage();
	
	@Inject
    String getInstructionText();
	
	@Inject
    String getIcon();
	
	@Inject
    String getTextdescription();
	
	@Inject
    String getLinktext();
	
	@Externalize
    String getLinkpath();

}
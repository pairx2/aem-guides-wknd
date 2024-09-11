package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import javax.inject.Inject;
import java.util.List;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/refund-reship-widget")
public class RefundReshipWidgetModel extends BaseComponentPropertiesImpl{

    @Inject
    private String title;

    @Inject
    private String heading;

    @Inject
    private String ctaText;

    @Inject
    private String ctaType;

    @Inject
    private String successTitle;

    @Inject
    private String successMessage;

    @Inject
    private String milliSeconds;

    @ChildResource
    public List<RefundReshipWidgetRadioButtonsModel> radioButtons;

	public String getTitle() {
		return title;
	}

	public String getHeading() {
		return heading;
	}

	public String getCtaText() {
		return ctaText;
	}

	public String getCtaType() {
		return ctaType;
	}

	public String getSuccessTitle() {
		return successTitle;
	}

	public String getSuccessMessage() {
		return successMessage;
	}

	public String getMilliSeconds() {
		return milliSeconds;
	}

	public List<RefundReshipWidgetRadioButtonsModel> getRadioButtons() {
		return radioButtons;
	}

}

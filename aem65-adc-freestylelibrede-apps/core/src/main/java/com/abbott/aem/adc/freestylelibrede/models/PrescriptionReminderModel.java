package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import javax.inject.Inject;
import org.apache.sling.models.annotations.Default;
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/account/prescription-reminder")
public class PrescriptionReminderModel extends BaseComponentPropertiesImpl{

    @Inject
    @Default(values = "account-overview")
    private String rendition;
   
    @Inject
    private String heading;

    @Inject
    private BaseCTAModel cta;

    @Inject
    @Default(intValues = 60)
    private int reminderWindowStartDays;

    @Inject
    @Default(intValues = 30)
    private int reminderWindowStopDays;

    @Inject
    @Default(intValues = 60)
    private int reminderWindowBannerStartDays;

    @Inject
    @Default(intValues = 30)
    private int reminderWindowBannerStopDays;

    public String getRendition() {
        return this.rendition;
    }

    public String getHeading(){
        return this.heading;
    }
	
	public BaseCTAModel getCta(){
		return this.cta;
	}

    public int getReminderWindowStartDays(){
        return this.reminderWindowStartDays;
    }

    public int getReminderWindowStopDays(){
        return this.reminderWindowStopDays;
    }

    public int getReminderWindowBannerStartDays(){
        return this.reminderWindowBannerStartDays;
    }

    public int getReminderWindowBannerStopDays(){
        return this.reminderWindowBannerStopDays;
    }
 
}
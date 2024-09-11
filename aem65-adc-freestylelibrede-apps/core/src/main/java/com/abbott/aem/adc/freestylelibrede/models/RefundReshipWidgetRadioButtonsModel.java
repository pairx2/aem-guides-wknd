package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class RefundReshipWidgetRadioButtonsModel{

    @Inject
    private String label;

    @Inject
    private String key;

	public String getLabel() {
		return label;
	}

	public String getKey() {
		return key;
	}    
   

}

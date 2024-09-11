package com.abbott.aem.adc.freestylelibrede.models;


import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;

@Model(adaptables = Resource.class)
public class PlusServiceCancellationFormFieldModelOptions {

    @Inject
    @Optional
    private String option;
    
    @Inject
    @Optional
    private String value;

    public String getOption() {
		return option;
	}

	public String getValue() {
		return value;
	}

    @PostConstruct
    protected void init() {
        //Do Nothing
    }

}


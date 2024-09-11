package com.abbott.aem.adc.freestylelibrede.models;


import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;

@Model(adaptables = Resource.class)
public class RatgeberFormAnswerModel {

    @Inject
    @Optional
    private String answer;
    
    @Inject
    @Optional
    private String value;
    

    public String getAnswer() {
		return answer;
	}

	public String getValue() {
		return value;
	}


    @PostConstruct
    protected void init() {
        //Do Nothing
    }

}


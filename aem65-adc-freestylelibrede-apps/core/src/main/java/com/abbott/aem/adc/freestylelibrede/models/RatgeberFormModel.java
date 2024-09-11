package com.abbott.aem.adc.freestylelibrede.models;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;
import lombok.Getter;
import lombok.Setter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.jcr.resource.api.JcrResourceConstants;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/multi-questions")
public class RatgeberFormModel {

    @Inject
    @Named(JcrResourceConstants.SLING_RESOURCE_TYPE_PROPERTY)
    @Default(values = "No resourceType")
    protected String resourceType;

    @Inject
    private List<Resource> questions;
    
    @Inject
    private String prevButtonLabel;
    
    @Inject
    private String nextButtonLabel;
    
    @Inject
    private String submitButtonLabel;

    @Inject
	private String resultText;

    @Getter
    @Setter
    private List<RatgeberFormQuestionModel> questionsList = new ArrayList<>();
    
	public String getPrevButtonLabel() {
		return prevButtonLabel;
	}

	public String getNextButtonLabel() {
		return nextButtonLabel;
	}

	public String getSubmitButtonLabel() {
		return submitButtonLabel;
	}

	public String getResultText() {
		return resultText;
	}

	@PostConstruct
    protected void init() {
        if (!questions.isEmpty()) {
            for (Resource resource : questions) {
            	RatgeberFormQuestionModel item = resource.adaptTo(RatgeberFormQuestionModel.class);
            	questionsList.add(item);
            }
        }
    }
 
}

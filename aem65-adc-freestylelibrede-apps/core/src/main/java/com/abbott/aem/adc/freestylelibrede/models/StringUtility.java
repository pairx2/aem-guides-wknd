package com.abbott.aem.adc.freestylelibrede.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

@Model(adaptables = SlingHttpServletRequest.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class StringUtility {
	@Inject
	private String requestString;

	public String getRequestString() {
		return requestString;
	}
	
	@PostConstruct
	public void init(){
		if(requestString != null && !(requestString.isEmpty())) {
			String[] strArr= requestString.split("#");
			requestString = strArr[0];
		}
	}

}

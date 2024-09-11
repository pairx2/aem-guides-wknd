package com.abbott.aem.adc.freestylelibrede.models;

import java.util.List;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.via.ChildResource;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;

@Model(adaptables=Resource.class, defaultInjectionStrategy=DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/videofaq")
public interface VideoFaq {

	@Inject
	String getCategoryOne();
	
	@Inject
	String getCategoryTwo();
	
	@Inject
	String getCategoryThree();
	
	@Inject
	String getCategoryFour();

	@Inject
	String getFlagPath();

	@Inject
	String getCountryPath();
	
}
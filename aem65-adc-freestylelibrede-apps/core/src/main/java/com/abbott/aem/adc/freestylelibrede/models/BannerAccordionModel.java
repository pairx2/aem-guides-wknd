package com.abbott.aem.adc.freestylelibrede.models;

import java.util.List;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.via.ChildResource;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/banner-accordion")
public interface BannerAccordionModel {

	@Inject
	String getHeading();

	@Inject
	String getHeadingType();
	
	@Inject
	String getHeadingTextColor();
	
	@Inject
	String getImage();
	
	@Inject
	String getNumberIcon();
	
	@Inject
	String getImageAlignment();
	
	@Inject
	String getCtaText();
	
	@Inject
	String getCtaType();
	
	@Externalize
	String getCtaLink();
	
	@Inject
	String getCtaAction();
	
	@Inject
	String getBgColor();
	
	@Inject
	@Via(type = ChildResource.class)
	List<BannerList> getBannerList();

	@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
	interface BannerList {
		@Inject
		String getHeading();

		@Inject
		String getDescription();
		

	}
}
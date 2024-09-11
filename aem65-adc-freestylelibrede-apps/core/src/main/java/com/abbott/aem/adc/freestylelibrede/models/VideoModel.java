package com.abbott.aem.adc.freestylelibrede.models;

import java.util.List;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.via.ChildResource;

@Model(adaptables=Resource.class, defaultInjectionStrategy=DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/video")
public interface VideoModel {

	@Inject
	String getTitle();
	
	@Inject
	String getTitleSize();
	
	@Inject
	String getTitleTextColor();
	
	@Inject
	String getSubTitle();
	
	@Inject
	String getTextAlignment();

	@Inject
	String getVideoVariation();

	@Inject
	String getVideoId();
	
	@Inject
	String getThumbnailImage();
	
	@Inject
	String getThumbnailImageTab();
	
	@Inject
	String getThumbnailImageMobile();
	
	@Inject
	String getCtaStyle();
	
	@Inject
	String getDeepLinkText();
	
	@Inject
	String getDeepLinkTarget();

	@Inject
	String getVideoPlayOption();
	
	@Inject
	@Via(type = ChildResource.class)
	List<CtaList> getCtaList();
	
	@Inject
	String getTextVerticalAlignment();
}
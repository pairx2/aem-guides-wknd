package com.abbott.aem.adc.freestylelibrede.models;

import java.util.List;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = {
		"adc/freestylelibrede/components/content/image-banner" })
public interface ImageBannerModel extends BaseComponentProperties {

	@Inject
	String getHeading();

	@Inject
	String getDescription();

	@Inject
	String getImage();

	@Inject
	String getBgImage();

	@Inject
	String getTextAlignmentImageBanner();

	@Inject
	String getProductImageAlignment();

	@Inject
	String getCtaLayout();
	
	@Inject
	@Via(type = org.apache.sling.models.annotations.via.ChildResource.class)
	List<ImageIcons> getImageIcons();

	@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
	interface ImageIcons {
		@Inject
		String getImageIcon();
	}
}

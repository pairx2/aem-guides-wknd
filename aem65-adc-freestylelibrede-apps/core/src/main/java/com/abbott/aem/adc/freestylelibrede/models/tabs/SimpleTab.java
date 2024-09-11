package com.abbott.aem.adc.freestylelibrede.models.tabs;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy= DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/tab/simple-tab")
public class SimpleTab {

	@Inject
	private String heading;

	@Inject
	private String image;

	@Inject
	private boolean displayThumbnail;

	@Inject
	private String thumbnailImage;
	
	@Inject
	private String deepLinkTarget;	

	public String getDeepLinkTarget() {
		return deepLinkTarget;
	}

	public String getHeading() {
		return heading;
	}

	public String getImage() {
		return image;
	}

	public boolean isDisplayThumbnail() {
		return displayThumbnail;
	}

	public String getThumbnailImage() {
		return thumbnailImage;
	}

	public boolean isProductTab() {
		return false;
	}
}

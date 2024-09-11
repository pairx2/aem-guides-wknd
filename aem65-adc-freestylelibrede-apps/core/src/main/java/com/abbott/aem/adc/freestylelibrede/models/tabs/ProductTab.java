package com.abbott.aem.adc.freestylelibrede.models.tabs;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy= DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/tab/product-tab")
public class ProductTab {

	@Inject
	private String heading;
	
	@Inject
	private String subheading;


	@Inject
	private String image;

	@Inject
	private boolean displayPrice;

	@Inject
	private String sku;
	
	@Inject
	private String deepLinkTarget;	

	public String getDeepLinkTarget() {
		return deepLinkTarget;
	}

	public String getHeading() {
		return heading;
	}
	
	public String getSubheading() {
		return subheading;
	}


	public String getImage() {
		return image;
	}

	public boolean isDisplayPrice() {
		return displayPrice;
	}

	public String getSku() {
		return sku;
	}

	public boolean isProductTab() {
		return true;
	}
}

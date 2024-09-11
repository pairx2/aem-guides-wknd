package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface TextBanner {

	/**
	 * Returns the bannerTitle value.
	 *
	 * @return the bannerTitle value.
	 */
	 String getBannerTitle();
	/**
	 * Returns the component ID of this component
	 *
	 * @return the component ID of this component
	 */
	 String getId();

	 String getStartColor();
	
	 String getStartColorPosition();
	
	 String getEndColor();
	
	 String getEndColorPosition();
}

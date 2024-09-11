package com.abbott.aem.ardx.division.core.components.models;

import org.osgi.annotation.versioning.ConsumerType;

import com.abbott.aem.platform.common.components.models.HeroBanner;

@ConsumerType
public interface HeroBannerArdx extends HeroBanner {

	public String getPreTitleColor();
	public String getTitleColor();
	public String getSubTitleColor();
	public String getDescriptionColor();
	public String getBackgroundColor();
	
}

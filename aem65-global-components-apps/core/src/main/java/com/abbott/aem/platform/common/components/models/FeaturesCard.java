package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface FeaturesCard {

	public String getLargeFormatNumber();

	public boolean isButtonRequired();

	public boolean isBadgeRequired();

	public String getFeatureStyle();
}

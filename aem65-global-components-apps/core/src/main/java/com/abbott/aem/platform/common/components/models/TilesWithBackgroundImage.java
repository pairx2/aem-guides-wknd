package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Image;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface TilesWithBackgroundImage extends Image {

	default boolean isSectionTitleRequired() {
		throw new UnsupportedOperationException();
	}

	String getId();

	String getStartColor();

	String getStartColorPosition();

	String getEndColor();

	String getEndColorPosition();
}

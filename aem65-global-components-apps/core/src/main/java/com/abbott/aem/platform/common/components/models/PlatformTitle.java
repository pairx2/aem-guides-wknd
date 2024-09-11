package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Title;

public interface PlatformTitle extends Title {
	default boolean isUseDefaultImplementation() {
		throw new UnsupportedOperationException();
	}
}

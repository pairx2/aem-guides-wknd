package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface MaskedContainer extends Container {

	default String getLoginFormFragmentPath() {
		throw new UnsupportedOperationException();
	}

	default boolean isDisableMaskingInAuthor() {
		throw new UnsupportedOperationException();
	}	

}

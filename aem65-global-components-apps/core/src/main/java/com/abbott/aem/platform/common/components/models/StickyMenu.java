package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface StickyMenu extends LinkStack {

	default String getHideStickyMenu() {
		throw new UnsupportedOperationException();
	}

	default String getId() {
		throw new UnsupportedOperationException();
	}

}

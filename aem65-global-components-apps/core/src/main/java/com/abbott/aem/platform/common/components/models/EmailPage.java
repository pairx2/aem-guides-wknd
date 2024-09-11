package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface EmailPage extends PlatformPage  {

	default String getAlign() {
		throw new UnsupportedOperationException();
	}
	
	default String getAssetPrefixDomain() {
		throw new UnsupportedOperationException();
	}
}
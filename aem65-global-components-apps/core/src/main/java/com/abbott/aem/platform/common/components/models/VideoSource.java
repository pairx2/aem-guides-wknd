package com.abbott.aem.platform.common.components.models;

public interface VideoSource {

	default String getSrc() {
		throw new UnsupportedOperationException();
	}

	default String getType() {
		throw new UnsupportedOperationException();
	}

}
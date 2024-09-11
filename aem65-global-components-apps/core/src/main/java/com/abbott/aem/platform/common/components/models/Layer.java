package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * Model used by Scroll Interactions model to get the layers
 */
@ConsumerType
public interface Layer {

	/**
	 * @return the image layer filereference
	 */
	default String getFileReference() {
		throw new UnsupportedOperationException();
	}
}


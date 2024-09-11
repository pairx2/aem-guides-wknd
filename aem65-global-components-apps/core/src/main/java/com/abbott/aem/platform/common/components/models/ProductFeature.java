/**
 *
 */

package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * Interface for product features.
 *
 * @author tadigital
 */
@ConsumerType
public interface ProductFeature {
	default String getFeatureName() {
		throw new UnsupportedOperationException();
	}

	default String getFeatureId() {
		throw new UnsupportedOperationException();
	}
}

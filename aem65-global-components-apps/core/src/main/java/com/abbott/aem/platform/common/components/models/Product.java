/**
 *
 */

package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * Interface for product data.
 *
 * @author tadigital
 */
@ConsumerType
public interface Product {
	default String getProductTitle() {
		throw new UnsupportedOperationException();
	}

	default String getProductId() {
		throw new UnsupportedOperationException();
	}

	default String getProductImage() {
		throw new UnsupportedOperationException();
	}

	default String getProductAltText() {
		throw new UnsupportedOperationException();
	}

	default boolean isBadgeChecked() {
		throw new UnsupportedOperationException();
	}

	default String getBadgePosition() {
		throw new UnsupportedOperationException();
	}
}

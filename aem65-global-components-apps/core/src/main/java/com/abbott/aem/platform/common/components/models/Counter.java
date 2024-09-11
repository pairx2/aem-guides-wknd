package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * The Counter model.
 */
@ConsumerType
public interface Counter {

	/**
	 * Get the counter value
	 *
	 * @return the value to be displayed in the counter, null otherwise.
	 */
	Integer getCounterCount();
}

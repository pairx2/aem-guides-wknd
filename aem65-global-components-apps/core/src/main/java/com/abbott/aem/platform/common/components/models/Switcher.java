package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface Switcher {

	/**
	 * Returns the off label value
	 *
	 * @return
	 */
	String getOffLabel();

	/**
	 * Returns the on label value
	 *
	 * @return
	 */

	String getOnLabel();

	/**
	 * Returns the default state value
	 *
	 * @return
	 */

	String getDefaultState();

}

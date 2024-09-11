package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * Model used by LinkStackImpl to create a list of Links
 */

@ConsumerType
public interface LinkStackItem {

	/**
	 * @return the Text.
	 */
	public String getText();

	/**
	 * @return the External.
	 */
	public boolean isExternal();

	/**
	 * @return the Action.
	 */
	public String getAction();

	/**
	 * @return the Link.
	 */
	public String getLink();

}

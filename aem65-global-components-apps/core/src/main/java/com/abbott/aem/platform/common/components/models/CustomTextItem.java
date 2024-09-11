package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * Model used by LinkStackImpl to create a list of Links
 */

@ConsumerType
public interface CustomTextItem {

	/**
	 * @return the Text.
	 */
	public String getText();

	/**
	 * @return the Text of List.
	 */
	public String getListText();

	/**
	 * @return the External.
	 */
	public boolean isExternal();

	boolean isRedirectConfirm();

	/**
	 * @return the Link.
	 */
	public String getLink();

	/**
	 * @return the Icon.
	 */
	public String getIcon();

}

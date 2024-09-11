package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * Logo model
 */
@ConsumerType
public interface Logo extends Link {

	/**
	 * File Reference.
	 *
	 * @return the string
	 */
	String getFileReference();

	/**
	 * Logo Alt Text.
	 *
	 * @return the string
	 */
	String getLogoAltText();

	/**
	 * Sticky LogoImage.
	 *
	 * @return the string
	 */
	String getStickyLogoImage();

}
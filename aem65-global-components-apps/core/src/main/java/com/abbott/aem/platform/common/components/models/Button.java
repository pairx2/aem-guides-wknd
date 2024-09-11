package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * The Interface Button.
 */
@ConsumerType
public interface Button extends Link {

	String getButtonType();

	String getFormButtonType();

	String getButtonName();

	String getImage();

	String getAltText();

	boolean isDisabledButton();
	
	boolean isHideButtonText();

}
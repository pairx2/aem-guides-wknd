package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Button;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * The Interface Link.
 */
@ConsumerType
public interface Link extends Button {
	String getAction();

	String getPopUpUrl();

	boolean isExternal();

	boolean isRedirectConfirm();

	String getModalIcon();

	String getModalTitle();
}
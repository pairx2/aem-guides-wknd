package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * The Interface Popover.
 */
@ConsumerType
public interface Popover extends Component {

	String getImage();

	String getAltText();

	String getTitle();

	String getContent();

	boolean isLinkCheck();

	String getPosition();

}        
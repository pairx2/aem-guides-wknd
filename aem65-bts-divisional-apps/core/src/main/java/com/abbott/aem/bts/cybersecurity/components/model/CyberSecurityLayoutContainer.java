package com.abbott.aem.bts.cybersecurity.components.model;

import org.osgi.annotation.versioning.ConsumerType;

import com.abbott.aem.platform.common.components.models.LayoutContainer;

@ConsumerType
public interface CyberSecurityLayoutContainer extends LayoutContainer {

	String getFileReference();

	String getContainerVariation();

}

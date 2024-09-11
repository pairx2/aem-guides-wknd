package com.abbott.aem.platform.common.components.models.navigation;

import com.adobe.cq.wcm.core.components.models.Container;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface MegaMenuContainer extends Container {

	String getAccessibilityLabel();

}

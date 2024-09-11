package com.abbott.aem.platform.common.components.models.navigation;

import com.adobe.cq.wcm.core.components.models.Navigation;

/**
 * Sling model interface to represent a navigation.
 */
public interface PlatformNavigation extends Navigation {

	/**
	 * This will provide the style to be applied on the Mega Menu
	 */
	String getMegaMenuStyle();

}

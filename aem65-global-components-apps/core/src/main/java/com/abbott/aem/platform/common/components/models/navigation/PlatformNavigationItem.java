package com.abbott.aem.platform.common.components.models.navigation;

import com.adobe.cq.wcm.core.components.models.NavigationItem;

public interface PlatformNavigationItem extends NavigationItem {

	NavigationItem getParent();

	String getSubtitle();

	/**
	 * Action for URL to take i.e. open in new tab or same tab.
	 */
	String getAction();

	/**
	 * Mark if an URL is an external/exit link, so that appropriate action can be
	 * taken if need be eg: show warning to end user.
	 */
	boolean isExternal();

	String getSeeMoreText();

	String getSeeMoreUrl();

	String getSeeMoreAction();

	boolean isSeeMoreExternal();

	String getImageAlt();

	boolean isBadgeRequired();

	String getBadgeType();

	String getBadgeText();

	String getBadgePosition();

	boolean isImageConfigured();

	boolean isSeeMoreConfigured();
}

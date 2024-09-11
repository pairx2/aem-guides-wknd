package com.abbott.aem.platform.common.components.models.navigation.impl.v1;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import lombok.NonNull;
import lombok.experimental.Delegate;
import lombok.experimental.SuperBuilder;

import com.abbott.aem.platform.common.components.models.navigation.PlatformNavigationItem;
import com.adobe.cq.wcm.core.components.models.NavigationItem;
import com.day.cq.wcm.api.PageManager;

@SuperBuilder
class PageNavigationItemImpl extends AbstractNavigationItemImpl implements PlatformNavigationItem {

	@Delegate(excludes = DelegationExclusion.class)
	private final NavigationItem wcmItem;

	@NonNull
	protected PageManager pageManager;

	@Override
	public List<NavigationItem> getChildren() {
		final List<com.adobe.cq.wcm.core.components.models.NavigationItem> children = wcmItem.getChildren();
		if (children == null) {
			return Collections.emptyList();
		}

		List<NavigationItem> items = new ArrayList<>();
		for (com.adobe.cq.wcm.core.components.models.NavigationItem item : children) {
			NavigationUtil.addPageItems(pageManager, this, item, items);
		}

		return items;
	}

	private interface DelegationExclusion {
		List<NavigationItem> getChildren();
	}
}
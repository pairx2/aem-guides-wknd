package com.abbott.aem.platform.common.components.models.navigation.impl.v1;

import java.util.List;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;

import com.abbott.aem.platform.common.components.models.navigation.impl.v1.PageNavigationItemImpl.PageNavigationItemImplBuilder;
import com.abbott.aem.platform.common.components.models.navigation.impl.v1.StaticNavigationItemImpl.StaticNavigationItemImplBuilder;
import com.adobe.cq.wcm.core.components.models.Component;
import com.adobe.cq.wcm.core.components.models.NavigationItem;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;

@Slf4j
// Keeping this within internal since this utility shouldn't be called from outside this package
public final class NavigationUtil {

	private NavigationUtil() {
		throw new IllegalStateException("Utility class cannot be instantiated!");
	}

	public static void addPageItems(PageManager pageManager, AbstractNavigationItemImpl parent, NavigationItem currentWcmItem, List<NavigationItem> itemList) {
		Page page = pageManager.getPage(currentWcmItem.getPath());

		if (page != null) {
			@NonNull ValueMap properties = page.getProperties();

			PageNavigationItemImplBuilder<?, ?> builder = PageNavigationItemImpl.builder().pageManager(pageManager).parent(parent).wcmItem(currentWcmItem).properties(properties);

			itemList.add(builder.build());
		}
	}

	public static void addStaticPageItems(PageManager pageManager, Resource itemResource, SlingHttpServletRequest request, Component component, AbstractNavigationItemImpl parent, int level, List<NavigationItem> itemList) {

		if (itemResource != null) {
			log.debug("itemResource {}", itemResource.getPath());

			StaticNavigationItemImplBuilder<?, ?> builder = StaticNavigationItemImpl.builder().pageManager(pageManager).resource(itemResource).properties(itemResource.getValueMap()).request(request).component(component).parent(parent).level(level);

			itemList.add(builder.build());
		}
	}
}

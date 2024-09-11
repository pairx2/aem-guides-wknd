package com.abbott.aem.platform.common.components.models.navigation.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.testing.resourceresolver.MockValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.platform.common.components.models.navigation.PlatformNavigation;
import com.adobe.cq.wcm.core.components.models.Navigation;
import com.adobe.cq.wcm.core.components.models.NavigationItem;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.google.common.base.Function;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class DynamicNavigationImplTest {
	private final AemContext ctx = new AemContext();
	private PlatformNavigation navigation;

	private PageManager pageManager = mock(PageManager.class);
	
	private MockValueMap valueMap;

	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(DynamicNavigationImpl.class);
		ctx.registerAdapter(ResourceResolver.class, PageManager.class, new Function<ResourceResolver, PageManager>() {
			@Override
			public PageManager apply(ResourceResolver input) {
				return pageManager;
			}
		});

		ctx.load().json(
				"/com/abbott/aem/platform/common/components/models/navigation/impl/v1/DynamicNavigationImplTest.json",
				"/content");
		
		valueMap = new MockValueMap(ctx.currentResource("/content/dynamicnavigation"), new HashMap<>());
		
		ctx.currentPage(registerPage("/content/dynamicnavigation/root", "Level0"));
		registerPage("/content/dynamicnavigation/root/en", "Level1");
		registerPage("/content/dynamicnavigation/root/en/master", "Level2");

		ctx.currentResource("/content/dynamicnavigation");
		navigation = ctx.request().adaptTo(PlatformNavigation.class);

		assertNotNull(navigation);
		assertTrue(navigation instanceof DynamicNavigationImpl);
		
		((DynamicNavigationImpl)navigation).setWcmNavigation(mockDynamicNavigation());
	}
	
	private Page registerPage(String path, String name) {
        Page result = mock(Page.class, path);
        when(pageManager.getPage(path)).thenReturn(result);
        when(result.getName()).thenReturn(name);
        when(result.getLastModified()).thenReturn(Calendar.getInstance());
        when(result.getContentResource()).then(i -> ctx.resourceResolver().getResource(path + "/jcr:content"));
        when(result.getPageManager()).thenReturn(pageManager);
        when(result.getProperties()).thenReturn(valueMap);
        return result;
    }
	
	private Navigation mockDynamicNavigation() {
		Navigation dynamicNavigation = mock(Navigation.class);
		
		List<NavigationItem> navigationItems = new ArrayList<>();
		NavigationItem item = mock(NavigationItem.class);
		when(item.getPath()).thenReturn("/content/dynamicnavigation/root/en");
		navigationItems.add(item);
		
		List<NavigationItem> childNavigationItems = new ArrayList<>();
		NavigationItem childItem = mock(NavigationItem.class);
		when(childItem.getPath()).thenReturn("/content/dynamicnavigation/root/en/master");
		childNavigationItems.add(childItem);
		when(item.getChildren()).thenReturn(childNavigationItems);
		
		when(dynamicNavigation.getItems()).thenReturn(navigationItems);
		
		return dynamicNavigation;
	}

	@Test
	public void testGetItems() {
		assertNotNull(navigation.getItems());
		assertEquals("abbott-platform/components/content/molecules/megamenu/v1/megamenuversions/version3", navigation.getMegaMenuStyle());
		assertEquals(1, navigation.getItems().size());
		NavigationItem navItem = navigation.getItems().get(0);
		assertTrue(navItem instanceof PageNavigationItemImpl);
		assertNotNull(navItem.getChildren());
		
		PageNavigationItemImpl item0 = (PageNavigationItemImpl) navItem;
		assertFalse(item0.isActive());
		assertFalse(item0.isExternal());
		assertEquals("_self", item0.getAction());
		assertNull(item0.getSubtitle());
		assertNull(item0.getBadgePosition());
		assertNull(item0.getBadgeText());
		assertNull(item0.getBadgeType());
		assertNull(item0.getData());
		assertFalse(item0.isSeeMoreConfigured());
		assertFalse(item0.isImageConfigured());
		assertNull(item0.getSeeMoreText());
		assertNull(item0.getSeeMoreUrl());
		assertFalse(item0.isBadgeRequired());
		assertEquals(StringUtils.EMPTY, item0.getImageAlt());
		assertFalse(item0.isSeeMoreExternal());
		assertEquals("_self", item0.getSeeMoreAction());
		assertNull(item0.getTitle());
		assertEquals(0, item0.getLevel());
		assertNull(item0.getParent());
	}
}

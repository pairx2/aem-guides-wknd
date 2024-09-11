package com.abbott.aem.an.similac.core.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.adobe.cq.wcm.core.components.models.LanguageNavigation;
import com.adobe.cq.wcm.core.components.models.NavigationItem;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

@ExtendWith(MockitoExtension.class)
class LanguageNavImplTest {

	@InjectMocks
	LanguageNavImpl languageNavImpl;

	@Mock
	Page currentPage, page;

	@Mock
	PageManager pageManager;

	@Mock
	LanguageNavigation languageNavigation;

	@Mock
	NavigationItem navItem;

	@BeforeEach
	void setUp() {
		languageNavImpl = new LanguageNavImpl();

		MockitoAnnotations.initMocks(this);
	}

	@Test
	void testGetItems_Valid() {
		when(currentPage.getPageManager()).thenReturn(pageManager);
		languageNavImpl.setLanguageNavigation(languageNavigation);
		when(languageNavigation.getItems()).thenReturn(getLanguageNavList());
		when(navItem.getPath()).thenReturn("path");
		when(pageManager.getPage("path")).thenReturn(page);
		when(page.getDepth()).thenReturn(5);
		when(currentPage.getDepth()).thenReturn(5);
		when(navItem.getName()).thenReturn("pageName");
		when(currentPage.getName()).thenReturn("pageName");
		when(currentPage.getPath()).thenReturn("current path");

		List<NavigationItem> navigationItemsList = languageNavImpl.getItems();

		assertNotNull(navigationItemsList);
	}

	@Test
	void testGetItems_NullPath() {

		when(currentPage.getPageManager()).thenReturn(pageManager);
		languageNavImpl.setLanguageNavigation(languageNavigation);
		when(languageNavigation.getItems()).thenReturn(getLanguageNavList());
		when(navItem.getPath()).thenReturn("path");
		when(pageManager.getPage("path")).thenReturn(null);
		List<NavigationItem> navigationItemsList = languageNavImpl.getItems();

		assertNotNull(navigationItemsList);
	}

	@Test
	void testGetItems_DiffDepth() {

		when(currentPage.getPageManager()).thenReturn(pageManager);
		languageNavImpl.setLanguageNavigation(languageNavigation);
		when(languageNavigation.getItems()).thenReturn(getLanguageNavList());
		when(navItem.getPath()).thenReturn("path");
		when(pageManager.getPage("path")).thenReturn(page);
		when(page.getDepth()).thenReturn(5);
		when(currentPage.getDepth()).thenReturn(4);

		List<NavigationItem> navigationItemsList = languageNavImpl.getItems();

		assertNotNull(navigationItemsList);
	}

	@Test
	void testGetItems_SamePath() {
		when(currentPage.getPageManager()).thenReturn(pageManager);
		languageNavImpl.setLanguageNavigation(languageNavigation);
		when(languageNavigation.getItems()).thenReturn(getLanguageNavList());
		when(navItem.getPath()).thenReturn("path");
		when(pageManager.getPage("path")).thenReturn(page);
		when(page.getDepth()).thenReturn(5);
		when(currentPage.getDepth()).thenReturn(5);
		when(currentPage.getPath()).thenReturn("path");
		List<NavigationItem> navigationItemsList = languageNavImpl.getItems();

		assertNotNull(navigationItemsList);
	}

	@Test
	void testGetItems_DiffPageName() {
		when(currentPage.getPageManager()).thenReturn(pageManager);
		languageNavImpl.setLanguageNavigation(languageNavigation);
		when(languageNavigation.getItems()).thenReturn(getLanguageNavList());
		when(navItem.getPath()).thenReturn("path");
		when(pageManager.getPage("path")).thenReturn(page);
		when(page.getDepth()).thenReturn(5);
		when(currentPage.getDepth()).thenReturn(5);
		when(navItem.getName()).thenReturn("pageName");
		when(currentPage.getName()).thenReturn("current pageName");
		when(currentPage.getPath()).thenReturn("current path");

		List<NavigationItem> navigationItemsList = languageNavImpl.getItems();

		assertNotNull(navigationItemsList);
	}

	@Test
	void checkFields() {
		LanguageNavImpl newObj = languageNavImpl;
		LanguageNavImpl newObj2 = new LanguageNavImpl();
		languageNavImpl.setCurrentPage(currentPage);
		languageNavImpl.setItems(getLanguageNavList());
		languageNavImpl.setLanguageNavigation(languageNavigation);
		assertTrue(languageNavImpl.canEqual(newObj));
		assertTrue(languageNavImpl.canEqual(newObj2));
		assertFalse(languageNavImpl.equals(newObj2));
		assertTrue(languageNavImpl.equals(newObj));
		assertFalse(languageNavImpl.equals(null));
		assertFalse(languageNavImpl.equals(5));
		assertEquals(newObj.hashCode(), languageNavImpl.hashCode());
		assertNotEquals(newObj.hashCode(), 100);
		assertTrue(languageNavImpl instanceof LanguageNavImpl);
		assertNull(languageNavImpl.getAccessibilityLabel());
		assertNull(languageNavImpl.getAppliedCssClasses());
		assertNotNull(languageNavImpl.getCurrentPage());
		assertNull(languageNavImpl.getData());
		assertNull(languageNavImpl.getExportedType());
		assertNull(languageNavImpl.getId());
		assertNotNull(languageNavImpl.getItems());
		assertNotNull(languageNavImpl.getLanguageNavigation());
		assertNull(languageNavImpl.getPlaceholder());
		assertEquals("an/similac/components/content/languagenavigation", languageNavImpl.RESOURCE_TYPE);
		assertEquals(1, languageNavImpl.getItems().size());
		assertEquals(languageNavImpl.PN_NAVIGATION_ROOT, "navigationRoot");
		assertEquals(languageNavImpl.PN_STRUCTURE_DEPTH, "structureDepth");
		assertNotNull(languageNavImpl.toString());
		assertTrue(languageNavImpl instanceof Object);
	}

	private List<NavigationItem> getLanguageNavList() {
		List<NavigationItem> navItemList = new ArrayList<NavigationItem>();
		navItemList.add(navItem);
		return navItemList;
	}
}

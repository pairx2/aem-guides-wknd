package com.abbott.aem.cv.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.apache.sling.api.resource.ValueMap;
import org.mockito.MockitoAnnotations;

import static org.mockito.MockitoAnnotations.initMocks;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;

import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import java.util.Iterator;



import static org.mockito.Mockito.lenient;


@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
public class SideNavigationImplTest {

	@Mock
	private Resource resource;

	private final ResourceResolver resourceResolver = Mockito.mock(ResourceResolver.class);

	@Mock
	private PageManager pageManager;

	@Mock
	private Page page;

	private SideNavigationImpl sideNavigation = Mockito.spy(new SideNavigationImpl());

	@BeforeEach
	public void setUp() {
		// Use lenient() to avoid unnecessary stubbings
		lenient().when(resource.getResourceResolver()).thenReturn(resourceResolver);
		lenient().when(resourceResolver.adaptTo(PageManager.class)).thenReturn(pageManager);

		// Create an instance of the class to be tested
		sideNavigation = new SideNavigationImpl();
		initMocks(this);
		sideNavigation.resource = resource;
		sideNavigation.rootvalue = "/content/SideNavigation";
		sideNavigation.topmargin = "20";
		sideNavigation.bottommargin = "10";
		sideNavigation.displayrootpage = "true";
		sideNavigation.integraterootpage = "false";
		sideNavigation.requestedPage = Mockito.mock(Page.class);

		MockitoAnnotations.initMocks(this);
		sideNavigation.resourceResolver = resourceResolver;
	}

	@Test
	public void testGetRootvalue() {
		// Test the getRootvalue method
		assertEquals("/content/SideNavigation", sideNavigation.getRootvalue());
	}

	@Test
	public void testGetTopmargin() {
		// Test the getTopmargin method
		assertEquals("20", sideNavigation.getTopmargin());
	}

	@Test
	public void testGetBottommargin() {
		// Test the getBottommargin method
		assertEquals("10", sideNavigation.getBottommargin());
	}

	@Test
	public void testGetDisplayrootpage() {
		// Test the getDisplayrootpage method
		assertEquals("true", sideNavigation.getDisplayrootpage());
	}

	@Test
	public void testGetIntegraterootpage() {
		// Test the getIntegraterootpage method
		assertEquals("false", sideNavigation.getIntegraterootpage());
	}

	@Test
	public void testGetRequestedPage() {
		// Set up the mock requested page
		Page requestedPage = mock(Page.class);

		// Create a mock SideNavigationImpl object and mock the getRequestedPage method
		SideNavigationImpl sideNavigation = mock(SideNavigationImpl.class);
		when(sideNavigation.getRequestedPage()).thenReturn(requestedPage);

		// Test the getRequestedPage method
		assertEquals(requestedPage, sideNavigation.getRequestedPage());
	}


	@Test
	public void testInit() {

		// Mocking
		ValueMap properties = mock(ValueMap.class);
		when(properties.get("hideInNav")).thenReturn(null);
		when(page.getProperties()).thenReturn(properties);
		when(resourceResolver.adaptTo(PageManager.class)).thenReturn(pageManager);
		when(pageManager.getPage(any())).thenReturn(page);
		Iterator<Page>  iterator = mock(Iterator.class);

		when(page.listChildren()).thenReturn(iterator);
		when(iterator.hasNext()).thenReturn(false);

		// Execution
		sideNavigation.rootvalue = "test";
		sideNavigation.init();

		// Verification
		verify(pageManager).getPage("test");
		verify(page).listChildren();
		verify(iterator).hasNext();

	}
	@Test
	public void testInitWithNullValues() {
		// Setup
		SideNavigationImpl sideNavigation = new SideNavigationImpl();
		sideNavigation.resourceResolver = mock(ResourceResolver.class);
		sideNavigation.rootvalue = null;
		sideNavigation.pageManager = null;

		// Execute
		sideNavigation.init();
	}
}

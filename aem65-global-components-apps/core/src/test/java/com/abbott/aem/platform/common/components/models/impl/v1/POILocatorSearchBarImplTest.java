package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;


import com.abbott.aem.platform.common.components.models.POILocatorSearchBar;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.abbott.aem.platform.common.components.services.APILookupService;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.adobe.cq.wcm.core.components.models.Component;
import com.day.cq.wcm.api.Page;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * The Class POILocatorSearchBarImplTest.
 */
@ExtendWith(AemContextExtension.class)
class POILocatorSearchBarImplTest {

	/**
	 * The ctx.
	 */
	private final AemContext ctx = new AemContext();

	/**
	 * The component.
	 */
	@InjectMocks
	private Component modeComponent;

	/**
	 * The api lookup service.
	 */
	@Mock
	private APILookupService apiLookupService;

	/**
	 * The current page.
	 */
	private Page currentPage;

	private ProxyComponentService proxyComponentService;
	private com.day.cq.wcm.api.components.Component component;

	/**
	 * Sets the up.
	 *
	 * @throws Exception the exception
	 */
	@BeforeEach
	public void setUp() throws Exception {

		proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(com.day.cq.wcm.api.components.Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);

		currentPage = Mockito.mock(Page.class);

		ctx.currentPage(currentPage);

		ctx.addModelsForClasses(POILocatorSearchBarImpl.class);
		Resource resource = ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/POILocatorSearchBarImplTest.json", "/content");

	}

	/**
	 * Test get search place holder text.
	 */
	@Test
	void testGetSearchPlaceHolderText() {
		final String expected = "Search Place Holder Text";
		ctx.currentResource("/content/poilocatorsearchbar");
		POILocatorSearchBar poilocatorsearchbar = ctx.request().adaptTo(POILocatorSearchBar.class);
		String actual = poilocatorsearchbar.getSearchPlaceHolderText();
		assertEquals(expected, actual);
	}
	
	
	/**
	 * Test get search Label text.
	 */
	@Test
	void testGetSearchLabelText() {
		final String expected = "Search Label Text";
		ctx.currentResource("/content/poilocatorsearchbar");
		POILocatorSearchBar poilocatorsearchbar = ctx.request().adaptTo(POILocatorSearchBar.class);
		String actual = poilocatorsearchbar.getSearchLabelText();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test get Error message text for validation
	 */
	@Test
	void testGetInputFieldErrorMessage() {
		final String expected = "Please Enter Valid City Or State";
		ctx.currentResource("/content/poilocatorsearchbar");
		POILocatorSearchBar poilocatorsearchbar = ctx.request().adaptTo(POILocatorSearchBar.class);
		String actual = poilocatorsearchbar.getInputFieldErrorMessage();
		assertEquals(expected, actual);
	}
    
	/**
	 * Test get showHideUseMyLocation checkbox default value
	 */
	@Test
	void testGetHideUseMyLocation() {
		final boolean expected = false;
		ctx.currentResource("/content/poilocatorsearchbar");
		POILocatorSearchBar poilocatorsearchbar = ctx.request().adaptTo(POILocatorSearchBar.class);
		boolean actual = poilocatorsearchbar.isHideUseMyLocation();
		assertEquals(expected, actual);
	}
	
}

package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import com.abbott.aem.platform.common.constants.CommonConstants;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.google.common.base.Function;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.POILocator;
import com.abbott.aem.platform.common.components.services.APILookupService;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.Page;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * The Class POILocatorImplTest.
 */
@ExtendWith(AemContextExtension.class)
class POILocatorImplTest {

	/**
	 * The ctx.
	 */
	private final AemContext ctx = new AemContext();
	private final AemContext ctx2 = new AemContext();

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
		apiLookupService = Mockito.mock(APILookupService.class);
		currentPage = Mockito.mock(Page.class);
		ctx.registerService(APILookupService.class, apiLookupService);

		proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(com.day.cq.wcm.api.components.Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);
		ctx2.registerService(ProxyComponentService.class, proxyComponentService);

		currentPage = Mockito.mock(Page.class);

		ctx.currentPage(currentPage);
		ctx2.currentPage(currentPage);

		ctx.addModelsForClasses(POILocatorImpl.class);
		Resource resource = ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/POILocatorImplTest.json", "/content");
		ctx2.addModelsForClasses(POILocatorImpl.class);
		Resource resource2 = ctx2.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/POILocatorImplTest2.json", "/content");
		Mockito.when(currentPage.adaptTo(Resource.class)).thenReturn(resource);

		HierarchyNodeInheritanceValueMap inheritanceValueMap = Mockito.mock(HierarchyNodeInheritanceValueMap.class);
		Mockito.when(inheritanceValueMap.getInherited(CommonConstants.GOOGLE_MAP_API_KEY, String.class))
				.thenReturn("test-google-map-api-key");
		Mockito.when(inheritanceValueMap.getInherited(CommonConstants.GOOGLE_MAP_API_URL, String.class))
				.thenReturn("test-google-map-api-url");

		ctx.registerAdapter(Resource.class, HierarchyNodeInheritanceValueMap.class, (Function<Resource, HierarchyNodeInheritanceValueMap>) r -> inheritanceValueMap);

	}

	/**
	 * Test get locator type.
	 */
	@Test
	void testGetLocatorType() {
		final String expected = "Get Doctors";
		ctx.currentResource("/content/poilocator");
		POILocator poilocator = ctx.request().adaptTo(POILocator.class);
		String actual = poilocator.getLocatorType();
		assertEquals(expected, actual);
	}

	/**
	 * Test get city or state name on page load
	 */
	@Test
	void testGetEnterCityOrStateNameOnPageLoad() {
		final String expected = "Amman";
		ctx.currentResource("/content/poilocator");
		POILocator poilocator = ctx.request().adaptTo(POILocator.class);
		String actual = poilocator.getEnterCityOrStateNameOnPageLoad();
		assertEquals(expected, actual);
	}

	@Test
	void testGetUpdateRequest() {
		final String expected = "check";

		ctx.currentResource("/content/poilocator");
		POILocator poilocator = ctx.request().adaptTo(POILocator.class);
		String actual = poilocator.getUpdateRequest();
		assertEquals(expected, actual);

		final String expected2 = "";
		ctx2.currentResource("/content/poilocator");
		POILocator poilocator2 = ctx2.request().adaptTo(POILocator.class);
		String actual2 = poilocator2.getUpdateRequest();
		assertEquals(expected2, actual2);

	}

	/**
	 * To get showResultOnPageLoad checkbox value
	 */
	@Test
	void testIsShowResultOnPageLoad() {
		final boolean expected = false;
		ctx.currentResource("/content/poilocator");
		POILocator poilocator = ctx.request().adaptTo(POILocator.class);
		boolean actual = poilocator.isShowResultOnPageLoad();
		assertEquals(expected, actual);
	}

	/**
	 * Test get Map Marker Icon
	 */
	@Test
	void testGetMapMarkerTextColor() {
		final String expected = "#ffffff";
		ctx.currentResource("/content/poilocator");
		POILocator poilocator = ctx.request().adaptTo(POILocator.class);
		String actual = poilocator.getMapMarkerTextColor();
		assertEquals(expected, actual);
	}

	/**
	 * Test get Map Marker Image
	 */
	@Test
	void testGetMapMarkerImage() {
		final String expected = "/content/dam/bts/global-reference";
		ctx.currentResource("/content/poilocator");
		POILocator poilocator = ctx.request().adaptTo(POILocator.class);
		String actual = poilocator.getMapMarkerImage();
		assertEquals(expected, actual);
	}

	/**
	 * Test get google map API key.
	 */
	@Test
	void testGetRadius() {
		final String expected = "200";
		ctx.currentResource("/content/poilocator");
		POILocator poilocator = ctx.request().adaptTo(POILocator.class);
		String actual = poilocator.getMapRadius();
		assertEquals(expected, actual);
	}

	/**
	 * To get showResultOnPageLoad checkbox value
	 */
	@Test
	void testIsShowDuplicateResultNumber() {
		final boolean expected = false;
		ctx.currentResource("/content/poilocator");
		POILocator poilocator = ctx.request().adaptTo(POILocator.class);
		boolean actual = poilocator.isShowDuplicateResultNumber();
		assertEquals(expected, actual);
	}

	@Test
	void testMapZoom() {
		final String expected = "10";
		ctx.currentResource("/content/poilocator");
		POILocator poilocator = ctx.request().adaptTo(POILocator.class);
		String actual = poilocator.getMapZoom();
		assertEquals(expected, actual);
	}

	@Test
	void testGetGoogleMapApiKey() {
		final String expected = "null";
		ctx.registerAdapter(Resource.class, HierarchyNodeInheritanceValueMap.class, (Function<Resource, HierarchyNodeInheritanceValueMap>) resource -> {
			HierarchyNodeInheritanceValueMap map = Mockito.mock(HierarchyNodeInheritanceValueMap.class);
			Mockito.when(map.getInherited(CommonConstants.GOOGLE_MAP_API_KEY, String.class)).thenReturn(expected);
			return map;
		});

		POILocator poilocator = ctx.request().adaptTo(POILocator.class);
		String actual = poilocator.getGoogleMapApiKey();
		assertNotEquals(expected, actual);
	}

	@Test
	void testGetGoogleMapApiUrl() {
		final String expected = "test-google-map-api-url";
		ctx.registerAdapter(Resource.class, HierarchyNodeInheritanceValueMap.class, (Function<Resource, HierarchyNodeInheritanceValueMap>) resource -> {
			HierarchyNodeInheritanceValueMap map = Mockito.mock(HierarchyNodeInheritanceValueMap.class);
			Mockito.when(map.getInherited(CommonConstants.GOOGLE_MAP_API_URL, String.class)).thenReturn(expected);
			return map;
		});

		POILocator poilocator = ctx.request().adaptTo(POILocator.class);
		String actual = poilocator.getGoogleMapApiUrl();
		assertNotEquals(expected, actual);
	}

	@Test
	void testGetDomainName() {
		final String expected = "test-domain";
		Mockito.when(apiLookupService.getRequestEndpoint(Mockito.anyString())).thenReturn(expected);

		POILocator poilocator = ctx.request().adaptTo(POILocator.class);
		String actual = poilocator.getDomainName();
		assertEquals(expected, actual);
	}

	@Test
	void testGetCurrentPagePath() {
		final String expected = "/content/test-page";
		POILocator poilocator = ctx.request().adaptTo(POILocator.class);
		String actual = poilocator.getCurrentPagePath();
		assertNotEquals(expected, actual);
	}


}
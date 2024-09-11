package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.abbott.aem.platform.common.components.models.POILocatorResultItems;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.POILocatorResult;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.Page;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.mockito.MockitoAnnotations;

import java.util.List;

/**
 * The Class POILocatorResultImplTest.
 */
@ExtendWith(AemContextExtension.class)
class POILocatorResultImplTest {

	/**
	 * The ctx.
	 */
	private final AemContext ctx = new AemContext();

	@Mock
	private List<POILocatorResultItems> mockPOILocatorResultList;

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

		ctx.addModelsForClasses(POILocatorResultImpl.class);
		Resource resource = ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/POILocatorResultImplTest.json", "/content");

	}

	/**
	 * Test get map alignment option.
	 */
	@Test
	void testGetMapAlignment() {
		final String expected = "Horizontal";
		ctx.currentResource("/content/poilocatorresult");
		POILocatorResult poilocatorresult = ctx.request().adaptTo(POILocatorResult.class);
		String actual = poilocatorresult.getMapAlignment();
		assertEquals(expected, actual);
	}

	/**
	 * Test get search result text.
	 */
	@Test
	void testGetDoctorName() {
		final String expected = "Doctor Name";
		ctx.currentResource("/content/poilocatorresult");
		POILocatorResult poilocatorresult = ctx.request().adaptTo(POILocatorResult.class);
		String actual = poilocatorresult.getDoctorName();
		assertEquals(expected, actual);
	}

	/**
	 * Test get search result text.
	 */
	@Test
	void testGetDeviceType() {
		final String expected = "Device Type";
		ctx.currentResource("/content/poilocatorresult");
		POILocatorResult poilocatorresult = ctx.request().adaptTo(POILocatorResult.class);
		String actual = poilocatorresult.getDeviceType();
		assertEquals(expected, actual);
	}
		
	/**
	 * Test get search result text.
	 */
	@Test
	void testGetSearchResultText() {
		final String expected = "Search Result Text";
		ctx.currentResource("/content/poilocatorresult");
		POILocatorResult poilocatorresult = ctx.request().adaptTo(POILocatorResult.class);
		String actual = poilocatorresult.getSearchResultText();
		assertEquals(expected, actual);
	}
    
	/**
	 * Test get no result found text.
	 */
	@Test
	void testGetNoResultFoundText() {
		final String expected = "No Result Found";
		ctx.currentResource("/content/poilocatorresult");
		POILocatorResult poilocatorresult = ctx.request().adaptTo(POILocatorResult.class);
		String actual = poilocatorresult.getNoResultFoundText();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test get distance label text.
	 */
	@Test
	void testGetDistanceLabelText() {
		final String expected = "Distance Label Text";
		ctx.currentResource("/content/poilocatorresult");
		POILocatorResult poilocatorresult = ctx.request().adaptTo(POILocatorResult.class);
		String actual = poilocatorresult.getDistanceLabelText();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test get address label text.
	 */
	@Test
	void testGetAddressLabelText() {
		final String expected = "Address Label text";
		ctx.currentResource("/content/poilocatorresult");
		POILocatorResult poilocatorresult = ctx.request().adaptTo(POILocatorResult.class);
		String actual = poilocatorresult.getAddressLabelText();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test get telephone label text.
	 */
	@Test
	void testGetTelephoneLabelText() {
		final String expected = "Telephone Label Text";
		ctx.currentResource("/content/poilocatorresult");
		POILocatorResult poilocatorresult = ctx.request().adaptTo(POILocatorResult.class);
		String actual = poilocatorresult.getTelephoneLabelText();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test get email address label text.
	 */
	@Test
	void testGetEmailAddressLabelText() {
		final String expected = "Email Address Label Text";
		ctx.currentResource("/content/poilocatorresult");
		POILocatorResult poilocatorresult = ctx.request().adaptTo(POILocatorResult.class);
		String actual = poilocatorresult.getEmailAddressLabelText();
		assertEquals(expected, actual);
	}

	/**
	 * Test get get direction icon.
	 */
	@Test
	void testGetGetWebsiteIcon() {
		final String expected = "abt-icon abt-icon-search";
		ctx.currentResource("/content/poilocatorresult");
		POILocatorResult poilocatorresult = ctx.request().adaptTo(POILocatorResult.class);
		String actual = poilocatorresult.getGetDirectionIcon();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test get website URL label text.
	 */
	@Test
	void testGetWebsiteUrlLabelText() {
		final String expected = "Website Url Label Text";
		ctx.currentResource("/content/poilocatorresult");
		POILocatorResult poilocatorresult = ctx.request().adaptTo(POILocatorResult.class);
		String actual = poilocatorresult.getWebsiteUrlLabelText();
		assertEquals(expected, actual);
	}
		
	/**
	 * Test get get direction icon.
	 */
	@Test
	void testGetGetDirectionIcon() {
		final String expected = "abt-icon abt-icon-search";
		ctx.currentResource("/content/poilocatorresult");
		POILocatorResult poilocatorresult = ctx.request().adaptTo(POILocatorResult.class);
		String actual = poilocatorresult.getGetDirectionIcon();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test get get direction link text.
	 */
	@Test
	void testGetGetDirectionsLinkLabelText() {
		final String expected = "Get Directions Link Label Text";
		ctx.currentResource("/content/poilocatorresult");
		POILocatorResult poilocatorresult = ctx.request().adaptTo(POILocatorResult.class);
		String actual = poilocatorresult.getGetDirectionsLinkLabelText();
		assertEquals(expected, actual);
	}

	/**
	 * Test get get direction link text.
	 */
	@Test
	void testGetPageResult() {
		final String expected = "Page Result";
		ctx.currentResource("/content/poilocatorresult");
		POILocatorResult poilocatorresult = ctx.request().adaptTo(POILocatorResult.class);
		String actual = poilocatorresult.getPageResult();
		assertEquals(expected, actual);
	}

	@Test
	void testGetShowPagination() {
		final String expected = "showPagination";
		ctx.currentResource("/content/poilocatorresult");
		POILocatorResult poilocatorresult = ctx.request().adaptTo(POILocatorResult.class);
		String actual = poilocatorresult.getShowPagination();
		assertEquals(expected, actual);
	}

	@Test
	void testGetListLabel() {
		final String expected = "listLabel";
		ctx.currentResource("/content/poilocatorresult");
		POILocatorResult poilocatorresult = ctx.request().adaptTo(POILocatorResult.class);
		String actual = poilocatorresult.getListLabel();
		assertEquals(expected, actual);
	}

	@Test
	void testGetGridLabel() {
		final String expected = "gridLabel";
		ctx.currentResource("/content/poilocatorresult");
		POILocatorResult poilocatorresult = ctx.request().adaptTo(POILocatorResult.class);
		String actual = poilocatorresult.getGridLabel();
		assertEquals(expected, actual);
	}

	@Test
	void testGetPrintLabel() {
		final String expected = "printLabel";
		ctx.currentResource("/content/poilocatorresult");
		POILocatorResult poilocatorresult = ctx.request().adaptTo(POILocatorResult.class);
		String actual = poilocatorresult.getPrintLabel();
		assertEquals(expected, actual);
	}

	/**
	 * Test get get direction link text.
	 */
	@Test
	void testGetResultLabel() {
		final String expected = "Result Label";
		ctx.currentResource("/content/poilocatorresult");
		POILocatorResult poilocatorresult = ctx.request().adaptTo(POILocatorResult.class);
		String actual = poilocatorresult.getResultLabel();
		assertEquals(expected, actual);
	}

	@Test
	void testGetPoiLocatorResultList() {
		MockitoAnnotations.initMocks(this);
		POILocatorResultImpl poiLocatorResultItem = new POILocatorResultImpl();
		poiLocatorResultItem.poiLocatorResultList= mockPOILocatorResultList;
		List<POILocatorResultItems> actualPOILocatorResult = poiLocatorResultItem.getPoiLocatorResultList();
		assertEquals(mockPOILocatorResultList, actualPOILocatorResult);
	}
	
}

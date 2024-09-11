package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import java.util.List;
import com.abbott.aem.platform.common.components.models.PinIconPopUp;
import com.abbott.aem.platform.common.components.models.PinIconPopUpItems;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.Page;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * The Class PinIconPopUpImplTest.
 */
@ExtendWith(AemContextExtension.class)
class PinIconPopUpImplTest {

	/**
	 * The ctx.
	 */
	private final AemContext ctx = new AemContext();

	@Mock
	private List<PinIconPopUpItems> mockoverridePinIconPopUpList;
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
		Resource resource = ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/PinIconPopUpImplTest.json", "/content");

	}

	/**
	 * Test get Pop Up Distance Label Text
	 */
	@Test
	void testGetPinPopupDistanceLabelText() {
		final String expected = "Pin Pop Up Distance Label Text";
		ctx.currentResource("/content/piniconpopup");
		PinIconPopUp piniconpopup = ctx.request().adaptTo(PinIconPopUp.class);
		String actual = piniconpopup.getPinPopupDistanceLabelText();
		assertEquals(expected, actual);
	}
	
	
	/**
	 * Test get Pop Up Address Label Text
	 */
	@Test
	void testGetPinPopupAddressLabelText() {
		final String expected = "Pin Pop Up Address Label Text";
		ctx.currentResource("/content/piniconpopup");
		PinIconPopUp piniconpopup = ctx.request().adaptTo(PinIconPopUp.class);
		String actual = piniconpopup.getPinPopupAddressLabelText();
		assertEquals(expected, actual);
	}
    
	/**
	 * Test get Pop Up Phone Label Text.
	 */
	@Test
	void testGetPinPopupPhoneLabelText() {
		final String expected = "Pin Pop Up Phone Label Text";
		ctx.currentResource("/content/piniconpopup");
		PinIconPopUp piniconpopup = ctx.request().adaptTo(PinIconPopUp.class);
		String actual = piniconpopup.getPinPopupPhoneLabelText();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test get Pop Up Get Direction Link Text.
	 */
	@Test
	void testGetPinPopupGetDirectionsLinkText() {
		final String expected = "Pin Pop Up Get Direction Link Text";
		ctx.currentResource("/content/piniconpopup");
		PinIconPopUp piniconpopup = ctx.request().adaptTo(PinIconPopUp.class);
		String actual = piniconpopup.getPinPopupGetDirectionsLinkText();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test get Pop Up Description Label Text.
	 */
	@Test
	void testGetPinPopupDescriptionLabelText() {
		final String expected = "Pin Pop Up Description Label Text";
		ctx.currentResource("/content/piniconpopup");
		PinIconPopUp piniconpopup = ctx.request().adaptTo(PinIconPopUp.class);
		String actual = piniconpopup.getPinPopupDescriptionLabelText();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test get Pop Up Operating Hours Label Text.
	 */
	@Test
	void testGetPinPopupOperatingHoursLabelText() {
		final String expected = "Pin Pop Up Operating Hours Label Text";
		ctx.currentResource("/content/piniconpopup");
		PinIconPopUp piniconpopup = ctx.request().adaptTo(PinIconPopUp.class);
		String actual = piniconpopup.getPinPopupOperatingHoursLabelText();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test get Pop Up Email Label Text.
	 */
	@Test
	void testGetPinPopupEmailLabelText() {
		final String expected = "Pin Pop Up Email Label Text";
		ctx.currentResource("/content/piniconpopup");
		PinIconPopUp piniconpopup = ctx.request().adaptTo(PinIconPopUp.class);
		String actual = piniconpopup.getPinPopupEmailLabelText();
		assertEquals(expected, actual);
	}		
	
	@Test
	void testGetOverridePinIconPopItem() {
		final String expected = "overridePinIconPopItem";
		ctx.currentResource("/content/piniconpopup");
		PinIconPopUp piniconpopup = ctx.request().adaptTo(PinIconPopUp.class);
		String actual = piniconpopup.getOverridePinIconPopItem();
		assertEquals(expected, actual);
	}

	@Test
	void testGetOverridePinIconPopUpList() {
		MockitoAnnotations.initMocks(this);
		PinIconPopUpImpl pinIconPopUp = new PinIconPopUpImpl();
		pinIconPopUp.overridePinIconPopUpList = mockoverridePinIconPopUpList;
		List<PinIconPopUpItems> actualPinIconPopItems = pinIconPopUp.getOverridePinIconPopUpList();
		assertEquals(mockoverridePinIconPopUpList, actualPinIconPopItems);
	}
}

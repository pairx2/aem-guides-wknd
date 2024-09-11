package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.platform.common.components.models.PWAAlertMessage;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * The Class PWAAlertMessageImplTest.
 */
@ExtendWith(AemContextExtension.class)
class PWAAlertMessageImplTest {

	/**
	 * The ctx.
	 */
	private final AemContext ctx = new AemContext();
	private static final String CURRENT_RESOURCE = "/content/pwaalertmessage";
	private static final String CLOSE_ICON = "abt-icon abt-icon-cancel";
	/**
	 * Sets the up.
	 *
	 * @throws Exception the exception
	 */
	@BeforeEach
	public void setUp() {
		ctx.addModelsForClasses(PWAAlertMessageImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/PWAAlertMessageImplTest.json", "/content");
	}

	/**
	 * Test get Safari Message
	 */
	@Test
	void testGetSafariMessage() {
		final String expected = "Safari Message";
		ctx.currentResource(CURRENT_RESOURCE);
		PWAAlertMessage pwaAlertMessage = ctx.request().adaptTo(PWAAlertMessage.class);
		String actual = pwaAlertMessage.getSafariMessage();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test Get Chrome Message
	 */
	@Test
	void testGetChromeMessage() {
		final String expected = "Chrome Message";
		ctx.currentResource(CURRENT_RESOURCE);
		PWAAlertMessage pwaAlertMessage = ctx.request().adaptTo(PWAAlertMessage.class);
		String actual = pwaAlertMessage.getChromeMessage();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test get Safari Icon
	 */
	@Test
	void testGetSafariIcon() {
		final String expected = "abt-icon abt-icon-location-pin";
		ctx.currentResource(CURRENT_RESOURCE);
		PWAAlertMessage pwaAlertMessage = ctx.request().adaptTo(PWAAlertMessage.class);
		String actual = pwaAlertMessage.getSafariIcon();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test get Chrome Icon
	 */
	@Test
	void testGetChromeIcon() {
		final String expected = "abt-icon abt-icon-gps";
		ctx.currentResource(CURRENT_RESOURCE);
		PWAAlertMessage pwaAlertMessage = ctx.request().adaptTo(PWAAlertMessage.class);
		String actual = pwaAlertMessage.getChromeIcon();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test get Close Icon
	 */
	@Test
	void testGetCloseIcon() {
		final String expected = CLOSE_ICON;
		ctx.currentResource(CURRENT_RESOURCE);
		PWAAlertMessage pwaAlertMessage = ctx.request().adaptTo(PWAAlertMessage.class);
		String actual = pwaAlertMessage.getCloseIcon();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test get Success Message
	 */
	@Test
	void testGetSuccessMessage() {
		final String expected = "Success Message";
		ctx.currentResource(CURRENT_RESOURCE);
		PWAAlertMessage pwaAlertMessage = ctx.request().adaptTo(PWAAlertMessage.class);
		String actual = pwaAlertMessage.getSuccessMessage();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test get Failed Message
	 */
	@Test
	void testGetFailedMessage() {
		final String expected = "Failed Message";
		ctx.currentResource(CURRENT_RESOURCE);
		PWAAlertMessage pwaAlertMessage = ctx.request().adaptTo(PWAAlertMessage.class);
		String actual = pwaAlertMessage.getFailedMessage();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test get Close Icon Status
	 */
	@Test
	void testGetCloseIconStatus() {
		final String expected = CLOSE_ICON;
		ctx.currentResource(CURRENT_RESOURCE);
		PWAAlertMessage pwaAlertMessage = ctx.request().adaptTo(PWAAlertMessage.class);
		String actual = pwaAlertMessage.getCloseIconStatus();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test get Online Message
	 */
	@Test
	void testGetOnlineMessage() {
		final String expected = "Online Message";
		ctx.currentResource(CURRENT_RESOURCE);
		PWAAlertMessage pwaAlertMessage = ctx.request().adaptTo(PWAAlertMessage.class);
		String actual = pwaAlertMessage.getOnlineMessage();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test get Close Icon Internet
	 */
	@Test
	void testGetCloseIconInternet() {
		final String expected = CLOSE_ICON;
		ctx.currentResource(CURRENT_RESOURCE);
		PWAAlertMessage pwaAlertMessage = ctx.request().adaptTo(PWAAlertMessage.class);
		String actual = pwaAlertMessage.getCloseIconInternet();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test get Offline Message
	 */
	@Test
	void testGetOfflineMessage() {
		final String expected = "Offline Message";
		ctx.currentResource(CURRENT_RESOURCE);
		PWAAlertMessage pwaAlertMessage = ctx.request().adaptTo(PWAAlertMessage.class);
		String actual = pwaAlertMessage.getOfflineMessage();
		assertEquals(expected, actual);
	}
	
}

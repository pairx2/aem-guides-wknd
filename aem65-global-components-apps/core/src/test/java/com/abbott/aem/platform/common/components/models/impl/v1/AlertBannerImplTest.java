package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import com.abbott.aem.platform.common.components.models.AlertBanner;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class AlertBannerImplTest {

	private final AemContext ctx = new AemContext();

	@BeforeEach
	public void setUp() throws Exception {
		ProxyComponentService proxyComponentService = Mockito.mock(ProxyComponentService.class);
		Component component = Mockito.mock(Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);
		ctx.addModelsForClasses(AlertBannerImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/AlertBannerImpl.json", "/content");
	}

	@Test
	void testGetAlertMessage() {
		final String expected = "collapsemessage";
		ctx.currentResource("/content/alertBanner");
		AlertBanner alertBanner = ctx.request().adaptTo(AlertBanner.class);
		String actual = alertBanner.getAlertMessage();
		assertEquals(expected, actual);
	}

	@Test
	void testDisplayText() {
		final String expected = "displaycookieinfo";
		ctx.currentResource("/content/alertBanner");
		AlertBanner alertBanner = ctx.request().adaptTo(AlertBanner.class);
		String actual = alertBanner.getDisplayText();
		assertEquals(expected, actual);
	}

	@Test
	void testGetCollapseText() {
		final String expected = "collapse";
		ctx.currentResource("/content/alertBanner");
		AlertBanner alertBanner = ctx.request().adaptTo(AlertBanner.class);
		String actual = alertBanner.getCollapseText();
		assertEquals(expected, actual);
	}
	@Test
	void testGetExpandText() {
		final String expected = "expand";
		ctx.currentResource("/content/alertBanner");
		AlertBanner alertBanner = ctx.request().adaptTo(AlertBanner.class);
		String actual = alertBanner.getExpandText();
		assertEquals(expected, actual);
	}

	@Test
	void testGetButtonText() {
		final String expected = "enablecookies";
		ctx.currentResource("/content/alertBanner");
		AlertBanner alertBanner = ctx.request().adaptTo(AlertBanner.class);
		String actual = alertBanner.getButtonText();
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetgetId() {
		final String expected = "123";
		ctx.currentResource("/content/alertBanner");
		AlertBanner alertBanner = ctx.request().adaptTo(AlertBanner.class);
		String actual = alertBanner.getId();
		assertEquals(expected, actual);
	}

	@Test
	void testGetIcon() {
		final String expected = "icon";
		ctx.currentResource("/content/alertBanner");
		AlertBanner alertBanner = ctx.request().adaptTo(AlertBanner.class);
		String actual = alertBanner.getIcon();
		assertEquals(expected, actual);
	}

}

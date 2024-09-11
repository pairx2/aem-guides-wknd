package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.CookieBar;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class CookieBarImplTest {
	private final AemContext ctx = new AemContext();

	private ProxyComponentService proxyComponentService;
	private Component component;

	@BeforeEach
	void setUp() throws Exception {
		proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);
		ctx.addModelsForClasses(CookieBarImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/CookieBarImplTest.json", "/content");
		ctx.currentResource("/content/cookiebar");
	}

	@Test
	final void testGetCountryLabel() {
		final String expected = "Change Country";
		CookieBar cookieBar = ctx.request().adaptTo(CookieBar.class);
		String actual = cookieBar.getCountryLabel();
		assertEquals(expected, actual);
		assert StringUtils.isNotBlank(cookieBar.getId());
	}

	@Test
	final void testIsDisableLanguageNavigation() {
		CookieBar cookieBar = ctx.request().adaptTo(CookieBar.class);
		boolean actual = cookieBar.isDisableLanguageNavigation();
		assertEquals(true, actual);
	}

	@Test
	final void testGetCookieExpirationTime() {
		final int expected = 4;
		CookieBar cookieBar = ctx.request().adaptTo(CookieBar.class);
		int actual = cookieBar.getCookieExpirationTime();
		assertEquals(expected, actual);
	}
}

package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.Header;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class HeaderImplTest {

	private final AemContext ctx = new AemContext();
	private ProxyComponentService proxyComponentService;
	private Component component;

	@BeforeEach
	public void setUp() throws Exception {
		proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);
		ctx.addModelsForClasses(HeaderImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/HeaderImplTest.json", "/content");
	}

	@Test
	void testGetHideSignUpInNav() {
		ctx.currentResource("/content/header");
		Header header = ctx.request().adaptTo(Header.class);
		assertEquals(false, header.isHideSignUpInNav());

		Header obj1 = new HeaderImpl();
		Header obj2 = new HeaderImpl();
		assert obj1.equals(obj2);
		assert StringUtils.isNotBlank(obj1.toString());
	}

	@Test
	void testGetHideSearchInNav() {
		ctx.currentResource("/content/header");
		Header header = ctx.request().adaptTo(Header.class);
		assertEquals(false, header.isHideSearchInNav());
	}
	
	@Test
	void testGetPwaHideSearchInNav() {
		ctx.currentResource("/content/header");
		Header header = ctx.request().adaptTo(Header.class);
		assertEquals(false, header.isPwaHideSearchInNav());
	}

	@Test
	void testGetHideMegaMenuInNav() {
		ctx.currentResource("/content/header");
		Header header = ctx.request().adaptTo(Header.class);
		assertEquals(false, header.isHideMegaMenuInNav());
	}
	
	@Test
	void testGetUnderlineMegaMenuInNav() {
		ctx.currentResource("/content/header");
		Header header = ctx.request().adaptTo(Header.class);
		assertEquals(false, header.isUnderlineMegaMenuInNav());
	}

	@Test
	void testGetEnableSkipToContent() {
		ctx.currentResource("/content/header");
		Header header = ctx.request().adaptTo(Header.class);
		assertEquals(true, header.isEnableSkipToContent());
	}
	@Test
	void testGetEnableCompactMobileHeader() {
		ctx.currentResource("/content/header");
		Header header = ctx.request().adaptTo(Header.class);
		assertEquals(false, header.isEnableCompactMobileHeader());
	}
}

package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;


import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.Badge;
import org.mockito.Mockito;

@ExtendWith(AemContextExtension.class)
public class BadgeImplTest {

	private final AemContext ctx = new AemContext();

	@BeforeEach
	public void setUp() throws Exception {
		ProxyComponentService proxyComponentService = Mockito.mock(ProxyComponentService.class);
		Component component = Mockito.mock(Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);
		ctx.addModelsForClasses(BadgeImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/BadgeImplTest.json", "/content");

	}


	@Test
	void testGetBadgeText() {
		final String expected = "ALARM";
		ctx.currentResource("/content/badges");
		Badge badge = ctx.request().adaptTo(Badge.class);
		String actual = badge.getBadgeText();
		assertEquals(expected, actual);
	}

	@Test
	void testGetBadgeType() {
		final String expected = "ALARM";
		ctx.currentResource("/content/badges");
		Badge badge = ctx.request().adaptTo(Badge.class);
		String actual = badge.getBadgeType();
		assertEquals(expected, actual);
	}

}

package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.LayoutContainer;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.LayoutContainer;

@ExtendWith(AemContextExtension.class)
class LayoutContainerImplTest {

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
		ctx.addModelsForClasses(LayoutContainerImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/LayoutContainerImplTest.json", "/content");
		ctx.currentResource("/content/layout");
	}

	@Test
	final void testGetColumnCount() {
		LayoutContainer layoutContainer = ctx.request().adaptTo(LayoutContainer.class);
		assertEquals(4, layoutContainer.getColumnCount());
	}

	@Test
	final void testGetColumnList() {
		final List<Integer> expected = Arrays.asList(1, 2, 3, 4);
		LayoutContainer layoutContainer = ctx.request().adaptTo(LayoutContainer.class);
		assertEquals(layoutContainer.getColumnList(), expected);

		LayoutContainer obj1 = new LayoutContainerImpl();
		LayoutContainer obj2 = new LayoutContainerImpl();
		assert obj1.equals(obj2);
		assert StringUtils.isNotBlank(obj1.toString());
	}
}

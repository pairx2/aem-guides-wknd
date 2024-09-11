package com.abbott.aem.platform.common.components.models.impl.v1;

import static junit.framework.Assert.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.ErrorPage;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;


@ExtendWith(AemContextExtension.class)
class ErrorPageImplTest {

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
		ctx.addModelsForClasses(ErrorPageImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/ErrorPageImplTest.json", "/content");
	}

	@Test
	void testError() {
		ctx.currentResource("/content/errorpage");
		ErrorPage errorPage = ctx.request().adaptTo(ErrorPage.class);
		assert errorPage != null;
		assert StringUtils.isNotBlank(errorPage.toString());

		ErrorPage obj1 = new ErrorPageImpl();
		ErrorPage obj2 = new ErrorPageImpl();
		assertEquals(obj1, obj2);
	}
}

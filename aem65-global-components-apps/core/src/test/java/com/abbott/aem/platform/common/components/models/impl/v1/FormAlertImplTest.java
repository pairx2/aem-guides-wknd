package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.FormAlert;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(AemContextExtension.class)
class FormAlertImplTest {

	private final AemContext ctx = new AemContext();
	private ProxyComponentService proxyComponentService;
	private Component component;

	@BeforeEach
	public void setUp() throws Exception {
		component = Mockito.mock(Component.class);
		proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);
		ctx.addModelsForClasses(FormAlertImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/FormAlertImpl.json", "/content");
	}

	@Test
	void testGetIcon() {
		final String expected = "icon";
		ctx.currentResource("/content/formAlert");
		FormAlert formAlert = ctx.request().adaptTo(FormAlert.class);
		String actual = formAlert.getIcon();
		assertEquals(expected, actual);
	}

	@Test
	void testGetMessage() {
		final String expected = "message";
		ctx.currentResource("/content/formAlert");
		FormAlert formAlert = ctx.request().adaptTo(FormAlert.class);
		String actual = formAlert.getMessage();
		assertEquals(expected, actual);
	}
}

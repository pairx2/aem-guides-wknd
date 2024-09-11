package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.Alert;
import org.mockito.Mockito;

@ExtendWith(AemContextExtension.class)
public class AlertImplTest {

	private final AemContext ctx = new AemContext();

	@BeforeEach
	public void setUp() throws Exception {
		ProxyComponentService proxyComponentService = Mockito.mock(ProxyComponentService.class);
		Component component = Mockito.mock(Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);
		ctx.addModelsForClasses(AlertImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/AlertImpl.json", "/content");
	}

	@Test
	void testGetAlertType() {
		final String expected = "non-time-bound";
		ctx.currentResource("/content/alertNotification");
		Alert alertNotification = ctx.request().adaptTo(Alert.class);
		String actual = alertNotification.getAlertType();
		assertEquals(expected, actual);
		assert StringUtils.isNotBlank(alertNotification.getId());
	}

	@Test
	void testGetTime() {
		final int expected = 123;
		ctx.currentResource("/content/alertNotification");
		Alert alertNotification = ctx.request().adaptTo(Alert.class);
		int actual = alertNotification.getTime();
		assertEquals(expected, actual);
	}

	@Test
	void testGetExpiryDate() {
		final String expected = "expiry time";
		ctx.currentResource("/content/alertNotification");
		Alert alertNotification = ctx.request().adaptTo(Alert.class);
		String actual = alertNotification.getExpiryDate();
		assertEquals(expected, actual);
	}

	@Test
	void testGetCloseButton() {
		final boolean expected = false;
		ctx.currentResource("/content/alertNotification");
		Alert alertNotification = ctx.request().adaptTo(Alert.class);
		boolean actual = alertNotification.isCloseButton();
		assertEquals(expected, actual);
	}

	@Test
	void testGetIcon() {
		final String expected = "icon";
		ctx.currentResource("/content/alertNotification");
		Alert alertNotification = ctx.request().adaptTo(Alert.class);
		String actual = alertNotification.getIcon();
		assertEquals(expected, actual);
	}

}

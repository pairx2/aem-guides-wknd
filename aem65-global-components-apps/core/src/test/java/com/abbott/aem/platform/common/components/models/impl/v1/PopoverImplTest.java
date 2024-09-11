package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.Popover;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class PopoverImplTest {

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

		ctx.addModelsForClasses(PopoverImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/PopoverImplTest.json", "/content/abbott");
	}

	@Test
	void testGetImage() {
		final String expected = "/content/dam/adc/fds/india/images/video-placeholder.png";
		ctx.currentResource("/content/abbott/popover");
		Popover popover = ctx.request().adaptTo(Popover.class);
		String actual = popover.getImage();
		assertEquals(expected, actual);
	}

	@Test
	void testGetAltText() {
		final String expected = "Help Image";
		ctx.currentResource("/content/abbott/popover");
		Popover popover = ctx.request().adaptTo(Popover.class);
		String actual = popover.getAltText();
		assertEquals(expected, actual);
	}

	@Test
	void testGetTitle() {
		final String expected = "Help";
		ctx.currentResource("/content/abbott/popover");
		Popover popover = ctx.request().adaptTo(Popover.class);
		String actual = popover.getTitle();
		assertEquals(expected, actual);
	}

	@Test
	void testGetContent() {
		final String expected = "Lorum ipsum dolor sit amet, consectitor adipicising elit.";
		ctx.currentResource("/content/abbott/popover");
		Popover popover = ctx.request().adaptTo(Popover.class);
		String actual = popover.getContent();
		assertEquals(expected, actual);
		assertEquals("top", popover.getPosition());

		Popover obj1 = new PopoverImpl();
		Popover obj2 = new PopoverImpl();
		assert obj1.equals(obj2);
		assert StringUtils.isNotBlank(obj1.toString());
	}

	@Test
	void testIsLinkCheck() {
		final boolean expected = true;
		ctx.currentResource("/content/abbott/popover");
		Popover popover = ctx.request().adaptTo(Popover.class);
		boolean actual = popover.isLinkCheck();
		assertEquals(expected, actual);
	}

	@Test
	void testGetPosition() {
		final String expected = "top";
		ctx.currentResource("/content/abbott/popover");
		Popover popover = ctx.request().adaptTo(Popover.class);
		String actual = popover.getPosition();
		assertEquals(expected, actual);
	}

}
package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.platform.common.components.models.TilesWithBackgroundImage;


import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.mockito.Mockito;

@ExtendWith(AemContextExtension.class)
public class TilesWithBackgroundImageImplTest {

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
		ctx.addModelsForClasses(TilesWithBackgroundImageImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/TilesWithBackgroundImageImplTest.json", "/content");
	}


	@Test
	void testGetSectionTitle() {
		final boolean expected = true;
		ctx.currentResource("/content/tileswithbackgroundimage");
		TilesWithBackgroundImage tileswithbackgroundimage = ctx.request().adaptTo(TilesWithBackgroundImage.class);
		boolean actual = tileswithbackgroundimage.isSectionTitleRequired();
		assertEquals(expected, actual);

	}

	@Test
	void testGetId() {
		final String expected = "id";
		ctx.currentResource("/content/tileswithbackgroundimage");
		TilesWithBackgroundImage tileswithbackgroundimage = ctx.request().adaptTo(TilesWithBackgroundImage.class);
		String actual = tileswithbackgroundimage.getId();
		assertEquals(expected, actual);

	}

	/**
	 * Test get start color.
	 */
	@Test
	void testGetStartColor() {
		final String expected = "rgba(127,239,127,0.55)";
		ctx.currentResource("/content/tileswithbackgroundimage");
		TilesWithBackgroundImage tileswithbackgroundimage = ctx.request().adaptTo(TilesWithBackgroundImage.class);
		String actual = tileswithbackgroundimage.getStartColor();
		assertEquals(expected, actual);

	}

	/**
	 * Test get end color.
	 */
	@Test
	void testGetEndColor() {
		final String expected = "rgba(127,239,127,0.55)";
		ctx.currentResource("/content/tileswithbackgroundimage");
		TilesWithBackgroundImage tileswithbackgroundimage = ctx.request().adaptTo(TilesWithBackgroundImage.class);
		String actual = tileswithbackgroundimage.getEndColor();
		assertEquals(expected, actual);

	}

	/**
	 * Test get start color position.
	 */
	@Test
	void testGetStartColorPosition() {
		final String expected = "0";
		ctx.currentResource("/content/tileswithbackgroundimage");
		TilesWithBackgroundImage tileswithbackgroundimage = ctx.request().adaptTo(TilesWithBackgroundImage.class);
		String actual = tileswithbackgroundimage.getStartColorPosition();
		assertEquals(expected, actual);

	}

	/**
	 * Test get start color position.
	 */
	@Test
	void testGetEndColorPosition() {
		final String expected = "100";
		ctx.currentResource("/content/tileswithbackgroundimage");
		TilesWithBackgroundImage tileswithbackgroundimage = ctx.request().adaptTo(TilesWithBackgroundImage.class);
		String actual = tileswithbackgroundimage.getEndColorPosition();
		assertEquals(expected, actual);

	}

}

package com.abbott.aem.platform.common.components.models.impl.v1;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.TextModel;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;

@ExtendWith(AemContextExtension.class)
public class TextModelImplTest {

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

		ctx.addModelsForClasses(TextModelImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/TextModelImplTest.json", "/content");
	}

	@Test
	void testGetShortEnabled() {
		final String expected = "true";
		ctx.currentResource("/content/text");
		TextModel text = ctx.request().adaptTo(TextModel.class);
		String actual = text.getShortEnabled();
		assertEquals(expected, actual);
	}

	@Test
	final void testGetNumberOfLines() {
		final String expected = "77";
		ctx.currentResource("/content/text");
		TextModel text = ctx.request().adaptTo(TextModel.class);
		String actual = text.getNumberOfLines();
		assertEquals(expected, actual);
	}

	@Test
	final void testGetMoreLink() {
		final String expected = "read more";
		ctx.currentResource("/content/text");
		TextModel text = ctx.request().adaptTo(TextModel.class);
		String actual = text.getMoreLink();
		assertEquals(expected, actual);
	}

	@Test
	final void testGetLessLink() {
		final String expected = "read less";
		ctx.currentResource("/content/text");
		TextModel text = ctx.request().adaptTo(TextModel.class);
		String actual = text.getLessLink();
		assertEquals(expected, actual);
	}

	/**
	 * Test get start color.
	 */
	@Test
	void testGetStartColor() {
		final String expected = "rgba(127,239,127,0.55)";
		ctx.currentResource("/content/text");
		TextModel text = ctx.request().adaptTo(TextModel.class);
		String actual = text.getStartColor();
		assertEquals(expected, actual);
		
	}
	/**
	 * Test get end color.
	 */
	@Test
	void testGetEndColor() {
		final String expected = "rgba(127,239,127,0.55)";
		ctx.currentResource("/content/text");
		TextModel text = ctx.request().adaptTo(TextModel.class);
		String actual = text.getEndColor();
		assertEquals(expected, actual);
		
	}
	
	/**
	 * Test get start color position.
	 */
	@Test
	void testGetStartColorPosition() {
		final String expected = "0";
		ctx.currentResource("/content/text");
		TextModel text = ctx.request().adaptTo(TextModel.class);
		String actual = text.getStartColorPosition();
		assertEquals(expected, actual);
		
	}
	
	/**
	 * Test get End color position.
	 */
	@Test
	void testGetEndColorPosition() {
		final String expected = "100";
		ctx.currentResource("/content/text");
		TextModel text = ctx.request().adaptTo(TextModel.class);
		String actual = text.getEndColorPosition();
		assertEquals(expected, actual);
		
	}

}
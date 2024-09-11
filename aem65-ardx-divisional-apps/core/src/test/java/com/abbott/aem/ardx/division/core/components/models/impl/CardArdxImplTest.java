package com.abbott.aem.ardx.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;

import com.abbott.aem.ardx.division.core.components.models.CardArdx;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class CardArdxImplTest {

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

		ctx.addModelsForClasses(CardArdxImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/CardArdxImplTest.json", "/content");
		ctx.currentResource("/content/cardardx");
	}

	@Test
	void testGetVideoID() {
		final String expected = "r0fuk3gx26";
		ctx.currentResource("/content/cardardx");
		CardArdx cardardx = ctx.request().adaptTo(CardArdx.class);
		String actual = cardardx.getVideoID();
		assertEquals(expected, actual);
	}

	@Test
	void testGetImagePath() {
		final String expected = "/content/dam/world-drug-safe/index/HP-News-Icon-80.jpg";
		ctx.currentResource("/content/cardardx");
		CardArdx cardardx = ctx.request().adaptTo(CardArdx.class);
		String actual = cardardx.getImagePath();
		assertEquals(expected, actual);
	}

	@Test
	void testGetBackgroundColor() {
		final String expected = "colorPalette_purple";
		ctx.currentResource("/content/cardardx");
		CardArdx cardardx = ctx.request().adaptTo(CardArdx.class);
		String actual = cardardx.getBackgroundColor();
		assertEquals(expected, actual);
	}

	@Test
	void testGetVideoDocumentNumber() {
		final String expected = "12234";
		ctx.currentResource("/content/cardardx");
		CardArdx cardardx = ctx.request().adaptTo(CardArdx.class);
		String actual = cardardx.getVideoDocumentNumber();
		assertEquals(expected, actual);
	}

	@Test
	void testGetPopup() {
		final String expected = "true";
		ctx.currentResource("/content/cardardx");
		CardArdx cardardx = ctx.request().adaptTo(CardArdx.class);
		String actual = cardardx.getPopup();
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetCardLink() {
		final String expected = "/content/ardx/globalpointofcare/us/en/index";
		ctx.currentResource("/content/cardardx");
		CardArdx cardardx = ctx.request().adaptTo(CardArdx.class);
		String actual = cardardx.getCardLink();
		assertEquals(expected, actual);
	}
}

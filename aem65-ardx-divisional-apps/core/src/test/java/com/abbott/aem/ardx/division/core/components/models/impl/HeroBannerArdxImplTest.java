package com.abbott.aem.ardx.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;

import com.abbott.aem.ardx.division.core.components.models.HeroBannerArdx;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class HeroBannerArdxImplTest {
	
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
		ctx.addModelsForClasses(HeroBannerArdxImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/HeroBannerArdxImplTest.json", "/content");
		ctx.currentResource("/content/herobannerardx");
		
	}
		
	@Test
	void testGetPreTitleColor() {
		HeroBannerArdx herobannerardx = ctx.request().adaptTo(HeroBannerArdx.class);
		assertEquals("rgb(109,127,127)", herobannerardx.getPreTitleColor());
	}	
		
	@Test
	void testGetTitleColor() {
		HeroBannerArdx herobannerardx = ctx.request().adaptTo(HeroBannerArdx.class);
		assertEquals("rgb(127,73,127)", herobannerardx.getTitleColor());
	}
	
	@Test
	void testGetSubTitleColor() {
		HeroBannerArdx herobannerardx = ctx.request().adaptTo(HeroBannerArdx.class);
		assertEquals("rgb(250, 128, 114)", herobannerardx.getSubTitleColor());
	}
	
	@Test
	void testGetDescriptionColor() {
		HeroBannerArdx herobannerardx = ctx.request().adaptTo(HeroBannerArdx.class);
		assertEquals("rgb(233, 150, 122)", herobannerardx.getDescriptionColor());
	}	
		
	@Test
	void testGetBackgroundColor() {
		HeroBannerArdx herobannerardx = ctx.request().adaptTo(HeroBannerArdx.class);
		assertEquals("rgb(255, 160, 122)", herobannerardx.getBackgroundColor());
	}
		
}

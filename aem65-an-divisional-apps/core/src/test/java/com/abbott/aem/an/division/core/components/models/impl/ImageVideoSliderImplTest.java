package com.abbott.aem.an.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;

import com.abbott.aem.an.division.core.components.models.ImageVideoSlider;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class ImageVideoSliderImplTest {
    
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

		ctx.addModelsForClasses(ImageVideoSliderImpl.class);
		ctx.load().json("/com/abbott/aem/an/division/core/components/models/impl/ImageVideoSliderImplTest.json",
				"/content");
		ctx.currentResource("/content/imagevideoslider");
	}
	
	@AfterEach
	void tearDown() throws Exception {
		ctx.resourceResolver().delete(ctx.resourceResolver().getResource("/content"));
		ctx.resourceResolver().commit();
		proxyComponentService = null;
		component = null;
	}
	
	@Test
	void testGetThumbnailPosition() {
		final String expected = "bottom";
		ImageVideoSlider assets = ctx.request().adaptTo(ImageVideoSlider.class);
		String actual = assets.getThumbnailPosition();
		assertEquals(expected, actual);
	} 
	 
}

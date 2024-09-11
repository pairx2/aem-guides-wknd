package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.VideoBanner;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;


@ExtendWith(AemContextExtension.class)
class VideoBannerImplTest {

	private static final String PATH = "/content/viedobanner";
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
		ctx.addModelsForClasses(VideoBannerImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/VideoBannerImplTest.json", "/content");
	}
	
	@Test
	void testGetStartColor() {
		ctx.currentResource(VideoBannerImplTest.PATH);
		VideoBanner videoBanner = ctx.request().adaptTo(VideoBanner.class);
		assertEquals("rgb(109,127,127)", videoBanner.getStartColor());
	}

	@Test
	void testGetEndColor() {
		ctx.currentResource(VideoBannerImplTest.PATH);
		VideoBanner videoBanner = ctx.request().adaptTo(VideoBanner.class);
		assertEquals("rgb(127,73,127)", videoBanner.getEndColor());
	}

	@Test
	void testGetStartColorPosition() {
		ctx.currentResource(VideoBannerImplTest.PATH);
		VideoBanner videoBanner = ctx.request().adaptTo(VideoBanner.class);
		assertEquals(10, videoBanner.getStartColorPosition());
	}

	@Test
	void testGetEndColorPosition() {
		ctx.currentResource(VideoBannerImplTest.PATH);
		VideoBanner videoBanner = ctx.request().adaptTo(VideoBanner.class);
		assertEquals(20, videoBanner.getEndColorPosition());
	}
	
	@Test
	void testGetListOfButtons() {
		final List<String> expected = new ArrayList<String>();
		expected.add("button-0");
		expected.add("button-1");
		expected.add("button-2");
		expected.add("button-3");
		ctx.currentResource(VideoBannerImplTest.PATH);
		VideoBanner videoBanner = ctx.request().adaptTo(VideoBanner.class);
		List<String> actual = videoBanner.getListOfButtons();
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetFileReference() {
		ctx.currentResource(VideoBannerImplTest.PATH);
		VideoBanner videoBanner = ctx.request().adaptTo(VideoBanner.class);
		assertEquals("File Reference", videoBanner.getFileReference());
	}
	
	@Test
	void testGetDescription() {
		ctx.currentResource(VideoBannerImplTest.PATH);
		VideoBanner videoBanner = ctx.request().adaptTo(VideoBanner.class);
		assertEquals("Description", videoBanner.getDescription());
	}
	
	@Test
	void testGetPlayIcon() {
		ctx.currentResource(VideoBannerImplTest.PATH);
		VideoBanner videoBanner = ctx.request().adaptTo(VideoBanner.class);
		assertEquals("Play Icon", videoBanner.getPlayIcon());
	}
	
	@Test
	void testGetPlayIconLabel() {
		ctx.currentResource(VideoBannerImplTest.PATH);
		VideoBanner videoBanner = ctx.request().adaptTo(VideoBanner.class);
		assertEquals("PlayIconLabel", videoBanner.getPlayIconLabel());
	}
	
	@Test
	void testGetPlayPauseIconColor() {
		ctx.currentResource(VideoBannerImplTest.PATH);
		VideoBanner videoBanner = ctx.request().adaptTo(VideoBanner.class);
		assertEquals("PlayPauseIconColor", videoBanner.getPlayPauseIconColor());
	}
	
	@Test
	void testGetPauseIcon() {
		ctx.currentResource(VideoBannerImplTest.PATH);
		VideoBanner videoBanner = ctx.request().adaptTo(VideoBanner.class);
		assertEquals("PauseIcon", videoBanner.getPauseIcon());
	}
	
	@Test
	void testGetPauseIconLabel() {
		ctx.currentResource(VideoBannerImplTest.PATH);
		VideoBanner videoBanner = ctx.request().adaptTo(VideoBanner.class);
		assertEquals("PauseIcon", videoBanner.getPauseIcon());
	}
	
	@Test
	void testGetPauseIconColor() {
		ctx.currentResource(VideoBannerImplTest.PATH);
		VideoBanner videoBanner = ctx.request().adaptTo(VideoBanner.class);
		assertEquals("PauseIconColor", videoBanner.getPauseIconColor());
	}
	
	@Test
	void testGetTextAlignment() {
		ctx.currentResource(VideoBannerImplTest.PATH);
		VideoBanner videoBanner = ctx.request().adaptTo(VideoBanner.class);
		assertEquals("TextAlignment", videoBanner.getTextAlignment());
	}
	
	@Test
	void testGetTitle() {
		ctx.currentResource(VideoBannerImplTest.PATH);
		VideoBanner videoBanner = ctx.request().adaptTo(VideoBanner.class);
		assertEquals("Title", videoBanner.getTitle());
	}
	
	@Test
	void testGetPretitle() {
		ctx.currentResource(VideoBannerImplTest.PATH);
		VideoBanner videoBanner = ctx.request().adaptTo(VideoBanner.class);
		assertEquals("Pretitle", videoBanner.getPretitle());
	}
}
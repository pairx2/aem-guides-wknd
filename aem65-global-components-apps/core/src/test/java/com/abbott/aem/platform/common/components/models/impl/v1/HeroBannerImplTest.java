package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.HeroBanner;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.HeroBanner;

@ExtendWith(AemContextExtension.class)
class HeroBannerImplTest {

	private static final String PATH = "/content/herobanner";
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
		ctx.addModelsForClasses(HeroBannerImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/HeroBannerImplTest.json", "/content");
	}

	@Test
	void testGetFormFragmentPath() {
		ctx.currentResource(HeroBannerImplTest.PATH);
		HeroBanner herobanner = ctx.request().adaptTo(HeroBanner.class);
		assertEquals("/content/experience-fragments/bts/global-reference/master/en/header/header-global/master", herobanner.getFormFragmentPath());
	}

	@Test
	void testGetNumberOfButtons() {
		ctx.currentResource(HeroBannerImplTest.PATH);
		HeroBanner herobanner = ctx.request().adaptTo(HeroBanner.class);
		assertEquals(4, herobanner.getNumberOfButtons());

		HeroBanner obj1 = new HeroBannerImpl();
		HeroBanner obj2 = new HeroBannerImpl();
		assert obj1.equals(obj2);
		assert StringUtils.isNotBlank(obj1.toString());
	}

	@Test
	void testGetAltText() {
		ctx.currentResource(HeroBannerImplTest.PATH);
		HeroBanner herobanner = ctx.request().adaptTo(HeroBanner.class);
		assertEquals("hero banner", herobanner.getAltText());
	}
	
	@Test
	void testGetStartColor() {
		ctx.currentResource(HeroBannerImplTest.PATH);
		HeroBanner herobanner = ctx.request().adaptTo(HeroBanner.class);
		assertEquals("rgb(109,127,127)", herobanner.getStartColor());
	}

	@Test
	void testGetEndColor() {
		ctx.currentResource(HeroBannerImplTest.PATH);
		HeroBanner herobanner = ctx.request().adaptTo(HeroBanner.class);
		assertEquals("rgb(127,73,127)", herobanner.getEndColor());
	}

	@Test
	void testGetStartColorPosition() {
		ctx.currentResource(HeroBannerImplTest.PATH);
		HeroBanner herobanner = ctx.request().adaptTo(HeroBanner.class);
		assertEquals(10, herobanner.getStartColorPosition());
	}

	@Test
	void testGetEndColorPosition() {
		ctx.currentResource(HeroBannerImplTest.PATH);
		HeroBanner herobanner = ctx.request().adaptTo(HeroBanner.class);
		assertEquals(20, herobanner.getEndColorPosition());
	}

	@Test
	void testGetFileReference() {
		ctx.currentResource(HeroBannerImplTest.PATH);
		HeroBanner herobanner = ctx.request().adaptTo(HeroBanner.class);
		assertEquals("/content/dam/bts/global-reference/surfer-wave-02.jpg", herobanner.getFileReference());
	}
	
	@Test
	void testGetMobileImage() {
		ctx.currentResource(HeroBannerImplTest.PATH);
		HeroBanner herobanner = ctx.request().adaptTo(HeroBanner.class);
		assertEquals("/content/dam/bts/global-reference/surfer-wave-03.jpg", herobanner.getMobileImage());
	}
	
	@Test
	void testGetTabletImage() {
		ctx.currentResource(HeroBannerImplTest.PATH);
		HeroBanner herobanner = ctx.request().adaptTo(HeroBanner.class);
		assertEquals("/content/dam/bts/global-reference/surfer-wave-04.jpg", herobanner.getTabletImage());
	}

	@Test
	void testGetListOfButtons() {
		final List<String> expected = new ArrayList<String>();
		expected.add("button-0");
		expected.add("button-1");
		expected.add("button-2");
		expected.add("button-3");
		ctx.currentResource(HeroBannerImplTest.PATH);
		HeroBanner herobanner = ctx.request().adaptTo(HeroBanner.class);
		List<String> actual = herobanner.getListOfButtons();
		assertEquals(expected, actual);
	}

}
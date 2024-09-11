package com.abbott.aem.cv.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.abbott.aem.cv.division.core.components.models.HeaderBannerItem;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.cv.division.core.components.models.HeaderBanner;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

@ExtendWith(AemContextExtension.class)
class HeaderBannerImplTest {

	private final AemContext ctx = new AemContext();
	private static final String PATH = "/content/imageTextList";

	@Mock
	private List<HeaderBannerItem> mockImageTextlist;

	@BeforeEach
	public void setUp() {
		ctx.addModelsForClasses(HeaderBanner.class );
		ctx.load().json("/com/abbott/aem/cv/division/core/components/models/impl/HeaderBannnerImplTest.json", "/content");
	}

	@Test
	void testGetBannerHeight() {
		final String expected = "small";
		ctx.currentResource(PATH);
		HeaderBanner headerBanner = ctx.request().adaptTo(HeaderBanner.class);
		String actual = headerBanner.getBannerHeight();
		assertEquals(expected, actual);
	}

	@Test
	void testGetBackgroundColor() {
		final String expected = "blue";
		ctx.currentResource(PATH);
		HeaderBanner headerBanner = ctx.request().adaptTo(HeaderBanner.class);
		String actual = headerBanner.getBackgroundColor();
		assertEquals(expected, actual);
	}

	@Test
	void testGetBackgroundType() {
		final String expected = "color";
		ctx.currentResource(PATH);
		HeaderBanner headerBanner = ctx.request().adaptTo(HeaderBanner.class);
		String actual = headerBanner.getBackgroundType();
		assertEquals(expected, actual);
	}

	@Test
	void testGetTopMargin() {
		final String expected = "true";
		ctx.currentResource(PATH);
		HeaderBanner headerBanner = ctx.request().adaptTo(HeaderBanner.class);
		String actual = headerBanner.getTopMargin();
		assertEquals(expected, actual);
	}

	@Test
	void testBottomMargin() {
		final String expected = "true";
		ctx.currentResource(PATH);
		HeaderBanner headerBanner = ctx.request().adaptTo(HeaderBanner.class);
		String actual = headerBanner.getBottomMargin();
		assertEquals(expected, actual);
	}
	
	@Test
	void testHideMobile() {
		final String expected = "true";
		ctx.currentResource(PATH);
		HeaderBanner headerBanner = ctx.request().adaptTo(HeaderBanner.class);
		String actual = headerBanner.getHideMobile();
		assertEquals(expected, actual);
	}

	@Test
	void testGetTextContainerWidth() {
		final String expected = "100%";
		ctx.currentResource(PATH);
		HeaderBanner headerBanner = ctx.request().adaptTo(HeaderBanner.class);
		String actual = headerBanner.getTextContainerWidth();
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetTextStopCarouselAutoRotate() {
		final String expected = "false";
		ctx.currentResource(PATH);
		HeaderBanner headerBanner = ctx.request().adaptTo(HeaderBanner.class);
		String actual = headerBanner.getStopCarouselAutoRotate();
		assertEquals(expected, actual);
	}

	@Test
	void testGetButtonList() {
		MockitoAnnotations.initMocks(this);
		HeaderBannerImpl headerBannerImpl = new HeaderBannerImpl();
		headerBannerImpl.imageTextList = mockImageTextlist;
		List<HeaderBannerItem> actualImageTextlist = headerBannerImpl.getImageTextlist();
		assertEquals(mockImageTextlist, actualImageTextlist);
	}
}

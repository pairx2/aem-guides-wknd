package com.abbott.aem.cv.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import com.abbott.aem.cv.division.core.components.models.VideoCarousel;

@ExtendWith(AemContextExtension.class)
class VideoCarouselImplTest {

	private final AemContext ctx = new AemContext();
	private static final String PATH = "/content/videoCarousel";

	@BeforeEach
	public void setUp() {
		ctx.addModelsForClasses(VideoCarousel.class );
		ctx.load().json("/com/abbott/aem/cv/division/core/components/models/impl/VideoCarouselImplTest.json", "/content");
	}

	@Test
	void testGetTitle() {
		final String expected = "Video guides for set up";
		ctx.currentResource(PATH);
		VideoCarousel videoCarousel = ctx.request().adaptTo(VideoCarousel.class);
		String actual = videoCarousel.getTitle();
		assertEquals(expected, actual);
	}

	@Test
	void testGetDescription() {
		final String expected = "Learn how to set up, operate, clean, repack and troubleshoot your CardioMEMS Patient Electronics System from our library of videos.";
		ctx.currentResource(PATH);
		VideoCarousel videoCarousel = ctx.request().adaptTo(VideoCarousel.class);
		String actual = videoCarousel.getDescription();
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetCardsPerScroll() {
		final String expected = "1";
		ctx.currentResource(PATH);
		VideoCarousel videoCarousel = ctx.request().adaptTo(VideoCarousel.class);
		String actual = videoCarousel.getCardsPerScroll();
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetId() {
		final String expected = "1234";
		ctx.currentResource(PATH);
		VideoCarousel videoCarousel = ctx.request().adaptTo(VideoCarousel.class);
		String actual = videoCarousel.getId();
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetIconRight() {
		final String expected = "abt-icon-right-arrow";
		ctx.currentResource(PATH);
		VideoCarousel videoCarousel = ctx.request().adaptTo(VideoCarousel.class);
		String actual = videoCarousel.getIconRight();
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetIconLeft() {
		final String expected = "abt-icon-left-arrow";
		ctx.currentResource(PATH);
		VideoCarousel videoCarousel = ctx.request().adaptTo(VideoCarousel.class);
		String actual = videoCarousel.getIconLeft();
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetAccessibilityLabel() {
		final String expected = "Label";
		ctx.currentResource(PATH);
		VideoCarousel videoCarousel = ctx.request().adaptTo(VideoCarousel.class);
		String actual = videoCarousel.getAccessibilityLabel();
		assertEquals(expected, actual);
	}

}

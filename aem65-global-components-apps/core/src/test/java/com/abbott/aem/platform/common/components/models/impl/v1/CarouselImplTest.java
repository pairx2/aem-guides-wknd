package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.CustomCarousel;

@ExtendWith(AemContextExtension.class)
class CarouselImplTest {

	private static final String PATH = "/content/carousel";
	private final AemContext ctx = new AemContext();

	@BeforeEach
	void setUp() throws Exception {
		ctx.addModelsForClasses(CarouselImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/CarouselImplTest.json", "/content");
	}

	@Test
	void testGetCarouselType() {
		ctx.currentResource(CarouselImplTest.PATH);
		CustomCarousel carousel = ctx.request().adaptTo(CustomCarousel.class);
		assertEquals("card", carousel.getCarouselType());
	}

	@Test
	void testGetCardsPerScreen() {
		ctx.currentResource(CarouselImplTest.PATH);
		CustomCarousel carousel = ctx.request().adaptTo(CustomCarousel.class);
		assertEquals(4, carousel.getCardsPerScreen());
	}

	@Test
	void testGetCardsPerScroll() {
		ctx.currentResource(CarouselImplTest.PATH);
		CustomCarousel carousel = ctx.request().adaptTo(CustomCarousel.class);
		assertEquals(4, carousel.getCardsPerScroll());
	}

	@Test
	void testGetCategoryTag() {
		ctx.currentResource(CarouselImplTest.PATH);
		CustomCarousel carousel = ctx.request().adaptTo(CustomCarousel.class);
		assertEquals("workflow:system", carousel.getCategoryTag());
	}

	@Test
	void testGetCarouselHeight() {
		ctx.currentResource(CarouselImplTest.PATH);
		CustomCarousel carousel = ctx.request().adaptTo(CustomCarousel.class);
		assertEquals("tall", carousel.getCarouselHeight());
	}

	@Test
	void testGetIsHideIndicators() {
		ctx.currentResource(CarouselImplTest.PATH);
		CustomCarousel carousel = ctx.request().adaptTo(CustomCarousel.class);
		assertEquals(true, carousel.isHideIndicators());
	}

	@Test
	void testGetIconRight() {
		ctx.currentResource(CarouselImplTest.PATH);
		CustomCarousel carousel = ctx.request().adaptTo(CustomCarousel.class);
		assertEquals("abt-icon-search", carousel.getIconRight());
	}

	@Test
	void testGetIconLeft() {
		ctx.currentResource(CarouselImplTest.PATH);
		CustomCarousel carousel = ctx.request().adaptTo(CustomCarousel.class);
		assertEquals("abt-icon-hamburger", carousel.getIconLeft());
	}

}

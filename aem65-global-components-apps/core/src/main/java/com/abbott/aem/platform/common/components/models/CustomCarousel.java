package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Carousel;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface CustomCarousel extends Carousel {

	default String getCarouselType() {
		throw new UnsupportedOperationException();
	}

	default Integer getCardsPerScreen() {
		throw new UnsupportedOperationException();
	}

	default Integer getCardsPerScroll() {
		throw new UnsupportedOperationException();
	}

	default String getCategoryTag() {
		throw new UnsupportedOperationException();
	}

	default String getCarouselHeight() {
		throw new UnsupportedOperationException();
	}

	default boolean isHideIndicators() {
		throw new UnsupportedOperationException();
	}

	default String getIconRight() {
		throw new UnsupportedOperationException();
	}

	default String getIconLeft() {
		throw new UnsupportedOperationException();
	}

}

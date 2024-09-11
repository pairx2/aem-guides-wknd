package com.abbott.aem.cv.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.cv.division.core.components.models.AnimationContainer;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class AnimationContainerImplTest {

    private final AemContext ctx = new AemContext();
	private static final String PATH = "/content/AnimationContainer";
    
    @BeforeEach
	public void setUp() {
		ctx.addModelsForClasses(AnimationContainer.class );
		ctx.load().json("/com/abbott/aem/cv/division/core/components/models/impl/AnimationContainerImplTest.json", "/content");
	}

    @Test
	void testGetDirection() {
		final String expected = "direction";
		ctx.currentResource(PATH);
		AnimationContainer animationContainer = ctx.request().adaptTo(AnimationContainer.class);
		String actual = animationContainer.getDirection();
		assertEquals(expected, actual);
	}

    @Test
	void testGetSpeed() {
		final String expected = "speed";
		ctx.currentResource(PATH);
		AnimationContainer animationContainer = ctx.request().adaptTo(AnimationContainer.class);
		String actual = animationContainer.getSpeed();
		assertEquals(expected, actual);
	}

	@Test
	void testGetDuration() {
		final String expected = "Duration";
		ctx.currentResource(PATH);
		AnimationContainer animationContainer = ctx.request().adaptTo(AnimationContainer.class);
		String actual = animationContainer.getDuration();
		assertEquals(expected, actual);
	}

	@Test
	void testGetDelay() {
		final String expected = "Delay";
		ctx.currentResource(PATH);
		AnimationContainer animationContainer = ctx.request().adaptTo(AnimationContainer.class);
		String actual = animationContainer.getDelay();
		assertEquals(expected, actual);
	}
}

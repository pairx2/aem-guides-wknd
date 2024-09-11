package com.abbott.aem.cv.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.cv.division.core.components.models.HoverCard;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class HoverCardImplTest {

    private final AemContext ctx = new AemContext();
	private static final String PATH = "/content/hovercard";
    
    @BeforeEach
	public void setUp() {
		ctx.addModelsForClasses(HoverCard.class );
		ctx.load().json("/com/abbott/aem/cv/division/core/components/models/impl/HoverCardImplTest.json", "/content");
	}

    @Test
	void testGetHoverTextTitle() {
		final String expected = "Title";
		ctx.currentResource(PATH);
		HoverCard hoverCard = ctx.request().adaptTo(HoverCard.class);
		String actual = hoverCard.getHoverTextTitle();
		assertEquals(expected, actual);
	}

    @Test
	void testGetHoverTextDescription() {
		final String expected = "Despcription";
		ctx.currentResource(PATH);
		HoverCard hoverCard = ctx.request().adaptTo(HoverCard.class);
		String actual = hoverCard.getHoverTextDescription();
		assertEquals(expected, actual);
	}
}

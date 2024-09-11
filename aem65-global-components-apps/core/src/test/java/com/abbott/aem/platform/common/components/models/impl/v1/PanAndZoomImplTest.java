package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.PanAndZoom;

/**
 * The type Container impl test.
 */
@ExtendWith(AemContextExtension.class)

public class PanAndZoomImplTest {

	private final AemContext ctx = new AemContext();

	/**
	 * Sets up.
	 *
	 * @throws Exception the exception
	 */
	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(PanAndZoomImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/PanAndZoomImplTest.json", "/content");
		
	}

	/**
	 * Test get rule color.
	 */
	@Test
	void testGetImageAlignment() {
		final String expected = "left";
		ctx.currentResource("/content/panandzoom");
		PanAndZoom panandzoom = ctx.request().adaptTo(PanAndZoom.class);
		String actual = panandzoom.getImageAlignment();
		assertEquals(expected, actual);
		
	}
	
	@Test
	void testIsTopMargin() {
		final boolean expected = true;
		ctx.currentResource("/content/panandzoom");
		PanAndZoom panandzoom = ctx.request().adaptTo(PanAndZoom.class);
		boolean actual = panandzoom.isTopMargin();
		assertEquals(expected, actual);
		
	}
	
	@Test
	void testIstBottomMargin() {
		final boolean expected = false;
		ctx.currentResource("/content/panandzoom");
		PanAndZoom panandzoom = ctx.request().adaptTo(PanAndZoom.class);
		boolean actual = panandzoom.isBottomMargin();
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetCaptionAlignment() {
		final String expected = "right";
		ctx.currentResource("/content/panandzoom");
		PanAndZoom panandzoom = ctx.request().adaptTo(PanAndZoom.class);
		String actual = panandzoom.getCaptionAlignment();
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetCaptionPlacement() {
		final String expected = "top";
		ctx.currentResource("/content/panandzoom");
		PanAndZoom panandzoom = ctx.request().adaptTo(PanAndZoom.class);
		String actual = panandzoom.getCaptionPlacement();
		assertEquals(expected, actual);
	}
	
	@Test
	void testIsDisplayOriginalImage() {
		final boolean expected = true;
		ctx.currentResource("/content/panandzoom");
		PanAndZoom panandzoom = ctx.request().adaptTo(PanAndZoom.class);
		boolean actual = panandzoom.isDisplayOriginalImage();
		assertEquals(expected, actual);
	}
	
	@Test
	void testIsDisplayPopupTitle() {
		final boolean expected = true;
		ctx.currentResource("/content/panandzoom");
		PanAndZoom panandzoom = ctx.request().adaptTo(PanAndZoom.class);
		boolean actual = panandzoom. isDisplayPopupTitle();
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetZoomIn() {
		final String expected = "abt-icon abt-icon-zoom-in";
		ctx.currentResource("/content/panandzoom");
		PanAndZoom panandzoom = ctx.request().adaptTo(PanAndZoom.class);
		String actual = panandzoom. getZoomIn();
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetZoomOut() {
		final String expected = "abt-icon abt-icon-zoom-out";
		ctx.currentResource("/content/panandzoom");
		PanAndZoom panandzoom = ctx.request().adaptTo(PanAndZoom.class);
		String actual = panandzoom. getZoomOut();
		assertEquals(expected, actual);
	}

	
}





	


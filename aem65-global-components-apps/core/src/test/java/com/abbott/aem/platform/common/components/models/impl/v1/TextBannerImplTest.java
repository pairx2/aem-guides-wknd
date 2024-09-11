package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.TextBanner;

@ExtendWith(AemContextExtension.class)
class TextBannerImplTest {

	private final AemContext ctx = new AemContext();

	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(TextBannerImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/TextBannerImplTest.json", "/content");

	}

	@Test
	void testGetBannerText() {
		final String expected = "This component is used to add a single-line banner text with quotes.";
		ctx.currentResource("/content/textBanner");
		TextBanner banner = ctx.request().adaptTo(TextBanner.class);
		String actual = banner.getBannerTitle();
		assertEquals(expected, actual);
	}
	
	
	@Test
	void testGetId() {
		final String expected = "id";
		ctx.currentResource("/content/textBanner");
		TextBanner banner = ctx.request().adaptTo(TextBanner.class);
		String actual = banner.getId();
		assertEquals(expected, actual);
		
	}

	/**
	 * Test get start color.
	 */
	@Test
	void testGetStartColor() {
		final String expected = "rgba(127,239,127,0.55)";
		ctx.currentResource("/content/textBanner");
		TextBanner banner = ctx.request().adaptTo(TextBanner.class);
		String actual = banner.getStartColor();
		assertEquals(expected, actual);
		
	}
	
	/**
	 * Test get end color.
	 */
	@Test
	void testGetEndColor() {
		final String expected = "rgba(127,239,127,0.55)";
		ctx.currentResource("/content/textBanner");
		TextBanner banner = ctx.request().adaptTo(TextBanner.class);
		String actual = banner.getEndColor();
		assertEquals(expected, actual);
		
	}
	
	/**
	 * Test get start color position.
	 */
	@Test
	void testGetStartColorPosition() {
		final String expected = "0";
		ctx.currentResource("/content/textBanner");
		TextBanner banner = ctx.request().adaptTo(TextBanner.class);
		String actual = banner.getStartColorPosition();
		assertEquals(expected, actual);
		
	}
	
	/**
	 * Test get start color position.
	 */
	@Test
	void testGetEndColorPosition() {
		final String expected = "100";
		ctx.currentResource("/content/textBanner");
		TextBanner banner = ctx.request().adaptTo(TextBanner.class);
		String actual = banner.getEndColorPosition();
		assertEquals(expected, actual);
		
	}
}

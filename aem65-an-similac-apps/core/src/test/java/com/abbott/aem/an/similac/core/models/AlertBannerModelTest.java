package com.abbott.aem.an.similac.core.models;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class AlertBannerModelTest {
private AemContext ctx = new AemContext();
private AlertBannerModel alertBannerModel;
    @BeforeEach
	public void setUp(AemContext context) throws Exception {
		ctx = new AemContext();
		ctx.load().json("/com/abbott/aem/an/similac/core/models/alert-banner.json", "/content");
		ctx.addModelsForClasses(AlertBannerModel.class);
		ctx.currentResource("/content/alert-banner");
		alertBannerModel = ctx.request().adaptTo(AlertBannerModel.class);
	}

	@Test
	void testGetAlertMessage() {
		final String expected = "collapsemessage";
		String actual = alertBannerModel.getAlertMessage();
		assertEquals(expected, actual);
	}

	@Test
	void testDisplayText() {
		final String expected = "displaycookieinfo";
		ctx.currentResource("/content/alert-banner");
		AlertBannerModel alertBannerModel = ctx.request().adaptTo(AlertBannerModel.class);
		String actual = alertBannerModel.getDisplayText();
		assertEquals(expected, actual);
	}
 
	@Test
	void testGetCollapseText() {
		final String expected = "collapse";
		ctx.currentResource("/content/alert-banner");
		AlertBannerModel alertBannerModel = ctx.request().adaptTo(AlertBannerModel.class);
		String actual = alertBannerModel.getCollapseText();
		assertEquals(expected, actual);
	}

	@Test
	void testGetExpandText() {
		final String expected = "expand";
		ctx.currentResource("/content/alert-banner");
		AlertBannerModel alertBannerModel = ctx.request().adaptTo(AlertBannerModel.class);
		String actual = alertBannerModel.getExpandText();
		assertEquals(expected, actual);
	}

	@Test
	void testGetButtonText() {
		final String expected = "enablecookies";
		ctx.currentResource("/content/alert-banner");
		AlertBannerModel alertBannerModel = ctx.request().adaptTo(AlertBannerModel.class);
		String actual = alertBannerModel.getButtonText();
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetgetId() {
		final String expected = "123";
		ctx.currentResource("/content/alert-banner");
		AlertBannerModel alertBannerModel = ctx.request().adaptTo(AlertBannerModel.class);
		String actual = alertBannerModel.getId();
		assertEquals(expected, actual);
	}

	@Test
	void testGetIcon() {
		final String expected = "icon";
		ctx.currentResource("/content/alert-banner");
		AlertBannerModel alertBannerModel = ctx.request().adaptTo(AlertBannerModel.class);
		String actual = alertBannerModel.getIcon();
		assertEquals(expected, actual);
	}

}

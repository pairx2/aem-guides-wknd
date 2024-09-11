package com.abbott.aem.an.division.core.components.models;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class ComparePopupTest {

	private ComparePopup comparePopup;
	private final AemContext ctx = new AemContext();

	@BeforeEach
	void setUp() {

		ctx.addModelsForClasses(ComparePopup.class);
		ctx.load().json("/com/abbott/aem/an/division/core/components/models/comparePopup.json", "/content");
		ctx.currentResource("/content/comparePopup");
		comparePopup = ctx.request().adaptTo(ComparePopup.class);
	}
	
	@Test
	void testGetCompareLabel() {
		String expected = "Compare";
		String actual = comparePopup.getCompareLabel();

		assertEquals(expected, actual);
	}

	@Test
	void testGetButtonLabel() {
		String expected = "COMPARE";
		String actual = comparePopup.getButtonLabel();

		assertEquals(expected, actual);
	}

	@Test
	void testGetCompareWidgetIcon() {
		String expected = "abt-icon abt-icon-search";
		String actual = comparePopup.getCompareWidgetIcon();

		assertEquals(expected, actual);
	}

	@Test
	void testGetButtonUrl() {
		String expected = "/content/an/abbottnutrition/us/en/our-products/product-comparison-page";
		String actual = comparePopup.getButtonUrl();

		assertEquals(expected, actual);
	}

	@Test
	void testGetRemoveAll() {
		String expected = "checked";
		String actual = comparePopup.getRemoveAll();

		assertEquals(expected, actual);
	}

	@Test
	void testGetRemoveLabel() {
		String expected = "REMOVE ALL";
		String actual = comparePopup.getRemoveLabel();

		assertEquals(expected, actual);
	}
	
	@Test
	void testGetAlertMessage() {
		String expected = "The maximum number of products that can be compared is four (4).";
		String actual = comparePopup.getAlertMessage();

		assertEquals(expected, actual);
	}
	
	@Test
	void testGetMinItems() {
		String expected = "2";
		String actual = comparePopup.getMinItems();

		assertEquals(expected, actual);
	}

	@Test
	void testGetMaxItems() {
		String expected = "4";
		String actual = comparePopup.getMaxItems();

		assertEquals(expected, actual);
	}

	@Test
	void testGetImgRemoveIcon() {
		String expected = "abt-icon abt-icon-search";
		String actual = comparePopup.getImgRemoveIcon();

		assertEquals(expected, actual);
	}
}
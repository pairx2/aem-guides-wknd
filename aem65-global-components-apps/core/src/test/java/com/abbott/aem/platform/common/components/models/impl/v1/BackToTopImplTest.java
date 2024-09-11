package com.abbott.aem.platform.common.components.models.impl.v1;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.platform.common.components.models.BackToTop;

@ExtendWith(AemContextExtension.class)
class BackToTopImplTest {

	private final AemContext ctx = new AemContext();

	@BeforeEach
	void setup() {
		ctx.addModelsForClasses(BackToTopImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/BackToTopImplTest.json", "/content");
		ctx.currentResource("/content/backtotop");
	}

	@Test
	void testGetButtonType() {
		final String expected = "textWithIcon";
		BackToTop backToTopVal = ctx.request().adaptTo(BackToTop.class);
		String actual = backToTopVal.getButtonType();
		assertEquals(expected, actual);
	}


	@Test
	void testTitle() {
		final String expected = "title";
		BackToTop backToTopVal = ctx.request().adaptTo(BackToTop.class);
		String actual = backToTopVal.getTitle();
		assertEquals(expected, actual);
	}
	@Test
	void testOnlyTextBtnTitle() {
		final String expected = "only-text-btn-title";
		BackToTop backToTopVal = ctx.request().adaptTo(BackToTop.class);
		String actual = backToTopVal.getonlyTextBtnTitle();
		assertEquals(expected, actual);
	}
	@Test
	void testIcon() {
		final String expected = "icon";
		BackToTop backToTopVal = ctx.request().adaptTo(BackToTop.class);
		String actual = backToTopVal.getIcon();
		assertEquals(expected, actual);
	}


	@Test
	void testTextOnlyIcon() {
		final String expected = "textOnlyIcon-icon";
		BackToTop backToTopVal = ctx.request().adaptTo(BackToTop.class);
		String actual = backToTopVal.gettextOnlyIcon();
		assertEquals(expected, actual);
	}

	@Test
	void testIconWithText() {
		final String expected = "iconWithText-icon";
		BackToTop backToTopVal = ctx.request().adaptTo(BackToTop.class);
		String actual = backToTopVal.geticonWithText();
		assertEquals(expected, actual);
	}
	@Test
	void testGetPosition() {
		final String expected = "inheritedTheme";
		BackToTop backToTopVal = ctx.request().adaptTo(BackToTop.class);
		String actual = backToTopVal.getPosition();
		assertEquals(expected, actual);
	}

	@Test
	void testGetScreenSize() {
		final String expected = "4";
		BackToTop backToTopVal = ctx.request().adaptTo(BackToTop.class);
		String actual = backToTopVal.getScreenSize();
		assertEquals(expected, actual);
	}


	@Test
	void testIsIconOnly() {
		final boolean expected = true;
		BackToTop backToTopVal = ctx.request().adaptTo(BackToTop.class);
		boolean actual = backToTopVal.isIconOnly();
		assertEquals(expected, actual);
	}

	@Test
	void testOnlyIconTextOnlyBtnMob() {
		final boolean expected = true;
		BackToTop backToTopVal = ctx.request().adaptTo(BackToTop.class);
		boolean actual = backToTopVal.isonlyIconTextOnlyBtnMob();
		assertEquals(expected, actual);
	}

}
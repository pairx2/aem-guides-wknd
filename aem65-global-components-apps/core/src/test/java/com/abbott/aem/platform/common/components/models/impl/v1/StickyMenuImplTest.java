package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.StickyMenu;

@ExtendWith(AemContextExtension.class)
class StickyMenuImplTest {

	private final AemContext ctx = new AemContext();
	private static final String PATH = "/content/stickyMenu";

	@BeforeEach
	public void setUp() {
		ctx.addModelsForClasses(StickyMenuImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/StickyMenuImplTest.json",
				"/content");
	}

	@Test
	void testGetHideStickyMenu() {
		final String expected = "true";
		ctx.currentResource(PATH);
		StickyMenu stickyMenu = ctx.request().adaptTo(StickyMenu.class);
		String actual = stickyMenu.getHideStickyMenu();
		assertEquals(expected, actual);
	}

	@Test
	void testGetId() {
		final String expected = "123";
		ctx.currentResource(PATH);
		StickyMenu stickyMenu = ctx.request().adaptTo(StickyMenu.class);
		String actual = stickyMenu.getId();
		assertEquals(expected, actual);
	}

}

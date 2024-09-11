package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.Logo;

import org.apache.commons.lang.StringUtils;

@ExtendWith(AemContextExtension.class)
class LogoImplTest {

	private final AemContext ctx = new AemContext();

	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(LogoImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/LogoImplTest.json", "/content/abbott");
	}

	@Test
	void testGetFileReference() {
		final String expected = "content/dam/abbott/abbott_logo.png";
		ctx.currentResource("/content/abbott/logo");
		Logo logo = ctx.request().adaptTo(Logo.class);
		String actual = logo.getFileReference();
		assertEquals(expected, actual);

		assert StringUtils.isNotBlank(logo.toString());
		Logo obj1 = new LogoImpl();
		Logo obj2 = new LogoImpl();
		assert obj1.equals(obj2);
	}

	@Test
	void testGetLogoAltText() {
		final String expected = "Abbott Logo";
		ctx.currentResource("/content/abbott/logo");
		Logo logo = ctx.request().adaptTo(Logo.class);
		String actual = logo.getLogoAltText();
		assertEquals(expected, actual);
	}

	@Test
	void testGetStickyLogoImage() {
		final String expected = "content/dam/abbott/abbott_logo.png";
		ctx.currentResource("/content/abbott/logo");
		Logo logo = ctx.request().adaptTo(Logo.class);
		String actual = logo.getStickyLogoImage();
		assertEquals(expected, actual);
	}

}

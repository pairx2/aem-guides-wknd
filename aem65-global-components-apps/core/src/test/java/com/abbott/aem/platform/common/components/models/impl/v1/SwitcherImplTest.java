package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.Switcher;

@ExtendWith(AemContextExtension.class)
class SwitcherImplTest {

	private final AemContext ctx = new AemContext();

	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(SwitcherImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/SwitcherImplTest.json", "/content");
	}

	@Test
	void testGetOnLabel() {
		final String expected = "ON";
		ctx.currentResource("/content/switcher");
		Switcher switcher = ctx.request().adaptTo(Switcher.class);
		String actual = switcher.getOnLabel();
		assertEquals(expected, actual);
	}

	@Test
	void testGetOffLabel() {
		final String expected = "OFF";
		ctx.currentResource("/content/switcher");
		Switcher switcher = ctx.request().adaptTo(Switcher.class);
		String actual = switcher.getOffLabel();
		assertEquals(expected, actual);
	}

	@Test
	void testDefaultState() {
		final String expected = "ON";
		ctx.currentResource("/content/switcher");
		Switcher switcher = ctx.request().adaptTo(Switcher.class);
		String actual = switcher.getDefaultState();
		assertEquals(expected, actual);
	}

}

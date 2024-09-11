package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.Button;

@ExtendWith(AemContextExtension.class)
class ButtonImplTest {

	private final AemContext ctx = new AemContext();

	@BeforeEach
	void setUp() throws Exception {
		ctx.addModelsForClasses(ButtonImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/ButtonImplTest.json", "/content");
		ctx.currentResource("/content/button");
	}

	@Test
	final void testGetButtonType() {
		final String expected = "withDestination";
		Button button = ctx.request().adaptTo(Button.class);
		String actual = button.getButtonType();
		assertEquals(expected, actual);
		assertEquals("alt", button.getAltText());
		assertEquals("/test", button.getImage());
	}

	@Test
	final void testGetFormBtnType() {
		final String expected = "submit";
		Button button = ctx.request().adaptTo(Button.class);
		String actual = button.getFormButtonType();
		assertEquals(expected, actual);
	}

	@Test
	final void testGetButtonName() {
		final String expected = "buttonName";
		Button button = ctx.request().adaptTo(Button.class);
		String actual = button.getButtonName();
		assertEquals(expected, actual);
	}

	@Test
	final void testDisabledButton() {
		final boolean expected = false;
		Button button = ctx.request().adaptTo(Button.class);
		boolean actual = button.isDisabledButton();
		assertEquals(expected, actual);
	}
	
	@Test
	final void testHideButtonText() {
		final boolean expected = false;
		Button button = ctx.request().adaptTo(Button.class);
		boolean actual = button.isHideButtonText();
		assertEquals(expected, actual);
	}

}

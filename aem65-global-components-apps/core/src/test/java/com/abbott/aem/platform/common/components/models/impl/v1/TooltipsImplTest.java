package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.Tooltips;

@ExtendWith(AemContextExtension.class)
class TooltipsImplTest {

	private final AemContext ctx = new AemContext();

	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(TooltipsImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/TooltipsImplTest.json", "/content");
	}

	@Test
	void testGetIsDisableTooltip() {
		final boolean expected = true;
		ctx.currentResource("/content/tooltips");
		Tooltips toolTips = ctx.request().adaptTo(Tooltips.class);
		boolean actual = toolTips.isDisableTooltip();
		assertEquals(expected, actual);
	}


	@Test
	void testGetTooltipTitle() {
		final String expected = "Test Title";
		ctx.currentResource("/content/tooltips");
		Tooltips toolTips = ctx.request().adaptTo(Tooltips.class);
		String actual = toolTips.getTooltipTitle();
		assertEquals(expected, actual);
	}

	@Test
	void testGetTooltipBody() {
		final String expected = "Test Description";
		ctx.currentResource("/content/tooltips");
		Tooltips toolTips = ctx.request().adaptTo(Tooltips.class);
		String actual = toolTips.getTooltipBody();
		assertEquals(expected, actual);
	}

	@Test
	void testGetIcon() {
		final String expected = "abt-icon abt-icon-avatar";
		ctx.currentResource("/content/tooltips");
		Tooltips toolTips = ctx.request().adaptTo(Tooltips.class);
		String actual = toolTips.getIcon();
		assertEquals(expected, actual);
	}

	@Test
	void testGetAlignment() {
		final String expected = "top";
		ctx.currentResource("/content/tooltips");
		Tooltips toolTips = ctx.request().adaptTo(Tooltips.class);
		String actual = toolTips.getAlignment();
		assertEquals(expected, actual);
	}

	@Test
	void testGetPopUpUrl() {
		final String expected = "popUpUrl";
		ctx.currentResource("/content/tooltips");
		Tooltips toolTips = ctx.request().adaptTo(Tooltips.class);
		String actual = toolTips.getPopUpUrl();
		assertEquals(expected, actual);
	}
	@Test
	void testGetAction() {
		final String expected = "action";
		ctx.currentResource("/content/tooltips");
		Tooltips toolTips = ctx.request().adaptTo(Tooltips.class);
		String actual = toolTips.getAction();
		assertEquals(expected, actual);
	}
	@Test
	void testGetSize() {
		final String expected = "size";
		ctx.currentResource("/content/tooltips");
		Tooltips toolTips = ctx.request().adaptTo(Tooltips.class);
		String actual = toolTips.getSize();
		assertEquals(expected, actual);
	}
}
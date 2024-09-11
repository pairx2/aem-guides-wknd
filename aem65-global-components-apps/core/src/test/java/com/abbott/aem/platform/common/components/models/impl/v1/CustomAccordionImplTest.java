package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.abbott.aem.platform.common.components.models.AccountNavigation;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.CustomAccordion;
import com.adobe.cq.wcm.core.components.models.Accordion;
import com.day.cq.wcm.api.Page;

@ExtendWith(AemContextExtension.class)
class CustomAccordionImplTest {

	private final AemContext ctx = new AemContext();

	Page page;

	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(CustomAccordionImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/CustomAccordionTest.json", "/content");

	}

	@Test
	void testGetCollapseTitle() {
		ctx.currentResource("/content/accordion");
		final String expected = "Collapse All";
		CustomAccordion accordion = ctx.request().adaptTo(CustomAccordion.class);
		String actual = accordion.getCollapseTitle();
		assertEquals(expected, actual);

	}

	@Test
	void testGetExpandTitle() {
		ctx.currentResource("/content/accordion");
		final String expected = "Expand All";
		CustomAccordion accordion = ctx.request().adaptTo(CustomAccordion.class);
		String actual = accordion.getExpandTitle();
		assertEquals(expected, actual);

	}

	@Test
	void testGetIconExpand() {
		ctx.currentResource("/content/accordion");
		final String expected = "abt-icon abt-icon-plus";
		CustomAccordion accordion = ctx.request().adaptTo(CustomAccordion.class);
		String actual = accordion.getIconExpand();
		assertEquals(expected, actual);

	}
	@Test
	void testGetIconCollapse() {
		ctx.currentResource("/content/accordion");
		final String expected = "abt-icon abt-icon-minus";
		CustomAccordion accordion = ctx.request().adaptTo(CustomAccordion.class);
		String actual = accordion.getIconCollapse();
		assertEquals(expected, actual);

	}

}

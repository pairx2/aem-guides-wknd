package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import com.abbott.aem.platform.common.components.models.IconCta;

@ExtendWith(AemContextExtension.class)
public class IconCtaImplTest {

	private final AemContext ctx = new AemContext();

	/**
	 * Sets up.
	 *
	 * @throws Exception the exception
	 */
	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(IconCtaImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/IconCtaImplTest.json", "/content");

	}

	

	@Test
	void testGetCtaTitle() {
		final String expected = "hello world";
		ctx.currentResource("/content/iconcta");
		IconCta iconCta = ctx.request().adaptTo(IconCta.class);
		String actual = iconCta.getTitle();
		assertEquals(expected, actual);
	}

	@Test
	void testGetId() {
		final String expected = "12345";
		ctx.currentResource("/content/iconcta");
		IconCta iconCta = ctx.request().adaptTo(IconCta.class);
		String actual = iconCta.getId();
		assertEquals(expected, actual);
	}
	
	@Test
	void testIsTopMargin() {
		final boolean expected = true;
		ctx.currentResource("/content/iconcta");
		IconCta iconCta = ctx.request().adaptTo(IconCta.class);
		boolean actual = iconCta.isTopMargin();
		assertEquals(expected, actual);
	}
	
	@Test
	void testIsBottomMargin() {
		final boolean expected = true;
		ctx.currentResource("/content/iconcta");
		IconCta iconCta = ctx.request().adaptTo(IconCta.class);
		boolean actual = iconCta.isBottomMargin();
		assertEquals(expected, actual);
	}
	@Test
	void testGetRuleColor() {
		final String expected = "blue";
		ctx.currentResource("/content/iconcta");
		IconCta iconCta = ctx.request().adaptTo(IconCta.class);
		String actual = iconCta.getRuleColor();
		assertEquals(expected, actual);
	}
	@Test
    void testIsCardAlignment() {
       final boolean expected = false;
       ctx.currentResource("/content/iconcta");
       IconCta iconcta = ctx.request().adaptTo(IconCta.class);
       boolean actual = iconcta.isCardAlignment();
       assertEquals(expected, actual);
   }
	
	
	

}
package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.LinkSet;

@ExtendWith(AemContextExtension.class)
class LinkSetTest {

	private final AemContext ctx = new AemContext();

	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(LinkSetImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/LinkSetTest.json", "/content");

	}

	@Test
	void testGetIsExternal() {
		final Boolean expected = true;
		ctx.currentResource("/content/linkset");
		LinkSet linkSet = ctx.request().adaptTo(LinkSet.class);
		Boolean actual = linkSet.isExternal();
		assertEquals(expected, actual);
	}

	@Test
	void testGetAction() {
		final String expected = "open in new window";
		ctx.currentResource("/content/linkset");
		LinkSet linkSet = ctx.request().adaptTo(LinkSet.class);
		String actual = linkSet.getAction();
		assertEquals(expected, actual);
	}

	@Test
	void testGetIcon() {
		final String expected = "icon-svg--menu";
		ctx.currentResource("/content/linkset");
		LinkSet linkSet = ctx.request().adaptTo(LinkSet.class);
		String actual = linkSet.getIcon();
		assertEquals(expected, actual);
	}

	@Test
	void testGetColor() {
		final String expected = "#001F3F";
		ctx.currentResource("/content/linkset");
		LinkSet linkSet = ctx.request().adaptTo(LinkSet.class);
		String actual = linkSet.getColor();
		assertEquals(expected, actual);
	}

	@Test
	void testGetSubtitle() {
		final String expected = "subtitle";
		ctx.currentResource("/content/linkset");
		LinkSet linkSet = ctx.request().adaptTo(LinkSet.class);
		String actual = linkSet.getSubtitle();
		assertEquals(expected, actual);
	}

}

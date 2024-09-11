package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.Link;

@ExtendWith(AemContextExtension.class)
class LinkImplTest {

	private final AemContext ctx = new AemContext();

	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(LinkImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/LinkImplTest.json", "/content");
		ctx.currentResource("/content/link");
	}

	@Test
	void testGetAction() {
		final String expected = "_blank";
		Link link = ctx.request().adaptTo(Link.class);
		String actual = link.getAction();
		assertEquals(expected, actual);

		Link obj1 = new LinkImpl();
		Link obj2 = new LinkImpl();
		assert obj1.equals(obj2);
		assert StringUtils.isNotBlank(obj1.toString());
	}

	@Test
	void testGetIsExternal() {
		final boolean expected = true;
		Link link = ctx.request().adaptTo(Link.class);
		boolean actual = link.isExternal();
		assertEquals(expected, actual);
	}

	@Test
	void testGetPopUpUrl() {
		final String expected = "/content/ef";
		Link link = ctx.request().adaptTo(Link.class);
		String actual = link.getPopUpUrl();
		assertEquals(expected, actual);
	}

	@Test
	void testGetModalIcon() {
		Link link = ctx.request().adaptTo(Link.class);
		String actual = link.getModalIcon();
		String expected = "icon_sample";
		assertEquals(expected, actual);
	}

	@Test
	void testGetModalTitle() {
		Link link = ctx.request().adaptTo(Link.class);
		String actual = link.getModalTitle();
		String expected = "Modal Title";
		assertEquals(expected, actual);
	}

}

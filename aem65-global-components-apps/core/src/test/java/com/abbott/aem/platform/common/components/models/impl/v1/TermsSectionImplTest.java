package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.TermsSection;
import com.day.cq.wcm.api.Page;

import org.apache.sling.api.resource.Resource;

@ExtendWith(AemContextExtension.class)
class TermsSectionImplTest {

	private final AemContext ctx = new AemContext();

	private Page page;

	private Resource resource;

	private TermsSection termsSection;

	@BeforeEach
	public void setUp() throws Exception {

		page = ctx.create().page("/content/abbott");
		Map<String, Object> properties = new HashMap<>();
		properties.put("sling:resourceType", "nt:unstructured");
		properties.put("symbol", "symbol");
		properties.put("content", "content");
		properties.put("termsSectionPath", "/mycontent/dam/content-fragment");
		resource = ctx.create().resource(page, "item", properties);
		termsSection = resource.adaptTo(TermsSection.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/ContentFragmentTest.json", "/mycontent");
	}

	@Test
	void testGetContent() {
		String expected = "content";
		String actual = termsSection.getContent();
		assertEquals(expected, actual);
		assertEquals("symbol", termsSection.getSymbol());
		assertEquals("/mycontent/dam/content-fragment", termsSection.getTermsSectionPath());
		assertEquals("content", termsSection.getContent());
		TermsSectionsImpl obj1 = new TermsSectionsImpl();
		TermsSectionsImpl obj2 = new TermsSectionsImpl();
		assert obj1.equals(obj2);
		assert StringUtils.isNotBlank(obj1.toString());
	}
}
package com.abbott.aem.platform.common.components.models.impl.v1;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.CustomTextItem;
import com.day.cq.wcm.api.Page;

import org.apache.sling.api.resource.Resource;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(AemContextExtension.class)
public class CustomTextItemImplTest {

	private final AemContext ctx = new AemContext();

	private CustomTextItem customTextItem;
	private Page page;
	private Resource resource;


	@BeforeEach
	public void setUp() throws Exception {
		page = ctx.create().page("/content/abbott");
		Map<String, Object> properties = new HashMap<>();
		properties.put("sling:resourceType", "nt:unstructured");
		properties.put("text", "icon");
		properties.put("listText", "QTest");
		properties.put("link", "/content/dam/abc");
		properties.put("icon", "icon");
		properties.put("external", "true");
		properties.put("redirectConfrim","false");
		Resource resource = ctx.create().resource(page, "item", properties);

		customTextItem = resource.adaptTo(CustomTextItem.class);
	}

	@Test
	void testGetLink() {
		final String expected = "/content/dam/abc";
		assertEquals(expected, customTextItem.getLink());
		assertEquals("icon", customTextItem.getIcon());
		assertTrue(customTextItem.isExternal());
		assertEquals("/content/dam/abc", customTextItem.getLink());
		assertEquals("QTest", customTextItem.getListText());
		assertEquals("icon", customTextItem.getText());
		assertFalse(customTextItem.isRedirectConfirm());
	}
}

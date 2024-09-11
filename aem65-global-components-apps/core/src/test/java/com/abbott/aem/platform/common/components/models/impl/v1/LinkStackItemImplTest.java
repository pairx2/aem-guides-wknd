package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.LinkStackItem;
import com.day.cq.wcm.api.Page;

import org.apache.sling.api.resource.Resource;

@ExtendWith(AemContextExtension.class)
public class LinkStackItemImplTest {

	private final AemContext ctx = new AemContext();

	private LinkStackItem linkStackItem;
	private Page page;
	private Resource resource;

	@BeforeEach
	public void setUp() throws Exception {
		page = ctx.create().page("/content/abbott");
		Map<String, Object> properties = new HashMap<>();
		properties.put("sling:resourceType", "nt:unstructured");
		properties.put("text", "icon");
		properties.put("action", "open in new window");
		properties.put("link", "/content/dam/abc");
		properties.put("external", "true");
		Resource resource = ctx.create().resource(page, "item", properties);
		linkStackItem = resource.adaptTo(LinkStackItem.class);
	}

	@Test
	void testGetLink() {
		final String expected = "/content/dam/abc";
		assertEquals(expected, linkStackItem.getLink());
		assertEquals("open in new window", linkStackItem.getAction());
		assertEquals("icon", linkStackItem.getText());
		assertTrue(linkStackItem.isExternal());
	}

}

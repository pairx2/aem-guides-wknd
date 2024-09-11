package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.VideoPlayListItem;
import com.day.cq.wcm.api.Page;

import org.apache.sling.api.resource.Resource;

@ExtendWith(AemContextExtension.class)
public class VideoPlayListItemImplTest {

	private final AemContext ctx = new AemContext();

	private VideoPlayListItem videoPlayListItem;
	private Page page;
	private Resource resource;

	@BeforeEach
	public void setUp() throws Exception {
		page = ctx.create().page("/content/abbott");
		Map<String, Object> properties = new HashMap<>();
		properties.put("sling:resourceType", "nt:unstructured");
		properties.put("title", "text");
		properties.put("wistiaId", "44jq2a4geg");
		properties.put("videoSrc",
				"https://media.geeksforgeeks.org/wp-content/uploads/20210314115545/sample-video.mp4");
		properties.put("videoText", "some video text");
		properties.put("buttonText", "product information");
		properties.put("buttonLink", "/content/ardx/ascertaintox/en/about0");
		properties.put("iconImage", "/content/dam/contact-us-banner-1457");
		properties.put("videoDocumentNumber", "123");

		Resource resource = ctx.create().resource(page, "item", properties);

		videoPlayListItem = resource.adaptTo(VideoPlayListItem.class);
	}

	@Test
	void testGetSectionItems() {

		assertEquals("text", videoPlayListItem.getTitle());
		assertEquals("44jq2a4geg", videoPlayListItem.getWistiaId());
		assertEquals("https://media.geeksforgeeks.org/wp-content/uploads/20210314115545/sample-video.mp4",
				videoPlayListItem.getVideoSrc());
		assertEquals("some video text", videoPlayListItem.getVideoText());
		assertEquals("product information", videoPlayListItem.getButtonText());
		assertEquals("/content/ardx/ascertaintox/en/about0", videoPlayListItem.getButtonLink());
		assertEquals("/content/dam/contact-us-banner-1457", videoPlayListItem.getIconImage());
		assertEquals("123", videoPlayListItem.getVideoDocumentNumber());
	}
}

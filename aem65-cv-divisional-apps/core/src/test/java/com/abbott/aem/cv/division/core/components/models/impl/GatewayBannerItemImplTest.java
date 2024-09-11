package com.abbott.aem.cv.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.cv.division.core.components.models.GatewayBanneritem;

import com.day.cq.wcm.api.Page;

import org.apache.sling.api.resource.Resource;

@ExtendWith(AemContextExtension.class)
public class GatewayBannerItemImplTest {
    private final AemContext ctx = new AemContext();

	private GatewayBanneritem gatewayBannerItem;
	private Page page;


	@BeforeEach
	public void setUp()  {
		page = ctx.create().page("/content/abbott");
		Map<String, Object> properties = new HashMap<>();
		properties.put("sling:resourceType", "nt:unstructured");
		properties.put("panelEyeBrow", "/content/dam/cv");
		properties.put("panelTitle", "Sample Title");
		properties.put("panelDescription", "Text Description");
		properties.put("displayPanelDescriptionOnMobile", "true");
		properties.put("cta", "url");
		properties.put("urlLink", "/content");
		properties.put("targetNewWindow", "true");
		properties.put("anchorID", "id");
		properties.put("mediaId", "f6959e3da2ff406985af4036015968b2");
		properties.put("playerId", "801826");
		properties.put("videoId", "aYBGV8ssve4");
		properties.put("assetURL", "https://qa-author1.aws-aem1.abbott.com");
		properties.put("phoneNumber", "9999999999");
		Resource resource = ctx.create().resource(page, "item", properties);
		gatewayBannerItem = resource.adaptTo(GatewayBanneritem.class);
	}

	@Test
	void testGetLink() {
		final String expected = "/content/dam/cv";
		assertEquals(expected,gatewayBannerItem.getPanelEyeBrow());
		assertEquals("Sample Title", gatewayBannerItem.getPanelTitle());
		assertEquals("Text Description", gatewayBannerItem.getPanelDescription());
        assertEquals("true", gatewayBannerItem.getDisplayPanelDescriptionOnMobile());
		assertEquals("url", gatewayBannerItem.getCta());
		assertEquals("/content.html", gatewayBannerItem.getUrlLink());
		assertEquals("true", gatewayBannerItem.getTargetNewWindow());
		assertEquals("id", gatewayBannerItem.getAnchorID());
		assertEquals("f6959e3da2ff406985af4036015968b2", gatewayBannerItem.getMediaId());
		assertEquals("801826", gatewayBannerItem.getPlayerId());
		assertEquals("aYBGV8ssve4", gatewayBannerItem.getVideoId());
		assertEquals("https://qa-author1.aws-aem1.abbott.com", gatewayBannerItem.getAssetURL());
		assertEquals("9999999999", gatewayBannerItem.getPhoneNumber());

	}
}

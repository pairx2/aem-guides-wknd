package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.HashMap;
import java.util.Map;

import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.platform.common.components.models.AssetsGalleryItem;
import com.day.cq.wcm.api.Page;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class AssetsGalleryItemImplTest {

	private final AemContext ctx = new AemContext();

	private AssetsGalleryItem AssetsGalleryItem;
	private Page page;

	@BeforeEach
	public void setUp() throws Exception {
		page = ctx.create().page("/content/abbott");
		Map<String, Object> properties = new HashMap<>();
		properties.put("jcr:primaryType", "nt:unstructured");
		properties.put("wistiaID", "44jq2a4geg");
		properties.put("altText", "WistiaVideo");
		properties.put("assetType", "wistiaVideo");
        properties.put("videoDocumentNumber", "1022121");
		properties.put("smallImage", "/content/dam/ardx/acertaintox/United-Kingdom.png");
		properties.put("largeImage", "/content/dam/ardx/MicrosoftTeams-image.png");
		
		Resource resource = ctx.create().resource(page, "item", properties);

		AssetsGalleryItem = resource.adaptTo(AssetsGalleryItem.class);
	}

	@Test
	void testGetLink() {

		assertEquals("44jq2a4geg", AssetsGalleryItem.getWistiaID());
		assertEquals("WistiaVideo", AssetsGalleryItem.getAltText());
		assertEquals("wistiaVideo", AssetsGalleryItem.getAssetType());
        assertEquals("1022121", AssetsGalleryItem.getVideoDocumentNumber());
		assertEquals("/content/dam/ardx/acertaintox/United-Kingdom.png", AssetsGalleryItem.getSmallImage());
		assertEquals("/content/dam/ardx/MicrosoftTeams-image.png", AssetsGalleryItem.getLargeImage());
		
	}


}
package com.abbott.aem.an.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.HashMap;
import java.util.Map;

import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.an.division.core.components.models.ImageVideoSliderItem;
import com.day.cq.wcm.api.Page;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class ImageVideoSliderItemImplTest {

	private final AemContext ctx = new AemContext();

	private ImageVideoSliderItem ImageVideoSliderItem;
	private Page page;

	@BeforeEach
	public void setUp() throws Exception {
		page = ctx.create().page("/content/an");
		Map<String, Object> properties = new HashMap<>();
		properties.put("jcr:primaryType", "nt:unstructured");
		properties.put("assetType", "videoUrl");
		properties.put("videoUrl", "https://www.youtube.com/embed/2-xnDccJm9Y");
		properties.put("videoTitle", "Brightcove Video");
		properties.put("altText", "VideoURL");
		properties.put("smallImage", "/content/dam/an/protalitynutrition/images/products/ENS_23-1020403_img_protality-nutrition-shake-products-mobile.jpg");
        properties.put("largeImage", "/content/dam/an/protalitynutrition/images/products/ENS_23-1020403_img_protality-advance-nutrition-shake-products-mobile.jpg");
		
		Resource resource = ctx.create().resource(page, "item", properties);

		ImageVideoSliderItem = resource.adaptTo(ImageVideoSliderItem.class);
	}
	
	@AfterEach
	void tearDown() throws Exception {
		
		ImageVideoSliderItem = null;
		page = null;
		
	}

	@Test
	void testGetLink() {
	
		assertEquals("videoUrl", ImageVideoSliderItem.getAssetType());
		assertEquals("Brightcove Video", ImageVideoSliderItem.getVideoTitle());
		assertEquals("https://www.youtube.com/embed/2-xnDccJm9Y", ImageVideoSliderItem.getVideoUrl());
		assertEquals("/content/dam/an/protalitynutrition/images/products/ENS_23-1020403_img_protality-nutrition-shake-products-mobile.jpg", ImageVideoSliderItem.getSmallImage());
		assertEquals("VideoURL", ImageVideoSliderItem.getAltText());
		assertEquals("/content/dam/an/protalitynutrition/images/products/ENS_23-1020403_img_protality-advance-nutrition-shake-products-mobile.jpg", ImageVideoSliderItem.getLargeImage());
		
	}

}
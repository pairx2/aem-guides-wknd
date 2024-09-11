package com.abbott.aem.cv.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.abbott.aem.cv.division.core.components.models.Button;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.cv.division.core.components.models.HeaderBannerItem;

import com.day.cq.wcm.api.Page;

import org.apache.sling.api.resource.Resource;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

@ExtendWith(AemContextExtension.class)
public class HeaderBannerItemImplTest {

	private final AemContext ctx = new AemContext();

	private HeaderBannerItem headerBannerItem;
	private Page page;

	@Mock
	private List<Button> mockButtonList;
	@BeforeEach
	public void setUp()  {
		page = ctx.create().page("/content/abbott");
		Map<String, Object> properties = new HashMap<>();
		properties.put("sling:resourceType", "nt:unstructured");
		properties.put("imageFileReference", "/content/dam/cv");
		properties.put("decorative", "true");
		properties.put("altText", "Alt Text");
		properties.put("title", "Sample Title");
		properties.put("titleTag", "true");
		properties.put("titleColor", "white");
		properties.put("subtitle", "Sample SubTitle");
		properties.put("subtitleTag", "true");
		properties.put("subtitleColor", "blue");
		Resource resource = ctx.create().resource(page, "item", properties);
		headerBannerItem = resource.adaptTo(HeaderBannerItem.class);
	}

	@Test
	void testGetLink() {
		final String expected = "/content/dam/cv";
		assertEquals(expected, headerBannerItem.getImageFileReference());
		assertEquals("true", headerBannerItem.getDecorative());
		assertEquals("Alt Text", headerBannerItem.getAltText());
		assertEquals("Sample Title", headerBannerItem.getTitle());
		assertEquals("true", headerBannerItem.getTitleTag());
		assertEquals("white", headerBannerItem.getTitleColor());
		assertEquals("Sample SubTitle", headerBannerItem.getSubtitle());
		assertEquals("true", headerBannerItem.getSubtitleTag());
		assertEquals("blue", headerBannerItem.getSubtitleColor());
	}

	@Test
	void testGetButtonList() {
		MockitoAnnotations.initMocks(this);
		HeaderBannerItemImpl headerBannerItem = new HeaderBannerItemImpl();
		headerBannerItem.buttonlist = mockButtonList;
		List<Button> actualButtonList = headerBannerItem.getButtonList();
		assertEquals(mockButtonList, actualButtonList);
	}
}

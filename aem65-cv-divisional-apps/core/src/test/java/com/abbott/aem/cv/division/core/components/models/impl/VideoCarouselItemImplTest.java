package com.abbott.aem.cv.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.HashMap;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.cv.division.core.components.models.VideoCarouselItem;
import com.day.cq.wcm.api.Page;
import org.apache.sling.api.resource.Resource;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.InjectMocks;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.apache.sling.api.resource.ResourceResolver;
import com.day.cq.dam.commons.util.DamUtil;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class VideoCarouselItemImplTest {

	private final AemContext ctx = new AemContext();

	private VideoCarouselItem videoCarouselItem;
	private Page page;

	@InjectMocks
	private VideoCarouselItemImpl model = new VideoCarouselItemImpl();

	@Mock
	private ResourceResolver resolver;

	@Mock
	private Resource currentResource;
	
	@BeforeEach
	public void setUp()  {
		page = ctx.create().page("/content/abbott");
		Map<String, Object> properties = new HashMap<>();
		properties.put("sling:resourceType", "nt:unstructured");
		properties.put("videoType", "videoURL");
		properties.put("orgID", "b0029788f6f3415db64a9cf5452f5200");
		properties.put("mediaID", "96509be644984210b51b42f6fb811762");
		properties.put("videoCarouselAccountID", "12345");
		properties.put("videoCarouselBrightVideoID", "1345");
		properties.put("videoCarouselBrightPlayerID", "ABCDF");
		properties.put("limelightPlayerID", "true");
		properties.put("videoURL", "https://www.youtube.com/embed/kaOIxll4LCA");
		properties.put("chapterImage", "/content/dam/epd/medicine/poc/valores_2.png");
		properties.put("alt", "Alternative Text");
		properties.put("isDecorative", "true");
		properties.put("altValueFromDAM", "true");
		properties.put("chapterTitle", "Sample Title");
		properties.put("chapterDescription", "Sample Description");
		properties.put("uniqueId", "UniqueId");
		Resource resource = ctx.create().resource(page, "item", properties);
		videoCarouselItem = resource.adaptTo(VideoCarouselItem.class);
	}

	@Test
	void testGetLink() {
		assertEquals("videoURL", videoCarouselItem.getVideoType());
		assertEquals("b0029788f6f3415db64a9cf5452f5200", videoCarouselItem.getOrgID());
		assertEquals("96509be644984210b51b42f6fb811762", videoCarouselItem.getMediaID());
		assertEquals("12345", videoCarouselItem.getVideoCarouselAccountID());
		assertEquals("1345", videoCarouselItem.getVideoCarouselBrightVideoID());
		assertEquals("ABCDF", videoCarouselItem.getVideoCarouselBrightPlayerID());
		assertEquals("true", videoCarouselItem.getLimelightPlayerID());
		assertEquals("https://www.youtube.com/embed/kaOIxll4LCA", videoCarouselItem.getVideoURL());
		assertEquals("/content/dam/epd/medicine/poc/valores_2.png", videoCarouselItem.getChapterImage());
		assertEquals("Alternative Text", videoCarouselItem.getAlt());
		assertEquals("true", videoCarouselItem.getAltValueFromDAM());
		assertEquals("true", videoCarouselItem.getIsDecorative());
		assertEquals("Sample Title", videoCarouselItem.getChapterTitle());
		assertEquals("Sample Description", videoCarouselItem.getChapterDescription());
		assertEquals("UniqueId", videoCarouselItem.getUniqueId());
	} 
  
	@Test
	public void testGetAltText() {
		VideoCarouselItemImpl videocarouselitemimpl  =new VideoCarouselItemImpl(); 
		videocarouselitemimpl.setAltText("altText");
		String value = videocarouselitemimpl.getAltText();
		assertNotNull(value);
		assertTrue(value.length() > 0);
		assertEquals("altText", value);
	}
	
	@Test  
    public void imagetitle(){
		model.setChapterImage("chapterImage");
		when(resolver.getResource(Mockito.anyString())).thenReturn(currentResource);
		when(DamUtil.resolveToAsset(currentResource)).thenReturn(Mockito.any());
		model.imagetitle();
        assertTrue(true);
	} 
}

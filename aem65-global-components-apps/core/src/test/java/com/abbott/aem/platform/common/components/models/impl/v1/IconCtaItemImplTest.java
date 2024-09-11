package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import java.util.HashMap;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import com.abbott.aem.platform.common.components.models.IconCtaItem;
import com.day.cq.wcm.api.Page;
import org.apache.sling.api.resource.Resource;

@ExtendWith(AemContextExtension.class)
public class IconCtaItemImplTest {

	private final AemContext ctx = new AemContext();

	private IconCtaItem iconCtaItem;
	private Page page;

	@BeforeEach
	public void setUp()  {
		page = ctx.create().page("/content/abbott");
		Map<String, Object> properties = new HashMap<>();
		properties.put("sling:resourceType", "nt:unstructured");
		properties.put("buttonType", "videoURL");
		properties.put("orID", "b0029788f6f3415db64a9cf5452f5200");
		properties.put("medID", "96509be644984210b51b42f6fb811762");
		properties.put("vidID", "limelight_player_1");
		properties.put("videoURL", "https://www.youtube.com/embed/kaOIxll4LCA");
		properties.put("urlImage", "/content/dam/cv/online-education-cta-icon.jpg");
		properties.put("cardTitle", "Sample Title");
		properties.put("altText", "Sample Text");
		properties.put("videoID", "5165694790001");
		properties.put("playerID", "HJSEihoR");
		properties.put("accountID", "1752604059001");
		properties.put("targetnewWindow", "true");
		properties.put("isDecorative", "true");
		properties.put("isActive", "true");
		properties.put("downloadAsset", "/content/dam/cv/computer-cta-icon (2).png");
		properties.put("phoneNumber", "8897654321");
		properties.put("emailTemplatePath", "/content/email-templates");
		properties.put("emailSubject", "text");
		properties.put("anchorName", "1234");
		properties.put("buttoncolorTheme", "red");
		properties.put("url", "https://www.cardiovascular.abbott/us/en/home.html");
		
		
		Resource resource = ctx.create().resource(page, "item", properties);
		iconCtaItem = resource.adaptTo(IconCtaItem.class);
	}

	@Test
	void testGetLink() {
		assertEquals("videoURL", iconCtaItem.getButtonType());
		assertEquals("b0029788f6f3415db64a9cf5452f5200", iconCtaItem.getOrID());
		assertEquals("96509be644984210b51b42f6fb811762", iconCtaItem.getMedID());
		assertEquals("limelight_player_1", iconCtaItem.getVidID());
		assertEquals("https://www.youtube.com/embed/kaOIxll4LCA", iconCtaItem.getVideoURL());
		assertEquals("/content/dam/cv/online-education-cta-icon.jpg", iconCtaItem.getUrlImage());
		assertEquals("Sample Title", iconCtaItem.getCardTitle());
		assertEquals("Sample Text", iconCtaItem.getAltText());
		assertEquals("8897654321", iconCtaItem.getPhoneNumber());
		assertEquals("1234", iconCtaItem.getAnchorName());
		assertEquals("/content/dam/cv/computer-cta-icon (2).png", iconCtaItem.getDownloadAsset());
		assertEquals("true", iconCtaItem.getTargetnewWindow());
		assertEquals("true", iconCtaItem.getIsDecorative());
		assertEquals("true", iconCtaItem.getIsActive());
		assertEquals("5165694790001", iconCtaItem.getVideoID());
		assertEquals("HJSEihoR", iconCtaItem.getPlayerID());
		assertEquals("1752604059001", iconCtaItem.getAccountID());
		assertEquals("red", iconCtaItem.getButtoncolorTheme());
		assertEquals("/content/email-templates",iconCtaItem.getEmailTemplatePath());
		assertEquals("text",iconCtaItem.getEmailSubject());
		assertEquals("https://www.cardiovascular.abbott/us/en/home.html", iconCtaItem.getUrl());
		
		
	}
}
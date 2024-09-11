package com.abbott.aem.an.abbottstore.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(AemContextExtension.class)
public class GsPromotionInfoTest {
    Map<String, Object> properties;
    private GsPromotionInfo gsPromotionInfo;
    String promotionTitle = "promotion title";
    String promotionTitleColor = "#ffffff";
    String promotionSubTitle = "sub title";
    String promotionSubTitleColor = "#000000";
    String promotionText = "promotion text";
    String deskTopImage = "/content/dam/desktopbanner.png";
    String mobileImage = "/content/dam/mobilebanner.png";
    String altText = "abbott";
    String disclaimerText = "disclaimer test";

    @BeforeEach
    public void setup(AemContext context)  {
        properties = new HashMap<>();
        properties.put("sling:resourceType", "abbott/components/content/gsPromotionInfo");
        properties.put("promotionTitle", promotionTitle);
        properties.put("promotionTitleColor", promotionTitleColor);
        properties.put("promotionSubTitle", promotionSubTitle);
        properties.put("promotionSubTitleColor", promotionSubTitleColor);
        properties.put("promotionText", promotionText);
        properties.put("deskTopImage", deskTopImage);
        properties.put("mobileImage", mobileImage);
        properties.put("altText", altText);
        properties.put("disclaimerText", disclaimerText);

        Resource resource = context.create().resource("/content/abbott/en", properties);
        gsPromotionInfo = resource.adaptTo(GsPromotionInfo.class);
    }

    @Test
    public void testGetPromotionTitle() {
        assertEquals(promotionTitle, gsPromotionInfo.getPromotionTitle());
    }

    @Test
    public void testGetPromotionTitleColor() {
        assertEquals(promotionTitleColor, gsPromotionInfo.getPromotionTitleColor());
    }

    @Test
    public void testGetPromotionSubTitle() {
        assertEquals(promotionSubTitle, gsPromotionInfo.getPromotionSubTitle());
    }

    @Test
    public void testGetPromotionSubTitleColor() {
        assertEquals(promotionSubTitleColor, gsPromotionInfo.getPromotionSubTitleColor());
    }

    @Test
    public void testGetPromotionText() {
        assertEquals(promotionText, gsPromotionInfo.getPromotionText());
    }

    @Test
    public void testGetDesktopImage() {
        assertEquals(deskTopImage, gsPromotionInfo.getDeskTopImage());
    }

    @Test
    public void testGetMobileImage() {
        assertEquals(mobileImage, gsPromotionInfo.getMobileImage());
    }

    @Test
    public void testGetAltText() {
        assertEquals(altText, gsPromotionInfo.getAltText());
    }

    @Test
    public void testGetDisclaimerText() {
        assertEquals(disclaimerText, gsPromotionInfo.getDisclaimerText());
    }
}

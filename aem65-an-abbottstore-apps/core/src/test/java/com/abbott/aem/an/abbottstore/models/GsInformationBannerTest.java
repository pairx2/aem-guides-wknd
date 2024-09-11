package com.abbott.aem.an.abbottstore.models;

import com.day.cq.wcm.api.Page;
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
public class GsInformationBannerTest {
    Map<String, Object> properties;
    private GsInformationBanner gsInformationBanner;
    String desktopImage = "/content/dam/desktop_banner.png";
    String mobileImage = "/content/dam/mobile_banner.png";
    String text = "Information Banner";
    String altText = "abbott";

    @BeforeEach
    public void setup(AemContext context)  {
        Page page = context.create().page("/content/abbott/en/test");
        properties = new HashMap<>();
        properties.put("sling:resourceType", "abbott/components/content/containermodel");
        properties.put("text", text);
        properties.put("altText", altText);
        properties.put("deskTopImage", desktopImage);
        properties.put("mobileImage", mobileImage);

        Resource resource = context.create().resource(page, "test", properties);
        gsInformationBanner = resource.adaptTo(GsInformationBanner.class);
    }

    @Test
    public void testGetAltText() {
        assertEquals(altText, gsInformationBanner.getAltText());
    }

    @Test
    public void testGetText() {
        assertEquals(text, gsInformationBanner.getText());
    }

    @Test
    public void testGetDesktopImage() {
        assertEquals(desktopImage, gsInformationBanner.getDeskTopImage());
    }

    @Test
    public void testGetMobileImage() {
        assertEquals(mobileImage, gsInformationBanner.getMobileImage());
    }




}

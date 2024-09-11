package com.abbott.aem.an.abbottstore.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(AemContextExtension.class)
public class GsInformationBannerModelTest {
    Map<String, Object> properties;
    private GsInformationBannerModel gsInformationBannerModel;
    String bgColor = "/content/dam/desktop_banner.png";
    String title = "/content/dam/mobile_banner.png";
    String titleColor = "Information Banner";

    @BeforeEach
    public void setup(AemContext context)  {
        properties = new HashMap<>();
        properties.put("sling:resourceType", "abbott/components/content/gsInformationModel");
        properties.put("title", title);
        properties.put("bgColor", bgColor);
        properties.put("titleColor", titleColor);
        Map<String, String> properties1 = new HashMap<>();
        properties1.put("text","test");
        properties.put("gsInfoItems",properties1);

        Resource resource = context.create().resource("/content/abbott/en", properties);
        gsInformationBannerModel = resource.adaptTo(GsInformationBannerModel.class);
    }

    @Test
    public void testGetTitle() {
        assertEquals(title, gsInformationBannerModel.getTitle());
    }

    @Test
    public void testGetBgColor() {
        assertEquals(bgColor, gsInformationBannerModel.getBgColor());
    }

    @Test
    public void testGetTitleColor() {
        assertEquals(titleColor, gsInformationBannerModel.getTitleColor());
    }

    @Test
    public void testGetTitleColor1() {
        assertEquals(0, gsInformationBannerModel.getGsInfoItemsList().size());
    }

}

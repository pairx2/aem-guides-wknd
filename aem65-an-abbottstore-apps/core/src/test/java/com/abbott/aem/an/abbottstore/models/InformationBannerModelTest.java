package com.abbott.aem.an.abbottstore.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(AemContextExtension.class)
class InformationBannerModelTest {

    InformationBannerModel informationBannerModel;
    InformationBanner informationBanner;
    AemContext context = new AemContext();
    HashMap<String, Object> properties1 = new HashMap<>();
    HashMap<String, String> properties = new HashMap<>();
    List<InformationBanner> infoBannerItems = new ArrayList<>();
    private static final String IMAGE_REF = "imageRef";
    private static final String BG_IMAGE_REF = "bgImageRef";

    @BeforeEach
    void setUp() {
        properties.put(IMAGE_REF, IMAGE_REF);
        properties.put("imgAltText", "imgAltText");
        properties.put("subTitle", "subTitle");
        properties.put("subTitleColor", "subTitleColor");
        properties.put("subDescription", "subDescription");

        Resource resource = context.create().resource("/content/en/abbott", properties);
        informationBanner = resource.adaptTo(InformationBanner.class);

        infoBannerItems.add(informationBanner);
        infoBannerItems.add(informationBanner);
        properties1.put(BG_IMAGE_REF, BG_IMAGE_REF);
        properties1.put("infoItems", infoBannerItems);
        properties1.put("infoBannerItems", infoBannerItems);

        Resource resource1 = context.create().resource("/content/en/abbott/info", properties1);
        informationBannerModel = resource1.adaptTo(InformationBannerModel.class);

    }

    @Test
    void getBgImageRef() {
        assertEquals(BG_IMAGE_REF, informationBannerModel.getBgImageRef());
    }

    @Test
    void getInfoBannerItems() {
        assertEquals(0, informationBannerModel.getInfoBannerItems().size());
    }
}
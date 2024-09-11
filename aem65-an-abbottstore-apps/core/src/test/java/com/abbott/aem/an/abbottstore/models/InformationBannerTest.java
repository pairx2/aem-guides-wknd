package com.abbott.aem.an.abbottstore.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(AemContextExtension.class)
class InformationBannerTest {

    InformationBanner informationBanner;
    HashMap<String, String> properties = new HashMap<>();
    AemContext context = new AemContext();
    private static final String IMAGE_REF = "imageRef";
    private static final String IMG_ALT_TEXT = "imgAltText";
    private static final String SUB_TITLE = "subTitle";
    private static final String SUB_TITLE_COLOR = "subTitleColor";
    private static final String SUB_DESC = "subDescription";


    @BeforeEach
    void setUp() {
        properties.put(IMAGE_REF, IMAGE_REF);
        properties.put(IMG_ALT_TEXT, IMG_ALT_TEXT);
        properties.put(SUB_TITLE, SUB_TITLE);
        properties.put(SUB_TITLE_COLOR , SUB_TITLE_COLOR);
        properties.put(SUB_DESC, SUB_DESC);

        Resource resource = context.create().resource("/content/en/abbott", properties);
        informationBanner = resource.adaptTo(InformationBanner.class);
    }

    @Test
    void getImageRef() {
        assertEquals(IMAGE_REF, informationBanner.getImageRef());
    }

    @Test
    void getImgAltText() {
        assertEquals(IMG_ALT_TEXT, informationBanner.getImgAltText());
    }

    @Test
    void getSubTitle() {
        assertEquals(SUB_TITLE, informationBanner.getSubTitle());
    }

    @Test
    void getSubTitleColor() {
        assertEquals(SUB_TITLE_COLOR, informationBanner.getSubTitleColor());
    }

    @Test
    void getSubDescription() {
        assertEquals(SUB_DESC, informationBanner.getSubDescription());

    }
}
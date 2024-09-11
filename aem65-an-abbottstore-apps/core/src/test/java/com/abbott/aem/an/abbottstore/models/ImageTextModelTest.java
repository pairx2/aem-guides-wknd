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
class ImageTextModelTest {

    ImageTextModel imageTextModel;
    AemContext context = new AemContext();
    HashMap<String, String> properties;
    private static final String IMAGE_REF = "imageRef";
    private static final String IMG_ALT_TEXT = "imgAltText";
    private static final String IMAGE_ALIGNMENT = "imageAlignment";
    private static final String BG_COLOR = "bgColor";
    private static final String TITLE = "title";
    private static final String TITLE_COLOR = "titleColor";
    private static final String TEXT = "text";
    private static final String TEXT_COLOR = "textColor";

    @BeforeEach
    void setUp() {
        properties = new HashMap<>();
        properties.put(IMAGE_REF, IMAGE_REF);
        properties.put(IMG_ALT_TEXT, IMG_ALT_TEXT);
        properties.put(IMAGE_ALIGNMENT, IMAGE_ALIGNMENT);
        properties.put(BG_COLOR, BG_COLOR);
        properties.put(TITLE, TITLE);
        properties.put(TITLE_COLOR, TITLE_COLOR);
        properties.put(TEXT, TEXT);
        properties.put(TEXT_COLOR, TEXT_COLOR);

        Resource resource = context.create().resource("/content/en/abbott", properties);
        imageTextModel = resource.adaptTo(ImageTextModel.class);
    }

    @Test
    void getImageRef() {
        assertEquals(IMAGE_REF, imageTextModel.getImageRef());
    }

    @Test
    void getImgAltText() {
        assertEquals(IMG_ALT_TEXT, imageTextModel.getImgAltText());
    }

    @Test
    void getImageAlignment() {
        assertEquals(IMAGE_ALIGNMENT, imageTextModel.getImageAlignment());
    }

    @Test
    void getBgColor() {
        assertEquals(BG_COLOR, imageTextModel.getBgColor());
    }

    @Test
    void getTitle() {
        assertEquals(TITLE, imageTextModel.getTitle());
    }

    @Test
    void getTitleColor() {
        assertEquals(TITLE_COLOR, imageTextModel.getTitleColor());
    }

    @Test
    void getText() {
        assertEquals(TEXT, imageTextModel.getText());
    }

    @Test
    void getTextColor() {
        assertEquals(TEXT_COLOR, imageTextModel.getTextColor());
    }
}
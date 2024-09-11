package com.abbott.aem.an.abbottstore.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(AemContextExtension.class)
class HorizontalRuleModelTest {

    HorizontalRuleModel horizontalRuleModel;
    AemContext context = new AemContext();
    HashMap<String, String> properties;
    private static final String MARGIN = "margin";
    private static final String PADDING = "padding";
    private static final String WIDTH = "width";
    private static final String MIN_HEIGHT = "minHeight";
    private static final String COLOR = "color";

    @BeforeEach
    void setUp() {
        properties = new HashMap<>();
        properties.put(MARGIN, MARGIN);
        properties.put(PADDING, PADDING);
        properties.put(WIDTH, WIDTH);
        properties.put(MIN_HEIGHT, MIN_HEIGHT);
        properties.put(COLOR, COLOR);
        properties.put("imagePath", "/content/dam/test.jpg");

        Resource resource = context.create().resource("/content/abbott/en", properties);
        horizontalRuleModel = resource.adaptTo(HorizontalRuleModel.class);
    }

    @Test
    void getMargin() {
        assertEquals(MARGIN, horizontalRuleModel.getMargin());
    }

    @Test
    void getPadding() {
        assertEquals(PADDING, horizontalRuleModel.getPadding());
    }

    @Test
    void getWidth() {
        assertEquals(WIDTH, horizontalRuleModel.getWidth());
    }

    @Test
    void getMinHeight() {
        assertEquals(MIN_HEIGHT, horizontalRuleModel.getMinHeight());
    }

    @Test
    void getColor() {
        assertEquals(COLOR, horizontalRuleModel.getColor());
    }

    @Test
    void getImagePath() {
        assertEquals("/content/dam/test.jpg", horizontalRuleModel.getImagePath());
    }

    @Test
    void getInlineStyles() {
        assertTrue(horizontalRuleModel.getInlineStyles().contains(MARGIN));
    }
}
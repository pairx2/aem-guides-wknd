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
class GsPromotionInfoModelTest {

    GsPromotionInfoModel gsPromotionInfoModel;
    Map<String, Object> properties;

    @BeforeEach
    void setUp(AemContext context) {
        properties = new HashMap<>();
        properties.put("bgColor", "red");
        properties.put("title", "hello");
        properties.put("titleColor", "black");
        properties.put("promotionInfoItems", "test");
        Resource resource = context.create().resource("/content/abbott/en", properties);
        gsPromotionInfoModel = resource.adaptTo(GsPromotionInfoModel.class);
    }

    @Test
    void getBgColor() {
        assertEquals("red", gsPromotionInfoModel.getBgColor());
    }

    @Test
    void getTitle() {
        assertEquals("hello", gsPromotionInfoModel.getTitle());
    }

    @Test
    void getTitleColor() {
        assertEquals("black", gsPromotionInfoModel.getTitleColor());
    }

    @Test
    void getPromotionInfoItemsList() {
        assertEquals(0, gsPromotionInfoModel.getPromotionInfoItemsList().size());
    }
}
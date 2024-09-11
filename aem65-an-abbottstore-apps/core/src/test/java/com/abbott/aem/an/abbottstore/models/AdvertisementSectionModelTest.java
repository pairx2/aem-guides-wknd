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
public class AdvertisementSectionModelTest {
    Map<String, Object> properties;
    private AdvertisementSectionModel advertisementSectionModel;

    @BeforeEach
    public void setup(AemContext context) {
        Page page = context.create().page("/content/abbott/en/test");
        properties = new HashMap<>();
        properties.put("sling:resourceType", "abbott/components/content/advertisement");
        properties.put("title", "abbott");
        properties.put("text", "Abbott Store");

        Resource resource = context.create().resource(page, "test", properties);
        advertisementSectionModel= resource.adaptTo(AdvertisementSectionModel.class);
    }

    @Test
    public void testGetTitle() {
        assertEquals("abbott", advertisementSectionModel.getTitle());
    }

    @Test
    public void testGetText() {
        assertEquals("Abbott Store", advertisementSectionModel.getText());
    }
}

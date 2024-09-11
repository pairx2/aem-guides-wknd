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
public class BrandNavigationTest {

    Map<String, Object> properties;
    private BrandNavigation brandNavigation;

    @BeforeEach
    public void setup(AemContext context)  {
        Page page = context.create().page("/content/abbott/en/test");
        properties = new HashMap<>();
        properties.put("sling:resourceType", "abbott/components/content/comparison");
        properties.put("maxItems", "10");

        Resource resource = context.create().resource(page, "test", properties);
        brandNavigation = resource.adaptTo(BrandNavigation.class);
    }

    @Test
    public void testGetMaxItems() {
        assertEquals("10", brandNavigation.getMaxItems());
    }

    @Test
    public void testGetMaxItemsList() {
        assertEquals(1, brandNavigation.getMaxItemsList().get(0));
    }


}

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
public class ComparisonTest {

    Map<String, Object> properties;
    private Comparison comparison;

    @BeforeEach
    public void setup(AemContext context)  {
        Page page = context.create().page("/content/abbott/en/test");
        properties = new HashMap<>();
        properties.put("sling:resourceType", "abbott/components/content/comparison");
        properties.put("image", "/content/dam/image1.png");
        properties.put("altText", "Alt Text");

        Resource resource = context.create().resource(page, "test", properties);
        comparison = resource.adaptTo(Comparison.class);
    }

    @Test
    public void testGetImage() {
        assertEquals("/content/dam/image1.png", comparison.getImage());
    }

    @Test
    public void testGetAltText() {
        assertEquals("Alt Text", comparison.getAltText());
    }
}

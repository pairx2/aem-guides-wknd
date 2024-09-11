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
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(AemContextExtension.class)
public class SpacingModelTest {
    Map<String, Object> properties;
    private SpacingModel spacingModel;
    String spacing = "5";
    String defaultSpacing = "3";
    String spacingTop = "2";
    String spacingBottom = "2";
    String spacingLeft = "3";
    String spacingRight = "3";

    @BeforeEach
    public void setup(AemContext context)  {
        Page page = context.create().page("/content/abbott/en/test");
        properties = new HashMap<>();
        properties.put("sling:resourceType", "abbott/components/content/spacingModel");
        properties.put("spacing", spacing);
        properties.put("defaultSpacing", defaultSpacing);
        properties.put("spacingTop", spacingTop);
        properties.put("spacingBottom", spacingBottom);
        properties.put("spacingLeft", spacingLeft);
        properties.put("spacingRight", spacingRight);

        Resource resource = context.create().resource(page, "test", properties);
        spacingModel = resource.adaptTo(SpacingModel.class);
    }

    @Test
    public void testGetSpacing() {
        assertEquals(spacing, spacingModel.getSpacing());
    }

    @Test
    public void testGetDefaultSpacing() {
        assertEquals(defaultSpacing, spacingModel.getDefaultSpacing());
    }

    @Test
    public void testGetCustomSpacing() {
        assertTrue( spacingModel.getCustomSpacing().contains(spacingTop+"rem"));
    }

}

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
public class BackgroundContainerModelTest {
    Map<String, Object> properties;
    private BackgroundContainerModel backgroundContainerModel;

    String backgroundStyle = "background style";
    String bgColor = "#000000";
    String bgImage = "/content/dam/abbott/banner.png";
    String spacing = "1";
    String id = "background-container";

    @BeforeEach
    public void setup(AemContext context) {
        Page page = context.create().page("/content/abbott/en/test");
        properties = new HashMap<>();
        properties.put("sling:resourceType", "abbott/components/content/backgroundContainer");
        properties.put("backgroundStyle", backgroundStyle);
        properties.put("bgColor", bgColor);
        properties.put("bgImage", bgImage);
        properties.put("spacing", spacing);
        properties.put("id", id);

        Resource resource = context.create().resource(page, "test", properties);
        backgroundContainerModel = resource.adaptTo(BackgroundContainerModel.class);
    }

    @Test
    public void testGetBackgroundStyle() {
        assertEquals(backgroundStyle , backgroundContainerModel.getBackgroundStyle());
    }

    @Test
    public void testGetBgColor() {
        assertEquals(bgColor , backgroundContainerModel.getBgColor());
    }

    @Test
    public void testGetBgImage() {
        assertEquals(bgImage , backgroundContainerModel.getBgImage());
    }

    @Test
    public void testGetSpacing() {
        assertEquals(spacing , backgroundContainerModel.getSpacing());
    }

    @Test
    public void testGetId() {
        assertEquals(id , backgroundContainerModel.getId());
    }
}

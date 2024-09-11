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
public class ContainerModelTest {
    Map<String, Object> properties;
    private ContainerModel containerModel;
    String id = "1234";
    String bgColor = "#ffffff";

    @BeforeEach
    public void setup(AemContext context)  {
        Page page = context.create().page("/content/abbott/en/test");
        properties = new HashMap<>();
        properties.put("sling:resourceType", "abbott/components/content/containermodel");
        properties.put("id", id);
        properties.put("bgColor", bgColor);

        Resource resource = context.create().resource(page, "test", properties);
        containerModel = resource.adaptTo(ContainerModel.class);
    }

    @Test
    public void testGetID() {
        assertEquals(id, containerModel.getId());
    }

    @Test
    public void testGetBgColor() {
        assertEquals(bgColor, containerModel.getBgColor());
    }
}
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
public class ProdListTest {
    private ProdList prodList;
    Map<String, Object> properties;
    String pagePath = "/content/abbott/en";

    @BeforeEach
    public void setup(AemContext context)  {
        Page page = context.create().page(pagePath);
        properties = new HashMap<>();
        properties.put("sling:resourceType", "abbott/components/content/containermodel");
        properties.put("pagePath", pagePath);

        Resource resource = context.create().resource(page, "test", properties);
        prodList = resource.adaptTo(ProdList.class);
    }
    @Test
    public void testGetPagePath() {
        assertEquals(pagePath, prodList.getPagePath());
    }
}

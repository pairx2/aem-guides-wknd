package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.HashMap;
import java.util.Map;

import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.platform.common.components.models.ImageMapWithStickyMenuItem;
import com.day.cq.wcm.api.Page;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class ImageMapWithStickyMenuItemImplTest {

    private final AemContext ctx = new AemContext();

    private ImageMapWithStickyMenuItem ImageMapItem;
    private Page page;

    @BeforeEach
    public void setUp() throws Exception {
        page = ctx.create().page("/content/abbott");
        Map<String, Object> properties = new HashMap<>();
        properties.put("jcr:primaryType", "nt:unstructured");
        properties.put("storyId", "Testid");
        properties.put("storyTitleDropdown", "Test Title in Dropdown");
        properties.put("storyTitle", "Test Title");
        properties.put("storyIcon", "/content/dam/ardx/acertaintox/United-Kingdom.png");
        properties.put("position", "right");
        properties.put("storyTagline", "<p>Test Tagline</p>");
        Resource resource = ctx.create().resource(page, "item", properties);

        ImageMapItem = resource.adaptTo(ImageMapWithStickyMenuItem.class);
    }

    @Test
    void testGetLink() {

        assertEquals("par-Testid", ImageMapItem.getStoryId());
        assertEquals("Test Title in Dropdown", ImageMapItem.getStoryTitleDropdown());
        assertEquals("Test Title", ImageMapItem.getStoryTitle());
        assertEquals("right", ImageMapItem.getPosition());
        assertEquals("<p>Test Tagline</p>", ImageMapItem.getStoryTagline());
        assertEquals("/content/dam/ardx/acertaintox/United-Kingdom.png", ImageMapItem.getStoryIcon());
    }
}

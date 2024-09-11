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
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(AemContextExtension.class)
public class SocialShareModelTest {
    SocialShareModel socialShareModel;
    private final AemContext context = new AemContext();
    String resourcePath = "/content/abbott/en";
    Map<String, Object> properties;
    String title = "Social Share";

    @BeforeEach
    public void setup(AemContext context)  {
        Page page = context.create().page(resourcePath);
        properties = new HashMap<>();
        properties.put("sling:resourceType", "abbott/components/content/socialshare");
        properties.put("title", title);
        Resource resource = context.create().resource(page, "test", properties);
        socialShareModel = resource.adaptTo(SocialShareModel.class);
    }

    @Test
    public void testGetTitle() {
        assert socialShareModel != null;
        assertEquals(title, socialShareModel.getTitle());
    }

    @Test
    public void testGetLinkListWithNoData() {
        assert socialShareModel != null;
        assertEquals("[]",socialShareModel.getLinkList().toString());
    }

    @Test
    public void testGetLinkListWithData() {
        context.build().resource(resourcePath).siblingsMode().resource("socialLinks");
        context.build().resource(resourcePath +"/socialLinks").siblingsMode().resource("link1");
        socialShareModel = Objects.requireNonNull(context.resourceResolver().getResource(resourcePath)).adaptTo(SocialShareModel.class);
        assert socialShareModel != null;
        assertTrue(socialShareModel.getLinkList().get(0).toString().contains("LinkModel"));
    }
}

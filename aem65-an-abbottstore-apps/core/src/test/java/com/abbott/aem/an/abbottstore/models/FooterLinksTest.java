package com.abbott.aem.an.abbottstore.models;

import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(AemContextExtension.class)
public class FooterLinksTest {
    FooterLinks footerLinks;
    private final AemContext context = new AemContext();
    String resourcePath = "/content/abbott/en";

    @Test
    public void testGetFooterListWithNoData() {
        Page page = context.create().page(resourcePath);
        Resource resource = context.create().resource(page, "test");
        footerLinks = resource.adaptTo(FooterLinks.class);
        assert footerLinks != null;
        assertEquals("[]",footerLinks.getFooterList().toString());
    }

    @Test
    public void testGetFooterList() {
        context.build().resource(resourcePath).siblingsMode().resource("footerLinks");
        context.build().resource(resourcePath +"/footerLinks").siblingsMode().resource("link1");
        footerLinks = Objects.requireNonNull(context.resourceResolver().getResource(resourcePath)).adaptTo(FooterLinks.class);
        assert footerLinks != null;
        assertTrue(footerLinks.getFooterList().get(0).toString().contains("FooterSubLinks"));
    }
}
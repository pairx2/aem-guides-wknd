package com.abbott.aem.an.abbottstore.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(AemContextExtension.class)
public class FooterSubLinksTest {
    String resourcePath = "/content/abbott/en";
    FooterSubLinks footerSubLinks;

    @BeforeEach
    public void setup(AemContext context)  {
        context.build().resource(resourcePath).siblingsMode().resource("footerLinks");
        context.build().resource(resourcePath +"/footerSubLinks").siblingsMode().resource("link1");
        footerSubLinks = Objects.requireNonNull(context.resourceResolver().getResource(resourcePath)).adaptTo(FooterSubLinks.class);
    }

    @Test
    public void testGetFooterSubList() {
        assert footerSubLinks != null;
        assertTrue(footerSubLinks.getFooterSubList().get(0).toString().contains("LinkModel"));
    }
}

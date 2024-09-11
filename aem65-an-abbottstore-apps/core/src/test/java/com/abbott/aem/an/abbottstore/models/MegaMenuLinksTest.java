package com.abbott.aem.an.abbottstore.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.jcr.Node;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class MegaMenuLinksTest {

    @InjectMocks
    MegaMenuLinks megaMenuLinks;

    AemContext context = new AemContext();

    @Mock
    Resource resource;

    @Mock
    ResourceResolver resourceResolver;

    @Mock
    Node node;

    @BeforeEach
    void setUp() {
        context.addModelsForClasses(MegaMenuLinks.class);
        context.load().json("/megaMenuLinks.json", "/content/abbott/en");
        resource = context.resourceResolver().getResource("/content/abbott/en/headerLinks");
        megaMenuLinks = resource.adaptTo(MegaMenuLinks.class);
    }

    @Test
    void getMenuItemsList() {
        Assertions.assertFalse(megaMenuLinks.getMenuItemsList().size() > 0);
    }
}
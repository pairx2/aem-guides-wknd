package com.abbott.aem.an.abbottstore.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(AemContextExtension.class)
class ListChildPageTest {

    ListChildPage listChildPage;
    AemContext context = new AemContext();
    HashMap<String,String> properties;
    private static final String TITLE = "title";

    @BeforeEach
    void setUp() {
        properties = new HashMap<>();
        properties.put(TITLE,TITLE);
        properties.put("path","path");

        Resource resource = context.create().resource("/content/en",properties);
        listChildPage = resource.adaptTo(ListChildPage.class);
    }

    @Test
    void getTitle() {
        listChildPage.setTitle(TITLE);
        assertEquals(TITLE,listChildPage.getTitle());
    }

    @Test
    void getPath() {
        listChildPage.setPath("path");
        assertEquals("path",listChildPage.getPath());
    }
}
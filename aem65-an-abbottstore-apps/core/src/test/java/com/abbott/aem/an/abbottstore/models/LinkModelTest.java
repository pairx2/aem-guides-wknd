package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.services.impl.UrlConfigServiceImpl;
import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(AemContextExtension.class)
class LinkModelTest {

    AemContext context = new AemContext();
    String Resource_type = "/content/abbott/en";
    HashMap<String, String> properties = new HashMap<>();
    MockSlingHttpServletRequest request = context.request();
    public static final String TARGET_TEXT = "target";
    public static final String LINK1_TEXT = "/link1";
    public static final String LINK2_TEXT = "/link2";
    public static final String TITLE_TEXT = "title";
    public static final String URL_PATH = "http://www.abbott.com";
    public static final String CONTENT_PATH = "/content/abbott/en.html";


    @BeforeEach
    void setUp() {
        context.registerInjectActivateService(new UrlConfigServiceImpl());
        context.load().json("/linkModel.json", Resource_type);
    }

    @Test
    void getBlankTargetMap() {
        Resource resource = context.resourceResolver().getResource(Resource_type + LINK1_TEXT);
        Page page = resource.adaptTo(Page.class);
        context.currentPage(page);
        LinkModel linkModel = request.adaptTo(LinkModel.class);
        assertEquals("_blank", linkModel.getTarget().get(TARGET_TEXT));
    }

    @Test
    void getSelfTargetMap() {
        Resource resource = context.resourceResolver().getResource(Resource_type + LINK2_TEXT);
        Page page = resource.adaptTo(Page.class);
        context.currentPage(page);
        LinkModel linkModel = request.adaptTo(LinkModel.class);
        assertEquals("_self", linkModel.getTarget().get(TARGET_TEXT));
    }

    @Test
    void getPath() {

            Resource resource = context.resourceResolver().getResource(Resource_type + LINK1_TEXT);
        Page page = resource.adaptTo(Page.class);
        context.currentPage(page);
        LinkModel linkModel = request.adaptTo(LinkModel.class);
        assertEquals(CONTENT_PATH, linkModel.getPath());
        assertEquals(true, linkModel.getIsContentPath());
    }

    @Test
    void getExternalPath() {

        Resource resource = context.resourceResolver().getResource(Resource_type + LINK2_TEXT);
        Page page = resource.adaptTo(Page.class);
        context.currentPage(page);
        LinkModel linkModel = request.adaptTo(LinkModel.class);
        assertEquals(URL_PATH, linkModel.getPath());
        assertEquals(false, linkModel.getIsContentPath());
        assertEquals(URL_PATH, linkModel.getFullPath());
    }

    @Test
    void getSocialImageUrl() {
        Resource resource = context.resourceResolver().getResource(Resource_type + LINK1_TEXT);
        Page page = resource.adaptTo(Page.class);
        context.currentPage(page);
        context.build().resource("/content/image.svg");
        LinkModel linkModel = request.adaptTo(LinkModel.class);
        assertEquals("https://dev.abbottstore.com/content/image.svg", linkModel.getSocialImageUrl());

        assertEquals("socialAltText", linkModel.getSocialAltText());

        assertEquals("linkUrl", linkModel.getLinkUrl());

        assertEquals(CONTENT_PATH, linkModel.getFullPath());

        linkModel.setTitle(TITLE_TEXT);
        assertEquals(TITLE_TEXT, linkModel.getTitle());

    }

}
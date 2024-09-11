package com.abbott.aem.an.abbottstore.models;

import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith({AemContextExtension.class})
class HeaderModelTest {

    String Resource_type = "/content/abbott/en";
    AemContext context = new AemContext();
    MockSlingHttpServletRequest request = context.request();
    private HeaderModel headerModel;

    @BeforeEach
    void setUp() {
        context.load().json("/header-data.json", Resource_type);
        Resource headerResource = context.resourceResolver().getResource(Resource_type + "/header");
        assert headerResource != null;
        Page headerPage = headerResource.adaptTo(Page.class);
        context.currentPage(headerPage);
        context.request().setAttribute("headerResourcePath", "/content/abbott/en/header");
        headerModel = request.adaptTo(HeaderModel.class);

    }

    @Test
    void getRelativeHeaderPath() {
        assertEquals("/content/abbott/en/jcr:content/header/jcr:content", headerModel.getRelativeHeaderPath());

    }

    @Test
    void isTemplatePage() {
        assertEquals(false, headerModel.isTemplatePage());
    }

    @Test
    void getHomePage() {
        assertEquals("/content/abbott/en", headerModel.getHomePage());
    }

    @Test
    void getVariationType() {
        assertEquals("test-variation", headerModel.getVariationType());
    }

    @Test
    void getBodyScripts() {
        assertEquals(null, headerModel.getBodyScripts());
    }
}
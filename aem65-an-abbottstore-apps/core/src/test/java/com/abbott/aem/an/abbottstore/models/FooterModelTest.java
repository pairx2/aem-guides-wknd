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
class FooterModelTest {

    String Resource_type = "/content/abbott/en";
    AemContext context = new AemContext();
    MockSlingHttpServletRequest request = context.request();
    private FooterModel footerModel;

    @BeforeEach
    void setUp() {
        context.load().json("/footer-data.json", Resource_type);
        Resource footerResource = context.resourceResolver().getResource(Resource_type + "/footer");
        assert footerResource != null;
        Page footerPage = footerResource.adaptTo(Page.class);
        context.currentPage(footerPage);
        context.request().setAttribute("footerResourcePath", "/content/abbott/en/footer");
        footerModel = request.adaptTo(FooterModel.class);
    }

    @Test
    void getRelativeFooterPath() {
        assertEquals("/content/abbott/en/jcr:content/footer/jcr:content", footerModel.getRelativeFooterPath());
    }

    @Test
    void isTemplatePage() {
        assertEquals(false, footerModel.isTemplatePage());
    }

    @Test
    void getVariation() {
        assertEquals("test-variation", footerModel.getVariation());
    }

    @Test
    void getDefaultVariation() {
        assertEquals("test-variation", footerModel.getVariation());
    }
}
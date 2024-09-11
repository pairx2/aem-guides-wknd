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
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(AemContextExtension.class)
class ProdListModelTest {

    ProdListModel prodListModel;
    AemContext context = new AemContext();

    @BeforeEach
    void setUp() {
        String Prod_Resource_type = "/content/abbott/en/similac/prod";
        context.load().json("/prodListModel-data.json", Prod_Resource_type);
        MockSlingHttpServletRequest servletRequest = context.request();
        Resource prodResource = context.resourceResolver().getResource(Prod_Resource_type);
        Page page = prodResource.adaptTo(Page.class);
        context.currentPage(page);
        prodListModel = servletRequest.adaptTo(ProdListModel.class);
    }

    @Test
    void getProductsList() {
        assertTrue(prodListModel.getProductsList().size() > 0);
    }

    @Test
    void getProductDetails() {
        assertTrue(prodListModel.getProductDetails().size() > 0);
    }

    @Test
    void getListType() {
        assertEquals("similac", prodListModel.getListType());
    }

    @Test
    void getBgColor() {
        assertEquals("bgColor", prodListModel.getBgColor());
    }

    @Test
    void getTitle() {
        assertEquals("title", prodListModel.getTitle());
    }

    @Test
    void getTitleColor() {
        assertEquals("titleColor", prodListModel.getTitleColor());
    }

    @Test
    void getDisclaimerText() {
        assertEquals("disclaimerText", prodListModel.getDisclaimerText());
    }
}
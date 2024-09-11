package com.abbott.aem.an.abbottstore.models;

import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(AemContextExtension.class)
class ProductListModelTest {

    ProductListModel productListModel;
    AemContext context = new AemContext();

    @BeforeEach
    void setUp() {
        String Resource_type = "/content/abbott/en/similac/prod";
        context.load().json("/prodListModel-data.json", Resource_type);
        MockSlingHttpServletRequest request = context.request();
        Resource resource = context.resourceResolver().getResource(Resource_type);

        assert resource != null;
        Page page = resource.adaptTo(Page.class);
        context.currentPage(page);

        productListModel = request.adaptTo(ProductListModel.class);
    }

    @Test
    void getProductsList() {
        assertTrue(productListModel.getProductsList().size() > 0);
    }
}
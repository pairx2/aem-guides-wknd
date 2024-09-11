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

@ExtendWith(AemContextExtension.class)
class ProductDescriptionModelTest {

    ProductDescriptionModel productDescriptionModel;
    AemContext context = new AemContext();

    @BeforeEach
    void setUp() {
        String Prod_Desc_Resource_type = "/content/abbott/en/prodDescription";
        context.load().json("/prodListModel-data.json", Prod_Desc_Resource_type);
        MockSlingHttpServletRequest request = context.request();
        Resource Prod_Desc_Resource = context.resourceResolver().getResource(Prod_Desc_Resource_type);
        Page descPage = Prod_Desc_Resource.adaptTo(Page.class);
        context.currentPage(descPage);
        productDescriptionModel = request.adaptTo(ProductDescriptionModel.class);
    }

    @Test
    void getDescription() {
        assertEquals("description of SKU", productDescriptionModel.getDescription());
    }
}
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
class FeatureProductsCarouselModelV3Test {

    FeatureProductsCarouselModelV3 featureProductsCarouselModelV3;
    AemContext context = new AemContext();

    @BeforeEach
    void setUp() {
        String Feature_Resource_type = "/content/abbott/en/similac/prod";
        context.load().json("/prodListModel-data.json", Feature_Resource_type);
        MockSlingHttpServletRequest slingHttpServletRequest = context.request();
        Resource featureResource = context.resourceResolver().getResource(Feature_Resource_type);
        assert featureResource != null;
        Page featurePage = featureResource.adaptTo(Page.class);
        context.currentPage(featurePage);
        featureProductsCarouselModelV3 = slingHttpServletRequest.adaptTo(FeatureProductsCarouselModelV3.class);
    }

    @Test
    void getProductDetails() {
        assertEquals(1, featureProductsCarouselModelV3.getProductDetails().size());
    }
}
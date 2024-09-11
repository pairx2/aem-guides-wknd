package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.services.FeatureProductService;
import com.abbott.aem.an.abbottstore.services.impl.FeatureProductServiceimpl;
import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class FeatureProductsCarouselModelTest {

    FeatureProductsCarouselModel featureProductsCarouselModel;
    AemContext context = new AemContext();

    @Mock
    FeatureProductService featureProductService;

    @BeforeEach
    void setUp() {
        context.registerService(FeatureProductService.class, featureProductService);
        context.registerInjectActivateService(new FeatureProductServiceimpl());

        String Resource_type = "/content/abbott/en/similac/prod";
        context.load().json("/prodListModel-data.json", Resource_type);
        MockSlingHttpServletRequest request = context.request();
        Resource resource = context.resourceResolver().getResource(Resource_type);

        assert resource != null;
        Page page = resource.adaptTo(Page.class);
        context.currentPage(page);
        featureProductsCarouselModel = request.adaptTo(FeatureProductsCarouselModel.class);

    }

    @Test
    void getTitle() {
        assertEquals("title", featureProductsCarouselModel.getTitle());
    }

    @Test
    void getScheduleTime() {
        assertEquals("time", featureProductsCarouselModel.getScheduleTime());
    }

    @Test
    void getProductPagePath() {
        assertEquals(1, featureProductsCarouselModel.getProductPagePath().size());
    }

    @Test
    void getProductDetails() {
        assertEquals(0, featureProductsCarouselModel.getProductDetails().size());
    }
}
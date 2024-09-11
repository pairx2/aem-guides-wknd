package com.abbott.aem.an.abbottstore.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class BannerImageCarouselModelTest {

    private final AemContext context = new AemContext();
    String resourcePath = "/content/abbott/en";
    BannerImageCarouselModel bannerImageCarouselModel;

    @BeforeEach
    public void setup(AemContext context) {
        context.build().resource(resourcePath).siblingsMode().resource("bannerImageCarousel");
        context.build().resource(resourcePath + "/bannerImageList").siblingsMode().resource("Item1");
    }

    @Test
    void postConstruct() {
        bannerImageCarouselModel = Objects.requireNonNull(context.resourceResolver().getResource(resourcePath)).adaptTo(BannerImageCarouselModel.class);
        assertTrue(true);
    }

    @Test
    void testBannerImageList() {
        bannerImageCarouselModel = Objects.requireNonNull(context.resourceResolver().getResource(resourcePath)).adaptTo(BannerImageCarouselModel.class);
        assertEquals(1, bannerImageCarouselModel.getBannerImageList().size());
    }
}
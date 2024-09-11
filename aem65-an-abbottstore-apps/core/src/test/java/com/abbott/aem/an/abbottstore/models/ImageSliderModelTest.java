package com.abbott.aem.an.abbottstore.models;

import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class ImageSliderModelTest {
    private ImageSliderModel imageSliderModel;


    @BeforeEach
    public void setup(AemContext context)  {
        String Resource_type = "/content/abbott/en";
        context.load().json("/abbott-product.json",Resource_type);
        MockSlingHttpServletRequest request = context.request();
        Resource resource = context.resourceResolver().getResource(Resource_type);
        assert resource != null;
        Page page = resource.adaptTo(Page.class);
        context.currentPage(page);
        context.build().resource("/content/dam/variation1.png");
        imageSliderModel = request.adaptTo(ImageSliderModel.class);
    }

    @Test
    public void testGetImages() {
        assertTrue(imageSliderModel.getImages().contains("variation1.png"));
    }

    @Test
    public void testGetDefaultImage() {
        String DEFAULT_IMAGE = "/content/dam/abbott/mandatory/Unavailable-Product-1300x1300.jpg";
        assertEquals(DEFAULT_IMAGE, imageSliderModel.getDefaultImage());
    }

    @Test
    public void testGetImageSliderJson() {
        assertTrue(imageSliderModel.getImgSliderJson().contains("variation1.png"));
    }

}

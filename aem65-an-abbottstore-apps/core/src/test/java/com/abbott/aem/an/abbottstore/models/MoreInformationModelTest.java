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

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class MoreInformationModelTest {

    MoreInformationModel moreInformationModel;
    AemContext context = new AemContext();

    @BeforeEach
    void setUp() {
        String Info_Resource_type = "/content/abbott/en/info";
        context.load().json("/test-data.json", Info_Resource_type);
        MockSlingHttpServletRequest httpServletRequest = context.request();
        Resource infoResource = context.resourceResolver().getResource(Info_Resource_type);
        assert infoResource != null;
        Page infoPage = infoResource.adaptTo(Page.class);
        context.currentPage(infoPage);
        moreInformationModel = httpServletRequest.adaptTo(MoreInformationModel.class);
    }

    @Test
    void getProductFlavor() {
        assertEquals("product flavor", moreInformationModel.getProductFlavor());
    }

    @Test
    void getCaseOfProduct() {
        assertEquals("case of product", moreInformationModel.getCaseOfProduct());
    }

    @Test
    void getProductForm() {
        assertEquals("product form", moreInformationModel.getProductForm());
    }

    @Test
    void getCaseOfX() {
        assertEquals("cans x", moreInformationModel.getCaseOfX());
    }

    @Test
    void getCaseOfY() {
        assertEquals("cans y", moreInformationModel.getCaseOfY());
    }

    @Test
    void getIsRush() {
        assertEquals("1", moreInformationModel.getIsRush());
    }

    @Test
    void hasMoreInformation() {
        assertEquals(true, moreInformationModel.hasMoreInformation());
    }
}
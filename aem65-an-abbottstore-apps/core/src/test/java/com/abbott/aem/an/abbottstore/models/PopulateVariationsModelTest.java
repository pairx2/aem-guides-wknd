package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.services.NutritionDataService;
import com.day.cq.search.QueryBuilder;
import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith({AemContextExtension.class})
class PopulateVariationsModelTest {

    PopulateVariationsModel populateVariationsModel;
    AemContext context = new AemContext();

    @Mock
    private QueryBuilder builder;

    @BeforeEach
    public void setup() {
        String Resource_type = "/content/abbott/en";
        context.load().json("/populateVariationsModel-data.json", Resource_type);
        MockSlingHttpServletRequest request = context.request();
        builder = context.resourceResolver().adaptTo(QueryBuilder.class);
        Resource parentResource = context.resourceResolver().getResource(Resource_type);
        Resource childResource = parentResource.getChild("populateData");
        assert childResource != null;
        Page page = childResource.adaptTo(Page.class);
        context.currentPage(page);

        populateVariationsModel = request.adaptTo(PopulateVariationsModel.class);
    }

    @Test
    void setSelectedFlavorID() {
        populateVariationsModel.setSelectedFlavorID("selectedFlavorID");
    }

    @Test
    void getSelectedSizeID() {
        populateVariationsModel.setSelectedSizeID("selectedSizeID");
        assertEquals("selectedSizeID",populateVariationsModel.getSelectedSizeID());
    }

    @Test
    void getSubscriptionID() {
        assertEquals("aw_sarp2_subscription_type",populateVariationsModel.getSubscriptionID());
    }

    @Test
    void getSelectedFlavorName() {
        //populateDataWithFlavour
    }

    @Test
    void getSelectedSizeName() {
        assertNull(populateVariationsModel.getSelectedSizeName());
    }

    @Test
    void getFlavoursValues() {
        assertEquals("choco",populateVariationsModel.getFlavoursValues().get("choco"));
    }

    @Test
    void getSizeValues() {
        assertTrue(populateVariationsModel.getSizeValues().containsKey("size"));
    }

    @Test
    void getSubscriptionMap() {
        assertEquals("week1",populateVariationsModel.getSubscriptionMap().get("week1"));
    }

    @Test
    void getDiscountMap() {
        assertEquals("discountValue",populateVariationsModel.getDiscountMap().get("discount"));
    }

    @Test
    void getFirstDiscountValue() {
        assertEquals("nt:unstructured",populateVariationsModel.getFirstDiscountValue());
    }

    @Test
    void getGlucernaProperties() {
        assertTrue(populateVariationsModel.getGlucernaProperties().containsKey("size"));
    }
}
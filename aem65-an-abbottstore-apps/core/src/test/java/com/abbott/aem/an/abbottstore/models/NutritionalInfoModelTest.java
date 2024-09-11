package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.integration.nutrition.NutritionFacts;
import com.abbott.aem.an.abbottstore.services.NutritionDataService;
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
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class NutritionalInfoModelTest {
    NutritionalInfoModel nutritionalInfoModel;

    @Mock
    NutritionDataService nutritionDataService;

    @BeforeEach
    public void setup(AemContext context)  {
        String Resource_type = "/content/abbott/en";
        context.load().json("/test-data.json",Resource_type);
        MockSlingHttpServletRequest request = context.request();

        Resource resource = context.resourceResolver().getResource(Resource_type);
        assert resource != null;
        Page page = resource.adaptTo(Page.class);
        context.currentPage(page);
        context.registerService(NutritionDataService.class,nutritionDataService);
        nutritionalInfoModel = request.adaptTo(NutritionalInfoModel.class);
    }

    @Test
    public void testHasNutritionInfo() {
        NutritionFacts nutritionFacts = new NutritionFacts();
        nutritionFacts.setProductName("ensure-max-powder");
        when(nutritionDataService.getNutritionFactsData(any())).thenReturn(nutritionFacts);
        assertEquals("ensure-max-powder", nutritionalInfoModel.getNutritionalInfo().getProductName());
    }

    @Test
    public void testGetNutritionInfo() {
        when(nutritionDataService.hasNutritionalFacts(any())).thenReturn(true);
        assertTrue(nutritionalInfoModel.hasNutrionalInfoData());
    }
}

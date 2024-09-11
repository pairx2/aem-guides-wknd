package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.services.NutritionDataService;
import com.abbott.aem.an.abbottstore.services.impl.NutritionDataServiceImpl;
import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class TabsModelTest {

    AemContext context = new AemContext();
    TabsModel tabsModel;

    @Mock
    NutritionDataService nutritionDataService;

    Map<String, List<String>> data = new HashMap<>();

    @BeforeEach
    void setUp() {
        String Resource_type = "/content/abbott/en";
        context.load().json("/tabsModel-data.json", Resource_type);
        Resource resource = context.resourceResolver().getResource(Resource_type);
        assert resource != null;
        Page page = resource.adaptTo(Page.class);
        context.currentPage(page);
        context.registerService(NutritionDataService.class, nutritionDataService);
        context.registerInjectActivateService(new NutritionDataServiceImpl());
        data.put("abbott/components/structure/page", List.of(new String[]{"sku"}));
        when(nutritionDataService.getResourceProperties()).thenReturn(data);
        tabsModel = resource.adaptTo(TabsModel.class);

    }

    @Test
    void getTabsVisibilityFlags() {
        assertEquals(1, tabsModel.getTabsVisibilityFlags().size());
    }
}
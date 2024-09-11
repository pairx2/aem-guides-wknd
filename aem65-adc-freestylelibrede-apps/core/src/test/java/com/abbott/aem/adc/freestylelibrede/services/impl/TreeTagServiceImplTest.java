package com.abbott.aem.adc.freestylelibrede.services.impl;

import com.abbott.aem.adc.freestylelibrede.models.TreeTag;
import com.abbott.aem.adc.freestylelibrede.services.TreeTagService;
import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import junit.framework.Assert;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;


import java.util.List;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class TreeTagServiceImplTest {

    private final AemContext context = new AemContext();

    private TreeTagService treeTagService = new TreeTagServiceImpl();

    @Mock
    Resource resource;

    @Test
    public void emptyPRodutCategoriesIfTagUnresolved(){
        //context.load().json("/services/TreeTagService/web-to-case-tags.json","/content/cq:tags/adcworkspace/web-to-case").adaptTo(Page.class);
        context.load().json("/services/ProductCategoryService/page.json","/content/de").adaptTo(Page.class);

        resource = context.resourceResolver().getResource("/content/de/page/jcr:content/component");
        Assert.assertNotNull(resource);

        List<TreeTag> productCategories = treeTagService.resolveTreeTags(context.resourceResolver(),resource,"/content/cq:tags/adcworkspace/web-to-case",3, true);
        Assert.assertEquals(0,productCategories.size());
    }




    @Test
    void resolveTreeTags() {
        context.load().json("/services/ProductCategoryService/web-to-case-tags.json","/content/cq:tags/adcworkspace/web-to-case").adaptTo(Page.class);
        context.load().json("/services/ProductCategoryService/page.json","/content/de").adaptTo(Page.class);

        resource = context.resourceResolver().getResource("/content/de/page/jcr:content/component");
        Assert.assertNotNull(resource);

        List<TreeTag> productCategories = treeTagService.resolveTreeTags(context.resourceResolver(),resource,"/content/cq:tags/adcworkspace/web-to-case",3, true);
        Assert.assertNotNull(productCategories);
        Assert.assertEquals(9, productCategories.size());
        Assert.assertEquals("Accessories (german)", productCategories.get(0).getLabel());
        Assert.assertEquals("Accessories", productCategories.get(0).getValue());
        Assert.assertEquals(2, productCategories.get(0).getChildren().size());
        Assert.assertEquals("Order (german)", productCategories.get(0).getChildren().get(0).getLabel());
        Assert.assertEquals("Order", productCategories.get(0).getChildren().get(0).getValue());
        Assert.assertEquals("FreeStyle Libre", productCategories.get(1).getLabel());
        Assert.assertEquals("FreeStyle Libre", productCategories.get(1).getValue());
    }
}
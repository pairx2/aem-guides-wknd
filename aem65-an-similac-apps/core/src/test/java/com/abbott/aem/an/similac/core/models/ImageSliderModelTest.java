package com.abbott.aem.an.similac.core.models;


import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.mock;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.testing.mock.sling.loader.ContentLoader;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.day.cq.dam.commons.util.DamUtil;
import com.day.cq.wcm.api.Page;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class ImageSliderModelTest {

    private static final String PRODUCT_CONTENT_JSON = "/com/abbott/aem/an/similac/core/models/product-imageslider.json";
    private static final String EMPTY_RESOURCE_CONTENT_JSON = "/com/abbott/aem/an/similac/core/models/product-imageslider.json";

    private static final String PRODUCT_CONTENT_JSON_ASSET = "/com/abbott/aem/an/similac/core/models/product-asset.json";

    private static final String PRODUCT_CONTENT_PATH = "/content";
    private static final String EMPTY_RESOURCE_PATH = "/content/empty-resource";

    private static final String PRODUCT_CONTENT_PATH_ASSET = "/content/dam/an/similac/product/baby-formula.png";

    private ImageSliderModel imageSliderModel;

    private ResourceUtil resourceUtil = mock(ResourceUtil.class);

    private AemContext context;
    
 
    private Resource pageResource;
    private Page page;
   

    @BeforeEach
    public void setUp() {
        context.load().json(PRODUCT_CONTENT_JSON, PRODUCT_CONTENT_PATH);
        context.load().json(EMPTY_RESOURCE_CONTENT_JSON, EMPTY_RESOURCE_PATH);
        context.registerService(ResourceUtil.class, resourceUtil, org.osgi.framework.Constants.SERVICE_RANKING, Integer.MAX_VALUE);

        pageResource = context.resourceResolver().getResource("/content/validImage");
        page = pageResource.adaptTo(Page.class);

        context.currentPage(page);
        context.addModelsForClasses(ImageSliderModel.class);

        final ContentLoader contentLoader = new ContentLoader(pageResource.getResourceResolver());
        contentLoader.json(PRODUCT_CONTENT_JSON_ASSET, PRODUCT_CONTENT_PATH_ASSET);

        Resource assetRecource = context.resourceResolver().resolve(PRODUCT_CONTENT_PATH_ASSET);
        DamUtil.isAsset(assetRecource);
    }


    @Test
    final void testGetImages() {
        imageSliderModel = context.request().adaptTo(ImageSliderModel.class);
        String imagesJSON = imageSliderModel.getImages();
        assertNotNull(imagesJSON);
        assertNotNull(imageSliderModel.getImgSliderJson());
        
    }

    @Test
    final void testGetImagesWhenImageNull() {
    	 pageResource = context.resourceResolver().getResource("/content/whenImageEmpty");
         page = pageResource.adaptTo(Page.class);
         context.currentPage(page);
        imageSliderModel = context.request().adaptTo(ImageSliderModel.class);
        String imagesJSON = imageSliderModel.getImages();
        assertNull(imagesJSON);
        
    }
    
    @Test
    final void testGetImagesWhenResourceNull() {
        pageResource = context.resourceResolver().getResource("/content/emptyResource");
        page = pageResource.adaptTo(Page.class);
        context.currentPage(page);
        imageSliderModel = context.request().adaptTo(ImageSliderModel.class);
        String imagesJSON = imageSliderModel.getImages();
        assertNull(imagesJSON);
        
    }


}

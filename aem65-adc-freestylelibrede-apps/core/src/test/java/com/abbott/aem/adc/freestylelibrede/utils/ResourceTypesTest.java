package com.abbott.aem.adc.freestylelibrede.utils;

import org.apache.sling.api.resource.Resource;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import com.abbott.aem.adc.freestylelibrede.models.BaseModelTest;

import static org.junit.jupiter.api.Assertions.*;

class ResourceTypesTest extends BaseModelTest {


    @Test
    void getResourceTypeName() {

        Resource resource = Mockito.mock(Resource.class);
        Mockito.when(resource.getResourceType()).thenReturn("adc/freestylelibrede/components/content/carousel");
        Assert.assertEquals("carousel",ResourceTypes.getResourceTypeName(resource));
    }

    @Test
    void getResourceTypeName_VideoCarousel() {
        Assert.assertEquals("videoCarousel",ResourceTypes.getResourceTypeName("adc/freestylelibrede/components/content/video-carousel"));
    }

    @Test
    void getResourceTypeName_ImageCarousel() {
        Assert.assertEquals("imageCarousel",ResourceTypes.getResourceTypeName("adc/freestylelibrede/components/content/image-carousel"));
    }

    @Test
    void getChildByResourceType(){

        Resource accountOverviewPageResource = context.load().json("/account-overview.json","/content/adc/account-overview");

        Resource resource = ResourceTypes.getChildByResourceType(accountOverviewPageResource,"adc/freestylelibrede/components/content/account/account-overview");

        Assert.assertEquals("/content/adc/account-overview/jcr:content/root/account_overview",resource.getPath());
    }
}


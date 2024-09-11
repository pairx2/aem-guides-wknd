package com.abbott.aem.adc.freestylelibrede.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.services.ImageService;

import java.util.HashMap;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class ImageModelTest extends BaseModelTest<ImageModel> {

    private final AemContext context = new AemContext();

    @Mock
    private ImageService imageService;


    private Resource assetResource;
    private ImageModel model;

    @BeforeEach
    void setup() {
        Map<String, String> expected = new HashMap<>();
        expected.put("xyz", "/path/to/rendition");

        Mockito.when(imageService.getRenditions(any())).thenReturn(expected);
        context.registerService(ImageService.class, imageService);
        assetResource = loadResource("/image.json", "/content/dam/adc/fsl/image.png");

    }

    @Test
    void getRenditions() {
        model = loadModel(ImageModel.class);
        Assert.assertEquals("/path/to/rendition", model.getRenditions().get("xyz"));

    }

    @Test
    void getTitle()
    {
        model = loadModel(ImageModel.class);
        Assert.assertEquals("Image Component Title", model.getTitle());
    }

    @Test
    void getTitleFromDam()
    {
        model = loadResource("/com.abbott.aem.adc.freestylelibrede.models.ImageModelFromDam.json","/content/page/component").adaptTo(ImageModel.class);

        Assert.assertEquals("Image DAM Title", model.getTitle());
    }

    @Test
    void getAltFromDam() {
        model = loadResource("/com.abbott.aem.adc.freestylelibrede.models.ImageModelFromDam.json","/content/page/component").adaptTo(ImageModel.class);

        Assert.assertEquals("Image DAM Alt Text", model.getAlt());
    }

    @Test
    void getAlt() {
        model = loadModel(ImageModel.class);
        Assert.assertEquals("Image Component Alt Text", model.getAlt());
    }

    @Test
    void isDecorative() {
        model = loadModel(ImageModel.class);
        Assert.assertTrue(model.isDecorative());
    }
}
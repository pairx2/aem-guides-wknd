package com.abbott.aem.adc.freestylelibrede.services.impl;

import com.abbott.aem.adc.freestylelibrede.services.ImageService;
import com.day.cq.dam.api.Asset;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.hamcrest.MatcherAssert.assertThat;
import org.hamcrest.collection.IsMapContaining;
import java.util.Map;


@ExtendWith(AemContextExtension.class)
class ImageServiceImplTest {

    private final AemContext context = new AemContext();

    ImageService imageService = new ImageServiceImpl();

    @Test
    void getRenditions() {


        Resource resource = context.load().json("/image.json", "/content/dam/adc/fsl/image.png");
        Asset asset = resource.adaptTo(Asset.class);


        Map<String, String> actualRenditions = imageService.getRenditions(asset);


        assertThat(actualRenditions, IsMapContaining.hasEntry("original", "/content/dam/adc/fsl/image.png/jcr:content/renditions/original"));
        assertThat(actualRenditions, IsMapContaining.hasEntry("1280_1280", "/content/dam/adc/fsl/image.png/jcr:content/renditions/cq5dam.web.1280.1280.jpeg"));
        assertThat(actualRenditions, IsMapContaining.hasEntry("48_48", "/content/dam/adc/fsl/image.png/jcr:content/renditions/cq5dam.thumbnail.48.48.png"));
        assertThat(actualRenditions, IsMapContaining.hasEntry("319_319", "/content/dam/adc/fsl/image.png/jcr:content/renditions/cq5dam.thumbnail.319.319.png"));
        assertThat(actualRenditions, IsMapContaining.hasEntry("140_100", "/content/dam/adc/fsl/image.png/jcr:content/renditions/cq5dam.thumbnail.140.100.png"));

    }
}
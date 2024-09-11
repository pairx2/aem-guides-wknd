package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.services.impl.UrlConfigServiceImpl;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(AemContextExtension.class)
public class ImageModelTest {
    Map<String, Object> properties;
    private ImageModel imageModel;
    String imgAltText = "Al Text";
    String imageLink = "/content/dam/banner.png";
    String fileReferenceImage = "/content/dam/reference.png";
    Boolean imgLinkTarget = true;
    String AEM_SERVER = "https://dev.abbottstore.com";

    @BeforeEach
    public void setup(AemContext context)  {
        context.registerInjectActivateService(new UrlConfigServiceImpl());
        properties = new HashMap<>();
        properties.put("sling:resourceType", "abbott/components/content/gsInformationModel");
        properties.put("imgAltText", imgAltText);
        properties.put("imageLink", imageLink);
        properties.put("fileReferenceImage", fileReferenceImage);
        properties.put("imgLinkTarget", imgLinkTarget);
        Resource resource = context.create().resource("/content/abbott/en", properties);
        context.build().resource(imageLink);
        context.build().resource(fileReferenceImage);
        imageModel = resource.adaptTo(ImageModel.class);
    }

    @Test
    public void testGetAltText() {
        assertEquals(imgAltText, imageModel.getImgAltText());
    }

    @Test
    public void testGetImageLink() {
        assertEquals(AEM_SERVER+imageLink, imageModel.getImageLink());
    }

    @Test
    public void testGetFileReferenceImage() {
        assertEquals(AEM_SERVER+fileReferenceImage, imageModel.getFileReferenceImage());
    }

    @Test
    public void testGetImgLinkTarget() {
        assertEquals(imgLinkTarget, imageModel.getImgLinkTarget());
    }
}

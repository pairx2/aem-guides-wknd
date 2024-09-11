package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.services.impl.UrlConfigServiceImpl;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class})
public class BannerImageTest {
    Map<String, Object> properties;
    private BannerImage bannerImage;
    String bannerType = "homepage";
    String deskTopImageRef = "/content/dam/banner_desktop.png";
    String tabImageRef = "/content/dam/banner_tab.png";
    String mobileImageRef = "/content/dam/banner_mobile.png";
    String imgAltText = "banner image";
    String imageLink = "/content/dam/banner.png";
    String imgLinkTarget = "#";
    String gsImageRef = "1234";
    String gsImgAltText = "1234";
    String gsTitleText1 = "1234";
    String gsTitleText2 = "1234";
    String gsTitleColor = "1234";
    String gsText = "1234";
    String buttonLabel = "1234";
    String buttonLink = "1234";
    String gsNoteText = "1234";
    String gsNoteTextColor = "1234";
    String AEM_SERVER = "https://dev.abbottstore.com";

    @BeforeEach
    public void setup(AemContext context)  {
        context.registerInjectActivateService(new UrlConfigServiceImpl());
        context.build().resource(deskTopImageRef);
        context.build().resource(mobileImageRef);
        context.build().resource(tabImageRef);
        context.build().resource(imageLink);

        properties = new HashMap<>();
        properties.put("sling:resourceType", "abbott/components/content/bannerimage");
        properties.put("bannerType", bannerType);
        properties.put("deskTopImageRef", deskTopImageRef);
        properties.put("tabImageRef", tabImageRef);
        properties.put("mobileImageRef", mobileImageRef);
        properties.put("gsImageRef", gsImageRef);
        properties.put("imgLinkTarget", imgLinkTarget);
        properties.put("imageLink", imageLink);
        properties.put("imgAltText", imgAltText);
        properties.put("gsNoteTextColor", gsNoteTextColor);
        properties.put("gsNoteText", gsNoteText);
        properties.put("buttonLink", buttonLink);
        properties.put("buttonLabel", buttonLabel);
        properties.put("gsText", gsText);
        properties.put("gsTitleColor", gsTitleColor);
        properties.put("gsTitleText2", gsTitleText2);
        properties.put("gsTitleText1", gsTitleText1);
        properties.put("gsImgAltText", gsImgAltText);
        Resource resource = context.create().resource("/content/abbott/en", properties);

        bannerImage = resource.adaptTo(BannerImage.class);
    }

    @Test
    public void testGetDesktopImageRef() {
        assertEquals(deskTopImageRef, bannerImage.getDeskTopImageRef());
    }

    @Test
    public void testGetTabImageRef() {
        assertEquals(tabImageRef, bannerImage.getTabImageRef());
    }

    @Test
    public void testGetMobileImageRef() {
        assertEquals(mobileImageRef, bannerImage.getMobileImageRef());
    }

    @Test
    public void testGetImgAltText() {
        assertEquals(imgAltText, bannerImage.getImgAltText());
    }

    @Test
    public void testGetImageLink() {
        assertEquals(AEM_SERVER+imageLink, bannerImage.getImageLink());
    }

    @Test
    public void testGetImgLinkTarget() {
        assertEquals(imgLinkTarget, bannerImage.getImgLinkTarget());
    }

    @Test
    public void testGetBannerType() {
        assertEquals(bannerType, bannerImage.getBannerType());
    }

    @Test
    public void testGsImageText() {
        assertEquals(gsImageRef, bannerImage.getGsImageRef());
    }

    @Test
    public void testGetGsImageAltText() {
        assertEquals(gsImgAltText, bannerImage.getGsImgAltText());
    }

    @Test
    public void testGsTitleText1() {
        assertEquals(gsTitleText1, bannerImage.getGsTitleText1());
    }

    @Test
    public void testGsTitleText2() {
        assertEquals(gsTitleText2, bannerImage.getGsTitleText2());
    }

    @Test
    public void testGsTitleColor() {
        assertEquals(gsTitleColor, bannerImage.getGsTitleColor());
    }

    @Test
    public void testGetGsText() {
        assertEquals(gsText, bannerImage.getGsText());
    }

    @Test
    public void testGetButtonLabel() {
        assertEquals(buttonLabel, bannerImage.getButtonLabel());
    }

    @Test
    public void testGetButtonLink() {
        assertEquals(buttonLink, bannerImage.getButtonLink());
    }

    @Test
    public void testGsNoteText() {
        assertEquals(gsNoteText, bannerImage.getGsNoteText());
    }

    @Test
    public void testGsNoteTextColor() {
        assertEquals(gsNoteTextColor, bannerImage.getGsNoteTextColor());
    }
}

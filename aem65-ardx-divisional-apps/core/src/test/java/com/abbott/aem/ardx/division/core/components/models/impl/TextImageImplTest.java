package com.abbott.aem.ardx.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import com.abbott.aem.ardx.division.core.components.models.TextImage;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith(AemContextExtension.class)
class TextImageImplTest {

    private final AemContext ctx = new AemContext();
    private static final String PATH = "/content/TextImage";

    @BeforeEach
    public void setUp() {
        ctx.addModelsForClasses(TextImage.class);
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/TextImageImplTest.json", "/content");
    }

    @Test
    void getImagePath() {
        final String expected = "/content/dam/ardx/sv/Solutions-Icons-globe-88.png";
        ctx.currentResource(PATH);
        TextImage textimage = ctx.request().adaptTo(TextImage.class);
        String actual = textimage.getImageAsset();
        assertEquals(expected, actual);
    }
    
    @Test
    void getTabletImage() {
        final String expected = "/content/dam/ardx/sv/Solutions-Icons-globe-88.png";
        ctx.currentResource(PATH);
        TextImage textimage = ctx.request().adaptTo(TextImage.class);
        String actual = textimage.getTabletImage();
        assertEquals(expected, actual);
    }
    
    @Test
    void getMobileImage() {
        final String expected = "/content/dam/ardx/sv/Solutions-Icons-globe-88.png";
        ctx.currentResource(PATH);
        TextImage textimage = ctx.request().adaptTo(TextImage.class);
        String actual = textimage.getMobileImage();
        assertEquals(expected, actual);
    }
    
    @Test
    void getNoWrapUpText() {
        final String expected = "true";
        ctx.currentResource(PATH);
        TextImage textImage = ctx.request().adaptTo(TextImage.class);
        String actual = textImage.getNoWrapUpText();
        assertEquals(expected, actual);
    }
    
    
    @Test
    void getDecorative() {
        final String expected = "true";
        ctx.currentResource(PATH);
        TextImage textImage = ctx.request().adaptTo(TextImage.class);
        String actual = textImage.getDecorative();
        assertEquals(expected, actual);
    }

    @Test
    void getAltText() {
        final String expected = "AltText";
        ctx.currentResource(PATH);
        TextImage textimage = ctx.request().adaptTo(TextImage.class);
        String actual = textimage.getAltText();
        assertEquals(expected, actual);
    }

    @Test
    void getImageTitle() {
        final String expected = "ImageTitle";
        ctx.currentResource(PATH);
        TextImage textimage = ctx.request().adaptTo(TextImage.class);
        String actual = textimage.getImageTitle();
        assertEquals(expected, actual);
    }
    
    @Test
    void getImageCta() {
        final String expected = "none";
        ctx.currentResource(PATH);
        TextImage textImage = ctx.request().adaptTo(TextImage.class);
        String actual = textImage.getImageCta();
        assertEquals(expected, actual);
    }

    @Test
    void getTargetUrl() {
        final String expected = "/content/ardx";
        ctx.currentResource(PATH);
        TextImage textImage = ctx.request().adaptTo(TextImage.class);
        String actual = textImage.getTargetUrl();
        assertEquals(expected, actual);
    }

    @Test
    void getTargetUrlNewWindow() {
        final String expected = "true";
        ctx.currentResource(PATH);
        TextImage textImage = ctx.request().adaptTo(TextImage.class);
        String actual = textImage.getTargetUrlNewWindow();
        assertEquals(expected, actual);
    }
 
    @Test
    void getImageAlignment() {
        final String expected = "image--alignment-left";
        ctx.currentResource(PATH);
        TextImage textimage = ctx.request().adaptTo(TextImage.class);
        String actual = textimage.getImageAlignment();
        assertEquals(expected, actual);
    }
    
    @Test
    void getFullScreenPopup() {
        final String expected = "true";
        ctx.currentResource(PATH);
        TextImage textImage = ctx.request().adaptTo(TextImage.class);
        String actual = textImage.getFullScreenPopup();
        assertEquals(expected, actual);
    }
    
    @Test
    void getImagePlacement() {
        final String expected = "position-left";
        ctx.currentResource(PATH);
        TextImage textimage = ctx.request().adaptTo(TextImage.class);
        String actual = textimage.getImagePlacement();
        assertEquals(expected, actual);
    }

    @Test
    void getText() {
        final String expected = "Testing";
        ctx.currentResource(PATH);
        TextImage textimage = ctx.request().adaptTo(TextImage.class);
        String actual = textimage.getText();
        assertEquals(expected, actual);
    }
    
    @Test
    void getFullWidthImage() {
        final String expected = "false";
        ctx.currentResource(PATH);
        TextImage textimage = ctx.request().adaptTo(TextImage.class);
        String actual = textimage.getFullWidthImage();
        assertEquals(expected, actual);
    }

}

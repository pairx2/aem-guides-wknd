package com.abbott.aem.corp.division.core.components.models.impl;

import com.abbott.aem.corp.division.core.components.models.Image;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(AemContextExtension.class)
class ImageImplTest {
    private static final String PATH = "/content/image";
    private final AemContext ctx = new AemContext();

    /**
     * Runs before every test to set the initial things, like loading json, ect
     */
    @BeforeEach
    void setUp() {
        ctx.addModelsForClasses(ImageImpl.class);
        ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/ImageImplTest.json", "/content");
    }

    /**
     * Test for Text Over Image field value
     */
    @Test
    void testGetTextOverImage() {
        ctx.currentResource(ImageImplTest.PATH);
        Image image = ctx.request().adaptTo(Image.class);
        assertEquals("Test Text", image.getTextOverImage());
    }

    /**
     * Test for Hover Text field value
     */
    @Test
    void testGetHoverText() {
        ctx.currentResource(ImageImplTest.PATH);
        Image image = ctx.request().adaptTo(Image.class);
        assertEquals("Read more", image.getHoverText());
    }

    /**
     * Test for Text position field value
     */
    @Test
    void testGetTextPosition() {
        ctx.currentResource(ImageImplTest.PATH);
        Image image = ctx.request().adaptTo(Image.class);
        assertEquals("center", image.getTextPosition());
    }

    /**
     * Test for Back Border field value
     */
    @Test
    void testGetBackBorder() {
        ctx.currentResource(ImageImplTest.PATH);
        Image image = ctx.request().adaptTo(Image.class);
        assertEquals("yes", image.getBackBorder());
    }

    /**
     * Test for Text Color field value
     */
    @Test
    void testGetTextColor() {
        ctx.currentResource(ImageImplTest.PATH);
        Image image = ctx.request().adaptTo(Image.class);
        assertEquals("text-color--yellow", image.getTextColor());
    }

    /**
     * Test for Zoom Overlay Effect field value
     */
    @Test
    void testGetZoomOverlay() {
        ctx.currentResource(ImageImplTest.PATH);
        Image image = ctx.request().adaptTo(Image.class);
        assertEquals("yes", image.getZoomOverlay());
    }

    /**
     * Test for Image Overlay Effect field value
     */
    @Test
    void testGetImageOverlay() {
        ctx.currentResource(ImageImplTest.PATH);
        Image image = ctx.request().adaptTo(Image.class);
        assertEquals("yes", image.getImageOverlay());
    }

    /**
     * Test for Hover Text Color field value
     */
    @Test
    void testGetHoverTextColor() {
        ctx.currentResource(ImageImplTest.PATH);
        Image image = ctx.request().adaptTo(Image.class);
        assertEquals("image-text--hover-heading-yellow", image.getHoverTextColor());
    }

    /**
     * Test for Mobile Image field value
     */
    @Test
    void testGetMobileImage() {
        ctx.currentResource(ImageImplTest.PATH);
        Image image = ctx.request().adaptTo(Image.class);
        assertEquals("yes", image.getMobileImage());
    }
}

package com.abbott.aem.cv.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.cv.division.core.components.models.Button;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.factory.ModelFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith(AemContextExtension.class)
class ButtonImplTest {

    private final AemContext ctx = new AemContext();
    private static final String PATH = "/content/Button";

    @BeforeEach
    public void setUp() {
        ctx.addModelsForClasses(Button.class );
        ctx.load().json("/com/abbott/aem/cv/division/core/components/models/impl/ButtonImplTest.json", "/content");
    }

    @Test
    void testGetButtonType() {
        final String expected = "url";
        Resource myResource = ctx.resourceResolver().getResource(PATH);
        Button button = ctx.getService(ModelFactory.class).createModel(myResource, Button.class);
        String actual = StringUtils.EMPTY;
        if (button != null) {
            actual = button.getButtonType();
        }
        assertEquals(expected, actual);
    }

    @Test
    void testGetButtonText() {
        final String expected = "URL";
        Resource myResource = ctx.resourceResolver().getResource(PATH);
        Button button = ctx.getService(ModelFactory.class).createModel(myResource, Button.class);
        String actual = StringUtils.EMPTY;
        if (button != null) {
            actual = button.getButtonText();
        }
        assertEquals(expected, actual);

    }

    @Test
    void testGetButtonColor() {
        final String expected = "dark-blue";
        Resource myResource = ctx.resourceResolver().getResource(PATH);
        Button button = ctx.getService(ModelFactory.class).createModel(myResource, Button.class);
        String actual = StringUtils.EMPTY;
        if (button != null) {
            actual = button.getButtonColor();
        }
        assertEquals(expected, actual);

    }

    @Test
    void testGetUrlLink() {
        final String expected = "https://www.abbott.co.in/";
        Resource myResource = ctx.resourceResolver().getResource(PATH);
        Button button = ctx.getService(ModelFactory.class).createModel(myResource, Button.class);
        String actual = StringUtils.EMPTY;
        if (button != null) {
            actual = button.getUrlLink();
        }
        assertEquals(expected, actual);
    }

    @Test
    void testTargetNewWindow() {
        final String expected = "true";
        Resource myResource = ctx.resourceResolver().getResource(PATH);
        Button button = ctx.getService(ModelFactory.class).createModel(myResource, Button.class);
        String actual = StringUtils.EMPTY;
        if (button != null) {
            actual = button.getTargetNewWindow();
        }
        assertEquals(expected, actual);

    }

    @Test
    void testAnchorName() {
        final String expected = "anchor";
        Resource myResource = ctx.resourceResolver().getResource(PATH);
        Button button = ctx.getService(ModelFactory.class).createModel(myResource, Button.class);
        String actual = StringUtils.EMPTY;
        if (button != null) {
            actual = button.getAnchorName();
        }
        assertEquals(expected, actual);

    }

    @Test
    void testGetMediaId() {
        final String expected = "f6959e3da2ff406985af4036015968b2";
        Resource myResource = ctx.resourceResolver().getResource(PATH);
        Button button = ctx.getService(ModelFactory.class).createModel(myResource, Button.class);
        String actual = StringUtils.EMPTY;
        if (button != null) {
            actual = button.getMediaId();
        }
        assertEquals(expected, actual);
    }

    @Test
    void testGetPlayerId() {
        final String expected = "801826";
        Resource myResource = ctx.resourceResolver().getResource(PATH);
        Button button = ctx.getService(ModelFactory.class).createModel(myResource, Button.class);
        String actual = StringUtils.EMPTY;
        if (button != null) {
            actual = button.getPlayerId();
        }
        assertEquals(expected, actual);

    }

    @Test
    void testGetVideoId() {
        final String expected = "aYBGV8ssve4";
        Resource myResource = ctx.resourceResolver().getResource(PATH);
        Button button = ctx.getService(ModelFactory.class).createModel(myResource, Button.class);
        String actual = StringUtils.EMPTY;
        if (button != null) {
            actual = button.getVideoId();
        }
        assertEquals(expected, actual);
    }

    @Test
    void testGetPhoneNumber() {
        final String expected = "9999999999";
        Resource myResource = ctx.resourceResolver().getResource(PATH);
        Button button = ctx.getService(ModelFactory.class).createModel(myResource, Button.class);
        String actual = StringUtils.EMPTY;
        if (button != null) {
            actual = button.getPhoneNumber();
        }
        assertEquals(expected, actual);
    }

    @Test
    void testGetAssetLink() {
        final String expected = "https://qa-author1.aws-aem1.abbott.com/content/dam/ALFA-ROMEO-4C-0.jpg";
        Resource myResource = ctx.resourceResolver().getResource(PATH);
        Button button = ctx.getService(ModelFactory.class).createModel(myResource, Button.class);
        String actual = StringUtils.EMPTY;
        if (button != null) {
            actual = button.getAssetLink();
        }
        assertEquals(expected, actual);
    }

    
    @Test
    void testGetBrightPlayerID() {
        final String expected = "1234556";
        Resource myResource = ctx.resourceResolver().getResource(PATH);
        Button button = ctx.getService(ModelFactory.class).createModel(myResource, Button.class);
        String actual = StringUtils.EMPTY;
        if (button != null) {
            actual = button.getBrightPlayerID();
        }
        assertEquals(expected, actual);
    }

    @Test
    void testGetBrightVideoID() {
        final String expected = "9878787";
        Resource myResource = ctx.resourceResolver().getResource(PATH);
        Button button = ctx.getService(ModelFactory.class).createModel(myResource, Button.class);
        String actual = StringUtils.EMPTY;
        if (button != null) {
            actual = button.getBrightVideoID();
        }
        assertEquals(expected, actual);
    }

    @Test
    void testGetAccountID() {
        final String expected = "5675767";
        Resource myResource = ctx.resourceResolver().getResource(PATH);
        Button button = ctx.getService(ModelFactory.class).createModel(myResource, Button.class);
        String actual = StringUtils.EMPTY;
        if (button != null) {
            actual = button.getAccountID();
        }
        assertEquals(expected, actual);
    }



}
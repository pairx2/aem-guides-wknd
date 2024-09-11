package com.abbott.aem.cv.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import com.abbott.aem.cv.division.core.components.models.TextImage;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import com.abbott.aem.cv.division.core.components.models.Button;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.Collections;
import java.util.List;


@ExtendWith(AemContextExtension.class)
class TextImageImplTest {

    private final AemContext ctx = new AemContext();
    private static final String PATH = "/content/TextImage";

    @Mock
    private List<Button> mockButtonList;

    @BeforeEach
    public void setUp() {
        ctx.addModelsForClasses(TextImage.class);
        ctx.load().json("/com/abbott/aem/cv/division/core/components/models/impl/TextImageImplTest.json", "/content");
    }

    @Test
    void getTopRule() {
        final String expected = "true";
        ctx.currentResource(PATH);
        TextImage textimage = ctx.request().adaptTo(TextImage.class);
        String actual = textimage.getTopRule();
        assertEquals(expected, actual);
    }

    @Test
    void getBottomRule() {
        final String expected = "false";
        ctx.currentResource(PATH);
        TextImage textimage = ctx.request().adaptTo(TextImage.class);
        String actual = textimage.getBottomRule();
        assertEquals(expected, actual);
    }

    @Test
    void getRuleColor() {
        final String expected = "abbott-primary-blue";
        ctx.currentResource(PATH);
        TextImage textimage = ctx.request().adaptTo(TextImage.class);
        String actual = textimage.getRuleColor();
        assertEquals(expected, actual);
    }

    @Test
    void getTopMargin() {
        final String expected = "false";
        ctx.currentResource(PATH);
        TextImage textimage = ctx.request().adaptTo(TextImage.class);
        String actual = textimage.getTopMargin();
        assertEquals(expected, actual);
    }

    @Test
    void getBottomMargin() {
        final String expected = "true";
        ctx.currentResource(PATH);
        TextImage textimage = ctx.request().adaptTo(TextImage.class);
        String actual = textimage.getBottomMargin();
        assertEquals(expected, actual);
    }

    @Test
    void getImageMargin() {
        final String expected = "m-std";
        ctx.currentResource(PATH);
        TextImage textimage = ctx.request().adaptTo(TextImage.class);
        String actual = textimage.getImageMargin();
        assertEquals(expected, actual);
    }

    @Test
    void getTopImageMargin() {
        final String expected = "topImageMarginZero";
        ctx.currentResource(PATH);
        TextImage textimage = ctx.request().adaptTo(TextImage.class);
        String actual = textimage.getTopImageMargin();
        assertEquals(expected, actual);
    }

    @Test
    void getBottomImageMargin() {
        final String expected = "bottomImageMarginLarge";
        ctx.currentResource(PATH);
        TextImage textimage = ctx.request().adaptTo(TextImage.class);
        String actual = textimage.getBottomImageMargin();
        assertEquals(expected, actual);
    }

    @Test
    void getLeftImageMargin() {
        final String expected = "leftImageMarginSmall";
        ctx.currentResource(PATH);
        TextImage textimage = ctx.request().adaptTo(TextImage.class);
        String actual = textimage.getLeftImageMargin();
        assertEquals(expected, actual);
    }

    @Test
    void getRightImageMargin() {
        final String expected = "rightImageMarginLarge";
        ctx.currentResource(PATH);
        TextImage textimage = ctx.request().adaptTo(TextImage.class);
        String actual = textimage.getRightImageMargin();
        assertEquals(expected, actual);
    }

    @Test
    void getImagePath() {
        final String expected = "/content/dam/an";
        ctx.currentResource(PATH);
        TextImage textimage = ctx.request().adaptTo(TextImage.class);
        String actual = textimage.getImagePath();
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
    void getCaption() {
        final String expected = "caption";
        ctx.currentResource(PATH);
        TextImage textimage = ctx.request().adaptTo(TextImage.class);
        String actual = textimage.getCaption();
        assertEquals(expected, actual);
    }

    @Test
    void getImagePlacement() {
        final String expected = "right";
        ctx.currentResource(PATH);
        TextImage textimage = ctx.request().adaptTo(TextImage.class);
        String actual = textimage.getImagePlacement();
        assertEquals(expected, actual);
    }

    @Test
    void getImageAlignment() {
        final String expected = "left";
        ctx.currentResource(PATH);
        TextImage textimage = ctx.request().adaptTo(TextImage.class);
        String actual = textimage.getImageAlignment();
        assertEquals(expected, actual);
    }

    @Test
    void getTelePhoneNumber() {
        final String expected = "789789789";
        ctx.currentResource(PATH);
        TextImage textimage = ctx.request().adaptTo(TextImage.class);
        String actual = textimage.getTelePhoneNumber();
        assertEquals(expected, actual);
    }

    @Test
    void getCaptionPlacement() {
        final String expected = "align-below";
        ctx.currentResource(PATH);
        TextImage textimage = ctx.request().adaptTo(TextImage.class);
        String actual = textimage.getCaptionPlacement();
        assertEquals(expected, actual);
    }

    @Test
    void getCaptionAlignment() {
        final String expected = "right";
        ctx.currentResource(PATH);
        TextImage textimage = ctx.request().adaptTo(TextImage.class);
        String actual = textimage.getCaptionAlignment();
        assertEquals(expected, actual);
    }

    @Test
    void getCaptionColor() {
        final String expected = "dark";
        ctx.currentResource(PATH);
        TextImage textimage = ctx.request().adaptTo(TextImage.class);
        String actual = textimage.getCaptionTextColor();
        assertEquals(expected, actual);
    }

    @Test
    void getHideMobile() {
        final String expected = "true";
        ctx.currentResource(PATH);
        TextImage textimage = ctx.request().adaptTo(TextImage.class);
        String actual = textimage.getHideMobile();
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
    void getTextBlockAlignment() {
        final String expected = "align-left";
        ctx.currentResource(PATH);
        TextImage textimage = ctx.request().adaptTo(TextImage.class);
        String actual = textimage.getTextBlockAlignment();
        assertEquals(expected, actual);
    }

    @Test
    void getButtonPlacement() {
        final String expected = "left";
        ctx.currentResource(PATH);
        TextImage textImage = ctx.request().adaptTo(TextImage.class);
        String actual = textImage.getButtonPlacement();
        assertEquals(expected, actual);
    }

    @Test
    void getImageCta() {
        final String expected = "image";
        ctx.currentResource(PATH);
        TextImage textImage = ctx.request().adaptTo(TextImage.class);
        String actual = textImage.getImageCta();
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
    void getTargetUrl() {
        final String expected = "/content/adc";
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
    void getAnchorValue() {
        final String expected = "anchor";
        ctx.currentResource(PATH);
        TextImage textImage = ctx.request().adaptTo(TextImage.class);
        String actual = textImage.getAnchorValue();
        assertEquals(expected, actual);
    }
    @Test
    void getPlayerIdValue() {
        final String expected = "12345";
        ctx.currentResource(PATH);
        TextImage textImage = ctx.request().adaptTo(TextImage.class);
        String actual = textImage.getPlayerIdValue();
        assertEquals(expected, actual);
    }

    @Test
    void getMediaIdValue() {
        final String expected = "234567";
        ctx.currentResource(PATH);
        TextImage textImage = ctx.request().adaptTo(TextImage.class);
        String actual = textImage.getMediaIdValue();
        assertEquals(expected, actual);
    }
    @Test
    void getVideoIdValue() {
        final String expected = "uZhs9PiEHkQ";
        ctx.currentResource(PATH);
        TextImage textImage = ctx.request().adaptTo(TextImage.class);
        String actual = textImage.getVideoIdValue();
        assertEquals(expected, actual);
    }

    @Test
    void getAssetValue() {
        final String expected = "https://www.youtube.com/";
        ctx.currentResource(PATH);
        TextImage textImage = ctx.request().adaptTo(TextImage.class);
        String actual = textImage.getAssetValue();
        assertEquals(expected, actual);
    }

    @Test
    void testGetButtonList() {
        MockitoAnnotations.initMocks(this);
        TextImageImpl textImage = new TextImageImpl();
        textImage.buttonlist = mockButtonList;
        List<Button> actualButtonList = textImage.getButtonList();
        assertEquals(mockButtonList, actualButtonList);
    }

}

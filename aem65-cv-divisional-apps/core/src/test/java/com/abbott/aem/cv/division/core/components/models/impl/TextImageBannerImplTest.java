package com.abbott.aem.cv.division.core.components.models.impl;


import com.abbott.aem.cv.division.core.components.models.Button;
import com.abbott.aem.cv.division.core.components.models.TextImageBanner;
import static org.junit.jupiter.api.Assertions.assertEquals;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;


@ExtendWith(AemContextExtension.class)
class TextImageBannerImplTest {

    private final AemContext ctx = new AemContext();
    private static final String PATH = "/content/TextImageBanner";

    @Mock
    private List<Button> mockButtonList;

    @BeforeEach
    public void setUp() {
        ctx.addModelsForClasses(TextImageBanner.class);
        ctx.load().json("/com/abbott/aem/cv/division/core/components/models/impl/TextImageBannerImplTest.json", "/content");
    }

    @Test
    void getBackgroundColors() {
        final String expected = "blue";
        ctx.currentResource(PATH);
        TextImageBanner textimagebanner = ctx.request().adaptTo(TextImageBanner.class);
        String actual = textimagebanner.getBackgroundColors();
        assertEquals(expected, actual);

    }

    @Test
    void getTopMargin() {
        final String expected = "false";
        ctx.currentResource(PATH);
        TextImageBanner textimagebanner = ctx.request().adaptTo(TextImageBanner.class);
        String actual = textimagebanner.getTopMargin();
        assertEquals(expected, actual);

    }

    @Test
    void getBottomMargin() {
        final String expected = "true";
        ctx.currentResource(PATH);
        TextImageBanner textimagebanner = ctx.request().adaptTo(TextImageBanner.class);
        String actual = textimagebanner.getBottomMargin();
        assertEquals(expected, actual);

    }

    @Test
    void getImagePlacement() {
        final String expected = "right";
        ctx.currentResource(PATH);
        TextImageBanner textimagebanner = ctx.request().adaptTo(TextImageBanner.class);
        String actual = textimagebanner.getImagePlacement();
        assertEquals(expected, actual);

    }

    @Test
    void  getText() {
        final String expected = "text";
        ctx.currentResource(PATH);
        TextImageBanner textimagebanner = ctx.request().adaptTo(TextImageBanner.class);
        String actual = textimagebanner.getText();
        assertEquals(expected, actual);

    }

    @Test
    void testGetButtonList() {
        MockitoAnnotations.initMocks(this);
        TextImageBannerImpl textImageBanner = new TextImageBannerImpl();
        textImageBanner.buttonlist = mockButtonList;
        List<Button> actualButtonList = textImageBanner.getButtonList();
        assertEquals(mockButtonList, actualButtonList);
    }

}
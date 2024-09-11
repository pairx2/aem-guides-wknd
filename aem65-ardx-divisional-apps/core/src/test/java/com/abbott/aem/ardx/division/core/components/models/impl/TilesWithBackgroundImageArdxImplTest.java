package com.abbott.aem.ardx.division.core.components.models.impl;

import com.abbott.aem.ardx.division.core.components.models.TilesWithBackgroundImageArdx;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.assertEquals;


@ExtendWith(AemContextExtension.class)
public class TilesWithBackgroundImageArdxImplTest {

    private final AemContext ctx = new AemContext();
    private ProxyComponentService proxyComponentService;
    private Component component;


    @BeforeEach
    void setUp() throws Exception {
        proxyComponentService = Mockito.mock(ProxyComponentService.class);
        component = Mockito.mock(Component.class);
        ProxyPaths path = null;
        Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
        ctx.registerService(ProxyComponentService.class, proxyComponentService);

        ctx.addModelsForClasses(TilesWithBackgroundImageArdxImpl.class);
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/TilesWithBackgroundImageArdxImplTest.json", "/content");
        ctx.currentResource("/content/tileswithbackground");
    }

    @Test
    void testGetPanelHoverColor() {
        final String expected = "colorPalette_Magenta";
        ctx.currentResource("/content/tileswithbackground");
        TilesWithBackgroundImageArdx tiles = ctx.request().adaptTo(TilesWithBackgroundImageArdx.class);
        String actual = tiles.getPanelHoverColor();
        assertEquals(expected, actual);
    }

    @Test
    void testGetHeadingTheme() {
        final String expected = "colorPalette_White";
        ctx.currentResource("/content/tileswithbackground");
        TilesWithBackgroundImageArdx tiles = ctx.request().adaptTo(TilesWithBackgroundImageArdx.class);
        String actual = tiles.getHeadingTheme();
        assertEquals(expected, actual);
    }

    @Test
    void testGetTextHoverColor() {
        final String expected = "colorPalette_MediumGreen";
        ctx.currentResource("/content/tileswithbackground");
        TilesWithBackgroundImageArdx tiles = ctx.request().adaptTo(TilesWithBackgroundImageArdx.class);
        String actual = tiles.getTextHoverColor();
        assertEquals(expected, actual);
    }

    @Test
    void testGetTextTheme() {
        final String expected = "colorPalette_DarkOrange";
        ctx.currentResource("/content/tileswithbackground");
        TilesWithBackgroundImageArdx tiles = ctx.request().adaptTo(TilesWithBackgroundImageArdx.class);
        String actual = tiles.getTextTheme();
        assertEquals(expected, actual);
    }


}


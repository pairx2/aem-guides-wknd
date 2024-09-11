package com.abbott.aem.ardx.division.core.components.models.impl;

import com.abbott.aem.ardx.division.core.components.models.TabsArdx;
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
public class TabsArdxImplTest {

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

        ctx.addModelsForClasses(TabsArdxImpl.class);
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/TabsArdxImplTest.json", "/content");
        ctx.currentResource("/content/tabs");
    }

    @Test
    void testGetTabBgColor() {
        final String expected = "colorPalette_Magenta";
        ctx.currentResource("/content/tabs");
        TabsArdx tiles = ctx.request().adaptTo(TabsArdx.class);
        String actual = tiles.getTabBgColor();
        assertEquals(expected, actual);
    }

    @Test
    void testGetActiveTabColor() {
        final String expected = "colorPalette_White";
        ctx.currentResource("/content/tabs");
        TabsArdx tiles = ctx.request().adaptTo(TabsArdx.class);
        String actual = tiles.getActiveTabColor();
        assertEquals(expected, actual);
    }

    @Test
    void testGetTabFontColor() {
        final String expected = "colorPalette_MediumGreen";
        ctx.currentResource("/content/tabs");
        TabsArdx tiles = ctx.request().adaptTo(TabsArdx.class);
        String actual = tiles.getTabFontColor();
        assertEquals(expected, actual);
    }

    @Test
    void testGetActiveTabFontColor() {
        final String expected = "colorPalette_DarkOrange";
        ctx.currentResource("/content/tabs");
        TabsArdx tiles = ctx.request().adaptTo(TabsArdx.class);
        String actual = tiles.getActiveTabFontColor();
        assertEquals(expected, actual);
    }


}


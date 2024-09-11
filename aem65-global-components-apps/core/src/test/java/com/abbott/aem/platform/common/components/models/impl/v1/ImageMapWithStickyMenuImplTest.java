package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.abbott.aem.platform.common.components.models.ImageMapWithStickyMenuItem;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.ImageMapWithStickyMenu;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.mockito.MockitoAnnotations;

import java.util.List;

@ExtendWith(AemContextExtension.class)
class ImageMapWithStickyMenuImplTest {

    private final AemContext ctx = new AemContext();
    private ProxyComponentService proxyComponentService;
    private Component component;

    @Mock
    private List<ImageMapWithStickyMenuItem> contentConfig;

    @BeforeEach
    void setUp() throws Exception {
        proxyComponentService = Mockito.mock(ProxyComponentService.class);
        component = Mockito.mock(Component.class);
        ProxyPaths path = null;
        Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
        ctx.registerService(ProxyComponentService.class, proxyComponentService);
        ctx.addModelsForClasses(ImageMapWithStickyMenuImpl.class);
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/ImageMapwithStickymenuImplTest.json",
                "/content");
        ctx.currentResource("/content/imagemapwithstickymenu");
    }

    @Test
    void testHideStickyMenu() {
        final String expected = "false";
        ctx.currentResource("/content/imagemapwithstickymenu");
        ImageMapWithStickyMenu imagemap = ctx.request().adaptTo(ImageMapWithStickyMenu.class);
        String actual = imagemap.getHideStickyMenu();
        assertEquals(expected, actual);
    }

    @Test
    void testSelect() {
        final String expected = "Dropdown Select";
        ctx.currentResource("/content/imagemapwithstickymenu");
        ImageMapWithStickyMenu imagemap = ctx.request().adaptTo(ImageMapWithStickyMenu.class);
        String actual = imagemap.getSelect();
        assertEquals(expected, actual);
    }

    @Test
    void testVariation() {
        final String expected = "default";
        ctx.currentResource("/content/imagemapwithstickymenu");
        ImageMapWithStickyMenu imagemap = ctx.request().adaptTo(ImageMapWithStickyMenu.class);
        String actual = imagemap.getVariation();
        assertEquals(expected, actual);
    }

    @Test
    void testMapTitle() {
        final String expected = "Choose Another Story";
        ctx.currentResource("/content/imagemapwithstickymenu");
        ImageMapWithStickyMenu imagemap = ctx.request().adaptTo(ImageMapWithStickyMenu.class);
        String actual = imagemap.getMapTitle();
        assertEquals(expected, actual);
    }

    @Test
    void testBackToMap() {
        final String expected = "Back to Map";
        ctx.currentResource("/content/imagemapwithstickymenu");
        ImageMapWithStickyMenu imagemap = ctx.request().adaptTo(ImageMapWithStickyMenu.class);
        String actual = imagemap.getBackToMap();
        assertEquals(expected, actual);
    }

    @Test
    void testViewstorytext() {
        final String expected = "View Story";
        ctx.currentResource("/content/imagemapwithstickymenu");
        ImageMapWithStickyMenu imagemap = ctx.request().adaptTo(ImageMapWithStickyMenu.class);
        String actual = imagemap.getViewStoryText();
        assertEquals(expected, actual);
    }

    @Test
    void testIconColor() {
        final String expected = "#85144B";
        ctx.currentResource("/content/imagemapwithstickymenu");
        ImageMapWithStickyMenu imagemap = ctx.request().adaptTo(ImageMapWithStickyMenu.class);
        String actual = imagemap.getIconColor();
        assertEquals(expected, actual);
    }

    @Test
    void testGetProductImageList() {
        MockitoAnnotations.initMocks(this);
        ImageMapWithStickyMenuImpl imagemap = new ImageMapWithStickyMenuImpl();
        imagemap.contentConfig = contentConfig;
        List<ImageMapWithStickyMenuItem> actualSectionItems = imagemap.getContentConfig();
        assertEquals(contentConfig, actualSectionItems);
    }
}

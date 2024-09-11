package com.abbott.aem.corp.division.core.components.models.impl;

import com.abbott.aem.corp.division.core.components.models.HeroBanner;
import com.abbott.aem.corp.division.core.components.models.HubSection;
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
import static org.junit.jupiter.api.Assertions.assertNotEquals;


@ExtendWith(AemContextExtension.class)
public class HeroBannerImplTest {
    private final AemContext ctx = new AemContext();
    private ProxyComponentService proxyComponentService;
    private Component component;

    @BeforeEach
    public void setUp() throws Exception {
        proxyComponentService = Mockito.mock(ProxyComponentService.class);
        component = Mockito.mock(Component.class);
        ProxyPaths path = null;
        Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
        ctx.registerService(ProxyComponentService.class, proxyComponentService);
        ctx.addModelsForClasses(HeroBannerImpl.class);
        ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/HeroBannerImplTest.json", "/content");
    }

    @Test
    void testGetNotchType() {
        final String expected = "notch";
        ctx.currentResource("/content/heroBanner");
        HeroBanner hb = ctx.request().adaptTo(HeroBanner.class);
        String actual = hb.getNotchType();
        assertEquals(expected, actual);
    }

    @Test
    void testGetDesktopNotchColor() {
        final String expected = "blue";
        ctx.currentResource("/content/heroBanner");
        HeroBanner hb = ctx.request().adaptTo(HeroBanner.class);
        String actual = hb.getDesktopNotchColor();
        assertEquals(expected, actual);
    }

    @Test
    void testGetMobileNotchColor() {
        final String expected = "red";
        ctx.currentResource("/content/heroBanner");
        HeroBanner hb = ctx.request().adaptTo(HeroBanner.class);
        String actual = hb.getMobileNotchColor();
        assertEquals(expected, actual);
        assertEquals(true, hb.isHideCurveDesktop());
        assertEquals(false, hb.isHideCurveMobile());
        assertEquals("yes", hb.getExtraCurveMobile());
        assertEquals("round", hb.getExtranotchType());
        assertEquals(false, hb.isHideCurveTab());
    }

    @Test
    void testGetExtraMobileNotchColor() {
        final String expected = "white";
        ctx.currentResource("/content/heroBanner");
        HeroBanner hb = ctx.request().adaptTo(HeroBanner.class);
        String actual = hb.getExtraMobileNotchColor();
        assertEquals(expected, actual);
    }
  
   @Test
    void testGetgetSvgId() {
         ctx.currentResource("/content/heroBanner");
         HeroBanner hb = ctx.request().adaptTo(HeroBanner.class);
         assertNotEquals("svgid",hb.getSvgId());
    }

}

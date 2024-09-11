package com.abbott.aem.corp.division.core.components.models.impl;


import com.abbott.aem.corp.division.core.components.models.HeroBanner;
import com.abbott.aem.corp.division.core.components.models.InformationSectionPanel;
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
public class InformationSectionPanelImplTest {

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
        ctx.addModelsForClasses(InformationSectionPanelImpl.class);
        ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/InformationSectionPanelImplTest.json", "/content");
    }

    @Test
    void testGetNotchType() {
        final String expected = "notch";
        ctx.currentResource("/content/infoPanel");
        InformationSectionPanel hb = ctx.request().adaptTo(InformationSectionPanel.class);
        String actual = hb.getNotchType();
        assertEquals(expected, actual);
    }

    @Test
    void testGetDesktopNotchColor() {
        final String expected = "blue";
        ctx.currentResource("/content/infoPanel");
        InformationSectionPanel hb = ctx.request().adaptTo(InformationSectionPanel.class);
        String actual = hb.getDesktopNotchColor();
        assertEquals(expected, actual);
    }

    @Test
    void testGetMobileNotchColor() {
        final String expected = "red";
        ctx.currentResource("/content/infoPanel");
        InformationSectionPanel hb = ctx.request().adaptTo(InformationSectionPanel.class);
        String actual = hb.getMobileNotchColor();
        assertEquals(expected, actual);


    }
    @Test
    void testIsHideCurveDesktop() {
        final boolean expected = true;
        ctx.currentResource("/content/infoPanel");
        InformationSectionPanel hb = ctx.request().adaptTo(InformationSectionPanel.class);
        boolean actual = hb.isHideCurveDesktop();
        assertEquals(expected, actual);


    }
    @Test
    void testIsHideCurveMobile() {
        final  boolean  expected= false;
        ctx.currentResource("/content/infoPanel");
        InformationSectionPanel hb = ctx.request().adaptTo(InformationSectionPanel.class);
        boolean actual = hb.isHideCurveMobile();
        assertEquals(expected, actual);
        assertEquals("withImage", hb.getImageVariation());
    }
    @Test
    void testGetExtraMobileNotchColor() {
        final String expected = "white";
        ctx.currentResource("/content/infoPanel");
        InformationSectionPanel hb = ctx.request().adaptTo(InformationSectionPanel.class);
        String actual = hb.getExtraMobileNotchColor();
        assertEquals(expected, actual);
        assertEquals("yes", hb.getExtraCurveMobile());
        assertEquals("round", hb.getExtranotchType());
       assertEquals("/content/image", hb.getFileReference());
        assertEquals("test", hb.getAltText());
    }

}



package com.abbott.aem.corp.division.core.components.models.impl;
import com.abbott.aem.corp.division.core.components.models.TileWithBackgroundImage;
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
public class TileWithBackgroundImageImplTest {
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
        ctx.addModelsForClasses(TileWithBackgroundImageImpl.class);
        ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/TileWithBackgroundImageImplTest.json", "/content");
    }

    @Test
    void testGetNotchType() {
        final String expected = "notch";
        ctx.currentResource("/content/tileWithBackgroundImage");
        TileWithBackgroundImage hb = ctx.request().adaptTo(TileWithBackgroundImage.class);
        String actual = hb.getNotchType();
        assertEquals(expected, actual);
    }

    @Test
    void testGetMobileNotchColor() {
        final String expected = "red";
        ctx.currentResource("/content/tileWithBackgroundImage");
        TileWithBackgroundImage hb = ctx.request().adaptTo(TileWithBackgroundImage.class);
        assertEquals(true, hb.isHideCurveDesktop());
        assertEquals(false, hb.isHideCurveMobile());
        assertEquals("herobannerwithtiles", hb.getMobileVariation());
        assertEquals("yes", hb.getExtraCurveMobile());
        assertEquals("white", hb.getExtraMobileNotchColor());
        assertEquals("round", hb.getExtranotchType());
        assertEquals("round", hb.getMobileNotchType());
        assertEquals("white", hb.getMobileNotchColor());
        assertEquals("white", hb.getBackgroundColor());
        assertEquals("white", hb.getMobileTitleColor());
        assertEquals("white", hb.getDesktopTitleColor());
        assertEquals("reduce-img", hb.getImageSize());
    }
  @Test
    void testGetgetSvgId() {
         TileWithBackgroundImage hb = ctx.request().adaptTo(TileWithBackgroundImage.class);
        assertNotEquals("svgid",hb.getSvgId());
    }

}

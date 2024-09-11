package com.abbott.aem.ardx.division.core.components.models.impl;
import com.abbott.aem.ardx.division.core.components.models.ButtonArdx;
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
public class ButtonArdxImplTest {

    private final AemContext ctx = new AemContext();
    private ProxyComponentService proxyComponentService;
    private Component component;

    public ButtonArdx button;
    
    @BeforeEach
    void setUp() throws Exception {
        proxyComponentService = Mockito.mock(ProxyComponentService.class);
        component = Mockito.mock(Component.class);
        ProxyPaths path = null;
        Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
        ctx.registerService(ProxyComponentService.class, proxyComponentService);

        ctx.addModelsForClasses(ButtonArdxImpl.class);
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/ButtonArdxImplTest.json", "/content");
        ctx.currentResource("/content/button");
    }
    
    
    
    @Test
    void testGetWistiaVideoId() {
        final String expected = "0gdt2myxqb";
        ctx.currentResource("/content/button");
        ButtonArdx button = ctx.request().adaptTo(ButtonArdx.class);
        String actual = button.getWistiaVideoId();
        assertEquals(expected, actual);
    }
    
    @Test
    void testGetVideoDocumentNumber() {
        final String expected = "documentNumber";
        ctx.currentResource("/content/button");
        ButtonArdx button = ctx.request().adaptTo(ButtonArdx.class);
        String actual = button.getVideoDocumentNumber();
        assertEquals(expected, actual);
    }
    
    @Test
    void testGetButtonColor() {
        final String expected = "colorPalette_purple";
        ctx.currentResource("/content/button");
        ButtonArdx button = ctx.request().adaptTo(ButtonArdx.class);
        String actual = button.getButtonColor();
        assertEquals(expected, actual);
    }

    @Test
    void testGetButtonHoverColor() {
        final String expected = "colorPalette_purple";
        ctx.currentResource("/content/button");
        ButtonArdx button = ctx.request().adaptTo(ButtonArdx.class);
        String actual =  button.getButtonHoverColor();
        assertEquals(expected, actual);
    }

    @Test
    void testGetTextColor() {
        final String expected = "colorPalette_gold";
        ctx.currentResource("/content/button");
        ButtonArdx button = ctx.request().adaptTo(ButtonArdx.class);
        String actual = button.getTextColor();
        assertEquals(expected, actual);
    }

    @Test
    void testGetTextHoverColor() {
        final String expected = "colorPalette_gold";
        ctx.currentResource("/content/button");
        ButtonArdx button = ctx.request().adaptTo(ButtonArdx.class);
        String actual = button.getTextHoverColor();
        assertEquals(expected, actual);
    }
    
    @Test
    void testGetTopMargin() {
        final String expected = "15px";
        ctx.currentResource("/content/button");
        ButtonArdx button = ctx.request().adaptTo(ButtonArdx.class);
        String actual = button.getTopMargin();
        assertEquals(expected, actual);
    }
    
    @Test
    void testGetBottomMargin() {
        final String expected = "15px";
        ctx.currentResource("/content/button");
        ButtonArdx button = ctx.request().adaptTo(ButtonArdx.class);
        String actual = button.getBottomMargin();
        assertEquals(expected, actual);
    }
    
    @Test
    void testGetLeftMargin() {
        final String expected = "15px";
        ctx.currentResource("/content/button");
        ButtonArdx button = ctx.request().adaptTo(ButtonArdx.class);
        String actual = button.getLeftMargin();
        assertEquals(expected, actual);
    }

    @Test
    void testGetRightMargin() {
        final String expected = "15px";
        ctx.currentResource("/content/button");
        ButtonArdx button = ctx.request().adaptTo(ButtonArdx.class);
        String actual = button.getRightMargin();
        assertEquals(expected, actual);
    }

}





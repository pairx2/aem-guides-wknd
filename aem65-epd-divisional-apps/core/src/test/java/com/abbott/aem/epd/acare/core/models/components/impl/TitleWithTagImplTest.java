package com.abbott.aem.epd.acare.core.models.components.impl;

import com.abbott.aem.epd.acare.core.models.components.TitleWithTag;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class TitleWithTagImplTest{

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
        ctx.addModelsForClasses(TitleWithTagImpl.class);
        ctx.load().json("/com/abbott/aem/epd/acare/core/models/components/impl/TitleWithTagImplTest.json", "/content");
    }

    @Test
    void testGetText() {
        final String expected = "samplerichtexttest";
        ctx.currentResource("/content/titleWithTag");
        TitleWithTag hb = ctx.request().adaptTo(TitleWithTag.class);
        String actual = hb.getText();
        assertEquals(expected, actual);
    }

    @Test
    void testGetNonRichText() {
        final String expected = "NonRichText";
        ctx.currentResource("/content/titleWithTag");
        TitleWithTag hb = ctx.request().adaptTo(TitleWithTag.class);
        String actual = hb.getNonRichText();
        assertEquals(expected, actual);
    }


    @Test
    void testGetNeedNonRichText() {
        final String expected = "NeedNonRichText";
        ctx.currentResource("/content/titleWithTag");
        TitleWithTag hb = ctx.request().adaptTo(TitleWithTag.class);
        String actual = hb.getNeedNonRichText();
        assertEquals(expected, actual);
    }

    @Test
    void testGetClass() {
        final String expected = "class com.abbott.aem.epd.acare.core.models.components.impl.TitleWithTagImpl";
        ctx.currentResource("/content/titleWithTag");
        TitleWithTag hb = ctx.request().adaptTo(TitleWithTag.class);
        String actual = String.valueOf(hb.getClass());
        assertEquals(expected, actual);
    }

}

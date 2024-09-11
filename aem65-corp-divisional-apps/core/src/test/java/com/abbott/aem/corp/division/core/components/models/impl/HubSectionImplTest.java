package com.abbott.aem.corp.division.core.components.models.impl;

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

@ExtendWith(AemContextExtension.class)
class HubSectionImplTest {
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
        ctx.addModelsForClasses(HubSectionImpl.class);
        ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/HubSectionImplTest.json", "/content");
    }

    @Test
    void testGetHubStoryCategoryName() {
        final String expected = "hubSection";
        ctx.currentResource("/content/hubSection");
        HubSection hs = ctx.request().adaptTo(HubSection.class);
        String actual = hs.getHubStoryCategoryName();
        assertEquals(expected, actual);
    }

    @Test
    void testGetHubStoryCategoryColor() {
        final String expected = "blue";
        ctx.currentResource("/content/hubSection");
        HubSection hs = ctx.request().adaptTo(HubSection.class);
        String actual = hs.getHubStoryCategoryColor();
        assertEquals(expected, actual);
    }

    @Test
    void testGetHubCategoryLink() {
        final String expected = "/content/Corp/global-reference/master/en/home/homenewdemo.html";
        ctx.currentResource("/content/hubSection");
        HubSection hs = ctx.request().adaptTo(HubSection.class);
        String actual = hs.getHubCategoryLink();
        assertEquals(expected, actual);
    }

}

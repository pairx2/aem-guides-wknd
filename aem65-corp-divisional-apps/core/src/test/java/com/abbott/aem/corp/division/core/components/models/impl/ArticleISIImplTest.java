package com.abbott.aem.corp.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import com.abbott.aem.corp.division.core.components.models.ArticleISI;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class ArticleISIImplTest {
	
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
        ctx.addModelsForClasses(ArticleISIImpl.class);
        ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/ArticleISIImplTest.json", "/content");
    }

    @Test
    void testGetHeadlineText() {
        final String expected = "heading";
        ctx.currentResource("/content/article");
        ArticleISI hb = ctx.request().adaptTo(ArticleISI.class);
        String actual = hb.getHeadlineText();
        assertEquals(expected, actual);
    }

}

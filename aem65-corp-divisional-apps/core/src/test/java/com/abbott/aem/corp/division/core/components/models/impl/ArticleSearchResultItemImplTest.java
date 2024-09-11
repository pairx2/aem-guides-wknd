package com.abbott.aem.corp.division.core.components.models.impl;

import com.abbott.aem.corp.division.core.components.models.ArticleSearchResultItem;
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
public class ArticleSearchResultItemImplTest {
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
        ctx.addModelsForClasses(ArticleSearchResultItem.class);
        ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/ArticleSearchResultItemImplTest.json", "/content");
    }
    
    @Test
    void testGetArticleSearch() {
        ctx.currentResource("/content/container");
        ArticleSearchResultItem hb = ctx.request().adaptTo(ArticleSearchResultItem.class);
        assertEquals("21.02.2023", hb.getArticleDate());
        assertEquals("Products", hb.getCategoryTitle());
        assertEquals("blue",hb.getHeadingColor());
                
    }
    

   
}
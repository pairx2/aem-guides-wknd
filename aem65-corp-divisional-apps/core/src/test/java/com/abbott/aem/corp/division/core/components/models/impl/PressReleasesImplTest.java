package com.abbott.aem.corp.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import com.abbott.aem.corp.division.core.components.models.ArticleDetails;
import com.abbott.aem.corp.division.core.components.models.PressReleases;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class PressReleasesImplTest {
	
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
        ctx.addModelsForClasses(PressReleasesImpl.class);
        ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/PressReleasesImplTest.json", "/content");
    }

    @Test
    void testGetArticleText() {
        final String expected = "Article testing";
        ctx.currentResource("/content/pressitems");
        PressReleases hb = ctx.request().adaptTo(PressReleases.class);
        String actual = hb.getArticleText();
        assertEquals(expected, actual);
        assertEquals("/content/pressrelease", hb.getPressReleaseLink());
        assertEquals("12/11/2022", hb.getPressDate());
		assertEquals("_blank", hb.getOpenInNewTab());
    }

}

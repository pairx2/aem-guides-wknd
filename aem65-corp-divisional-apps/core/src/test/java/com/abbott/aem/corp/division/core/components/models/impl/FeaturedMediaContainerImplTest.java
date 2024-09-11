package com.abbott.aem.corp.division.core.components.models.impl;
import com.abbott.aem.corp.division.core.components.models.FeaturedMediaContainer;
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
public class FeaturedMediaContainerImplTest {
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
        ctx.addModelsForClasses(FeaturedMediaContainerImpl.class);
        ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/FeaturedMediaContainerImplTest.json", "/content");
    }

    @Test
    void testGetCtaLabel() {
        final String expected = "testlabel";
        ctx.currentResource("/content/featuredmediacontainer");
        FeaturedMediaContainer hb = ctx.request().adaptTo(FeaturedMediaContainer.class);
        String actual = hb.getCtaLabel();
        assertEquals(expected, actual);
    }

    @Test
    void testGetCalendarbgcolor() {
        final String expected = "red";
        ctx.currentResource("/content/featuredmediacontainer");
        FeaturedMediaContainer hb = ctx.request().adaptTo(FeaturedMediaContainer.class);
        assertEquals(expected, hb.getCalendarbgcolor());
        assertEquals("/content/corp", hb.getCtaLink());
        assertEquals("true", hb.getNewTab());
        assertEquals("/content/filereference", hb.getFileReference());
        assertEquals("white", hb.getBackgroundColor());
        assertEquals("altText", hb.getAltText());
        assert hb.getEventDetails().size() > 0;

    }

}

package com.abbott.aem.corp.division.core.components.models.impl;
import com.abbott.aem.corp.division.core.components.models.SectionTitle;
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
class SectionTitleImplTest {
    private final AemContext ctx = new AemContext();
    private ProxyComponentService proxyComponentService;
    private Component component;

    @BeforeEach
    public void setUp() {
        proxyComponentService = Mockito.mock(ProxyComponentService.class);
        component = Mockito.mock(Component.class);
        ProxyPaths path = null;
        Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
        ctx.registerService(ProxyComponentService.class, proxyComponentService);
        ctx.addModelsForClasses(SectionTitleImpl.class);
        ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/SectionTitleImplTest.json", "/content");
    }

    @Test
    void testGetTitleType() {
        final String expected = "titleImageVideo";
        ctx.currentResource("/content/sectionTitle");
        SectionTitle st = ctx.request().adaptTo(SectionTitle.class);
        String actual = st.getTitleType();
        assertEquals(expected, actual);
        assertEquals("/content/Corp/global-reference/master/en/home/homenewdemo", st.getImage());
        assertEquals("altText", st.getAltText());
        assertEquals("awardText", st.getAwardText());
        assertEquals("textColor", st.getTextColor());
        assertEquals("titleColor", st.getTitleColor());
        assertEquals("titlePosition", st.getTitlePosition());
        assertEquals("titleFontFamily", st.getTitleFontFamily());
        assertEquals("textFontFamily", st.getTextFontFamily());
        assert st.getStoryPanels().size() > 0;
    }

}
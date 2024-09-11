package com.abbott.aem.corp.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import com.abbott.aem.corp.division.core.components.models.StoriesModal;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class StoriesModalImplTest {
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
	        ctx.addModelsForClasses(StoriesModalImpl.class);
	        ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/StoriesModalImplTest.json", "/content");
	    }

	    @Test
	    void testGetDisplayType() {
	        final String expected = "seeAll";
	        ctx.currentResource("/content/stories");
	        StoriesModal hb = ctx.request().adaptTo(StoriesModal.class);
	        String actual = hb.getDisplayType();
	        assertEquals(expected, actual);
	    }

	    @Test
	    void testGetSectionTitleRequired() {
	        final String expected = "true";
	        ctx.currentResource("/content/stories");
	        StoriesModal hb = ctx.request().adaptTo(StoriesModal.class);
	        assertEquals(expected, hb.getSectionTitleRequired());
	        assertEquals("SeeALLText", hb.getSeeAllText());
	        assertEquals("VIEWALL", hb.getViewAllLink());
	        assert hb.getStoryPanels().size() > 0;

	    }

}

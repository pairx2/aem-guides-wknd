package com.abbott.aem.corp.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.apache.sling.api.resource.ValueMap;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import com.abbott.aem.corp.division.core.components.models.StoriesPanel;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import org.apache.sling.api.resource.ResourceResolver;
import com.day.cq.wcm.api.components.Component;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class StoriesPanelImplTest {
	 private final AemContext ctx = new AemContext();
	    private ProxyComponentService proxyComponentService;
	    private Component component;
            
        @InjectMocks
		StoriesPanelImpl storypanel;
	    
	    @InjectMocks 
	    ResourceResolver resourceResolver;
	    
	    @Mock
	    ValueMap pageProperties;

	    @BeforeEach
	    public void setUp() throws Exception {
	        proxyComponentService = Mockito.mock(ProxyComponentService.class);
	        component = Mockito.mock(Component.class);
	        ProxyPaths path = null;
	        Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
	        ctx.registerService(ProxyComponentService.class, proxyComponentService);
	        ctx.addModelsForClasses(StoriesPanelImpl.class);
	        ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/StoriesPanelImplTest.json", "/content");
	    }

	    @Test
	    void testGetAltText() {
	        final String expected = "test";
	        ctx.currentResource("/content/storypanels");
	        StoriesPanel hb = ctx.request().adaptTo(StoriesPanel.class);
	        String actual = hb.getAltText();
	        assertEquals(expected, actual);
	    }
 
	    @Test
	    void testGetRootPath() {
	        final String expected = "/content/test.html";
	        ctx.currentResource("/content/storypanels");
	        StoriesPanel hb = ctx.request().adaptTo(StoriesPanel.class);
	        assertEquals(expected, hb.getRootPath());
	        assertEquals("imagestory", hb.getStoryType());
	        assertEquals("youtube", hb.getVideoType());
	        assertEquals("testid", hb.getMediaId());
	        assertEquals("testscript", hb.getVideoScript());
	        assertEquals("2023-11-04", hb.getStoryDate());
	        assertEquals("ReadMore", hb.getReadMore());
	        assertEquals("playerid", hb.getPlayerId());
	        assertEquals("/content/link.html", hb.getStoryLink());
	        assertEquals("true", hb.getNewTab());
	        assertEquals("true", hb.getAssetLink());
	        
	    }
   
	    @Test
	    void testGetStoryHeadline() {	
	       ctx.currentResource("/content/storypanels");
	        StoriesPanel hb = ctx.request().adaptTo(StoriesPanel.class);
	        		assertEquals("true", hb.getDynamicData());
	        		assertNotNull(hb.getDynamicData());					    }
	   
	    
	    @Test
	    void testGetcolor()
	    {
		       ctx.currentResource("/content/storypanels");

	        StoriesPanel hb = ctx.request().adaptTo(StoriesPanel.class);

		   assertEquals(null,hb.getColor());
	    }
       @Test
	    void testGetnullStoryHeadline() {	
	       ctx.currentResource("/content/storypanels");
	        StoriesPanel hb = ctx.request().adaptTo(StoriesPanel.class);
	        		assertEquals("true", hb.getDynamicData());
	        		assertNotNull(hb.getDynamicData());

	    
	    }
	    @Test
	    void testGetnulldynamic() {	
	       ctx.currentResource("/content/storypanels");
	        StoriesPanel hb = ctx.request().adaptTo(StoriesPanel.class);
	        		assertEquals("true", hb.getDynamicData());

	    
	    }
	    
}

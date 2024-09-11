package com.abbott.aem.epd.acare.core.models.components.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.abbott.aem.epd.acare.core.models.components.BodyTextWithTag;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class BodyTextWithTagImplTest {
	
	
	
	@InjectMocks
	
	BodyTextWithTagImpl bodyTextWithTagImpl;
	
	
	

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
        ctx.addModelsForClasses(BodyTextWithTagImpl.class);
        ctx.load().json("/com/abbott/aem/epd/acare/core/models/components/impl/BodyTextWithTagImplTest.json", "/content");
    }
   
    @Test
    void testGettag() {
        ctx.currentResource("/content/bodytext");
        BodyTextWithTag hb = ctx.request().adaptTo(BodyTextWithTag.class);
        String actual = hb.getText();
        assertEquals("textfromnonrichtext", actual);
       
       
       
    }
    
    
    @Test
    void testGetelsetag() {
        ctx.currentResource("/content/bodytext");
        BodyTextWithTag hb = ctx.request().adaptTo(BodyTextWithTag.class);
        String actual = hb.getText();
        assertEquals("textfromnonrichtext", actual);
       
       
       
    }
    
    @Test
    void testGetrichtext() {
        ctx.currentResource("/content/bodytext");
        BodyTextWithTag hb = ctx.request().adaptTo(BodyTextWithTag.class);
        String actual = hb.getNonRichText();
        assertEquals("textfromnonrichtext", actual);

       
       
    }
    
    
    @Test
    void testGetnonrichtext() {
        ctx.currentResource("/content/bodytext");
        BodyTextWithTag hb = ctx.request().adaptTo(BodyTextWithTag.class);
        String actual = hb.getNeedNonRichText();
        assertEquals("true", actual);

       
       
    }
  

}
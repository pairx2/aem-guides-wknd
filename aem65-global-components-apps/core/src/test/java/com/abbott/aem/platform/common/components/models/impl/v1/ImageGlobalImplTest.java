package com.abbott.aem.platform.common.components.models.impl.v1;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.ImageGlobal;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;



@ExtendWith(AemContextExtension.class)
class ImageGlobalImplTest {

    private final AemContext ctx = new AemContext();
	private ProxyComponentService proxyComponentService;
	private Component component;
    
    
    @BeforeEach
    void setUp() throws Exception {
    	proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);
		
        ctx.addModelsForClasses(ImageGlobalImplTest.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/ImageGlobalImplTest.json", "/content");           
        ctx.currentResource("/content/image");
    }
	
    @Test
    void testGetTabletImage() {
        final String expected = "/content/dam/gpoc/spanish/fighting-antibiotic-resistance-rapid-diagnostics/Stories-fighting-antibiotic-resistance-RR-unnecessary-prescription-339.jpg";
        ctx.currentResource("/content/image");
        ImageGlobal image = ctx.request().adaptTo(ImageGlobal.class);
		String actual = image.getTabletImage();
		assertEquals(expected, actual);
    }

    @Test
    void testGetMobileImage() {
        final String expected = "/content/dam/gpoc/spanish/fighting-antibiotic-resistance-rapid-diagnostics/Stories-fighting-antibiotic-resistance-video-Test-Target-Treat-339.jpg";
        ctx.currentResource("/content/image");
        ImageGlobal image = ctx.request().adaptTo(ImageGlobal.class);
		String actual = image.getMobileImage();
		assertEquals(expected, actual);
    }
  
}


    

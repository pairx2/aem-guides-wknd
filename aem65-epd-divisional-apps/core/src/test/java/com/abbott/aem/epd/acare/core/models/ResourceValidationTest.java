package com.abbott.aem.epd.acare.core.models;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class,MockitoExtension.class})
public class ResourceValidationTest {  
	
	  AemContext ctx = new AemContext();
	
	 @InjectMocks
	 ResourceValidation resourceValidation;

	 @Mock
	 ProxyComponentService proxyComponentService;
	 @Mock
	 Component component;
	 @Mock
	 Page currentPage;
	 @Mock
	 Resource resource;

	@Mock
	SlingHttpServletRequest request;


	@BeforeEach
	void setUp()
	{
		
	proxyComponentService = mock(ProxyComponentService.class);
	     component = mock(Component.class);
	     ProxyPaths path = null;
	     Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
	     ctx.registerService(ProxyComponentService.class, proxyComponentService);
	     ctx.addModelsForClasses(ResourceValidation.class);
	    PageManager pageManager = mock(PageManager.class);
	     currentPage = mock(Page.class);
	    resource = mock(Resource.class);
	}

	@Test
	void testValidResource() {
		String resourcePath = "/content/sample/resourcepath";
		ctx.create().resource(resourcePath);

		// Mocking behavior for getResource method
		ResourceResolver resourceResolverMock = mock(ResourceResolver.class);
		when(request.getResourceResolver()).thenReturn(resourceResolverMock);
		when(resourceResolverMock.getResource(resourcePath))
				.thenReturn(ctx.resourceResolver().getResource(resourcePath));

		// Inject the mock request into the ResourceValidation instance
		resourceValidation.setRequest(request);

		resourceValidation.setResourcePath(resourcePath);
		resourceValidation.init();

		assertTrue(resourceValidation.getValidResource());
	}

	@Test
	void testInValidResource()
	{
		String resourcePath="/content/sample/resourcepath";

		ctx.create().resource(resourcePath);
		ResourceValidation resourceValidation=new  ResourceValidation();

		resourceValidation.setResourcePath("/content/nonexistance/resource");

		boolean actual=		resourceValidation.getValidResource();

		assertFalse(actual);

	}

}
   
       
    
    
    




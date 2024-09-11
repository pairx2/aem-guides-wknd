
package com.abbott.aem.an.similac.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import com.abbott.aem.an.similac.core.services.StoreConfigService;
import org.mockito.junit.jupiter.MockitoExtension;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(MockitoExtension.class)
@ExtendWith(AemContextExtension.class)
public class LogoModelTest {
	
	private static final String RESOURCE_PATH = "/content/an/similac/global/en/utility-pages/header/jcr:content/root/header/logo";
	private static final String HEADER_LOGO_PATH = "/content/dam/an/similac/header/similac-logo.png";
	private static final String HEADER_LOGO = "header-logo";	
	private static final String HEADER_LOGO_PATH_DOMAIN = "https://staging.similac.com/content/dam/an/similac/header/similac-logo.png";
	private static final String DOMAIN_URL = "https://staging.similac.com";
	
	@InjectMocks
	private LogoModel logoModel;
    
	@Mock
	private StoreConfigService storeService;
		   
	
	@BeforeEach
	public void setup(AemContext context) {

		Resource logoResource = context.create().resource( RESOURCE_PATH, 
				"logoImage", HEADER_LOGO_PATH, 
				"altText", HEADER_LOGO,
				"redirectionLink", "/content/an/similac/us/en/home", 
				"redirectionTarget", "true");
				
		context.currentResource(logoResource);		
		context.registerService(StoreConfigService.class, storeService);		
		context.addModelsForClasses(LogoModel.class);
		logoModel = context.request().adaptTo(LogoModel.class);
		
	}

	@Test
	void testGetLogoImage() {
		when(storeService.getDomainName()).thenReturn(DOMAIN_URL);
		String logoImage = logoModel.getLogoImage();
		assertNotNull(logoImage);
		assertEquals(HEADER_LOGO_PATH_DOMAIN, logoImage);
	}

	@Test
	void testGetAltText() {
		String altText =  logoModel.getAltText();
		assertNotNull(altText);
		assertEquals(HEADER_LOGO, altText);
	}

	@Test
	void testGetRedirectionLink() {	
		when(storeService.getDomainName()).thenReturn(DOMAIN_URL);
		String redirectionLink = logoModel.getRedirectionLink();
		assertNotNull(redirectionLink);		
	}

	@Test
	void testGetRedirectionTarget() {		
		String redirectionTarget = logoModel.getRedirectionTarget();
		assertNotNull(redirectionTarget);
		assertEquals("true", redirectionTarget);
	}

}

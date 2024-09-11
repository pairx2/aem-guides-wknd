package com.abbott.aem.an.similac.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import com.abbott.aem.an.similac.core.services.StoreConfigService;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
@ExtendWith(MockitoExtension.class)
public class FooterModelTest {

	private static final String ABBOTT_URL = "https://www.abbott.com/";
	
	private static final String ABBOTT_LOGO = "/content/dam/an/similac/header/abbott-logo.png";
	
	private static final String ABBOTT_INSTAGRAM = "https://www.instagram.com/similac_us/";
	
	private static final String SIMILAC_YOUTUBE = "https://www.youtube.com/similac";
	
	private static final String SIMILAC_FACEBOOK = "https://www.facebook.com/Similac";
	
	private static final String INSTA_ICON = "/content/dam/an/similac/header/insta-icon.png";
	
	private static final String DOMAIN_URL = "https://staging.similac.com";
	
	private static final String ABBOTT_LOGO_EXPECTED = "https://staging.similac.com/content/dam/an/similac/header/abbott-logo.png";
	
	private static final String INSTA_ICON_EXPECTED = "https://staging.similac.com/content/dam/an/similac/header/insta-icon.png";
	
	@InjectMocks
	private FooterModel footerModel;
	
	@Mock
	private StoreConfigService storeService;
	
	
    @BeforeEach
    public void setup(AemContext context) throws PathNotFoundException, RepositoryException {
    	 
    	Resource footerResource = context.create().resource("/content/an/similac", 
			    			"abbottLogoURL", ABBOTT_URL,
			    			"abbottLogo", ABBOTT_LOGO,
			    			"abbottLogoAlttext", "Abbott",
			    			"socialiconsHeader", "Connect With Us",
			    			"instagramURL", ABBOTT_INSTAGRAM,
			    			"youtubeURL", SIMILAC_YOUTUBE,
			    			"facebookURL", SIMILAC_FACEBOOK,
			    			"copyrightsText", "© 2020, Abbott Laboratories. All rights reserved.",
			    			"instagramIcon", INSTA_ICON,
			    			"instagramAlttext", "Instagram" 
    					 );
    	
    	context.addModelsForClasses(FooterModel.class);
    	Session mockSession = mock(Session.class);
		context.registerAdapter(ResourceResolver.class, Session.class, mockSession);
		context.currentResource(footerResource);
		context.registerService(StoreConfigService.class, storeService);
		 
    	footerModel = context.request().adaptTo(FooterModel.class);
    }

	@Test
	void testGetAbbottLogoURL() {		
        String abbottLogoURL = footerModel.getAbbottLogoURL();
        assertNotNull(abbottLogoURL);
        assertEquals(ABBOTT_URL, abbottLogoURL);
     }

	@Test
	void testGetAbbottLogo() {	
		when(storeService.getDomainName()).thenReturn(DOMAIN_URL);
        String abbottLogo = footerModel.getAbbottLogo();
        assertNotNull(abbottLogo);
        assertEquals(ABBOTT_LOGO_EXPECTED, abbottLogo);
	}

	@Test
	void testGetAbbottLogoAlttext() {
		String abbottLogoAlttext = footerModel.getAbbottLogoAlttext();
        assertNotNull(abbottLogoAlttext);
        assertEquals("Abbott", abbottLogoAlttext);
	}

	@Test
	void testGetSocialiconsHeader() {
		String socialiconsHeader = footerModel.getSocialiconsHeader();
        assertNotNull(socialiconsHeader);
        assertEquals("Connect With Us", socialiconsHeader);
	}

	@Test
	void testGetCopyrightsText() {
		String copyrightsText = footerModel.getCopyrightsText();
        assertNotNull(copyrightsText);
        assertEquals("© 2020, Abbott Laboratories. All rights reserved.", copyrightsText);
	}

	@Test
	void testGetInstagramURL() {		
        String instagramURL = footerModel.getInstagramURL();
        assertNotNull(instagramURL);
        assertEquals(ABBOTT_INSTAGRAM, instagramURL);
       }

	@Test
	void testGetYoutubeURL() {		
        String youtubeURL = footerModel.getYoutubeURL();
        assertNotNull(youtubeURL);
        assertEquals(SIMILAC_YOUTUBE, youtubeURL);
        }

	@Test
	void testGetFacebookURL() {		
        String facebookURL = footerModel.getFacebookURL();
        assertNotNull(facebookURL);
        assertEquals(SIMILAC_FACEBOOK, facebookURL);
       }

	@Test
	void testGetInstagramIcon() {
		when(storeService.getDomainName()).thenReturn(DOMAIN_URL);
        String instagramIcon = footerModel.getInstagramIcon();
        assertNotNull(instagramIcon);
        assertEquals(INSTA_ICON_EXPECTED, instagramIcon);
        }

	@Test
	void testGetInstagramAlttext() {
		String instagramAlttext = footerModel.getInstagramAlttext();
        assertNotNull(instagramAlttext);
        assertEquals("Instagram", instagramAlttext);
	}

}

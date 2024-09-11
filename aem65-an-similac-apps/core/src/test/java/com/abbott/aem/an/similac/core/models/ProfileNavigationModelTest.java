package com.abbott.aem.an.similac.core.models;

import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.an.similac.core.beans.MenuBean;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
class ProfileNavigationModelTest {
	
	private static final String LEFT_NAV_JSON = "/com/abbott/aem/an/similac/core/models/left-nav.json";
	public static final String TEST_CONTENT_JSON = "/com/abbott/aem/an/similac/core/models/langnav-sitestructure.json";
	private static final String SITE_CONTENT_PATH = "/content";
	private static final String RESOURCE_PATH =  "/content/an/similac/LOCALE-3/user_profile/jcr:content/left_nav";
	private static final String EMPTY_RESOURCE_PATH =  "/content/an/similac/LOCALE-3/emptyResource/jcr:content";
	
	@InjectMocks
	private ProfileNavigationModel profileNavigationModel;
	
	@InjectMocks
	private MenuModel menuModelTest = new MenuModel();
	
	@Mock
	private MenuBean menuBean;
	
	private AemContext context;

	@BeforeEach
	void setUp() {
		context.load().json(LEFT_NAV_JSON, SITE_CONTENT_PATH);	
		context.addModelsForClasses(ProfileNavigationModel.class);
		context.addModelsForClasses(MenuModel.class);
	}
     
	@Test
	final void testGenerateProfileNav() {
		Resource currentResource = context.currentResource(context.resourceResolver().getResource(RESOURCE_PATH));
		profileNavigationModel.generateProfileNavProperties(currentResource);
		Assertions.assertNotNull(profileNavigationModel.getProfileNavJson());
		Assertions.assertNotNull(profileNavigationModel.getProfileNavigationBean());
	}
	
	@Test
	final void testEmptyResource() {
		context.currentResource(context.resourceResolver().getResource(EMPTY_RESOURCE_PATH));
		profileNavigationModel = context.request().adaptTo(ProfileNavigationModel.class);
		Assertions.assertNull(profileNavigationModel.getProfileNavJson());
		Assertions.assertNull(profileNavigationModel.getProfileNavigationBean());
	}
	
}

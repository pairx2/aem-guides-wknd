package com.abbott.aem.an.similac.core.models;

import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import com.abbott.aem.an.similac.core.beans.LeftNavigationBean;
import com.abbott.aem.an.similac.core.beans.MenuBean;
import com.abbott.aem.an.similac.core.services.StoreConfigService;
import com.day.cq.commons.Externalizer;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
class LeftNavigationModelTest {
	
	private static final String LEFT_NAV_JSON = "/com/abbott/aem/an/similac/core/models/left-nav.json";
	public static final String TEST_CONTENT_JSON = "/com/abbott/aem/an/similac/core/models/langnav-sitestructure.json";
	private static final String SITE_CONTENT_PATH = "/content";
	private static final String RESOURCE_PATH =  "/content/an/similac/LOCALE-3/user_profile/jcr:content/left_nav";	
	private LeftNavigationModel leftNavigationModel;
	
	@InjectMocks
	private MenuModel menuModelTest = new MenuModel();
	
	@Mock
	private StoreConfigService storeService;

	@Mock
	private transient Externalizer externalizer;
	
	@Mock
	private MenuBean menuBean;
	
	private AemContext context;

	@BeforeEach
	void setUp() {
		context.load().json(LEFT_NAV_JSON, SITE_CONTENT_PATH);	
		context.addModelsForClasses(LeftNavigationModel.class);
		context.addModelsForClasses(MenuModel.class);
		context.registerService(StoreConfigService.class, storeService);
		context.registerService(Externalizer.class, externalizer);
		Mockito.lenient().when(storeService.getDomainName()).thenReturn("https://www.similac.com");
		Mockito.lenient().when(externalizer.externalLink(Mockito.any(ResourceResolver.class), Mockito.any(String.class),
				Mockito.any(String.class))).thenReturn("https://www.similac.com");
	}
      
	@Test
	final void testLeftNavigation() {
		context.currentResource(context.resourceResolver().getResource(RESOURCE_PATH));
		leftNavigationModel = context.request().adaptTo(LeftNavigationModel.class);
		LeftNavigationBean leftNavigationBean = leftNavigationModel.getLeftNavigationBean();
		validateLeftNavBean(leftNavigationBean);
		Assertions.assertNotNull(leftNavigationBean.getMenuList());
		ValidateMenuBean(leftNavigationBean.getMenuList().get(0));
		ValidateMenuBeanForMagentoGroup(leftNavigationBean.getMenuList().get(2).getChildren().get(0));
		Assertions.assertNotNull(leftNavigationModel.getLeftNavJson());
	}
	
	private void ValidateMenuBean(MenuBean menuBean) {
		Assertions.assertNotNull(menuBean);
		Assertions.assertNotNull(menuBean.getLabel());
		Assertions.assertNotNull(menuBean.getCookieKey());
		Assertions.assertNotNull(menuBean.getChildren());
	    ValidateChildMenuList(menuBean.getChildren().get(0));
	    ValidateChildMenuListForHideInGroup(menuBean.getChildren().get(1));
	}
 	
	private void ValidateMenuBeanForMagentoGroup(MenuBean childMenuBean) {
		Assertions.assertNotNull(childMenuBean);
		Assertions.assertNotNull(childMenuBean.getLabel());
		Assertions.assertNotNull(childMenuBean.getCookieKey());
	    Assertions.assertNotNull(childMenuBean.getAemURL()); 
	    Assertions.assertNotNull(childMenuBean.getMagentoGroupName()); 
	    Assertions.assertNotNull(childMenuBean.getMagURL()); 		
	}
	
	private void ValidateChildMenuListForHideInGroup(MenuBean childMenuBean) {
		
		Assertions.assertNotNull(childMenuBean);
		Assertions.assertNotNull(childMenuBean.getLabel());
		Assertions.assertNotNull(childMenuBean.getCookieKey());	
	    Assertions.assertNotNull(childMenuBean.getAemURL()); 
	    Assertions.assertNotNull(childMenuBean.getHideInGroup());	   		
	}

	private void ValidateChildMenuList(MenuBean childMenuBean) {
		Assertions.assertNotNull(childMenuBean);
		Assertions.assertNotNull(childMenuBean.getLabel());
		Assertions.assertNotNull(childMenuBean.getCookieKey());
	    Assertions.assertNotNull(childMenuBean.getAemURL()); 	  			 	
	}
 
	private void validateLeftNavBean(LeftNavigationBean leftNavBean) {		
		Assertions.assertNotNull(leftNavBean);
		Assertions.assertNotNull(leftNavBean.getHiddenListKey());
		Assertions.assertNotNull(leftNavBean.getName());
		Assertions.assertNotNull(leftNavBean.getUrlListKey());
		Assertions.assertNotNull(leftNavBean.getMobileOnlyGroupName());
		Assertions.assertNotNull(leftNavBean.getRecentOrder());
		Assertions.assertNotNull(leftNavBean.getRecentOrder().getBtn());
		Assertions.assertNotNull(leftNavBean.getRecentOrder().getTitle());				
	}
}

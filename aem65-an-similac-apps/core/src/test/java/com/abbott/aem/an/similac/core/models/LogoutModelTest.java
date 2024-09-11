package com.abbott.aem.an.similac.core.models;


import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.an.similac.core.beans.LogoutConfigBean;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class LogoutModelTest {

	private static final String LOGOUT_CONFIG_JSON = "/com/abbott/aem/an/similac/core/models/logout-config.json";
	private static final String CONTENT_PATH = "/content";
	
	private LogoutModel logoutModel;
	private AemContext context;
	
	@BeforeEach
	void setUp()  {		
		context.load().json(LOGOUT_CONFIG_JSON, CONTENT_PATH);
		context.addModelsForClasses(CartComponentModel.class);
	}

	@Test
	final void testLogoutConfigJson() {
		context.currentResource(context.resourceResolver().getResource("/content/logout-config/jcr:content/configurations"));
		logoutModel = context.request().adaptTo(LogoutModel.class);
		LogoutConfigBean logoutConfigBean = logoutModel.getLogoutConfigBean();
		validateLogoutConfig(logoutConfigBean);
		Assertions.assertNotNull(logoutModel.getLogoutConfigJson());
		Assertions.assertNotNull(logoutModel.getComponentProp());
	}

	private void validateLogoutConfig(LogoutConfigBean logoutConfig) {
		Assertions.assertNotNull(logoutConfig);
		Assertions.assertNotNull(logoutConfig.getAutoRenewal());
		Assertions.assertNotNull(logoutConfig.getIdleTimeout());
		Assertions.assertNotNull(logoutConfig.getLogoutPopupDuration());
		Assertions.assertNotNull(logoutConfig.getLogoutURL());
		Assertions.assertNotNull(logoutConfig.getRenewURL());
	}
		
	@Test
	final void testtLogoutConfigEmptyResource() {
		context.currentResource(context.resourceResolver().getResource("/content/emptyResource/jcr:content/container"));
		logoutModel = context.request().adaptTo(LogoutModel.class);
		LogoutConfigBean logoutConfigBean = logoutModel.getLogoutConfigBean();
		Assertions.assertNull(logoutConfigBean);
		Assertions.assertNull(logoutModel.getComponentProp());
	}
}

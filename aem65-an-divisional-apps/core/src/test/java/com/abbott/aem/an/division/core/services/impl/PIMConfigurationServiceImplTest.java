package com.abbott.aem.an.division.core.services.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.an.division.core.services.impl.PIMConfigurationServiceImpl.Config;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
class PIMConfigurationServiceImplTest {

	@Mock
	PIMConfigurationServiceImpl pimService;

	@Mock
	Config pimConfigs;

	@Mock
	PIMConfigurationServiceImpl configPimService;

	public final AemContext context = new AemContext();
	final Map<String, Object> properties = new HashMap<>();
	PIMConfigurationServiceImpl pimConfigurationServiceImpl;

	@BeforeEach
	void setUp() throws IOException {

		properties.put("productsRootPath", "/content/an/abbottnutrition/us/en/our-products/products");
		properties.put("usingProxy", false);
		properties.put("productsParentRootPath", "/content/an/abbottnutrition/us/en");
		properties.put("pdpTemplate", "/conf/an/abbottnutrition/settings/wcm/templates/an-product-detail-page");
		properties.put("pimApiUrl", "$[env:ENTERPRISE_SERVICES_URL;default=https://dev2.services.abbott]/quality/api/public/productse");
		properties.put("xApplicationId", "abbottnutrition");
		properties.put("xOriginSecret", "$[secret:ENTERPRISE_SERVICES_SECRET_KEY;default=c5b292d1290fce1c463af73ead3897a8]");
		properties.put("xCountryCode", "US");
		properties.put("xPreferredLanguage", "en");
		properties.put("xSecretHeader", "KHWBMJBE6XZDXFR549KGPCSDU6GCL7TP");
		properties.put("proxyLbAbbottCorp", "proxy.lb.abbott.corp");
		properties.put("unavailableImagePath", "/content/dam/an/abbottnutrition/images/global/no-image-available.png");
		properties.put("environment", "$[env:AB_ENVIRONMENT_NAME;default=undefined]");
		properties.put("runMode", "author");

		pimConfigurationServiceImpl = context.registerInjectActivateService(new PIMConfigurationServiceImpl(), properties);

		configPimService = new PIMConfigurationServiceImpl() {

			@Override
			public String getProductsRootPath() {
				return "/content/an/abbottnutrition/us/en/our-products/products";
			}

			@Override
			public String getProductsParentRootPath() {
				return "/content/an/abbottnutrition/us/en";
			}

			@Override
			public String getPdpTemplate() {
				return "/conf/an/abbottnutrition/settings/wcm/templates/an-product-detail-page";
			}

			@Override
			public String getApiUrl() {
				return "$[env:ENTERPRISE_SERVICES_URL;default=https://dev2.services.abbott]/quality/api/public/productse";
			}

			@Override
			public String getxApplicationId() {
				return "abbottnutrition";
			}

			@Override
			public String getxOriginSecret() {
				return "$[secret:ENTERPRISE_SERVICES_SECRET_KEY;default=c5b292d1290fce1c463af73ead3897a8]";
			}

			@Override
			public String getxCountryCode() {
				return "US";
			}

			@Override
			public String getxPreferredLanguage() {
				return "en";
			}

			@Override
			public String getxSecretHeader() {
				return "KHWBMJBE6XZDXFR549KGPCSDU6GCL7TP";
			}

			@Override
			public String getProxylbAbbottCorp() {
				return "proxy.lb.abbott.corp";
			}

			@Override
			public String unavailableImagePath() {
				return "/content/dam/an/abbottnutrition/images/global/no-image-available.png";
			}

			@Override
			public String getEnvironment() {
				return "$[env:AB_ENVIRONMENT_NAME;default=undefined]";
			}
			
			@Override
			public String getRunMode() {
				return "author";
			}
		};
	}

	@Test
	void getProductsRootPath() {
		assertEquals(configPimService.getProductsRootPath(), pimConfigurationServiceImpl.getProductsRootPath());
	}

	@Test
	void isUsingProxy() {
		assertFalse(pimConfigurationServiceImpl.isUsingProxy());
	}

	@Test
	void getProductsParentRootPath() {
		assertEquals(configPimService.getProductsParentRootPath(),
				pimConfigurationServiceImpl.getProductsParentRootPath());
	}

	@Test
	void getPdpTemplate() {
		assertEquals(configPimService.getPdpTemplate(), pimConfigurationServiceImpl.getPdpTemplate());
	}

	@Test
	void getApiUrl() {
		assertEquals(configPimService.getApiUrl(), pimConfigurationServiceImpl.getApiUrl());
	}

	@Test
	void getxApplicationId() {
		assertEquals(configPimService.getxApplicationId(), pimConfigurationServiceImpl.getxApplicationId());
	}

	@Test
	void getxOriginSecret() {
		assertEquals(configPimService.getxOriginSecret(), pimConfigurationServiceImpl.getxOriginSecret());
	}

	@Test
	void getxSecretHeader() {
		assertEquals(configPimService.getxSecretHeader(), pimConfigurationServiceImpl.getxSecretHeader());
	}

	@Test
	void getxCountryCode() {
		assertEquals(configPimService.getxCountryCode(), pimConfigurationServiceImpl.getxCountryCode());
	}

	@Test
	void getxPreferredLanguage() {
		assertEquals(configPimService.getxPreferredLanguage(), pimConfigurationServiceImpl.getxPreferredLanguage());
	}

	@Test
	void getProxylbAbbottCorp() {
		assertEquals(configPimService.getProxylbAbbottCorp(), pimConfigurationServiceImpl.getProxylbAbbottCorp());
	}

	@Test
	void unavailableImagePath() {
		assertEquals(configPimService.unavailableImagePath(), pimConfigurationServiceImpl.unavailableImagePath());
	}

	@Test
	void getEnvironment() {
		assertEquals(configPimService.getEnvironment(), pimConfigurationServiceImpl.getEnvironment());
	}
	
	@Test
	void getRunMode() {
		assertEquals(configPimService.getRunMode(), pimConfigurationServiceImpl.getRunMode());
	}
}
package com.abbott.aem.an.similac.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.an.similac.core.services.StoreConfigService;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
@ExtendWith(MockitoExtension.class)
public class SimilacConfigModelTest {

	private static final String SERVER_URL = "https://testing-secure.similacstore.com";
	private static final String STORE_NAME = "similac";
	private static final String STORE_IMAGE="/content/dam/an/similac/products/default/deafult_256x255.png";
	private static final String AEM_DOMAIN="https://dev.similac.com";
	@InjectMocks
	private SimilacConfigModel similacConfigModel;

	@Mock
	private StoreConfigService storeConfigService;

	@BeforeEach
	void setUp() {
		when(storeConfigService.getStoreServerUrl()).thenReturn(SERVER_URL);
		when(storeConfigService.getStoreName()).thenReturn(STORE_NAME);
		when(storeConfigService.getDomainName()).thenReturn(AEM_DOMAIN);
		when(storeConfigService.getDefaultImgURL()).thenReturn(STORE_IMAGE);
		
		similacConfigModel.activate();
	}

	@Test
	final void testGetStoreUrl() {
		String storeUrl = similacConfigModel.getStoreUrl();
		assertNotNull(storeUrl);
		assertEquals(SERVER_URL, storeUrl);
	}

	@Test
	final void testGetStoreName() {
		String storeName = similacConfigModel.getStoreName();
		assertNotNull(storeName);
		assertEquals(STORE_NAME, storeName);
	}
	@Test
	final void testGetDomainName() {
		String domainName = similacConfigModel.getStoreDomain();
		assertNotNull(domainName);
		assertEquals(domainName, AEM_DOMAIN);
	}
	@Test
	final void testGetDefaultImage() {
		String defaultImage = similacConfigModel.getDefaultImage();
		assertNotNull(defaultImage);
		assertEquals(defaultImage, STORE_IMAGE);
	}

}

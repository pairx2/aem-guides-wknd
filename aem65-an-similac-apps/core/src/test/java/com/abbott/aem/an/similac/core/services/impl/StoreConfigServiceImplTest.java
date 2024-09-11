package com.abbott.aem.an.similac.core.services.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.an.similac.core.services.impl.StoreConfigServiceImpl.Config;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
@ExtendWith(MockitoExtension.class)
public class StoreConfigServiceImplTest {

	private static final String SERVER_URL = "https://testing-secure.similacstore.com";
	private static final String STORE_NAME = "similac";
	private static final String STORE_IMAGE="/content/dam/an/similac/products/default/deafult_256x255.png";
	private static final String AEM_DOMAIN="https://dev.similac.com";

	@InjectMocks
	private StoreConfigServiceImpl storeConfigServiceImpl;

	@BeforeEach
	void setUp() {
		Config config = mock(Config.class);
		when(config.similacServerUrl()).thenReturn(SERVER_URL);
		when(config.similacStoreName()).thenReturn(STORE_NAME);
		when(config.similacDomainUrl()).thenReturn(AEM_DOMAIN);
		when(config.similacDefaultImgUrl()).thenReturn(STORE_IMAGE);
		storeConfigServiceImpl.activate(config);
	}

	@Test
	final void testGetStoreServerUrl() {
		String serverUrl = storeConfigServiceImpl.getStoreServerUrl();
		assertNotNull(serverUrl);
		assertEquals(SERVER_URL, serverUrl);
	}

	@Test
	final void testGetStoreName() {
		String storeName = storeConfigServiceImpl.getStoreName();
		assertNotNull(storeName);
		assertEquals(STORE_NAME, storeName);
	}
	@Test
	final void testGetDomainName() {
		String storeName = storeConfigServiceImpl.getDomainName();
		assertNotNull(storeName);
		assertEquals(AEM_DOMAIN, storeName);
	}
	@Test
	final void testGetDefaultImgURL() {
		String storeName = storeConfigServiceImpl.getDefaultImgURL();
		assertNotNull(storeName);
		assertEquals(STORE_IMAGE, storeName);
	}

}
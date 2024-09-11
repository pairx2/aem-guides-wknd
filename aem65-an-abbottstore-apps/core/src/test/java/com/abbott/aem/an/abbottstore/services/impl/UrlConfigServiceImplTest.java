package com.abbott.aem.an.abbottstore.services.impl;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
class UrlConfigServiceImplTest {

	/** The ctx. */
	private final AemContext ctx = new AemContext();

	private UrlConfigServiceImpl storeConfigServiceImpl;

	private static final String ABBOTT_SERVER_URL = "https://dev-secure.abbottstore.com";

	private static final String SIMILAC_SERVER_URL = "https://dev-secure.similacstore.com";

	private static final String GLUCERNA_SERVER_URL = "https://dev-secure.glucernastore.com";

	private static final String ABBOTT_AEM_SERVER_URL = "https://dev.abbottstore.com";

	private static final String GLUCERNA_AEM_SERVER_URL = "https://dev.glucernastore.com";

	private static final String SIMILAC_AEM_SERVER_URL = "https://dev.similacstore.com";

	private static final String NEW_SIMILAC_SERVER_URL = "http://dev-secure.similac.com";

	private static final String ABBOTT_VARIATION = "abbott.abbottstore";

	private static final String SIMILAC_VARIATION = "abbott.similac";

	private static final String GLUCERNA_VARIATION = "abbott.glucerna";

	private static final String ABBOTT_STORE = "abbott";

	private static final String SIMILAC_STORE = "similac";

	private static final String NEW_SIMILAC_STORE = "new_similac";

	private static final String GLUCERNA_STORE = "glucerna";

	private static final String ABBOTT_AEM_URL = "/content/abbott/";

	private static final String GLUCERNA_AEM_URL = "/content/glucerna/";

	private static final String SIMILAC_AEM_URL = "/content/similac/";

	private static final String UNAVAILABLE_IMAGE_PATH = "/content/dam/abbott/mandatory/Unavailable-Product-1300x1300.jpg";


	private static final String DEFAULT = "default";

	@BeforeEach
	void setUp() {
		storeConfigServiceImpl = ctx.registerInjectActivateService(new UrlConfigServiceImpl());
	}

	@Test
	void testGetStore() {
		assertEquals(ABBOTT_SERVER_URL, storeConfigServiceImpl.getStore(ABBOTT_VARIATION));
		assertEquals(SIMILAC_SERVER_URL, storeConfigServiceImpl.getStore(SIMILAC_VARIATION));
		assertEquals(GLUCERNA_SERVER_URL, storeConfigServiceImpl.getStore(GLUCERNA_VARIATION));
		assertEquals(ABBOTT_SERVER_URL, storeConfigServiceImpl.getStore(DEFAULT));
	}

	@Test
	void testGetMagentoStore() {
		assertEquals(ABBOTT_SERVER_URL, storeConfigServiceImpl.getMagentoStore(ABBOTT_STORE));
		assertEquals(SIMILAC_SERVER_URL, storeConfigServiceImpl.getMagentoStore(SIMILAC_STORE));
		assertEquals(GLUCERNA_SERVER_URL, storeConfigServiceImpl.getMagentoStore(GLUCERNA_STORE));
		assertEquals(ABBOTT_SERVER_URL, storeConfigServiceImpl.getMagentoStore(DEFAULT));
		assertEquals(NEW_SIMILAC_SERVER_URL, storeConfigServiceImpl.getMagentoStore(NEW_SIMILAC_STORE));


	}

	@Test
	void testGetAemServer() {
		assertEquals(ABBOTT_AEM_SERVER_URL, storeConfigServiceImpl.getAemServer(ABBOTT_VARIATION));
		assertEquals(SIMILAC_AEM_SERVER_URL, storeConfigServiceImpl.getAemServer(SIMILAC_VARIATION));
		assertEquals(GLUCERNA_AEM_SERVER_URL, storeConfigServiceImpl.getAemServer(GLUCERNA_VARIATION));
		assertEquals(ABBOTT_AEM_SERVER_URL, storeConfigServiceImpl.getAemServer(DEFAULT));
	}

	@Test
	void testGetMagentoStoreCode() {
		assertEquals(ABBOTT_STORE, storeConfigServiceImpl.getMagentoStoreCode(ABBOTT_AEM_URL));
		assertEquals(SIMILAC_STORE, storeConfigServiceImpl.getMagentoStoreCode(SIMILAC_AEM_URL));
		assertEquals(GLUCERNA_STORE, storeConfigServiceImpl.getMagentoStoreCode(GLUCERNA_AEM_URL));
		assertEquals(null, storeConfigServiceImpl.getMagentoStoreCode(DEFAULT));
	}
	@Test
	void testGetUnavailableProductImagePath() {
		assertEquals(UNAVAILABLE_IMAGE_PATH, storeConfigServiceImpl.getUnavailableProductImagePath());
	}
	@Test
	void testGetHeaderFooterId() {
		assertTrue(storeConfigServiceImpl.getHeaderFooterId().toString().contains("abbottHeaderStaticId"));
	}
	@Test
	void testGetStoreServers() {
		assertTrue(storeConfigServiceImpl.getStoreServers().toString().contains("abbottMagentoServer"));
	}
	@Test
	void testLoginSiteKey() {
		assertNull(storeConfigServiceImpl.getLoginSiteKey());
	}
	@Test
	void testLoginSecretKey() {
		assertNull(storeConfigServiceImpl.getLoginSecretKey());
	}
	@Test
	void testGetLoginAemMagentoSecretKey() {
		assertNull(storeConfigServiceImpl.getLoginAemMagentoSecretKey());
	}
}

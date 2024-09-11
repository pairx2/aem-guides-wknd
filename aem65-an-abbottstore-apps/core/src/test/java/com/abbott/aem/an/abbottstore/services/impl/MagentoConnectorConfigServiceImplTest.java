package com.abbott.aem.an.abbottstore.services.impl;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;


@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
class MagentoConnectorConfigServiceImplTest {

    /** The ctx. */
    private final AemContext ctx = new AemContext();

    private MagentoConnectorConfigServiceImpl magentoConnectorConfigServiceImpl;

    private static final String ABBOTT_SERVER_URL = "https://int-dev-master-nny7joy-qyzzcwjj2wjmq.us-3.magentosite.cloud/";

    private static final String SIMILAC_SERVER_URL = "https://dev-apollo.similacstore.com/";

    private static final String GLUCERNA_SERVER_URL = "https://dev-apollo.glucernastore.com/";

    @BeforeEach
    void setUp() {
        magentoConnectorConfigServiceImpl = ctx.registerInjectActivateService(new MagentoConnectorConfigServiceImpl());
    }

    @Test
    void testGetAbbottStoreServerUrlConfig() {
        assertEquals(ABBOTT_SERVER_URL, magentoConnectorConfigServiceImpl.getAbbottStoreServerUrlConfig());
    }

    @Test
    void testGetGlucernaStoreServerUrlConfig() {
        assertEquals(GLUCERNA_SERVER_URL, magentoConnectorConfigServiceImpl.getGlucernaStoreUrlConfig());
    }

    @Test
    void testGetSimilacStoreServerUrlConfig() {
        assertEquals(SIMILAC_SERVER_URL, magentoConnectorConfigServiceImpl.getSimilacStoreServerUrlConfig());
    }
}
package com.abbott.aem.platform.search.coveoconnector.core.service.impl;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith({MockitoExtension.class, AemContextExtension.class})
class CacheClearServiceImplTest {
    private final AemContext context = new AemContext();

    @InjectMocks
    private CacheClearServiceImpl cacheClearService;

    @BeforeEach
    void setUp() {
        Map<String, String> keyValueConfig = new HashMap<>();
        keyValueConfig.put("aemPurgeKey", "testPurgeKey");
        keyValueConfig.put("aemPublishHost", "testPublishHost");
        keyValueConfig.put("aemEdgeKey", "testEdgeKey");
        keyValueConfig.put("cdnAccessKey", "testAccessKey");
        keyValueConfig.put("cdnSecretKey", "testSecretKey");

        context.registerInjectActivateService(cacheClearService, keyValueConfig);
    }

    @Test
    void testGetPurgeKey() {
        assertEquals("testPurgeKey", cacheClearService.getPurgeKey());
    }

    @Test
    void testGetPublishHosty() {
        assertEquals("testPublishHost", cacheClearService.getPublishHost());
    }

    @Test
    void testGetEdgeKey() {
        assertEquals("testEdgeKey", cacheClearService.getEdgeKey());
    }

    @Test
    void testGetAccessKey() {
        assertEquals("testAccessKey", cacheClearService.getAccessKey());
    }

    @Test
    void testGetSecretKey() {
        assertEquals("testSecretKey", cacheClearService.getSecretKey());
    }
}

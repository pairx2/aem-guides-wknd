package com.abbott.aem.cloud.api.configuration.impl;

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
import static org.junit.jupiter.api.Assertions.assertNull;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class ESLDomainURLServiceImplTest {
    @InjectMocks
    private ESLDomainURLServiceImpl eslDomainURLService;

    private final AemContext context = new AemContext();

    @BeforeEach
    void onBefore() {
        Map<String, Object> keyValueConfig = new HashMap<>();
        keyValueConfig.put("getOriginSecret", "secret");

        context.registerInjectActivateService(eslDomainURLService, keyValueConfig);
    }

    @Test
    void testGetHostName_default() {
        String expected  = "https://dev2.services.abbott";
        assertEquals(expected, eslDomainURLService.getHostName());
    }

    @Test
    void testGetHostName_nonDefault() {
        String expected  = "abbott.cloud";
        context.registerInjectActivateService(eslDomainURLService, "getHostName", expected);
        assertEquals(expected, eslDomainURLService.getHostName());
    }

    @Test
    void testGetOriginSecret() {
        String expected  = "secret";
        assertEquals(expected, eslDomainURLService.getOriginSecret());
    }

    @Test
    void testGetAccessKey() {
        assertNull(eslDomainURLService.getAccessKey());
    }

}
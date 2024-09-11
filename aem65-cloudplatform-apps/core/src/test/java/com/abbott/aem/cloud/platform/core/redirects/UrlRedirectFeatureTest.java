package com.abbott.aem.cloud.platform.core.redirects;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.featureflags.ExecutionContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashMap;
import java.util.Map;

import static junit.framework.Assert.assertFalse;
import static junit.framework.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class UrlRedirectFeatureTest {
    @InjectMocks
    UrlRedirectFeature urlRedirectFeature;

    private final AemContext context = new AemContext();

    @Mock
    ExecutionContext executionContext;

    @BeforeEach
    void setUp() {
        context.registerInjectActivateService(urlRedirectFeature, new HashMap<>());
    }

    @Test
    void isEnabled() {
        Map<String, Object> configProps = new HashMap<>();
        configProps.put("getCurrentEnvironment", "PROD");
        context.registerInjectActivateService(urlRedirectFeature, configProps);

        boolean actual = urlRedirectFeature.isEnabled(executionContext);
        assertTrue(actual);
    }

    @Test
    void isDisabled() {
        boolean actual = urlRedirectFeature.isEnabled(executionContext);
        assertFalse(actual);
    }

    @Test
    void getName() {
        String expected = "manage-url-redirect";
        String actual = urlRedirectFeature.getName();
        assertEquals(expected, actual);
    }

    @Test
    void testGetDescription() {
        String expected = "This feature flag enables or disables the URL Redirect feature";
        String actual = urlRedirectFeature.getDescription();
        assertEquals(expected, actual);
    }
}
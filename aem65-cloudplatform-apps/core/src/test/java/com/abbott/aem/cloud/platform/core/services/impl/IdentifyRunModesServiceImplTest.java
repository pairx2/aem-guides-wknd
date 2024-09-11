package com.abbott.aem.cloud.platform.core.services.impl;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class IdentifyRunModesServiceImplTest {
    @InjectMocks
    private IdentifyRunModesServiceImpl identifyRunModesService;

    private final AemContext context = new AemContext();

    @BeforeEach
    public void setUp() {
        Map<String, Object> keyValue = new HashMap<>();
        keyValue.put("run.modes", new String[]{"author", "publish"});
        context.registerInjectActivateService(identifyRunModesService, keyValue);
    }

    @Test
    void testGetAllRunModes() {
        // Call the service method to get run modes
        List<String> runModesList = identifyRunModesService.getAllRunModes();

        // Verify the result
        assertTrue(runModesList.contains("author"));
    }

    @Test
    void testGetAllRunModesWhenNullProperty() {
        context.registerInjectActivateService(identifyRunModesService, "run.modes", null);
        // Call the service method to get run modes
        List<String> runModesList = identifyRunModesService.getAllRunModes();

        // Verify the result
        assertTrue(runModesList.isEmpty());
    }
}

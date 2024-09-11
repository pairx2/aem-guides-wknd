package com.abbott.aem.cloud.platform.core.cloudconfig.impl;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class CloudConfigurationImplTest {

    private final AemContext context = new AemContext(ResourceResolverType.RESOURCERESOLVER_MOCK);

    @InjectMocks
    CloudConfigurationImpl cloudConfiguration;

    @Mock
    Resource resource;

    @Test
    void init() {
        context.build().resource("/content/test", "props", "val");
        context.currentResource("/content/test");
        cloudConfiguration.init();
    }

    @Test
    void getTitle() {
        String actual = cloudConfiguration.getTitle();
        assertNull(actual);
    }

    @Test
    void getConfigPath() {
        String actual = cloudConfiguration.getConfigPath();
        assertNull(actual);
    }

    @Test
    void getItemPath() {
        String actual = cloudConfiguration.getItemPath();
        assertNull(actual);
    }

    @Test
    void getResource() {
        Resource actual = cloudConfiguration.getResource();
        assertEquals(resource, actual);
    }
}
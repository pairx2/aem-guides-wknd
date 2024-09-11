package com.abbott.aem.platform.common.components.services.impl;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.day.cq.wcm.api.components.Component;
import com.abbott.aem.platform.common.components.services.ProxyPaths;

@ExtendWith(MockitoExtension.class)
class ProxyComponentServiceImplTest {

    @Mock
    private ResourceResolverFactory resolverFactory;

    @Mock
    private Component component;

    @Mock
    private Component superComponent;

    @Mock
    private ValueMap valueMap;

    @Mock
    private ValueMap superValueMap;

    @InjectMocks
    private ProxyComponentServiceImpl proxyComponentService;

    @BeforeEach
    public void setup() {
        when(component.getProperties()).thenReturn(valueMap);
    }

    @Test
    void testGetProxyPath_WhenProxyPathExists() {
        when(valueMap.get("linkProxy", String.class)).thenReturn("proxyPath");

        String result = proxyComponentService.getProxyPath(component, ProxyPaths.linkProxy);

        assertEquals("proxyPath", result);
    }

    @Test
    void testGetProxyPath_WhenProxyPathExistsInSuperComponent() {
        when(valueMap.get("linkProxy", String.class)).thenReturn(null);
        when(component.getSuperComponent()).thenReturn(superComponent);
        when(superComponent.getProperties()).thenReturn(superValueMap);
        when(superValueMap.get("linkProxy", String.class)).thenReturn("superProxyPath");

        String result = proxyComponentService.getProxyPath(component, ProxyPaths.linkProxy);

        assertEquals("superProxyPath", result);
    }

    @Test
    void testGetProxyPath_WhenProxyPathIsNullAndSuperComponentIsNull() {
        when(valueMap.get("linkProxy", String.class)).thenReturn(null);
        when(component.getSuperComponent()).thenReturn(null);

        String result = proxyComponentService.getProxyPath(component, ProxyPaths.linkProxy);

        assertEquals("abbott-platform/components/content/atoms/link/v1/link", result);
    }

    @Test
    void testGetProxyPath_WhenProxyPathMatchesProxyPaths() {
        when(valueMap.get("linkProxy", String.class)).thenReturn(null);
        when(component.getSuperComponent()).thenReturn(null);

        for (ProxyPaths proxyPath : ProxyPaths.values()) {
            String result = proxyComponentService.getProxyPath(component, proxyPath);
            assertEquals(proxyPath.getPath(), result);
        }
    }

}
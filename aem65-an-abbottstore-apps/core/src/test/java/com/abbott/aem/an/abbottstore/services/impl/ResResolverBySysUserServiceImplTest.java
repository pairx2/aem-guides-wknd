package com.abbott.aem.an.abbottstore.services.impl;

import junit.framework.Assert;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashMap;
import java.util.Map;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ResResolverBySysUserServiceImplTest {

    @InjectMocks
    ResResolverBySysUserServiceImpl resResolverBySysUserService;

    @Mock
    ResourceResolverFactory resourceResolverFactory;

    @Mock
    ResourceResolver resourceResolver;

    Map<String, Object> userParamMap = new HashMap<>();

    @BeforeEach
    void setup() throws LoginException {
        when(resourceResolverFactory.getServiceResourceResolver(userParamMap)).thenReturn(resourceResolver);
    }

    @Test
    void getReadOnlyResourceResolver() throws LoginException {
        userParamMap.put(ResourceResolverFactory.SUBSERVICE, "readService");
        Assert.assertNotNull(resResolverBySysUserService.getReadOnlyResourceResolver());
    }

    @Test
    void getReadAndWriteResourceResolver() throws LoginException {
        userParamMap.put(ResourceResolverFactory.SUBSERVICE, "writeService");
        Assert.assertNotNull(resResolverBySysUserService.getReadAndWriteResourceResolver());
    }

    @Test
    void getResourceResolverException() throws LoginException {
        userParamMap.put(ResourceResolverFactory.SUBSERVICE, "writeService");
        Assert.assertNotNull(resResolverBySysUserService.getReadAndWriteResourceResolver());
    }
}
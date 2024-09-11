package com.abbott.aem.adc.freestylelibrede.services.impl;

import junit.framework.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.services.CsrConfigurationService;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class CsrConfigurationServiceImplTest {

    @Mock
    CsrConfigurationServiceImpl.Configuration configuration;

    CsrConfigurationService csrConfigurationService;

    @BeforeEach
    void setUp() {
        csrConfigurationService = new CsrConfigurationServiceImpl();
        Mockito.when(configuration.csr_orgid()).thenReturn("orgId");
        Mockito.when(configuration.csr_chat_script()).thenReturn("http://chatScript");
        Mockito.when(configuration.csr_chat_url()).thenReturn("http://chatUrl");
        Mockito.when(configuration.csr_chat_liveAgent_ContentURL()).thenReturn("http://ChatLiveAgentContentUrl");
        Mockito.when(configuration.csr_chat_liveAgent_URL()).thenReturn("http://ChatLiveAgentUrl");
        Mockito.when(configuration.csr_chat_init()).thenReturn("http://ChatInit");
        Mockito.when(configuration.csr_endpoint()).thenReturn("http://endpoint");
        Mockito.when(configuration.csr_chat_deploymentId()).thenReturn("chatDeploymentId");
        Mockito.when(configuration.csr_chat_buttonId()).thenReturn("chatButtonID");

        ((CsrConfigurationServiceImpl)csrConfigurationService).init(configuration);
    }

    @Test
    void getOrgId() {
        Assert.assertEquals("orgId",csrConfigurationService.getOrgId());
    }

    @Test
    void getChatScript() {
        Assert.assertEquals("http://chatScript",csrConfigurationService.getChatScript());
    }

    @Test
    void getChatUrl() {
        Assert.assertEquals("http://chatUrl",csrConfigurationService.getChatUrl());
    }

    @Test
    void getChatLiveAgentContentUrl() {
        Assert.assertEquals("http://ChatLiveAgentContentUrl",csrConfigurationService.getChatLiveAgentContentUrl());
    }

    @Test
    void getChatLiveAgentUrl() {
        Assert.assertEquals("http://ChatLiveAgentUrl",csrConfigurationService.getChatLiveAgentUrl());
    }

    @Test
    void getChatInit() {
        Assert.assertEquals("http://ChatInit",csrConfigurationService.getChatInit());
    }

    @Test
    void getEndpoint() {
        Assert.assertEquals("http://endpoint",csrConfigurationService.getEndpoint());
    }

    @Test
    void getChatDeploymentId() {
        Assert.assertEquals("chatDeploymentId",csrConfigurationService.getChatDeploymentId());
    }

    @Test
    void getChatButtonId() {
        Assert.assertEquals("chatButtonID",csrConfigurationService.getChatButtonId());
    }
}
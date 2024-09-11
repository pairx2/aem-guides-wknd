package com.abbott.aem.adc.freestylelibrede.services.impl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.services.ConfigurationService;

import junit.framework.Assert;

@ExtendWith(MockitoExtension.class)
class ConfigurationServiceImplTest {
    @Mock
    private ConfigurationServiceImpl.Configuration configuration;
    private ConfigurationService configurationService;
    @BeforeEach
    void activate() {
    	configurationService = new ConfigurationServiceImpl();
    	Mockito.when(configuration.graphql_backend_endpoint()).thenReturn("graphql.backend.endpoint");
        Mockito.when(configuration.i18n_service_url()).thenReturn("i18n.service.url");
        Mockito.when(configuration.esl_service_endpoint()).thenReturn("esl.service.endpoint");
        ((ConfigurationServiceImpl)configurationService).activate(configuration);
    }

    @Test
    void getPropertiesMap() {
        Assert.assertEquals("graphql.backend.endpoint",configurationService.getPropertiesMap().get("graphql.backend.endpoint"));
        Assert.assertEquals("i18n.service.url",configurationService.getPropertiesMap().get("i18n.service.url"));
        Assert.assertEquals("esl.service.endpoint",configurationService.getPropertiesMap().get("esl.service.endpoint"));
    }
}
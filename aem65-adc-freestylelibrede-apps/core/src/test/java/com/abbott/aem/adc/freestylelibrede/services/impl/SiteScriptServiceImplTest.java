package com.abbott.aem.adc.freestylelibrede.services.impl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.services.ConfigurationService;
import com.abbott.aem.adc.freestylelibrede.services.SiteScriptService;

import junit.framework.Assert;

@ExtendWith(MockitoExtension.class)
class SiteScriptServiceImplTest {
    @Mock
    private SiteScriptServiceImpl.Configuration configuration;
    private SiteScriptService siteScriptService;
    @BeforeEach
    void activate() {
    	siteScriptService = new SiteScriptServiceImpl();    	
    	Mockito.when(configuration.siteScript()).thenReturn("siteScript");
        Mockito.when(configuration.enableSiteScript()).thenReturn("true");
        
        ((SiteScriptServiceImpl)siteScriptService).activate(configuration);
    }

    @Test
    void getSiteScript() {
        Assert.assertEquals("siteScript",siteScriptService.getPropertiesMap().get("siteScript"));
    }
    @Test
    void getEnableSiteScript() {
        Assert.assertEquals("true",siteScriptService.getPropertiesMap().get("enableSiteScript"));
    }
}
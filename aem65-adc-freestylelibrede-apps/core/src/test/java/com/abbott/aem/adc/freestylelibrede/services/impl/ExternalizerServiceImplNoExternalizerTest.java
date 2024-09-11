package com.abbott.aem.adc.freestylelibrede.services.impl;

import com.abbott.aem.adc.freestylelibrede.services.ExternalizerService;
import com.day.cq.commons.Externalizer;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import junit.framework.Assert;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.settings.SlingSettingsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashSet;
import java.util.Set;

@ExtendWith({AemContextExtension.class,MockitoExtension.class})
class ExternalizerServiceImplNoExternalizerTest {

    public final AemContext context = new AemContext();

    @Mock
    SlingSettingsService slingSettingsService;

    @InjectMocks
    ExternalizerService externalizerService = new ExternalizerServiceImpl();


    @BeforeEach
    void setUp() {
        context.registerService(SlingSettingsService.class,slingSettingsService);


    }


    @Test
    void doNotExternalize() {
        Assert.assertEquals("/content/adc/freestylelibrede/de/de/v3",externalizerService.externalizeIfNecessary("/content/adc/freestylelibrede/de/de/v3",context.resourceResolver()));
    }
}
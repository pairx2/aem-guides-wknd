package com.abbott.aem.adc.freestylelibrede.services.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.abbott.aem.adc.freestylelibrede.services.IdentifyRunModesService;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.settings.SlingSettingsService;

import org.junit.Ignore;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.services.ExternalizerService;
import com.day.cq.commons.Externalizer;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import junit.framework.Assert;

@ExtendWith({AemContextExtension.class,MockitoExtension.class})
class ExternalizerServiceImplTest {

    public final AemContext context = new AemContext();

    @Mock
    private IdentifyRunModesService identifyRunModesService;

    @InjectMocks
    ExternalizerService externalizerService = new ExternalizerServiceImpl();

    @Mock
    Externalizer externalizer;

    @BeforeEach
    void setUp() {
        context.registerService(IdentifyRunModesService.class,identifyRunModesService);
        context.registerAdapter(ResourceResolver.class, Externalizer.class,externalizer);


    }

    @Test
    void doNotExternalizeIfPathNull() {
        Assert.assertNull(externalizerService.externalizeIfNecessary(null,context.resourceResolver()));
    }
    @Test
    void doNotExternalizeIfPathEmpty() {
        Assert.assertEquals("",externalizerService.externalizeIfNecessary("",context.resourceResolver()));
    }
    @Test
    void doNotExternalizeIfNotAbsolutePath() {
        Assert.assertEquals("https://www.google.com",externalizerService.externalizeIfNecessary("https://www.google.com",context.resourceResolver()));
    }
    @Ignore
    void externalizeAndAppendHtmlExtensionOnAuthor() {

        List<String> authorModeSet = new ArrayList<>();
        authorModeSet.add("author");
        Mockito.when(identifyRunModesService.getAllRunModes()).thenReturn(authorModeSet);

        Mockito.when(externalizer.externalLink(Mockito.any(), Mockito.anyString(),Mockito.anyString())).thenReturn("author.freestylelibre.de/libre");

        Assert.assertEquals("author.freestylelibre.de/libre.html",externalizerService.externalizeIfNecessary("/content/adc/freestylelibrede/de/de/v3",context.resourceResolver()));

        Mockito.verify(externalizer).externalLink(context.resourceResolver(),"author","/content/adc/freestylelibrede/de/de/v3");
    }

    @Test
    void externalizeAndAppendHtmlExtensionOnDev() {

        List<String> authorModeSet = new ArrayList<>();
        authorModeSet.add("dev");
        Mockito.when(identifyRunModesService.getAllRunModes()).thenReturn(authorModeSet);

        Mockito.when(externalizer.externalLink(Mockito.any(), Mockito.anyString(),Mockito.anyString())).thenReturn("dev.freestylelibre.de/libre");

        Assert.assertEquals("dev.freestylelibre.de/libre.html",externalizerService.externalizeIfNecessary("/content/adc/freestylelibrede/de/de/v3",context.resourceResolver()));
        Mockito.verify(externalizer).externalLink(context.resourceResolver(),"adc_freestylelibre_de","/content/adc/freestylelibrede/de/de/v3");
    }
    @Test
    void externalizeAndAppendHtmlExtensionOnQa() {

        List<String> authorModeSet = new ArrayList<>();
        authorModeSet.add("qa");
        Mockito.when(identifyRunModesService.getAllRunModes()).thenReturn(authorModeSet);

        Mockito.when(externalizer.externalLink(Mockito.any(), Mockito.anyString(),Mockito.anyString())).thenReturn("qa.freestylelibre.de/libre");

        Assert.assertEquals("qa.freestylelibre.de/libre.html",externalizerService.externalizeIfNecessary("/content/adc/freestylelibrede/de/de/v3",context.resourceResolver()));

        Mockito.verify(externalizer).externalLink(context.resourceResolver(),"adc_freestylelibre_de","/content/adc/freestylelibrede/de/de/v3");
    }

    @Test
    void externalizeIfNecessary() {
        Mockito.when(externalizer.externalLink(Mockito.any(), Mockito.anyString(),Mockito.anyString())).thenReturn("www.freestylelibre.de/libre");
        Assert.assertEquals("www.freestylelibre.de/libre",externalizerService.externalizeIfNecessary("/content/adc/freestylelibrede/de/de/v3",context.resourceResolver()));
        Mockito.verify(externalizer).externalLink(context.resourceResolver(),"adc_freestylelibre_de","/content/adc/freestylelibrede/de/de/v3");
    }
}
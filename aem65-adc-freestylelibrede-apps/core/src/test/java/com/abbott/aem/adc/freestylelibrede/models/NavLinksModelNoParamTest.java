package com.abbott.aem.adc.freestylelibrede.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.models.spi.Injector;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.models.injector.ExternalizeInjector;
import com.abbott.aem.adc.freestylelibrede.services.ExternalizerService;

import static org.mockito.ArgumentMatchers.any;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class NavLinksModelNoParamTest extends BaseModelTest<NavLinksModel> {

    private final AemContext context = new AemContext();

    @InjectMocks
    ExternalizeInjector externalizeInjector = new ExternalizeInjector();

    @Mock
    ExternalizerService externalizerService;

    NavLinksModel model;


    @Test
    void getTargetLinkNoParam() {
        context.registerService(Injector.class, externalizeInjector);
        Mockito.when(externalizerService.externalizeIfNecessary(any(), any())).thenReturn("www.freestylelibre.de/page");
        model = context.load().json("/com.abbott.aem.adc.freestylelibrede.models.NavLinksNoTargetParamModel.json", "/content/page/component").adaptTo(NavLinksModel.class);
        Assert.assertEquals("www.freestylelibre.de/page", model.getTargetLink());
    }

    @Test
    void getTargetLinkNoLink() {
        context.registerService(Injector.class, externalizeInjector);
        Mockito.when(externalizerService.externalizeIfNecessary(any(), any())).thenReturn(null);
        model = loadModel("/com.abbott.aem.adc.freestylelibrede.models.NavLinksNoTargetParamModel.json", NavLinksModel.class);
        Assert.assertEquals(null, model.getTargetLink());
    }

}
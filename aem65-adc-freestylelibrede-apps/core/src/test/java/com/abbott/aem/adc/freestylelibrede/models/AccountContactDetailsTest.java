package com.abbott.aem.adc.freestylelibrede.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import junit.framework.Assert;
import org.apache.sling.models.spi.Injector;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.models.injector.ExternalizeInjector;
import com.abbott.aem.adc.freestylelibrede.services.ExternalizerService;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class AccountContactDetailsTest extends BaseModelTest {

    public final AemContext context = new AemContext();

    private AccountContactDetails model;

    @Mock
    ExternalizerService externalizerService;

    @InjectMocks
    private ExternalizeInjector injector = new ExternalizeInjector();

    @BeforeEach
    void setup(){
        Mockito.when(externalizerService.externalizeIfNecessary(Mockito.anyString(),Mockito.any())).thenReturn("Success!!!");
        context.registerService(Injector.class,injector);
        model = (AccountContactDetails) loadModel(AccountContactDetails.class);
    }
    @Test
    void getCommunicationPrefLink() {
        Assert.assertEquals("Success!!!",model.getCommunicationPrefLink());
    }
}
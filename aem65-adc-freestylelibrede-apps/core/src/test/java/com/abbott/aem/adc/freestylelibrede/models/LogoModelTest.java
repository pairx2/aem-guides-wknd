package com.abbott.aem.adc.freestylelibrede.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.models.spi.Injector;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
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
class LogoModelTest extends BaseModelTest<LogoModel>{

    @Mock
    ExternalizerService externalizerService;

    @InjectMocks
    private ExternalizeInjector injector = new ExternalizeInjector();

    private final AemContext context = new AemContext();

    LogoModel model;
    @BeforeEach
    void setUp() {
    	Mockito.when(externalizerService.externalizeIfNecessary(any(), any())).thenReturn("/content/adc/freestylelibrede/de/de/v3/homepage");
		context.registerService(Injector.class, injector);
		context.registerService(ExternalizerService.class, externalizerService);
		model = loadModel(LogoModel.class);
    }

    @Test
    void getLogoImage() {
        Assert.assertEquals("/content/dam/adc/freestylelibrede/de/de/v3/logo-image.jpg",model.getLogoImage());
    }

    @Test
    void getAltText() {
        Assert.assertEquals("Image Alt",model.getAltText());
    }

    @Test
    void getLogoTarget() {
        Assert.assertEquals("/content/adc/freestylelibrede/de/de/v3/homepage",model.getLogoTarget());
    }

    @Test
    void getOpenTab() {
        Assert.assertEquals("_blank",model.getOpenTab());
    }

    @Test
    void getCssClassName() {
        Assert.assertEquals("custom-css",model.getCssClassName());
    }

    @Test
    void getLogoEvent() {
        Assert.assertEquals("logoEvent",model.getLogoEvent());
    }

    
}
package com.abbott.aem.adc.freestylelibrede.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
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
class HeaderModelTest extends BaseModelTest<HeaderModel>{

    @Mock
    ExternalizerService externalizerService;

    @InjectMocks
    private ExternalizeInjector injector = new ExternalizeInjector();

    private final AemContext context = new AemContext();

    Resource headerLoginResource;
    Resource accountOverviewPage;
    HeaderModel model;
    @BeforeEach
    void setUp() {
    	Mockito.when(externalizerService.externalizeIfNecessary(any(), any())).thenReturn("/content/adc/freestylelibrede/de/de/v3/homepage");
		context.registerService(Injector.class, injector);
		context.registerService(ExternalizerService.class, externalizerService);
		model = loadModel(HeaderModel.class);
    }

    @Test
    void getRendition() {
        Assert.assertEquals("v1-rendition",model.getRendition());
    }

    @Test
    void getDesktopImagePath() {
        Assert.assertEquals("/content/dam/adc/freestylelibrede/de/de/v3/fsl/desktop-image1.jpg",model.getLinksHeader().get(0).getDesktopImagePath());
    }

    @Test
    void getMobileImagePath() {
        Assert.assertEquals("/content/dam/adc/freestylelibrede/de/de/v3/fsl/mobile-image1.jpg",model.getLinksHeader().get(0).getMobileImagePath());
    }

    @Test
    void getImageAlt() {
        Assert.assertEquals("Image 1",model.getLinksHeader().get(0).getImageAlt());
    }

    @Test
    void getServiceNumber() {
        Assert.assertEquals("123456",model.getLinksHeader().get(0).getServiceNumber());
    }

    @Test
    void getLink() {
        Assert.assertEquals("/content/adc/freestylelibrede/de/de/v3/homepage",model.getLinksHeader().get(0).getLink());
    }

    @Test
    void getOpenTab() {
        Assert.assertEquals("yes",model.getLinksHeader().get(0).getOpenTab());
    }

    @Test
    void getImageLabel() {
        Assert.assertEquals("Image 1",model.getLinksHeader().get(0).getImageLabel());
    }

    @Test
    void getMiniCart() {
        Assert.assertEquals("1",model.getLinksHeader().get(0).getMiniCart());
    }  
    
    @Test
    void getHeaderLinkEvent() {
        Assert.assertEquals("headerLinkEvent",model.getLinksHeader().get(0).getHeaderLinkEvent());
    }   

}
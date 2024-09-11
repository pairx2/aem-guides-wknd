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
import com.abbott.aem.adc.freestylelibrede.services.SickFundService;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class SickFundSearchModelTest extends  BaseModelTest{

    public final AemContext context = new AemContext();

    private SickFundSearchModel model;

    @Mock
    ExternalizerService externalizerService;

    @InjectMocks
    private ExternalizeInjector injector = new ExternalizeInjector();

    @Mock
    SickFundService sickFundService;


    @BeforeEach
    void setup(){
        Mockito.when(externalizerService.externalizeIfNecessary(Mockito.anyString(),Mockito.any())).thenReturn("Success!!!");
        context.registerService(Injector.class,injector);
        context.registerService(SickFundService.class, sickFundService);

        model = (SickFundSearchModel) loadModel(SickFundSearchModel.class);
    }

    @Test
    void getHeading() {
        Assert.assertEquals("Heading",model.getHeading());
    }

    @Test
    void getSubHeading() {
        Assert.assertEquals("Sub Heading",model.getSubHeading());
    }

    @Test
    void getMoreInfoLabel() {
        Assert.assertEquals("More Info Label",model.getMoreInfoLabel());
    }

    @Test
    void getMoreInfoPath() {
        Assert.assertEquals("Success!!!",model.getMoreInfoPath());
    }

    @Test
    void getPdfRootPath() {
        Assert.assertEquals("/content/dam/sick-funds",model.getPdfRootPath());
    }

    @Test
    void getBackgroundImagePath() {
        Assert.assertEquals("/content/dam/backgroundImage",model.getBackgroundImagePath());
    }

    @Test
    void getPdfMap() {
        Assert.assertTrue( model.getSickFundsPDFList().isEmpty());
        Mockito.verify(sickFundService).listSickFunds(model.resourceResolver,model.getPdfRootPath());
    }
}
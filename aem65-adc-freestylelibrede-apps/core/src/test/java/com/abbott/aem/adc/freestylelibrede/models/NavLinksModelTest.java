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

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class NavLinksModelTest extends BaseModelTest <NavLinksModel>{

    private final AemContext context = new AemContext();

    @InjectMocks
    ExternalizeInjector externalizeInjector = new ExternalizeInjector();

    @Mock
    ExternalizerService externalizerService;

    NavLinksModel model;

    @BeforeEach
    void setup(){
        context.registerService( Injector.class,externalizeInjector);
        Mockito.when(externalizerService.externalizeIfNecessary(any(),any())).thenReturn("www.freestylelibre.de/page");
        model = loadModel(NavLinksModel.class);
    }

    @Test
    void getCardTitle() {
        Assert.assertEquals("Card Title",model.getCardTitle());
    }

    @Test
    void getImagePosition() {
        Assert.assertEquals("Card Image Position",model.getImagePosition());
    }

    @Test
    void getImage() {
        Assert.assertEquals("Card Image",model.getImage());
    }

    @Test
    void getImageAltText() {
        Assert.assertEquals("Card Image Alt Text",model.getImageAltText());
    }

    @Test
    void getDescription() {
        Assert.assertEquals("Card Description",model.getDescription());
    }

    @Test
    void getCtaLabel() {
        Assert.assertEquals("Card CTA Label",model.getCtaLabel());
    }

    @Test
    void getCtaLink() {
        Assert.assertEquals("www.freestylelibre.de/page",model.getCtaLink());
    }

    @Test
    void getShowCta() {
        Assert.assertTrue(model.getShowCta());
    }

    @Test
    void getCtaAction() {
        Assert.assertEquals("Card CTA Action",model.getCtaAction());
    }

    @Test
    void getTargetLink(){
        Assert.assertEquals("www.freestylelibre.de/page?param=true",model.getTargetLink());
    }

    @Test
    void getSideNavCardIconImg(){
        Assert.assertEquals("Icon Img",model.getSideNavCardIconImg());
    }

    @Test
    void getTargetLinkParameters(){
        Assert.assertEquals("?param=true",model.getTargetLinkParameters());
    }
}
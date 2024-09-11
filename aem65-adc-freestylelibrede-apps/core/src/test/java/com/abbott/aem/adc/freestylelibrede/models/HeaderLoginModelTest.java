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
class HeaderLoginModelTest extends BaseModelTest<HeaderLoginModel>{

    @Mock
    ExternalizerService externalizerService;

    @InjectMocks
    private ExternalizeInjector injector = new ExternalizeInjector();

    private final AemContext context = new AemContext();

    Resource headerLoginResource;
    Resource accountOverviewPage;
    HeaderLoginModel model;
    @BeforeEach
    void setUp() {
    	Mockito.when(externalizerService.externalizeIfNecessary(any(), any())).thenReturn("www.freestylelibre.de/page");
		context.registerService(Injector.class, injector);
		context.registerService(ExternalizerService.class, externalizerService);
		model = loadModel(HeaderLoginModel.class);
    }

    @Test
    void getLabelLogin() {
        Assert.assertEquals("headerLogin -login label",model.getLabelLogin());
    }

    @Test
    void getOfflineIcon() {
        Assert.assertEquals("headerLogin-offline-icon",model.getOfflineIcon());
    }

    @Test
    void getLogoutPageRedirect() {
        Assert.assertEquals("www.freestylelibre.de/page",model.getLogoutPageRedirect());
    }

    @Test
    void getLoginPagePath() {
        Assert.assertEquals("www.freestylelibre.de/page",model.getLoginPagePath());
    }

    @Test
    void getPagePath() {
        Assert.assertEquals("www.freestylelibre.de/page",model.getPagePath());
    }


    @Test
    void getAccountOverviewList() {
        Assert.assertEquals(0, model.getAccountOverviewList().size());
    }

    @Test
    void getIcon() {
        Assert.assertEquals("headerLogin-icon",model.getIcon());
    }

    @Test
    void getLabel() {
        Assert.assertEquals("headerLogin - label",model.getLabel());
    }

    @Test
    void getLogoutIcon() {
        Assert.assertEquals("headerLogin-logout-icon",model.getLogoutIcon());
    }

    @Test
    void getLogoutLabel() {
        Assert.assertEquals("headerLogin-logout label",model.getLogoutLabel());
    }

    @Test
    void getNonLoggedInUserEvent() {
        Assert.assertEquals("nonLoggedInUserEvent",model.getNonLoggedInUserEvent());
    }

    @Test
    void getLoggedInUserEvent() {
        Assert.assertEquals("loggedInUserEvent",model.getLoggedInUserEvent());
    }


    @Test
    void isEnableAutoExtendSessionEsl() {
        Assert.assertEquals(true,model.isEnableAutoExtendSessionEsl());
    }

    protected  AemContext getContext(){
        return  this.context;
    }
}
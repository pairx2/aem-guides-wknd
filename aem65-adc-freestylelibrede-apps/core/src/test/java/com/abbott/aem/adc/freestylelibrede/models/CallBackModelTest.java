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
import com.abbott.aem.adc.freestylelibrede.services.CsrConfigurationService;
import com.abbott.aem.adc.freestylelibrede.services.ExternalizerService;

import static org.mockito.ArgumentMatchers.any;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class CallBackModelTest extends BaseModelTest<CallBackModel> {

    public final AemContext context = new AemContext();

    @InjectMocks
    ExternalizeInjector externalizeInjector = new ExternalizeInjector();
    @Mock
    ExternalizerService externalizerService;

    @Mock
    CsrConfigurationService csrConfigurationService;

     @InjectMocks
    private CallBackModel model;

    @BeforeEach
    void setup(){
        Mockito.when(externalizerService.externalizeIfNecessary(any(),any())).thenReturn("www.freestylelibre.de/page");
        context.registerService( Injector.class,externalizeInjector);
        context.registerService(ExternalizerService.class, externalizerService);
        context.registerService(CsrConfigurationService.class,csrConfigurationService);
        model = (CallBackModel) loadModel(CallBackModel.class);

    }

    @Test
    void getHeading() {
        Assert.assertEquals("CallBack Title",model.getHeading());
    }

    @Test
    void getPrivacyPolicy() {
        Assert.assertEquals("www.freestylelibre.de/page",model.getPrivacyPolicy());
    }

    @Test
    void getFirstNameID() {
        Assert.assertEquals("id_fn",model.getFirstNameID());
    }

    @Test
    void getLastNameID() {
        Assert.assertEquals("id_ln",model.getLastNameID());
    }

    @Test
    void getCustomerID() {
        Assert.assertEquals("id_customer",model.getCustomerID());
    }

    @Test
    void getCallTimeID() {
        Assert.assertEquals("id_ct",model.getCallTimeID());
    }

    @Test
    void getCallBackCaseID() {
        Assert.assertEquals("id_callback",model.getCallBackCaseID());
    }

    @Test
    void getRetURL() {

        Assert.assertEquals("www.freestylelibre.de/page",model.getRetURL());
    }

    @Test
    void getSalesforceURL() {
        Mockito.when(csrConfigurationService.getEndpoint()).thenReturn("http://www.salesforce.com");
        Assert.assertEquals("http://www.salesforce.com",model.getSalesforceURL());
    }

    @Test
    void getSalesforceOrgId(){
        Mockito.when(csrConfigurationService.getOrgId()).thenReturn("org-1234");
        Assert.assertEquals("org-1234",model.getSalesforceOrgId());
    }

    @Test
    public void getSubmitCtaStyle(){
        Assert.assertEquals("submit-cta-style",model.getSubmitCtaStyle());;
    }
    
    @Test
    public void getPath() {
    	Assert.assertEquals("/content/page/component", model.getPath());
    }

}
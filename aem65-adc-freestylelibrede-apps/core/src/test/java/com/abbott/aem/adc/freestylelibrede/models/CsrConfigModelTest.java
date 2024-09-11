package com.abbott.aem.adc.freestylelibrede.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import junit.framework.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.services.CsrConfigurationService;
import com.abbott.aem.adc.freestylelibrede.services.ExternalizerService;
import com.abbott.aem.adc.freestylelibrede.services.TreeTagService;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class CsrConfigModelTest extends BaseModelTest<CsrConfigModel> {

    public final AemContext context = new AemContext();

    @Mock
    CsrConfigurationService csrConfigurationService;

    CsrConfigModel model;

    @BeforeEach
    void setup() {
        context.registerService(CsrConfigurationService.class, csrConfigurationService);
        model = loadModel(CsrConfigModel.class);

    }

    @Test
    void getSalesforceURL() {
        Mockito.when(csrConfigurationService.getEndpoint()).thenReturn("http://www.salesforce.com");
        Assert.assertEquals("http://www.salesforce.com", model.getSalesforceURL());
    }

    @Test
    void getSalesforceOrgId() {
        Mockito.when(csrConfigurationService.getOrgId()).thenReturn("org-1234");
        Assert.assertEquals("org-1234", model.getSalesforceOrgId());
    }

}
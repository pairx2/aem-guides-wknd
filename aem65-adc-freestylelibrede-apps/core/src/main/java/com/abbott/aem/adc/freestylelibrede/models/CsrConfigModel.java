package com.abbott.aem.adc.freestylelibrede.models;

import com.abbott.aem.adc.freestylelibrede.services.CsrConfigurationService;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.REQUIRED)
public class CsrConfigModel {

    @Inject
    private CsrConfigurationService csrConfigurationService;

    public final String getSalesforceURL() {
        return csrConfigurationService.getEndpoint();
    }

    public final String getSalesforceOrgId() {
        return csrConfigurationService.getOrgId();
    }
}

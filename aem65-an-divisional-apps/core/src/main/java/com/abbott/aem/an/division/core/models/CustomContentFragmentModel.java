package com.abbott.aem.an.division.core.models;

import com.abbott.aem.platform.common.components.services.APILookupService;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

@Model(adaptables = { SlingHttpServletRequest.class },
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CustomContentFragmentModel {

    String searchApiEndPoint = "";

    @Inject
    private APILookupService apiLookupService;

    @PostConstruct
    protected  void init()
    {
        searchApiEndPoint =apiLookupService.getAPIEndpointForKey("siteSearch");
    }

    public String getSearchApiEndPoint() {
        return searchApiEndPoint;
    }
}

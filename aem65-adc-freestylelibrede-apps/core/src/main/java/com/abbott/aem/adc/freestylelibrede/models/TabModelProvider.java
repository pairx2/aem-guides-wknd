package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.factory.ModelFactory;

import javax.inject.Inject;

@Model(adaptables = {SlingHttpServletRequest.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class TabModelProvider {

    @Inject
    private String path;

    @Inject
    private ResourceResolver resourceResolver;

    @Inject
    private ModelFactory factory;


    public Object getTabModel() {
        Resource resource = resourceResolver.getResource(path);
        if (factory.isModelAvailableForResource(resource)) {
            return factory.getModelFromResource(resource);
        }

        return null;
    }
}

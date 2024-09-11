package com.abbott.aem.add.division.core.components.models.impl;

import com.abbott.aem.add.division.core.components.models.ReactSearch;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;
import java.util.Objects;

@Model(adaptables = { SlingHttpServletRequest.class }, adapters = ReactSearch.class, resourceType = ReactSearchImpl.RESOURCE_TYPE,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class ReactSearchImpl implements ReactSearch {

    @Inject protected  Resource resource;
    public static final String RESOURCE_TYPE = "add/customerportal/components/content/react-search";

    protected String testTitle = "Test Title";

    @Override
    public String getTitle() {
        return testTitle;
    }

    @Override
    public Iterable<Resource> getItems() {
        return Objects.requireNonNull(resource.getChild("items")).getChildren();
    }
}

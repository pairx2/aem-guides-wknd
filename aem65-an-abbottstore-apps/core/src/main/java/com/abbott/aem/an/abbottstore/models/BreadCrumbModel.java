package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.utils.AbbottUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

import javax.inject.Inject;

@Model(adaptables = {Resource.class, SlingHttpServletRequest.class} , defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class BreadCrumbModel extends UrlServiceModel{

    @Inject
    public String navItemUrl;

    @SlingObject
    private ResourceResolver resourceResolver;

    public String urlLink() {
        return AbbottUtils.getResolvedPath(resourceResolver, navItemUrl, getStoreBasePaths(), getAemServer());
    }
}

package com.abbott.aem.an.abbottstore.models;


import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = {Resource.class, SlingHttpServletRequest.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ProductPathModel {

    @ValueMapValue
    private String productDetailPath;

    @ValueMapValue
    private String productImagePath;

    public String getProductDetailPath() {
        return productDetailPath;
    }

    public String getProductImagePath() {
        return productImagePath;
    }
}

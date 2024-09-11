package com.abbott.aem.an.abbottstore.services;

import com.abbott.aem.an.abbottstore.beans.FeatureProductBean;
import com.abbott.aem.an.abbottstore.models.ProductPathModel;
import com.day.cq.wcm.api.Page;
import org.apache.sling.api.resource.ResourceResolver;

import java.util.List;

/**
 * @author kainath.fatima
 *
 *         FeatureProductService - This OSGI service interface will provide methods
 *         to set and get the list of product data.
 *
 */

public interface FeatureProductService {

    /**
     * Gets the resource properties.
     *
     * @return the resource properties
     */
    public List<FeatureProductBean> setAndGetFeatureProductList(List<FeatureProductBean> productList, ProductPathModel path, Page page, ResourceResolver resourceResolver);
}

package com.abbott.aem.add.molecular.core.productlist;

import java.util.List;

import org.apache.sling.api.resource.ResourceResolver;

import com.abbott.aem.add.molecular.core.productlist.impl.ProductFilterData;

public interface ProductListService {

    List<ProductFilterData> lookupProductFilterData(ResourceResolver resourceResolver, String path);

}

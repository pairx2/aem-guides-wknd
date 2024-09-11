package com.abbott.aem.add.molecular.core.productlist.impl;

import java.text.MessageFormat;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.add.molecular.core.productlist.ProductListService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component(service = ProductListService.class)
public class ProductListServiceImpl implements ProductListService {
	
	/**
	 * The Constant LOGGER.
	 */
	private static final Logger LOGGER = LoggerFactory.getLogger(ProductListServiceImpl.class);

    private static final String SQL2_REQUEST = "select * from [dam:Asset]"
            + " where isdescendantnode(''{0}'')"
            + " and [jcr:content/contentFragment]=true"
            + " and [jcr:content/data/cq:model]=''/conf/add/settings/dam/cfm/models/product-category''"
            + " order by name()";

    @Override
    public List<ProductFilterData> lookupProductFilterData(ResourceResolver resourceResolver, String path) {
        List<ProductFilterData> productData = new LinkedList<>();
        Iterator<Resource> result = resourceResolver.findResources(MessageFormat.format(SQL2_REQUEST, path),
                "JCR-SQL2");
        while (result.hasNext()) {
            Resource next = result.next();
            ProductFilterData candidate = next.adaptTo(ProductFilterData.class);
            if (candidate == null) {
            	LOGGER.warn("Could not adapt resource at {} to ProductFilterData", next.getPath());
            } else {
                productData.add(candidate);
                LOGGER.info("product data size {}",productData.size());
            }
        }
        return productData;
    }

}

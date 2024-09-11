package com.abbott.aem.add.molecular.core.productlist.impl;

import java.util.Collections;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.add.molecular.core.productlist.ProductList;
import com.abbott.aem.add.molecular.core.productlist.ProductListService;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Model(
        adaptables = Resource.class,
        adapters = ProductList.class,
        resourceType = ProductListImpl.RESOURCE_TYPE,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class ProductListImpl implements ProductList {
	
	/**
	 * The Constant LOGGER.
	 */
	private static final Logger LOGGER = LoggerFactory.getLogger(ProductListImpl.class);


    public static final String RESOURCE_TYPE = "add/molecular/components/product-list";

    @JsonIgnore
    @Inject
    ProductListService productListService;

    @JsonIgnore
    @Inject
    @Self
    private Resource resource;

    @JsonIgnore
    @ValueMapValue
    private String productsDataRootPath;

    @ValueMapValue
    private String noProducts;

    @ValueMapValue
    private String backToTop;

    @ValueMapValue
    private String showMore;

    @ValueMapValue
    private String numberOfResults;

    @ValueMapValue
    private String defaultHeading;

    private List<ProductFilterData> products;

    @PostConstruct
    public void init() {
        try {
            products = productListService.lookupProductFilterData(resource.getResourceResolver(),
                    productsDataRootPath);
            LOGGER.info("products {}",products.get(0));
        } catch (RuntimeException e) {
        	LOGGER.error("Could not fetch product list at '{}'. Returning empty list.", productsDataRootPath);
            products = Collections.emptyList();
        }
    }

    @JsonIgnore
    @Override
    public String getProductListJsonString() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
        	LOGGER.info("objectMapper.writeValueAsString(this) {}",objectMapper.writeValueAsString(this));
            return objectMapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            return "{\"error\": \"could not generate data json\"}";
        }
    }

}

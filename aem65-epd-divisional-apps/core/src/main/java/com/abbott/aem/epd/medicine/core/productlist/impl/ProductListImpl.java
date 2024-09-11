package com.abbott.aem.epd.medicine.core.productlist.impl;

import java.util.Collections;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.epd.medicine.core.productlist.ProductList;
import com.abbott.aem.epd.medicine.core.productlist.ProductListService;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
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

    public static final String RESOURCE_TYPE = "epd/medicine/components/product-list";

    @JsonIgnore
    @Inject
    ProductListService productListService;

    @JsonIgnore
    @Inject
    @Self
    public Resource resource;

    @JsonIgnore
    @ValueMapValue
    public String productsDataRootPath;

    @ValueMapValue
    public String noProducts;

    @ValueMapValue
    public String backToTop;

    @ValueMapValue
    public String showMore;

    @ValueMapValue
    public String numberOfResults;

    @ValueMapValue
    public String showAllResults;
	
    @Setter(AccessLevel.NONE)
    @ValueMapValue
    public String defaultHeading;

    private List<MedicineProductData> products;

    public List<MedicineProductData> getProducts() {
        return Collections.unmodifiableList(products);
    }

	@PostConstruct
    public void init() {

        try {
            products = productListService.lookupMedicineProductData(resource.getResourceResolver(),
                    productsDataRootPath);
        } catch (RuntimeException e) {
            log.error("Could not fetch product list at '{}'. Returning empty list.", productsDataRootPath);
            products = Collections.emptyList();
        }

    }

    @JsonIgnore
    @Override
    public String getProductListJsonString() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            return "{\"error\": \"could not generate data json\"}";
        }
    }

	public void setDefaultHeading(String defaultHeading) {
this.defaultHeading=defaultHeading;		
	}

	public String getDefaultHeading() {
		return defaultHeading;
	}

	public void setShowAllResults( String showAllResults) {
		this.showAllResults=showAllResults;		
		
	}

	public String getShowAllResults() {
		return showAllResults;
	}

	public void setNumberOfResults(String numberOfResults) {
		this.numberOfResults=numberOfResults;		
	}

	public String getNumberOfResults() {
		return numberOfResults;
	}

	public void setShowMore(String showMore) {
		this.showMore=showMore;		
		
	}

	public String getShowMore() {
		return showMore;
	}

	public void setBackToTop(String backToTop) {
		this.backToTop=backToTop;		
	
	}

	public String getBackToTop() {
		return backToTop;
	}

	public void setNoProducts(String noProducts) {
		this.noProducts=noProducts;		
		
	}

	public String getNoProducts() {
		return noProducts;
	}

	public void setProductsDataRootPath(String productsDataRootPath) {
		this.productsDataRootPath=productsDataRootPath;		
		

	}

	public String getProductsDataRootPath() {
		return productsDataRootPath;
	}

}

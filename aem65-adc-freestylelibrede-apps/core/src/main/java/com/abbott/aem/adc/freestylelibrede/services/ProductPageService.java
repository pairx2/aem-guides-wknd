package com.abbott.aem.adc.freestylelibrede.services;


import java.util.List;
import java.util.Map;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;

import com.abbott.aem.adc.freestylelibrede.dto.ProductDto;
import com.abbott.aem.adc.freestylelibrede.models.ProductPageModel;


/**
 * Interface for getting all the authored Product Page properties.
 */
public interface ProductPageService {

	/**
	 * Search for all Product Pages created under "/content/adc/fsl" and returne the list of #ProductPageModel
	 * @param resourceResolver the resolver to use
	 * @return the List of all ProductPageModel
	 * */
	List<ProductDto> findAll(SlingHttpServletRequest request);


	/**
	 * Search for all Product Pages created under "/content/adc/fsl" and returns a map  #ProductPageModel by SKU
	 * @param resourceResolver the resolver to use
	 * @return the Map of all ProductPageModel
	 * */

	Map<String, Map<String,ProductDto>> mapAll(SlingHttpServletRequest request);


	/**
	 * Search for a Product Page associated with a given sku
	 * @param  resourceResolver the resolver to use
	 * @param sku the sku of the product to retrieve
	 * @return ProductPageModel the model adapted from the Product Page
	 * */
	ProductDto findBySku(SlingHttpServletRequest request, String sku);


	Map<String, Map<String,ProductDto>> mapBySku(SlingHttpServletRequest request,String sku);


	/***
	 * Returns the Product Page model for the page containing the given Resource
	 * @param resource the resource on the page
	 * @return the ProductPageModel adapted from the ProductPage containing the resource.
	 */
	ProductPageModel getProductPageModel(Resource resource);

}

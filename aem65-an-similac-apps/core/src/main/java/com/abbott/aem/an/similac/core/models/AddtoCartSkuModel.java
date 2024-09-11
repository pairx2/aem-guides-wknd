package com.abbott.aem.an.similac.core.models;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.an.similac.core.utils.CommonConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

/**
 *  Add to Cart is the SlingModel to hold the SKU of a PDP pages.
 * 
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AddtoCartSkuModel {

	private static final Logger LOGGER = LoggerFactory.getLogger(AddtoCartSkuModel.class);

	@SlingObject
	private ResourceResolver resourceResolver;
	

	@SlingObject
    private SlingHttpServletRequest request;
	
	
	@ValueMapValue
	private String linkURL;
	
	private String sku;
	
	
	/**
	 * init method to get the page properties "SKU" from PDP pages 
	 * 
	 */
	@PostConstruct
	protected void init() {
		Resource currentPageResource = resourceResolver.getResource(linkURL);
		if(currentPageResource != null) {
			Page page = resourceResolver.adaptTo(PageManager.class).getContainingPage(currentPageResource);
			populateSku(page);
		}}
	

	/**
	 * Populate SKU
	 * 
	 * @param page
	 */
	private void populateSku(Page page) {
		
		try {
			ValueMap pageProperties = page.getProperties();
			sku=pageProperties.get(CommonConstants.SKU, String.class);
		} catch (RuntimeException ex) {
			LOGGER.warn("Exception occured while AddtoCart SKU", ex);
			
		}
	}
	
	public String getSku() {
	   return sku;
	}


}

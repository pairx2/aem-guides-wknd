package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.beans.FeatureProductBean;
import com.abbott.aem.an.abbottstore.services.FeatureProductService;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

import java.util.ArrayList;
import java.util.List;


/**
 * @author kainath.fatima
 * 
 * The Class FeatureProductlModel.
 * 
 *  FeatureProductModel is used to retrive the product details when page path  is given.
 *  
 *  
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FeatureProductModel {

	/** The product page path res. */
	@SlingObject
	private Resource currentResource;

	/** The resource resolver. */
	@SlingObject
	private ResourceResolver resourceResolver;

	/** The featureProductService. */
	@OSGiService
	private FeatureProductService featureProductService;


	/**
	 * Gets the product details.
	 *
	 * @return the product details
	 */
	public List<FeatureProductBean> getProductDetails() {
		List<FeatureProductBean> productList = new ArrayList<>();
		Resource productPath = resourceResolver.getResource(currentResource.getPath());
		ProductPathModel path = productPath.adaptTo(ProductPathModel.class);
			Resource currentPageResource = resourceResolver.getResource(path.getProductDetailPath());
			if(currentPageResource != null) {
				Page page = resourceResolver.adaptTo(PageManager.class).getContainingPage(currentPageResource);
				productList =  featureProductService.setAndGetFeatureProductList( productList, path, page, resourceResolver );

		}
		return productList;
	}
}

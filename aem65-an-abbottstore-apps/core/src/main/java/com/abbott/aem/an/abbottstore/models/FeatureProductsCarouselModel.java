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
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;


/**
 * @author srividya.b
 * 
 * The Class FeatureProductsCarouselModel.
 * 
 *  FeatureProductsCarouselModel is used to retrive the products when page path  is given.
 *  
 *  
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FeatureProductsCarouselModel {

	/**
	 * The title.
	 */
	@ValueMapValue
	private String title;

	/**
	 * The schedule time.
	 */
	@ValueMapValue
	private String scheduleTime;

	/**
	 * The product page path res.
	 */
	@ChildResource(name = "productPath")
	private Resource productPagePathRes;

	/**
	 * The resource resolver.
	 */
	@SlingObject
	private ResourceResolver resourceResolver;

	/** The featureProductService. */
	@OSGiService
	private FeatureProductService featureProductService;

	/**
	 * The products page path list.
	 */
	private List <ProductPathModel> productsPagePathList;

	/**
	 * Gets the title.
	 *
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * Gets the schedule time.
	 *
	 * @return the schedule time
	 */
	public String getScheduleTime() {
		return scheduleTime;
	}

	/**
	 * Gets the product page path.
	 *
	 * @return the product page path
	 */
	public List <ProductPathModel> getProductPagePath() {
		Iterator <Resource> productPagePathItr = productPagePathRes.listChildren();

		if (productPagePathRes.hasChildren()) {
			productsPagePathList = new ArrayList <>();
			while (productPagePathItr.hasNext()) {
				Resource productPath = productPagePathItr.next();
				productsPagePathList.add( productPath.adaptTo( ProductPathModel.class ) );
			}
		}
		return Collections.unmodifiableList( productsPagePathList );
	}

	/**
	 * Gets the product details.
	 *
	 * @return the product details
	 */
	public List <FeatureProductBean> getProductDetails() {
		List <FeatureProductBean> productList = new ArrayList <>();
		List <ProductPathModel> productPathList = getProductPagePath();
		for (ProductPathModel path : productPathList) {
			Resource currentPageResource = resourceResolver.getResource( path.getProductDetailPath() );
			if (currentPageResource != null) {
				Page page = resourceResolver.adaptTo( PageManager.class ).getContainingPage( currentPageResource );
				productList =  featureProductService.setAndGetFeatureProductList( productList, path, page, resourceResolver );
			}
		}
		return productList;
	}
}


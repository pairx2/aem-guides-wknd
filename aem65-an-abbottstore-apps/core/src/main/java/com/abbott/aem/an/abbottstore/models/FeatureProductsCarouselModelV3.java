package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.beans.FeatureProductBean;
import com.abbott.aem.an.abbottstore.utils.AbbottUtils;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

import java.util.ArrayList;
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
public class FeatureProductsCarouselModelV3 extends FeatureProductsCarouselModel {

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

	/**
	 * Gets the product details.
	 *
	 * @return the product details
	 */
	@Override
	public List <FeatureProductBean> getProductDetails() {
		List <FeatureProductBean> productList = new ArrayList <>();
		List <ProductPathModel> productPathList = super.getProductPagePath();
		for (ProductPathModel path : productPathList) {
			Resource currentPageResource = resourceResolver.getResource( path.getProductDetailPath() );
			if (currentPageResource != null) {
				Page page = resourceResolver.adaptTo( PageManager.class ).getContainingPage( currentPageResource );
				ValueMap pageProps = page.getContentResource().getValueMap();
				FeatureProductBean product = new FeatureProductBean();
				if(pageProps.containsKey("name")) {
					product.setTitle(pageProps.get("name").toString());
				}

				product.setImagePath(path.getProductImagePath());
				product.setPagePath( AbbottUtils.getHtmlLink(resourceResolver, path.getProductDetailPath()));
				productList.add(product);
			}
		}
		return productList;
	}
}


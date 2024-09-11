package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.beans.ProductListBean;
import com.abbott.aem.an.abbottstore.constants.CommonConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import lombok.Getter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 *
 * @author saikrishna.s
 * 
 *         Product List
 * 
 *         Product List is the SlingModel to hold the details of individual
 *         Product List.
 * 
 *         Version Number: 1.0
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ProductListModel {

	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(ProductListModel.class);

	@ValueMapValue
	private String pagePath;

	@Inject
	private PageManager pageManager;

	/** The product list. */
	@Getter
	private List<ProductListBean> productsList;

	/**
	 * Init method to get page properties of a product page.
	 */
	@PostConstruct
	protected void init() {
		LOGGER.info("Inside init method of more ProductListModel");

		productsList = new ArrayList<>();
		Page page = pageManager.getContainingPage(pagePath);
		List<Page> pagesList = new ArrayList<>();
		iterateProductPages(page, pagesList);
		for (Page pageItem : pagesList) {
			ProductListBean productListBean = new ProductListBean();
			ValueMap pageProperties = pageItem.getProperties();
			productListBean.setName(pageProperties.get(CommonConstants.NAME, String.class));
			productListBean.setDescription(pageProperties.get(CommonConstants.DESCRIPTION, String.class));
			productListBean.setCansX(pageProperties.get(CommonConstants.CANS_X, String.class));
			productListBean.setCansY(pageProperties.get(CommonConstants.CANS_Y, String.class));
			productListBean.setPrice(pageProperties.get(CommonConstants.PRICE, Double.class));
			productListBean.setSpecialPrice(pageProperties.get(CommonConstants.SPECIAL_PRICE, String.class));
			if (pageProperties.containsKey(CommonConstants.MEDIA_GALLERY_ENTRIES)) {
				String[] images = pageProperties.get(CommonConstants.MEDIA_GALLERY_ENTRIES, String[].class);
				if (images != null && images.length > 0) {
					productListBean.setImage(images[0]);
				}
			}
			if(pageProperties.containsKey(CommonConstants.CUSTOM_DISCOUNT)) {
				LOGGER.info("Discount :: {}",pageProperties.get(CommonConstants.CUSTOM_DISCOUNT, String.class));
				productListBean.setCustomDiscount(pageProperties.get(CommonConstants.CUSTOM_DISCOUNT, String.class));
			}else{
				productListBean.setCustomDiscount(null);
			}
			productListBean.setSizeOrWeight(pageProperties.get(CommonConstants.SIZE_OR_WEIGHT, String.class));
			productsList.add(productListBean);
		}

	}

	/**
	 * Iterate product pages.
	 *
	 * @param page the page
	 * @return the page
	 */
	private void iterateProductPages(Page page, List<Page> pagesList) {
		if (page == null) {
			return;
		}
		Iterator<Page> pageItr = page.listChildren();
		while (pageItr.hasNext()) {
			Page childPage = pageItr.next();
			ValueMap pageProperties = childPage.getProperties();
			if (pageProperties.containsKey("product"))
				pagesList.add(childPage);
			iterateProductPages(childPage, pagesList);
		}
	}


}

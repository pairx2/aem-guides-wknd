package com.abbott.aem.an.similac.core.models;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.ExporterOption;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.an.similac.core.beans.ProductBean;
import com.abbott.aem.an.similac.core.utils.CommonConstants;
import com.abbott.aem.an.similac.core.utils.SimilacUtils;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

/**
 *  Product Card is the SlingModel to hold the details of individual Product.
 * 
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, resourceType = { "an/similac/components/content/products/product-card"},defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = "jackson", extensions = "json", options = { @ExporterOption(name = "SerializationFeature.WRITE_DATES_AS_TIMESTAMPS", value = "true") })
public class ProductCardModel {

	private static final Logger LOGGER = LoggerFactory.getLogger(ProductCardModel.class);

	@ValueMapValue
	private String productPath;
	
	@SlingObject
	private ResourceResolver resourceResolver;
	
	private ProductBean productBean;

	@SlingObject
    private SlingHttpServletRequest request;
	
	
	
	/**
	 * init method to get the product card details from the product page properties
	 * 
	 */
	@PostConstruct
	protected void init() {
		
		Resource currentPageResource = resourceResolver.getResource(productPath);
		if(currentPageResource != null) {
			Page page = resourceResolver.adaptTo(PageManager.class).getContainingPage(currentPageResource);
			populateProductDetails(page);
		}
	}

	/**
	 * Populate Product card details
	 * 
	 * @param page
	 */
	private void populateProductDetails(Page page) {
		
		try {
			productBean = new ProductBean();
			ValueMap pageProperties = page.getProperties();
			productBean.setName(pageProperties.get(CommonConstants.NAME, String.class));
			productBean.setSku(pageProperties.get(CommonConstants.SKU, String.class));
			productBean.setLink(SimilacUtils.linkChecker(productPath));
			productBean.setBazaarVoiceID(pageProperties.get(CommonConstants.BV_ID, String.class));
			productBean.setSizeOrWeight(pageProperties.get(CommonConstants.SIZE_OR_WEIGHT, String.class));
			productBean.setPrice(pageProperties.get(CommonConstants.PRICE, Double.class));
			if (pageProperties.containsKey(CommonConstants.SPECIAL_PRICE)) {
				productBean.setSpecialPrice(pageProperties.get(CommonConstants.SPECIAL_PRICE, Double.class));
			}
			populateImage(pageProperties);
			
		} catch (RuntimeException ex) {
			LOGGER.error("Exception in populateProductDetails ::",ex);
		}
	}
	
	/**
	 * Populate Product card image
	 * 
	 * @param pageProperties
	 */
	private void populateImage(ValueMap pageProperties) {
		try {
			if (pageProperties.containsKey(CommonConstants.MEDIA_GALLERY_ENTRIES)) {
				String[] images = pageProperties.get(CommonConstants.MEDIA_GALLERY_ENTRIES, String[].class);
				if (images != null && images.length > 0) {
					String productImagePath = images[0] + CommonConstants.JCR_RENDITION_PATH;
					productBean.setImage(productImagePath + CommonConstants.THUMBNAIL_SMALLEST);
					productBean.setDesktopImage(productImagePath + CommonConstants.PRODUCT_CARD_DESKTOP);
					productBean.setTabletImage(productImagePath + CommonConstants.PRODUCT_CARD_TABLET);
					productBean.setMobileImage(productImagePath + CommonConstants.PRODUCT_CARD_MOBILE);
				}
			}
		} catch (RuntimeException ex) {
			LOGGER.error("Exception in populateProductDetails ::",ex);
		}
	}

	/**
	 * Get the product Bean.
	 *
	 * @return the product Bean
	 */
	public ProductBean getProductBean() {
		return productBean;
	}

}

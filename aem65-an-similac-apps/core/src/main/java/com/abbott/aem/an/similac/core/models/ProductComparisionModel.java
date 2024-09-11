package com.abbott.aem.an.similac.core.models;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.annotation.PostConstruct;

import lombok.Getter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.ExporterOption;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.an.similac.core.beans.ImagesBean;
import com.abbott.aem.an.similac.core.beans.ProductBean;
import com.abbott.aem.an.similac.core.utils.CommonConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class },resourceType = { "an/similac/components/content/products/product-comparision"}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = "jackson", extensions = "json", options = { @ExporterOption(name = "SerializationFeature.WRITE_DATES_AS_TIMESTAMPS", value = "true") })
public class ProductComparisionModel {


	private static final Logger LOGGER = LoggerFactory.getLogger(ProductComparisionModel.class);
	
	private static final String FIRST_PRODUCT_PATH = "firstProductPath";
	private static final String SECOND_PRODUCT_PATH = "secondProductPath";
	private static final String THIRD_PRODUCT_PATH = "thirdProductPath";
	private static final String FOURTH_PRODUCT_PATH = "fourthProductPath";
	private static final String DESCRIPTION = "description";
	
	@SlingObject
	private ResourceResolver resourceResolver;
	
	@SlingObject
    private SlingHttpServletRequest request;
	
	@Getter
	private List<ProductBean> productCardList;
	
	@ScriptVariable
	private ValueMap properties;
	
	private ProductBean productBean;
	
	private List<ImagesBean> imageBeans;
	
	/**
	 * init method to get the product card details from the product page properties
	 * 
	 */
	@PostConstruct
	protected void init() {
		imageBeans = new ArrayList<>();
		List<String> pagePathList = populateProductPathList();

		productCardList = new ArrayList<>();
		Iterator<ImagesBean> imagesBeanIterator = imageBeans.iterator();
		for (String pagePath : pagePathList) {
			ImagesBean imagesBean = imagesBeanIterator.next();
			Resource productResource = resourceResolver.getResource(pagePath);
			if (productResource != null) {
				Page productPage = resourceResolver.adaptTo(PageManager.class).getContainingPage(productResource);
				productBean = populateProductDetails(productPage, pagePath, imagesBean);
				productCardList.add(productBean);
			}
		}
	}
	
	/**
	 * Populate the page path list
	 * 
	 * @return pagePathList
	 */
	private List<String> populateProductPathList() {

		List<String> pagePathList = new ArrayList<>();
		ImagesBean imageBean;
		if (properties != null) {
			if (properties.containsKey(FIRST_PRODUCT_PATH)) {
				pagePathList.add(properties.get(FIRST_PRODUCT_PATH, String.class));
				imageBean = new ImagesBean();
				populateImageBean(1, imageBean);
			}
			if (properties.containsKey(SECOND_PRODUCT_PATH)) {
				pagePathList.add(properties.get(SECOND_PRODUCT_PATH, String.class));
				imageBean = new ImagesBean();
				populateImageBean(2, imageBean);
			}
			if (properties.containsKey(THIRD_PRODUCT_PATH)) {
				pagePathList.add(properties.get(THIRD_PRODUCT_PATH, String.class));
				imageBean = new ImagesBean();
				populateImageBean(3, imageBean);
			}
			if (properties.containsKey(FOURTH_PRODUCT_PATH)) {
				pagePathList.add(properties.get(FOURTH_PRODUCT_PATH, String.class));
				imageBean = new ImagesBean();
				populateImageBean(4, imageBean);
			}
			return pagePathList;
		}
		return pagePathList;
	}

	/**
	 * Populate the authored image information for the current entry
	 * 
	 * @param position  Which position the entry is at in the comparison
	 * @param imageBean The ImageBean object which will store this information
	 */
	private void populateImageBean(int position, ImagesBean imageBean) {
		if (properties.containsKey("imgSrc" + position)) {
			imageBean.setDesktopImage(properties.get("imgSrc" + position, String.class));
			imageBean.setMobileImage(properties.get("imagePathMob" + position, String.class));
			imageBean.setTabletImage(properties.get("imagePathTab" + position, String.class));
		}
		imageBeans.add(imageBean);
	}

	/**
	 * Populate Product card details
	 * 
	 * @param page
	 * @param pagePath 
	 * @param imagesBean 
	 * 
	 * @return productBean
	 */
	private ProductBean populateProductDetails(Page page, String pagePath, ImagesBean imagesBean) {
		
		try {
			productBean = new ProductBean();
			ValueMap pageProperties = page.getProperties();
			productBean.setName(pageProperties.get(CommonConstants.NAME, String.class));
			productBean.setLink(pagePath);
			productBean.setDescription(pageProperties.get(DESCRIPTION, String.class));
			populateImage(pageProperties, imagesBean);
			return productBean;
			
		} catch (RuntimeException ex) {
			LOGGER.error("Exception in populateProductDetails ::",ex);
		}
		return productBean;
	}
	
	/**
	 * Populate Product card image
	 * 
	 * @param pageProperties
	 * @param imagesBean 
	 */
	private void populateImage(ValueMap pageProperties, ImagesBean imagesBean) {
		try {
			if(imagesBean.getDesktopImage()!=null) {
				productBean.setImage(imagesBean.getMobileImage() + CommonConstants.JCR_RENDITION_PATH + CommonConstants.THUMBNAIL_SMALLEST);
				productBean.setDesktopImage(imagesBean.getDesktopImage());
				productBean.setTabletImage(imagesBean.getTabletImage());
				productBean.setMobileImage(imagesBean.getMobileImage());
			}
			else if (pageProperties.containsKey(CommonConstants.MEDIA_GALLERY_ENTRIES)) {
				String[] images = pageProperties.get(CommonConstants.MEDIA_GALLERY_ENTRIES, String[].class);
				if (images != null && images.length > 0) {
					String productImagePath = images[0] + CommonConstants.JCR_RENDITION_PATH;
					productBean.setImage(productImagePath + CommonConstants.THUMBNAIL_SMALLEST);
					productBean.setDesktopImage(productImagePath + CommonConstants.PRODUCT_COMPARISION_MOBILE);
					productBean.setTabletImage(productImagePath + CommonConstants.PRODUCT_COMPARISION_TABLET);
					productBean.setMobileImage(productImagePath + CommonConstants.PRODUCT_COMPARISION_MOBILE);
				}
			}
		} catch (RuntimeException ex) {
			LOGGER.error("Exception in populateProductDetails ::",ex);
		}
	}
	

}

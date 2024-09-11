package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.beans.ProductListBean;
import com.abbott.aem.an.abbottstore.constants.CommonConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

/**
 *
 * @author saikrishna.s
 * 
 *         ProdListModel
 * 
 *         ProdListModel is the SlingModel to get the details of ProdListModel
 * 
 *         Version Number: 1.0
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ProdListModel extends UrlServiceModel{

	/** The list type. */
	@ValueMapValue
	private String listType;

	/** The bg color. */
	@ValueMapValue
	private String bgColor;

	/** The title. */
	@ValueMapValue
	private String title;

	/** The title color. */
	@ValueMapValue
	private String titleColor;

	/** The disclaimer text. */
	@ValueMapValue
	private String disclaimerText;

	/** The prod items res. */
	@ChildResource(name = "prodItems")
	private Resource prodItemsRes;

	/** The product list. */
	private List<ProdList> prodDetailsList;

	/** The resource resolver. */
	@SlingObject
	private ResourceResolver resourceResolver;

	/**
	 * Gets the products list.
	 *
	 * @return the products list
	 */
	public List<ProdList> getProductsList() {
		if (prodItemsRes != null) {
			Iterator<Resource> linkItemsItr = prodItemsRes.listChildren();
			if (prodItemsRes.hasChildren()) {
				prodDetailsList = new ArrayList<>();
				while (linkItemsItr.hasNext()) {
					Resource item = linkItemsItr.next();
					prodDetailsList.add(item.adaptTo(ProdList.class));
				}
			}
		}
		return Collections.unmodifiableList(prodDetailsList);
	}

	/**
	 * Gets the product details.
	 *
	 * @return the product details
	 */
	public List<ProductListBean> getProductDetails() {
		List<ProductListBean> productsList = new ArrayList<>();
		List<ProdList> prodList = getProductsList();
		for (ProdList productData : prodList) {
			Resource currentPageResource = resourceResolver.getResource(productData.getPagePath());
			if (currentPageResource != null) {
				Page page = resourceResolver.adaptTo(PageManager.class).getContainingPage(currentPageResource);
				if (page != null) {
					ValueMap pageProperties = page.getContentResource().getValueMap();
					ProductListBean productListBean = new ProductListBean();

					setPageProperties(pageProperties, productListBean);

					productListBean.setPagePath(resourceResolver.map(productData.getPagePath())+".html");
					setCansData(pageProperties, productListBean);
					setMediaGalleryData(pageProperties, productListBean);

					productsList.add(productListBean);
				}
			}
		}
		return Collections.unmodifiableList(productsList);
	}

	/**
	 * Sets the page properties.
	 *
	 * @param pageProperties  the page properties
	 * @param productListBean the product list bean
	 */
	private void setPageProperties(ValueMap pageProperties, ProductListBean productListBean) {

		if (pageProperties.containsKey(CommonConstants.NAME) && StringUtils.equals(listType,"similac")) {
			productListBean.setName(pageProperties.get(CommonConstants.NAME, String.class));
		}else if(pageProperties.containsKey("product_flavor") && StringUtils.equals(listType,"glucerna")) {
			productListBean.setName(pageProperties.get("product_flavor", String.class));
			productListBean.setProperties(pageProperties);
		}

		if (pageProperties.containsKey(CommonConstants.DESCRIPTION)) {
			productListBean.setDescription(pageProperties.get(CommonConstants.DESCRIPTION, String.class));
		}

		if (pageProperties.containsKey(CommonConstants.PRICE)) {
			productListBean.setPrice(pageProperties.get(CommonConstants.PRICE, Double.class));
		}

		if (pageProperties.containsKey(CommonConstants.SPECIAL_PRICE)) {
			productListBean.setSpecialPrice(pageProperties.get(CommonConstants.SPECIAL_PRICE, String.class));
		}

		if (pageProperties.containsKey(CommonConstants.SIZE_OR_WEIGHT)) {
			productListBean.setSizeOrWeight(pageProperties.get(CommonConstants.SIZE_OR_WEIGHT, String.class));
		}

		if (pageProperties.containsKey(CommonConstants.CUSTOM_DISCOUNT)) {
			productListBean.setCustomDiscount(pageProperties.get(CommonConstants.CUSTOM_DISCOUNT, String.class));
		}

		if (pageProperties.containsKey(CommonConstants.SKU)) {
			productListBean.setSkuId(pageProperties.get(CommonConstants.SKU, String.class));
		}
	}

	/**
	 * Sets the media gallery data.
	 *
	 * @param pageProperties  the page properties
	 * @param productListBean the product list bean
	 */
	private void setMediaGalleryData(ValueMap pageProperties, ProductListBean productListBean) {
		if (pageProperties.containsKey(CommonConstants.MEDIA_GALLERY_ENTRIES) && StringUtils.equals(listType,"similac")) {
			String[] images = pageProperties.get(CommonConstants.MEDIA_GALLERY_ENTRIES, String[].class);
			if (images != null && images.length > 0) {
				productListBean.setImage(images[0]);
			}
		}else if(pageProperties.containsKey("thumbnail") && StringUtils.equals(listType,"glucerna")) {
			productListBean.setImage(pageProperties.get("thumbnail").toString());
		}
	}

	/**
	 * Sets the cans data.
	 *
	 * @param pageProperties  the page properties
	 * @param productListBean the product list bean
	 */
	private void setCansData(ValueMap pageProperties, ProductListBean productListBean) {
		if (pageProperties.containsKey(CommonConstants.CANS_X)) {
			productListBean.setCansX(pageProperties.get(CommonConstants.CANS_X, String.class));
		}

		if (pageProperties.containsKey(CommonConstants.CANS_Y)) {
			productListBean.setCansY(pageProperties.get(CommonConstants.CANS_Y, String.class));
		}
	}

	/**
	 * Gets the list type.
	 *
	 * @return the list type
	 */
	public String getListType() {
		return listType;
	}

	/**
	 * Gets the bg color.
	 *
	 * @return the bg color
	 */
	public String getBgColor() {
		return bgColor;
	}

	/**
	 * Gets the title.
	 *
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * Gets the title color.
	 *
	 * @return the title color
	 */
	public String getTitleColor() {
		return titleColor;
	}

	/**
	 * Gets the disclaimer text.
	 *
	 * @return the disclaimer text
	 */
	public String getDisclaimerText() {
		return disclaimerText;
	}
}

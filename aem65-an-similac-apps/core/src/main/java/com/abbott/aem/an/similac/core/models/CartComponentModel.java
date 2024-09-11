package com.abbott.aem.an.similac.core.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.abbott.aem.an.similac.core.beans.CartComponentBean;
import com.abbott.aem.an.similac.core.utils.CartConstants;
import com.google.gson.GsonBuilder;

/**
 * CartComponentModel is the SlingModel to hold the details of header cart
 * 
 * 
 * @author Cognizant + IBM
 *
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CartComponentModel {

	private static final Logger LOGGER = LoggerFactory.getLogger(CartComponentModel.class);
	
	@SlingObject
	private ResourceResolver resourceResolver;

	@Inject
	private Resource resource;

	@ChildResource(name = "productCount")
	private Resource options;

	@ChildResource(name = "sortOptionVal")
	private Resource sortOptions;

	private CartComponentBean cartComponentBean;
	
	private String cartJson;

	private ValueMap componentProp;

	@PostConstruct
	public void activate() {
		if (resource != null) {
			generateCartDeatils();
		}
	}

	/**
	 * Populate Cart Details
	 * 
	 * @throws Exception
	 */
	private void generateCartDeatils() {
		try {
			componentProp = resource.adaptTo(ValueMap.class);
			cartComponentBean = new CartComponentBean();
			if (componentProp != null) {
				cartComponentBean.setTitleLabel(componentProp.get(CartConstants.CART_TITLE, String.class));
				cartComponentBean.setCloseLabel(componentProp.get(CartConstants.CLOSE_LABEL, String.class));
				cartComponentBean.setEmptyLabel(componentProp.get(CartConstants.EMPTY_LABEL, String.class));
				cartComponentBean
						.setEmptyButtonLabel(componentProp.get(CartConstants.EMPTY_BUTTON_LABEL, String.class));
				cartComponentBean.setQuantityLabel(componentProp.get(CartConstants.QUANTITY_LABEL, String.class));
				cartComponentBean.setTotalLabel(componentProp.get(CartConstants.TOTAL_LABEL, String.class));
				cartComponentBean.setEditLabel(componentProp.get(CartConstants.EDIT_LABEL, String.class));
				cartComponentBean.setButtonLabel(componentProp.get(CartConstants.BUTTON_LABEL, String.class));
				cartComponentBean
						.setSubscriptionLabel(componentProp.get(CartConstants.SUBSCRIPTON_LABEL, String.class));
				cartComponentBean.setImgRendition_80(CartConstants.IMG_RENDITION_80);
				cartComponentBean.setCartURL(componentProp.get(CartConstants.CART_URL, String.class));
				cartComponentBean.setCheckoutURL(componentProp.get(CartConstants.CHECKOUT_URL, String.class));
				cartComponentBean.setProductsURL(resourceResolver.map(componentProp.get(CartConstants.EMPTY_BUTTON_URL, String.class)));
				cartComponentBean.setSubTotalLabel(componentProp.get(CartConstants.SUBTOTAL_LABEL, String.class));
				cartComponentBean.setDiscountLabel(componentProp.get(CartConstants.DISCOUNT_LABEL, String.class));
				
			}
		} catch (RuntimeException e) {
			LOGGER.warn("Exception occured in generateCartDeatils ::",e);
		}
	}
	
	/**
	 * This method will return the Cart Component details as Json string
	 * 
	 * @return String
	 */
	public String getCartJson() {
		if (cartComponentBean != null) {
			cartJson = new GsonBuilder().create().toJson(cartComponentBean);
		}
		return cartJson;
	}

	public CartComponentBean geCartBean() {
		return cartComponentBean;
	}

	public ValueMap getComponentProp() {
		return componentProp;
	}

}

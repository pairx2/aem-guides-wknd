package com.abbott.aem.an.similac.core.models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.RepositoryException;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.an.similac.core.beans.ProductComponentBean;
import com.abbott.aem.an.similac.core.beans.ProductComponentBean.DropDownInfo;
import com.abbott.aem.an.similac.core.beans.ProductComponentBean.PopUpInfo;
import com.abbott.aem.an.similac.core.utils.CommonConstants;
import com.abbott.aem.an.similac.core.utils.ProductsConstants;
import com.abbott.aem.an.similac.core.utils.SimilacUtils;
import com.google.gson.GsonBuilder;

/**
 * ProductComponentModel is the SlingModel to hold the details of product landing page
 * 
 * 
 * @author Cognizant
 *
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ProductComponentModel {

	private static final Logger LOGGER = LoggerFactory.getLogger(ProductComponentModel.class);
	
	@Inject
	private Resource resource;
	
	@ChildResource(name = "productCount")
	private Resource options;
	
	@ChildResource(name = "sortOptionVal")
	private Resource sortOptions;
	
	@ChildResource(name = "categoryType")
	private Resource categoryType;
	
	@ChildResource(name = "excludedPage")
	private Resource excludedPage;
	
	private ProductComponentBean productBean;

	private String productJson;
	
	private ValueMap componentProp;
	
	private Node node;

	@PostConstruct
	public void activate() {
		if (resource != null) {
			generateProductDeatils();
		}
	}


	/**
	 * Populate product label details
	 * 
	 * @throws Exception
	 */
	private void generateProductDeatils() {
		try {
			componentProp = resource.adaptTo(ValueMap.class);
			productBean = new ProductComponentBean();
			if (componentProp != null) {
				productBean.setPageName("Similac");
				productBean.setCategoryId(componentProp.get(ProductsConstants.CATEGORY_ID, String.class));
				productBean.setFiltersLabel(componentProp.get(ProductsConstants.FILTERS_LABEL, String.class));
				productBean.setResultsLabel(componentProp.get(ProductsConstants.RESULTS_LABEL, String.class));
				productBean.setClearAllLabel(componentProp.get(ProductsConstants.CLEAR_ALL_LABEL, String.class));
				productBean.setShowMoreLabel(componentProp.get(ProductsConstants.SHOW_MORE_LABEL, String.class));				
				productBean.setShowLessLabel(componentProp.get(ProductsConstants.SHOW_LESS_LABEL, String.class));
				productBean.setAddToCartLabel(componentProp.get(ProductsConstants.ADD_TO_CART_LABEL, String.class));
				productBean.setFindRetailerLabel(componentProp.get(ProductsConstants.FIND_RETAILER_LABEL, String.class));
				productBean.setOutOfStockLabel(componentProp.get(ProductsConstants.OUT_OF_STOCK_LABEL, String.class));
				productBean.setBackOrderLabel(componentProp.get(ProductsConstants.BACK_ORDER_LABEL, String.class));
				productBean.setSearchLabel(componentProp.get(ProductsConstants.SEARCH_LABEL, String.class));
				productBean.setSearchResultsLabel(componentProp.get(ProductsConstants.SEARCH_RESULTS_LABEL, String.class));
				productBean.setResetLabel(componentProp.get(ProductsConstants.RESET_LABEL, String.class));
				productBean.setNoResultLabel(componentProp.get(ProductsConstants.NO_RESULTS_LABEL, String.class));
				productBean.setImgRendition_319(ProductsConstants.IMG_RENDITION_319);
				productBean.setLearnMoreLabel(componentProp.get(ProductsConstants.LEARN_MORE_LABEL, String.class));
				productBean.setCallToOrderLabel(componentProp.get(ProductsConstants.CALL_TO_ORDER_LABEL, String.class));
				productBean.setReturnLabel(componentProp.get(ProductsConstants.RETURN_LABEL, String.class));
				productBean.setSelectLabel(componentProp.get(ProductsConstants.SELECT_LABEL, String.class));
				productBean.setRequiredMax(componentProp.get(ProductsConstants.REQUIRED_MAX, String.class));
				productBean.setRequiredMin(componentProp.get(ProductsConstants.REQUIRED_MIN, String.class));
				if(Objects.nonNull(componentProp.get(ProductsConstants.REGULAR_PRICE_LABEL, String.class))) {
				    productBean.setRegularPriceLabel(componentProp.get(ProductsConstants.REGULAR_PRICE_LABEL, String.class));
				}
				String retailerLink = SimilacUtils.linkChecker(componentProp.get(ProductsConstants.RETAILER_URL, String.class));
				productBean.setRetailerURL(getRetailerUrl(retailerLink));
				
			}
			productBean.setFilters(getResourceList(categoryType,ProductsConstants.CATEGORY_TYPE_VAL));			
			productBean.setExcludedPages(getResourceList(excludedPage,ProductsConstants.EXCLUDED_PAGE));
			productBean.setPageSize(getdropDownInfo((ProductsConstants.PAGE_SIZE_TYPE), options, sortOptions, resource, productBean));
			productBean.setSortBy(getdropDownInfo((ProductsConstants.SORT_BY_TYPE), options, sortOptions, resource, productBean));
			productBean.setPopUp(getpopUpInfo());
		} catch (RuntimeException e) {
			LOGGER.error("Exception in generateProductDeatils ::",e);
		}
	}
	
	
	public DropDownInfo getdropDownInfo(String infoType, Resource options, Resource sortOptions, Resource resource, ProductComponentBean productBean) {
		componentProp = resource.adaptTo(ValueMap.class);
		DropDownInfo pageSize = productBean.new DropDownInfo();
		if(componentProp != null) {
			if ((options != null) && (infoType.equals(ProductsConstants.PAGE_SIZE_TYPE))) {
				pageSize.setLabel(componentProp.get(ProductsConstants.SIZE_LABEL, String.class));
				pageSize.setDefaultLabel(componentProp.get(ProductsConstants.DEFAULT_SIZE, String.class));
				pageSize.setDefaultValue(componentProp.get(ProductsConstants.DEFAULT_SIZE, String.class));
				pageSize.setOptions(getResourceValue(options));
			}
			if ((sortOptions != null) && (infoType.equals(ProductsConstants.SORT_BY_TYPE))) {
				pageSize.setLabel(componentProp.get(ProductsConstants.SORT_BY_VAL, String.class));
				pageSize.setDefaultLabel(componentProp.get(ProductsConstants.DEF_SORT_LABEL_VAL, String.class));
				pageSize.setDefaultValue(((componentProp.get(ProductsConstants.DEF_OPTION_VALUE)) != null) ? (componentProp.get(ProductsConstants.DEF_OPTION_VALUE, String.class)) : "");
				pageSize.setOptions(getResourceValue(sortOptions));

			}
		}
		return pageSize;
	}
	
	private PopUpInfo getpopUpInfo() {
		componentProp = resource.adaptTo(ValueMap.class);
		PopUpInfo popupInfo = productBean.new PopUpInfo();
		if(componentProp != null) {
				popupInfo.setConfirm(componentProp.get(ProductsConstants.POPUP_CONFIRM, String.class));
				popupInfo.setCancel(componentProp.get(ProductsConstants.POPUP_CANCEL, String.class));
				popupInfo.setTitle(componentProp.get(ProductsConstants.POPUP_TITLE, String.class));
				popupInfo.setEachPrice(componentProp.get(ProductsConstants.EACH_PRICE, String.class));
				popupInfo.setPriceHelperText(componentProp.get(ProductsConstants.PRICE_HELPER, String.class));
				
		}
		return popupInfo;
	}

	/**
	 * This methods will return the list of size and sort information
	 * resource node value
	 * 
	 * @param resource
	 * 
	 * @return resource value as List of Map List<Map<String, String>>
	 */
	public List<Map<String, String>> getResourceValue(Resource resource) {

		List<Map<String, String>> valueList = new ArrayList<>();
		node = resource.adaptTo(Node.class);

		if (node == null) {
			return valueList;
		}
		try {
			NodeIterator nodeIterator = node.getNodes();
			while (nodeIterator.hasNext()) {
				Map<String, String> nodeValue = new HashMap<>();
				Node childNode = nodeIterator.nextNode();
				if (childNode.hasProperty(ProductsConstants.OPTION_VALUE) && !childNode.hasProperty(ProductsConstants.SORT_LABEL_VAL)) {
					nodeValue.put(ProductsConstants.LABEL, childNode.getProperty(ProductsConstants.OPTION_VALUE).getValue().getString());
					nodeValue.put(ProductsConstants.VALUE, childNode.getProperty(ProductsConstants.OPTION_VALUE).getValue().getString());						
					valueList.add(nodeValue);
				} else if (childNode.hasProperty(ProductsConstants.SORT_LABEL_VAL) || childNode.hasProperty(ProductsConstants.OPTION_VALUE)) {
					nodeValue.put(ProductsConstants.LABEL, childNode.getProperty(ProductsConstants.SORT_LABEL_VAL).getValue().getString());
					if(childNode.hasProperty(ProductsConstants.OPTION_VALUE)) {
						nodeValue.put(ProductsConstants.VALUE, (childNode.getProperty(ProductsConstants.OPTION_VALUE).getValue().getString()));						
					} else if (!childNode.hasProperty(ProductsConstants.OPTION_VALUE)) {
						nodeValue.put(ProductsConstants.VALUE, "");						
					}
					valueList.add(nodeValue);
				}
			}
		} catch (RepositoryException e) {
			LOGGER.error("Exception in getResourceValue ::",e);
		}
		
		return valueList;
	}
	/**
	 * This method removes similac content root level path.
	 * 
	 * @param linkUrl
	 * 
	 * @return linkurl
	 */
	private String getRetailerUrl(String linkUrl) {
		
		if(StringUtils.startsWith(linkUrl, CommonConstants.SIMILAC_CONTENT_EN_ROOT_PATH)) {
			linkUrl = StringUtils.replace(linkUrl, CommonConstants.SIMILAC_CONTENT_EN_ROOT_PATH, StringUtils.EMPTY);
		} else if(StringUtils.startsWith(linkUrl, CommonConstants.SIMILAC_CONTENT_ROOT_PATH)) {
			linkUrl = StringUtils.replace(linkUrl,CommonConstants.SIMILAC_CONTENT_ROOT_PATH, StringUtils.EMPTY);
		}
		return linkUrl;
	}
	/**
	 * @param resource
	 * @param propertyValue
	 * @return
	 */
	public List<String> getResourceList(Resource resource, String propertyValue) {
		List<String> resourceList = new ArrayList<>();
		if (resource == null) {
			return resourceList;
		}
		node = resource.adaptTo(Node.class);
		if (node == null) {
			return resourceList;
		}
		try {
			NodeIterator nodeIterator = node.getNodes();
			while (nodeIterator.hasNext()) {
				Node childNode = nodeIterator.nextNode();
				if (childNode.hasProperty(propertyValue)) {
					resourceList.add(childNode.getProperty(propertyValue).getValue().getString());
				}
			}
		} catch (RepositoryException e) {
			LOGGER.error("Exception in getResourceList ::",e);
		}

		return resourceList;
	}
	
	/**
	 * This method will return the Product Component details as Json string
	 * 
	 * @return String
	 */
	public String getProductJson() {
		if (productBean != null) {
			productJson = new GsonBuilder().create().toJson(productBean);
		}
		return productJson;
	}
	
	public ProductComponentBean getProductBean() {
		return productBean;
	}

	public ValueMap getComponentProp() {
		return componentProp;
	}
	
	public Node getNode() {
		return node;
	}
}
package com.abbott.aem.an.similac.core.models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.ExporterOption;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

import com.abbott.aem.an.similac.core.utils.CommonConstants;
import com.abbott.aem.an.similac.core.utils.SimilacUtils;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.Page;

/**
 * The Class PopulateVariationsModel is used to get sizes and variations of a
 * product.
 *
 */
@Model(adaptables = { Resource.class, SlingHttpServletRequest.class }, resourceType = {
		"an/similac/components/content/products/productInfo" }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = "jackson", extensions = "json", options = {
		@ExporterOption(name = "SerializationFeature.WRITE_DATES_AS_TIMESTAMPS", value = "true") })
public class PopulateVariationsModel {
	
	
	/** The Constant TYPE_ID. */
	private static final String TYPE_ID = "type_id";

	/** The Constant SIMPLE. */
	private static final String SIMPLE = "simple";

	/** The Constant VIRTUAL. */
	private static final String VIRTUAL = "virtual";

	/** The Constant FLAVOR. */
	private static final String FLAVOR = "flavor";

	/** The Constant SIZE. */
	private static final String SIZE = "size";

	/** The Constant SIZE. */
	private static final String AEM_STATUS = "aem_status";
	
	private static final String STATUS = "status";
	
	/** The Constant STATUS_CODE_ENABLED. */
	private static final String STATUS_CODE_ENABLED = "1";
	
	private static final String STATUS_CODE_DISABLED = "0";
	
	/** The Constant SUBSCRIPTION. */
	private static final String SUBSCRIPTION = "subscription";

	/** The Constant SUBSCRIPTION_OPTTIONS. */
	private static final String SUBSCRIPTION_OPTTIONS = "aw_sarp2_subscription_type";

	/** The Constant SUBSCRIPTION_WEEK. */
	private static final String SUBSCRIPTION_WEEK = "subscription-week";

	/** The Constant DISCOUNT. */
	private static final String DISCOUNT = "discount";

	/** The current page. */
	@Inject
	private Page currentPage;

	/** The resource. */
	@Inject
	private Resource resource;

	/** The resource resolver */
	@SlingObject
	private ResourceResolver resourceResolver;

	/** The request. */
	@Self
	private SlingHttpServletRequest request;

	/** The page resource */
	private Resource pageResource = null;

	/** The selected flavor ID. */
	private String selectedFlavorID;

	/** The selected size ID. */
	private String selectedSizeID;

	/** The selected flavor name. */
	private String selectedFlavorName;

	/** The selected size name. */
	private String selectedSizeName;

	/** The subscription ID. */
	private String subscriptionID;

	/** The flavours values. */
	private ValueMap flavoursValues;

	/** The size values. */
	private ValueMap sizeValues;

	/** The discount map. */
	private ValueMap discountMap;

	/** The subscription map. */
	private ValueMap subscriptionMap;

	/** The value map. */
	private ValueMap valueMap = null;

	/** The path. */
	private String path = null;

	private Map<String, String> variationPageList;
	
	private Map<String, String> sizeList;
	
	private Map<String, String> flavourList;
	
	private Map<String, String> sizeValueList;

	/**
	 * Initialises the model.
	 */
	@PostConstruct
	protected void init() {
		if (currentPage.getContentResource() != null) {
			pageResource = currentPage.getContentResource();
			valueMap = pageResource.adaptTo(ValueMap.class);
		}

		String configPath = getConfigurablePagePath();
		getConfigPath(configPath);
		variationPageList = getVariationPages();
		sizeValues = getVariationProperties(path, SIZE);
		flavoursValues = getVariationProperties(path, FLAVOR);

		if (null != valueMap) {
			if ((valueMap.containsKey(TYPE_ID) && StringUtils.equalsIgnoreCase(valueMap.get(TYPE_ID).toString(), SIMPLE))
					|| StringUtils.equalsIgnoreCase(valueMap.get(TYPE_ID).toString(), VIRTUAL)) {
				setFlavorsData();
				setSizeData();
			}
			if (valueMap.containsKey((SUBSCRIPTION_OPTTIONS))) {
				subscriptionID = valueMap.get(SUBSCRIPTION_OPTTIONS, String.class);
			}
			if (pageResource != null && pageResource.getChild(SUBSCRIPTION) != null) {
				String subscriptionNodePath = pageResource.getChild(SUBSCRIPTION).getPath();
				subscriptionMap = getVariationProperties(subscriptionNodePath, SUBSCRIPTION_WEEK);
				discountMap = getVariationProperties(subscriptionNodePath, DISCOUNT);
			}
		}
		sortSizeVariationList();
	}

	private void getConfigPath(String configPath) {

		if (configPath != null) {
			path = configPath;
		} else {
			if (currentPage != null && pageResource != null) {
				path = pageResource.getPath();
			} else {
				path = resource.getPath() + CommonConstants.FORWARD_SLASH + JcrConstants.JCR_CONTENT;
			}
		}
	}

	/**
	 * Sets the size data.
	 */
	private void setSizeData() {
		if (valueMap.containsKey(SIZE)) {
			selectedSizeID = valueMap.get(SIZE, String.class);
			selectedSizeName = (null != sizeValues && sizeValues.containsKey(selectedSizeID))
					? sizeValues.get(selectedSizeID).toString()
					: null;
		}
	}

	/**
	 * Sets the flavors data.
	 */
	private void setFlavorsData() {
		if (valueMap.containsKey(CommonConstants.FLAVORS)) {
			selectedFlavorID = valueMap.get(CommonConstants.FLAVORS, String.class);
			selectedFlavorName = (null != flavoursValues && flavoursValues.containsKey(selectedFlavorID))
					? flavoursValues.get(selectedFlavorID).toString()
					: null;
		}
	}

	/**
	 * Gets the child page path.
	 *
	 * @return the child page path
	 */
	private Map<String, String> getVariationPages() {
		if (null != valueMap && valueMap.containsKey(TYPE_ID)
				&& StringUtils.equalsIgnoreCase(valueMap.get(TYPE_ID).toString(), SIMPLE)) {
			variationPageList = new HashMap<>();
			Iterator<Page> listChildrenPages = currentPage.getParent().listChildren();
			while (listChildrenPages.hasNext()) {
				Page childPage = listChildrenPages.next();
				
				if (childPage.getProperties().containsKey(SIZE) && childPage.getProperties().containsKey(STATUS)&& childPage.getProperties().get(STATUS).toString().equals(STATUS_CODE_ENABLED) && (childPage.getProperties().get(AEM_STATUS).equals(STATUS_CODE_ENABLED) || childPage.getProperties().get(AEM_STATUS).equals(STATUS_CODE_DISABLED))) {
					
					variationPageList.put(childPage.getProperties().get(SIZE, String.class),
							SimilacUtils.linkChecker(childPage.getPath()));
				}
			}
			return variationPageList;
		}
		return null;
	}

	/**
	 * Gets the configurable page path.
	 *
	 * @return the configurable page path
	 */
	private String getConfigurablePagePath() {
		if (null != valueMap && valueMap.containsKey(TYPE_ID)
				&& StringUtils.equalsIgnoreCase(valueMap.get(TYPE_ID).toString(), SIMPLE)) {
			return currentPage.getParent().getContentResource().getPath();
		}
		return null;
	}

	/**
	 * Gets the variation properties.
	 *
	 * @param path     the path
	 * @param nodeName the node name
	 * @return the variation properties
	 */
	private ValueMap getVariationProperties(String path, String nodeName) {
		Resource variantResource = resourceResolver.getResource(path).getChild(nodeName);
		if (null != variantResource) {
			ValueMap resourceValueMap = variantResource.adaptTo(ValueMap.class);
			if (nodeName.equalsIgnoreCase(SIZE) && resourceValueMap != null) {
				return removeDisabledProductSize(resourceValueMap);
			}
			if (nodeName.equalsIgnoreCase(FLAVOR) && resourceValueMap != null) {
				return removeDisabledProductFlavor(resourceValueMap);
			}
			return resourceValueMap;
		}
		return null;
	}

	/**
	 * This methods will remove the product size of disabled product from the size valuemap
	 * 
	 * @param sizeValueMap
	 * @return ValueMap
	 */
	private ValueMap removeDisabledProductSize(ValueMap sizeValueMap) {
		
		Iterator<Page> listChildrenPages = currentPage.getParent().listChildren();
		List<String> childPageSizeList = new ArrayList<>();
		sizeList = new HashMap<>();
		
		while (listChildrenPages.hasNext()) {
			Page childPage = listChildrenPages.next();
			
			if (childPage.getProperties().containsKey(SIZE) && childPage.getProperties().containsKey(STATUS)&& childPage.getProperties().get(STATUS).toString().equals(STATUS_CODE_ENABLED) && (childPage.getProperties().get(AEM_STATUS).equals(STATUS_CODE_ENABLED) || childPage.getProperties().get(AEM_STATUS).equals(STATUS_CODE_DISABLED))) {
				childPageSizeList.add(childPage.getProperties().get(SIZE, String.class));
				
			}
		}
		
		for(Entry<String, Object> size : sizeValueMap.entrySet() ) { 
			String sizeVaraiationKey = size.getKey();
			if(childPageSizeList.contains(sizeVaraiationKey)) {
				sizeList.put(size.getKey(), size.getValue().toString());
			}
		}
		return sizeValueMap;
	}

	/**
	 * This methods will remove the product flavors of disabled product from the flavor valuemap
	 * 
	 * @param flavorValueMap
	 * @return ValueMap
	 */
	private ValueMap removeDisabledProductFlavor(ValueMap flavorValueMap) {
		
		Iterator<Page> listChildrenPages = currentPage.getParent().listChildren();
		List<String> childPageFlavorList = new ArrayList<>();
		flavourList = new HashMap<>();
		
		while (listChildrenPages.hasNext()) {
			Page childPage = listChildrenPages.next();
			
			if (childPage.getProperties().containsKey(CommonConstants.FLAVORS) && childPage.getProperties().containsKey(STATUS)&& childPage.getProperties().get(STATUS).toString().equals(STATUS_CODE_ENABLED) && (childPage.getProperties().get(AEM_STATUS).equals(STATUS_CODE_ENABLED) || childPage.getProperties().get(AEM_STATUS).equals(STATUS_CODE_DISABLED))) {
				childPageFlavorList.add(childPage.getProperties().get(CommonConstants.FLAVORS, String.class));
			}
		}
		
		for(Entry<String, Object> size : flavorValueMap.entrySet() ) { 
			String flavorVaraiationKey = size.getKey();
			if(childPageFlavorList.contains(flavorVaraiationKey)) {
				flavourList.put(size.getKey(), size.getValue().toString());
			}
		}
		return flavorValueMap;
	}
	
	/**
	 * This method will sort the size variation list based on the selected size value
	 */
	private void sortSizeVariationList() {
		sizeValueList = new LinkedHashMap<>();
		if(sizeList != null) {
			for(Entry<String, String> size : sizeList.entrySet() ) {
				if(selectedSizeID != null && size.getKey().contentEquals(selectedSizeID)) {
					sizeValueList.put(size.getKey(), size.getValue());
				}
			}
			
			for(Entry<String, String> size : sizeList.entrySet() ) {
				if(selectedSizeID != null && !size.getKey().contentEquals(selectedSizeID)) {
					sizeValueList.put(size.getKey(), size.getValue());
				}
			}
		}
	}

	/**
	 * Gets the selected flavor ID.
	 *
	 * @return the selected flavor ID
	 */
	public String getSelectedFlavorID() {
		return selectedFlavorID;
	}

	/**
	 * Sets the selected flavor ID.
	 *
	 * @param selectedFlavorID the new selected flavor ID
	 */
	public void setSelectedFlavorID(String selectedFlavorID) {
		this.selectedFlavorID = selectedFlavorID;
	}

	/**
	 * Gets the selected size ID.
	 *
	 * @return the selected size ID
	 */
	public String getSelectedSizeID() {
		return selectedSizeID;
	}

	/**
	 * Gets the subscription ID.
	 *
	 * @return the subscription ID
	 */
	public String getSubscriptionID() {
		return subscriptionID;
	}

	/**
	 * Sets the selected size ID.
	 *
	 * @param selectedSizeID the new selected size ID
	 */
	public void setSelectedSizeID(String selectedSizeID) {
		this.selectedSizeID = selectedSizeID;
	}

	/**
	 * Gets the selected flavor name.
	 *
	 * @return the selected flavor name
	 */
	public String getSelectedFlavorName() {
		return selectedFlavorName;
	}

	/**
	 * Sets the selected flavor name.
	 *
	 * @param selectedFlavorName the new selected flavor name
	 */
	public void setSelectedFlavorName(String selectedFlavorName) {
		this.selectedFlavorName = selectedFlavorName;
	}

	/**
	 * Gets the selected size name.
	 *
	 * @return the selected size name
	 */
	public String getSelectedSizeName() {
		return selectedSizeName;
	}

	/**
	 * Sets the selected size name.
	 *
	 * @param selectedSizeName the new selected size name
	 */
	public void setSelectedSizeName(String selectedSizeName) {
		this.selectedSizeName = selectedSizeName;
	}

	/**
	 * Sets the flavours values.
	 *
	 * @param flavoursValues the new flavours values
	 */
	public void setFlavoursValues(ValueMap flavoursValues) {
		this.flavoursValues = flavoursValues;
	}

	/**
	 * Sets the size values.
	 *
	 * @param sizeValues the new size values
	 */
	public void setSizeValues(ValueMap sizeValues) {
		this.sizeValues = sizeValues;
	}

	/**
	 * Gets the flavours values.
	 *
	 * @return the flavours values
	 */
	public ValueMap getFlavoursValues() {
		return flavoursValues;
	}

	/**
	 * Gets the size values.
	 *
	 * @return the size values
	 */
	public ValueMap getSizeValues() {
		return sizeValues;
	}

	/**
	 * Gets the subscription map.
	 *
	 * @return the subscription map
	 */
	public ValueMap getSubscriptionMap() {
		return subscriptionMap;
	}

	/**
	 * Gets the discount map.
	 *
	 * @return the discount map
	 */
	public ValueMap getDiscountMap() {
		return discountMap;
	}

	public String getFirstDiscountValue() {
		Object entry = discountMap.values().toArray()[1];
		return entry.toString();
	}

	/**
	 * Gets the variationPageList.
	 *
	 * @return the variationPageList
	 */
	public Map<String, String> getVariationPageList() {
		return variationPageList;
	}

	public Map<String, String> getSizeValueList() {
		return sizeValueList;
	}
	
	public Map<String, String> getFlavourList() {
		return flavourList;
	}
	
	public boolean sizeDropdownFlag() {
		return (sizeValueList.size() > 1);
	}

	public boolean flavourDropdownFlag() {
		return (flavourList.size() > 1);
	}
	
}

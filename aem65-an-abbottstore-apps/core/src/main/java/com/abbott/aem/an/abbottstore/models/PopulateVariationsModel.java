package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.constants.CommonConstants;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.Page;
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import java.util.*;

/**
 * The Class PopulateVariationsModel is used to get sizes and variations of a
 * product.
 *
 * @author madhurim, saikrishna.s, sreenu.l, srividya.b
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
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

	/** The Constant AEM_Status. */
	private static final String AEM_STATUS = "aem_status";

	/** The Constant status. */
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

	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(PopulateVariationsModel.class);

	/** The current page. */
	@Inject
	private Page currentPage;

	/** The resource. */
	@Inject
	private Resource resource;

	/**
	 * The resource resolver.
	 */
	@SlingObject
	private ResourceResolver resourceResolver;

	/** The request. */
	@Self
	private SlingHttpServletRequest request;

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
	private Map<String,Object> sizeValues;

	/** The discount map. */
	private ValueMap discountMap;

	/** The subscription map. */
	private ValueMap subscriptionMap;

	/** The value map. */
	private ValueMap valueMap = null;

	/** The path. */
	private String path = null;


	/**
	 * Inits the.
	 */
	@PostConstruct
	protected void init() throws RepositoryException {
		valueMap = currentPage.getContentResource().adaptTo(ValueMap.class);
		String configPath = getConfigurablePagePath();
		if (null != configPath) {
			path = configPath;
		} else {
			if (null != currentPage) {
				path = currentPage.getContentResource().getPath();
			} else {
				path = resource.getPath() + CommonConstants.FORWARD_SLASH + JcrConstants.JCR_CONTENT;
			}
		}

		flavoursValues = getVariationProperties(path, FLAVOR);
		String currentPageResourcePath = currentPage.getContentResource().getPath();
		LOGGER.info("currentPageResourcePath :: {}", currentPageResourcePath);

		if (null != valueMap) {
			if ((valueMap.containsKey(TYPE_ID) && StringUtils.equalsIgnoreCase(valueMap.get(TYPE_ID).toString(), SIMPLE))
					|| StringUtils.equalsIgnoreCase(valueMap.get(TYPE_ID).toString(), VIRTUAL)) {
				setFlavorsData();
				setSizeData(path);
			}
			if (currentPage.getContentResource().getValueMap().containsKey((SUBSCRIPTION_OPTTIONS))) {
				subscriptionID = valueMap.get(SUBSCRIPTION_OPTTIONS, String.class);
			}
			if (currentPage.getContentResource().getChild(SUBSCRIPTION) != null) {
				String subscriptionNodePath = currentPage.getContentResource().getChild(SUBSCRIPTION).getPath();
				subscriptionMap = getVariationProperties(subscriptionNodePath, SUBSCRIPTION_WEEK);
				discountMap = getVariationProperties(subscriptionNodePath, DISCOUNT);
			}
		}
	}

	/**
	 * Sets the size data.
	 */
	private void setSizeData(String path) throws RepositoryException {
		sizeValues = new LinkedHashMap<>();
		if (valueMap.containsKey(SIZE)) {
			selectedSizeID = valueMap.get(SIZE, String.class);
			selectedSizeName = (sizeValues.containsKey(selectedSizeID))
					? sizeValues.get(selectedSizeID).toString()
					: null;
		}
		ValueMap sizes = getVariationProperties(path, SIZE);
		if (valueMap.containsKey(CommonConstants.FLAVORS)) {
			addFlavorsSizeId(sizes);
		}
		else if (null != sizes && sizes.containsKey(selectedSizeID)) {
			addSizeId(sizes);
		}
	}

	private void addFlavorsSizeId(ValueMap sizes) throws RepositoryException {
		Set<Object> availableSizes = getVariantSizes(currentPage.getParent().getPath(), valueMap.get(CommonConstants.FLAVORS).toString());
		if (null !=sizes && !availableSizes.isEmpty() && availableSizes.size() > 1) {
			if (sizes.containsKey(selectedSizeID)) {
				sizeValues.put(selectedSizeID, sizes.get(selectedSizeID));
			}
			for (Map.Entry<String, Object> entry : sizes.entrySet()) {
				if (!StringUtils.equalsIgnoreCase(entry.getKey(), JcrConstants.JCR_PRIMARYTYPE) && availableSizes.contains(entry.getKey()) && !StringUtils.equalsIgnoreCase(entry.getKey(), selectedSizeID)) {
					sizeValues.put(entry.getKey(), entry.getValue().toString());
				}
			}
		}
	}

	private void addSizeId(ValueMap sizes){
		Iterator<Page> listChildrenPages = currentPage.getParent().listChildren();
		List<String> childPageSizeList = new ArrayList<>();
		while (listChildrenPages.hasNext()) {
			Page childPage = listChildrenPages.next();
			if (childPage.getProperties().containsKey(SIZE) && childPage.getProperties().containsKey(STATUS)&& childPage.getProperties().get(STATUS).toString().equals(STATUS_CODE_ENABLED) && (childPage.getProperties().get(AEM_STATUS).equals(STATUS_CODE_ENABLED) || childPage.getProperties().get(AEM_STATUS).equals(STATUS_CODE_DISABLED)))
				childPageSizeList.add(childPage.getProperties().get(SIZE, String.class));
		}
		for(Map.Entry<String, Object> size : sizes.entrySet() ) {
			String sizeVaraiationKey = size.getKey();
			if(childPageSizeList.contains(sizeVaraiationKey)) {
				sizeValues.put(size.getKey(), size.getValue().toString());
			}
		}
	}

	protected Set<Object> getVariantSizes(String path, String flavor) throws RepositoryException {
		final Map<String, Object> queryMap = new HashMap<>();
		Set<Object> availableSizes = new HashSet<Object>();
		QueryBuilder queryBuilder = request.getResourceResolver().adaptTo(QueryBuilder.class);
		queryMap.put("path", path);
		queryMap.put("type", "cq:PageContent");

		queryMap.put("1_property", CommonConstants.FLAVORS);
		queryMap.put("1_property.value", flavor);
		com.day.cq.search.Query query = queryBuilder.createQuery(PredicateGroup.create(queryMap),
				request.getResourceResolver().adaptTo(Session.class));
		SearchResult result = query.getResult();
		List<Hit> results = result.getHits();
		if (null != results && !results.isEmpty()) {
			for (Hit hit : results) {
				ValueMap vm = hit.getProperties();
				if ((vm.containsKey(SIZE) && vm.containsKey(STATUS)) && (String.valueOf(vm.get(STATUS)).equals(STATUS_CODE_ENABLED) && (vm.get(AEM_STATUS,String.class).equals(STATUS_CODE_ENABLED) || vm.get(AEM_STATUS,String.class).equals(STATUS_CODE_DISABLED)))) {
						availableSizes.add(vm.get(SIZE));
				}
			}
		}
		return availableSizes;
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
			if (null != flavoursValues && flavoursValues.size() <= 2) {
				flavoursValues = null;
			}
		}
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
			return variantResource.adaptTo(ValueMap.class);
		}
		return ValueMap.EMPTY;
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
	public Map<String, Object> getSizeValues() {
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

	public ValueMap getGlucernaProperties() {
		return valueMap;
	}
}
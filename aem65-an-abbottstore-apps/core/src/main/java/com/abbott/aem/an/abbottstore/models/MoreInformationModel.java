package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.constants.CommonConstants;
import com.day.cq.wcm.api.Page;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;


/**
 * 
 *
 * @author saikrishna.s
 * 
 *         Registration Model
 * 
 *         Registration Model is the SlingModel to hold the details of
 *         individual Registration Model.
 * 
 *         Version Number: 1.0
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MoreInformationModel {

	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(MoreInformationModel.class);

	/** The current page. */
	@ScriptVariable
	private Page currentPage;

	/** The product flavor. */
	private String productFlavor;

	/** The case of product. */
	private String caseOfProduct;

	/** The product form. */
	private String productForm;

	/** The case of X. */
	private String caseOfX;

	/** The case of Y. */
	private String caseOfY;
	
	/** The is rush. */
	private String isRush;

	private boolean hasMoreInfo = false;

	/**
	 * Init method to get description from page properties of a product page.
	 */
	@PostConstruct
	protected void init() {
		LOGGER.debug("Inside init method of more informationModel model");
		ValueMap pageProperties = currentPage.getContentResource().adaptTo(ValueMap.class);
		if (pageProperties.containsKey(CommonConstants.PRODUCT_FLAVOR)
				&& StringUtils.isNotEmpty(pageProperties.get(CommonConstants.PRODUCT_FLAVOR, String.class))
				&& !pageProperties.get(CommonConstants.PRODUCT_FLAVOR, String.class)
						.equalsIgnoreCase(CommonConstants.NULL)) {
			productFlavor = pageProperties.get(CommonConstants.PRODUCT_FLAVOR, String.class);
			hasMoreInfo = true;
		}
		if (pageProperties.containsKey(CommonConstants.CASE_OF_PRODUCT)
				&& StringUtils.isNotEmpty(pageProperties.get(CommonConstants.CASE_OF_PRODUCT, String.class))
				&& !pageProperties.get(CommonConstants.CASE_OF_PRODUCT, String.class)
						.equalsIgnoreCase(CommonConstants.NULL)) {
			caseOfProduct = pageProperties.get(CommonConstants.CASE_OF_PRODUCT, String.class);
			hasMoreInfo = true;
		}
		if (pageProperties.containsKey(CommonConstants.PRODUCT_FORM)
				&& StringUtils.isNotEmpty(pageProperties.get(CommonConstants.PRODUCT_FORM, String.class))
				&& !pageProperties.get(CommonConstants.PRODUCT_FORM, String.class)
						.equalsIgnoreCase(CommonConstants.NULL)) {
			productForm = pageProperties.get(CommonConstants.PRODUCT_FORM, String.class);
			hasMoreInfo = true;
		}
		if (pageProperties.containsKey(CommonConstants.IS_RUSH)
				&& StringUtils.isNotBlank(pageProperties.get(CommonConstants.IS_RUSH, String.class))
				&& StringUtils.equals(pageProperties.get(CommonConstants.IS_RUSH, String.class), "1")) {
			isRush = pageProperties.get(CommonConstants.IS_RUSH, String.class);
			hasMoreInfo = true;
		}
		getCansData(pageProperties);

	}

	/**
	 * Gets the cans data.
	 *
	 * @param pageProperties the page properties
	 * @return the cans data
	 */
	private void getCansData(ValueMap pageProperties) {
		if (pageProperties.containsKey(CommonConstants.CANS_X)
				&& StringUtils.isNotEmpty(pageProperties.get(CommonConstants.CANS_X, String.class))
				&& !pageProperties.get(CommonConstants.CANS_X, String.class).equalsIgnoreCase(CommonConstants.NULL)) {
			caseOfX = pageProperties.get(CommonConstants.CANS_X, String.class);
			hasMoreInfo = true;
		}
		if (pageProperties.containsKey(CommonConstants.CANS_Y)
				&& StringUtils.isNotEmpty(pageProperties.get(CommonConstants.CANS_Y, String.class))
				&& !pageProperties.get(CommonConstants.CANS_Y, String.class).equalsIgnoreCase(CommonConstants.NULL)) {
			caseOfY = pageProperties.get(CommonConstants.CANS_Y, String.class);
			hasMoreInfo = true;
		}
	}

	/**
	 * Gets the product flavor.
	 *
	 * @return the product flavor
	 */
	public String getProductFlavor() {
		return productFlavor;
	}

	/**
	 * Gets the case of product.
	 *
	 * @return the case of product
	 */
	public String getCaseOfProduct() {
		return caseOfProduct;
	}

	/**
	 * Gets the product form.
	 *
	 * @return the product form
	 */
	public String getProductForm() {
		return productForm;
	}

	/**
	 * Gets the case of X.
	 *
	 * @return the case of X
	 */
	public String getCaseOfX() {
		return caseOfX;
	}

	/**
	 * Gets the case of Y.
	 *
	 * @return the case of Y
	 */
	public String getCaseOfY() {
		return caseOfY;
	}

	/**
	 * Gets the checks if is rush.
	 *
	 * @return the checks if is rush
	 */
	public String getIsRush() {
		return isRush;
	}

	public boolean hasMoreInformation() {
		return hasMoreInfo;
	}

}

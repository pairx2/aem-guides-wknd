package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.constants.CommonConstants;
import com.day.cq.wcm.api.Page;
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
 * @author saikrishna.s
 * 
 *         Product Description
 * 
 *         Product Description is the SlingModel to hold the details of
 *         individual Product Description
 * 
 *         Version Number: 1.0
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ProductDescriptionModel {

	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(ProductDescriptionModel.class);

	/** The current page. */
	@ScriptVariable
	private Page currentPage;

	/** The description. */
	private String description;

	/**
	 * Init method to get description from page properties of a product page.
	 */
	@PostConstruct
	protected void init() {
		LOGGER.info("Inside init method of product description model");
		ValueMap pageProperties = currentPage.getContentResource().adaptTo(ValueMap.class);
		if (pageProperties.containsKey(CommonConstants.DESCRIPTION)) {
			description = pageProperties.get(CommonConstants.DESCRIPTION, String.class);
		}
	}

	/**
	 * Gets the description.
	 *
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

}

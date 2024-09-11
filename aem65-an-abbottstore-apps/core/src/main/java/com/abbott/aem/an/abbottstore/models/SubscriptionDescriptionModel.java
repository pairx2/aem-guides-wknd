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
 * @author saikrishna.s
 * 
 *         Subscription Description
 * 
 *         Subscription Description is the SlingModel to hold the details of
 *         individual Subscription Description
 * 
 *         Version Number: 1.0
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SubscriptionDescriptionModel {

	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(SubscriptionDescriptionModel.class);

	/** The current page. */
	@ScriptVariable
	private Page currentPage;

	/** The subscription info. */
	private String subscriptionInfo;

	/**
	 * Init method to get subscription info from page properties of a product page.
	 */
	@PostConstruct
	protected void init() {
		LOGGER.debug("Inside init method of subscription description model");
		ValueMap pageProperties = currentPage.getContentResource().adaptTo(ValueMap.class);
		if (pageProperties.containsKey(CommonConstants.SUBSCRIPTION_INFO)
				&& StringUtils.isNotEmpty(pageProperties.get(CommonConstants.SUBSCRIPTION_INFO, String.class))
				&& !pageProperties.get(CommonConstants.SUBSCRIPTION_INFO, String.class)
						.equalsIgnoreCase(CommonConstants.NULL)) {
			subscriptionInfo = pageProperties.get(CommonConstants.SUBSCRIPTION_INFO, String.class);
		}

	}

	/**
	 * Gets the subscription info.
	 *
	 * @return the subscription info
	 */
	public String getSubscriptionInfo() {
		return subscriptionInfo;
	}

}

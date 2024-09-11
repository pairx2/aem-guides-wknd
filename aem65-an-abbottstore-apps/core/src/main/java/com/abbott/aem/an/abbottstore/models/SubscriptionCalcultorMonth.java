package com.abbott.aem.an.abbottstore.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The Class SubscriptionCalcultorMonth.
 */
@Model(adaptables = {Resource.class, SlingHttpServletRequest.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SubscriptionCalcultorMonth {

    /** The month num. */
    @ValueMapValue
    private String monthNum;
    
    /** The savings. */
    @ValueMapValue
    private String savings;
    
    /** The condition apply. */
    @ValueMapValue
    private Boolean conditionApply;

	/**
	 * Gets the condition apply.
	 *
	 * @return the condition apply
	 */
	public Boolean getConditionApply() {
		return conditionApply;
	}

	/**
	 * Gets the month num.
	 *
	 * @return the month num
	 */
	public String getMonthNum() {
		return monthNum;
	}

	/**
	 * Gets the savings.
	 *
	 * @return the savings
	 */
	public String getSavings() {
		return savings;
	}

}

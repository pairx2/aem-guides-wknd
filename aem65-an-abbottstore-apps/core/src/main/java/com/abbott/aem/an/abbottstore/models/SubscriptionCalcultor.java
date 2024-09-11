package com.abbott.aem.an.abbottstore.models;

import lombok.Getter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.List;

/**
 * The Class SubscriptionCalcultor.
 */
@Model(adaptables = {Resource.class, SlingHttpServletRequest.class} , defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SubscriptionCalcultor {
	
	/** The title. */
	@ValueMapValue
	private String title;

	/** The schedule time. */
	@ValueMapValue
	private String subTitle;
	
	/** The monthly savings list. */
	@Getter
	@ChildResource(name = "monthlySavings")
	private List<SubscriptionCalcultorMonth> monthlySavings;
	

	/**
	 * Gets the title.
	 *
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * Gets the sub title.
	 *
	 * @return the sub title
	 */
	public String getSubTitle() {
		return subTitle;
	}
	

}

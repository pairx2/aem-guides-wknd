package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.utils.AbbottUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The Class CtaButtonModel.
 */
@Model(adaptables = { Resource.class, SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CtaButtonModel extends UrlServiceModel{

	@SlingObject
	private ResourceResolver resourceResolver;

	/** The cta label. */
	@ValueMapValue
	private String ctaLabel;
	
	/** The cta link. */
	@ValueMapValue
	private String ctaLink;
	
	/** The new window. */
	@ValueMapValue
	private Boolean newWindow;

	/** The logged out text. */
	@ValueMapValue
	private String loggedOutText;

	/**
	 * Gets the cta label.
	 *
	 * @return the cta label
	 */
	public String getCtaLabel() {
		return ctaLabel;
	}

	/**
	 * Gets the cta link.
	 *
	 * @return the cta link
	 */
	public String getCtaLink() {
		return AbbottUtils.getResolvedPath(resourceResolver, ctaLink, getStoreBasePaths(), StringUtils.EMPTY);
	}

	/**
	 * Gets the new window.
	 *
	 * @return the new window
	 */
	public Boolean getNewWindow() {
		return newWindow;
	}

	/**
	 * Gets the logged out text.
	 *
	 * @return the logged out text
	 */
	public String getLoggedOutText() {
		return loggedOutText;
	}

}

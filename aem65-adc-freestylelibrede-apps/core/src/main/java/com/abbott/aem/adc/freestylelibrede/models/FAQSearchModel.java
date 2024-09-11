package com.abbott.aem.adc.freestylelibrede.models;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

/**
 * Model class for FAQ Search Form Component.
 *
 * @author ankushdhigra
 */
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/faq-search")
public class FAQSearchModel extends BaseComponentPropertiesImpl {

	@Self
	private Resource resource;

	/** The heading. */
	@Inject
	private String heading;

	/** The description. */
	@Inject
	private String description;

	/** The image. */
	@Inject
	private String image;

	/** The show all style. */
	@Inject
	private String showAllStyle;

	/** The result page. */
	@Inject
	private String resultPage;

	@Inject
	private String searchRootPath;

	/**
	 * Gets the heading.
	 *
	 * @return the heading
	 */
	public String getHeading() {
		return heading;
	}

	/**
	 * Gets the description.
	 *
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * Gets the image.
	 *
	 * @return the image
	 */
	public String getImage() {
		return image;
	}

	/**
	 * Gets the show all style.
	 *
	 * @return the showAllStyle
	 */
	public String getShowAllStyle() {
		return showAllStyle;
	}

	/**
	 * Gets the result page.
	 *
	 * @return the resultPage
	 */
	public String getResultPage() {
		return resultPage;
	}

	public String getSearchRootPath() {
		return searchRootPath;
	}
}

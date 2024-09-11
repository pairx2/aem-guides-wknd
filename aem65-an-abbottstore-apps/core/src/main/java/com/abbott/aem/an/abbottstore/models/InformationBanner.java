package com.abbott.aem.an.abbottstore.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 *
 * @author saikrishna.s
 * 
 *         Information Banner
 * 
 *         Information Banner is the SlingModel to hold the details of
 *         individual Information Banner.
 * 
 *         Version Number: 1.0
 */
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class InformationBanner {

	/** The image ref. */
	@ValueMapValue
	private String imageRef;

	/** The img alt text. */
	@ValueMapValue
	private String imgAltText;

	/** The sub title. */
	@ValueMapValue
	private String subTitle;

	/** The sub title color. */
	@ValueMapValue
	private String subTitleColor;

	/** The sub description. */
	@ValueMapValue
	private String subDescription;

	/**
	 * Gets the image ref.
	 *
	 * @return the image ref
	 */
	public String getImageRef() {
		return imageRef;
	}

	/**
	 * Gets the img alt text.
	 *
	 * @return the img alt text
	 */
	public String getImgAltText() {
		return imgAltText;
	}

	/**
	 * Gets the sub title.
	 *
	 * @return the sub title
	 */
	public String getSubTitle() {
		return subTitle;
	}

	/**
	 * Gets the sub title color.
	 *
	 * @return the sub title color
	 */
	public String getSubTitleColor() {
		return subTitleColor;
	}

	/**
	 * Gets the sub description.
	 *
	 * @return the sub description
	 */
	public String getSubDescription() {
		return subDescription;
	}

}

package com.abbott.aem.an.abbottstore.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 *
 * @author saikrishna.s
 * 
 *         Gs Information Banner
 * 
 *         GsInformationBanner is the SlingModel to hold the details of
 *         individual InformationBanner.
 * 
 *         Version Number: 1.0
 */
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class GsInformationBanner {

	/** The desk top image. */
	@ValueMapValue
	private String deskTopImage;

	/** The mobile image. */
	@ValueMapValue
	private String mobileImage;

	/** The text. */
	@ValueMapValue
	private String text;

	/** The alt text. */
	@ValueMapValue
	private String altText;

	/**
	 * Gets the desk top image.
	 *
	 * @return the desk top image
	 */
	public String getDeskTopImage() {
		return deskTopImage;
	}

	/**
	 * Gets the mobile image.
	 *
	 * @return the mobile image
	 */
	public String getMobileImage() {
		return mobileImage;
	}

	/**
	 * Gets the text.
	 *
	 * @return the text
	 */
	public String getText() {
		return text;
	}

	/**
	 * Gets the alt text.
	 *
	 * @return the alt text
	 */
	public String getAltText() {
		return altText;
	}
}

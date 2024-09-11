package com.abbott.aem.an.abbottstore.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 *
 * @author saikrishna.s
 * 
 *         Image Text
 * 
 *         Image Text is the SlingModel to hold the details of individual Image
 *         Text.
 * 
 *         Version Number: 1.0
 */
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ImageTextModel {

	/** The image ref. */
	@ValueMapValue
	private String imageRef;

	/** The img alt text. */
	@ValueMapValue
	private String imgAltText;

	/** The image alignment. */
	@ValueMapValue
	private String imageAlignment;

	/** The bg color. */
	@ValueMapValue
	private String bgColor;

	/** The title. */
	@ValueMapValue
	private String title;

	/** The title color. */
	@ValueMapValue
	private String titleColor;

	/** The text. */
	@ValueMapValue
	private String text;

	/** The text color. */
	@ValueMapValue
	private String textColor;

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
	 * Gets the image alignment.
	 *
	 * @return the image alignment
	 */
	public String getImageAlignment() {
		return imageAlignment;
	}

	/**
	 * Gets the bg color.
	 *
	 * @return the bg color
	 */
	public String getBgColor() {
		return bgColor;
	}

	/**
	 * Gets the title.
	 *
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * Gets the title color.
	 *
	 * @return the title color
	 */
	public String getTitleColor() {
		return titleColor;
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
	 * Gets the text color.
	 *
	 * @return the text color
	 */
	public String getTextColor() {
		return textColor;
	}

}

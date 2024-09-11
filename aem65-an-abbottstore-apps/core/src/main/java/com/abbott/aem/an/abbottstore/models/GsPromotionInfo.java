package com.abbott.aem.an.abbottstore.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 *
 * @author saikrishna.s
 * 
 *         GsPromotionInfo
 * 
 *         GsPromotionInfo is the SlingModel to hold the details of individual
 *         PromotionInfo.
 * 
 *         Version Number: 1.0
 */
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class GsPromotionInfo {

	/** The promotion title. */
	@ValueMapValue
	private String promotionTitle;

	/** The promotion title color. */
	@ValueMapValue
	private String promotionTitleColor;

	/** The promotion sub title. */
	@ValueMapValue
	private String promotionSubTitle;

	/** The promotion sub title color. */
	@ValueMapValue
	private String promotionSubTitleColor;

	/** The promotion text. */
	@ValueMapValue
	private String promotionText;

	/** The desk top image. */
	@ValueMapValue
	private String deskTopImage;

	/** The mobile image. */
	@ValueMapValue
	private String mobileImage;

	/** The alt text. */
	@ValueMapValue
	private String altText;

	/** The disclaimer text. */
	@ValueMapValue
	private String disclaimerText;

	/**
	 * Gets the promotion title.
	 *
	 * @return the promotion title
	 */
	public String getPromotionTitle() {
		return promotionTitle;
	}

	/**
	 * Gets the promotion title color.
	 *
	 * @return the promotion title color
	 */
	public String getPromotionTitleColor() {
		return promotionTitleColor;
	}

	/**
	 * Gets the promotion sub title.
	 *
	 * @return the promotion sub title
	 */
	public String getPromotionSubTitle() {
		return promotionSubTitle;
	}

	/**
	 * Gets the promotion sub title color.
	 *
	 * @return the promotion sub title color
	 */
	public String getPromotionSubTitleColor() {
		return promotionSubTitleColor;
	}

	/**
	 * Gets the promotion text.
	 *
	 * @return the promotion text
	 */
	public String getPromotionText() {
		return promotionText;
	}

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
	 * Gets the disclaimer text.
	 *
	 * @return the disclaimer text
	 */
	public String getDisclaimerText() {
		return disclaimerText;
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

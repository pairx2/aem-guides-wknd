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
 *
 * @author saikrishna.s
 * 
 *         Banner Image
 * 
 *         Banner Image is the SlingModel to hold the details of individual
 *         Banner Image.
 * 
 *         Version Number: 1.0
 */
@Model(adaptables = {Resource.class, SlingHttpServletRequest.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class BannerImage extends UrlServiceModel{

	@SlingObject
	private ResourceResolver resourceResolver;

	/** The banner type. */
	@ValueMapValue
	private String bannerType;

	/** The desk top image ref. */
	@ValueMapValue
	private String deskTopImageRef;

	/** The tab image ref. */
	@ValueMapValue
	private String tabImageRef;

	/** The mobile image ref. */
	@ValueMapValue
	private String mobileImageRef;

	/** The img alt text. */
	@ValueMapValue
	private String imgAltText;

	/** The image link. */
	@ValueMapValue
	private String imageLink;

	/** The img link target. */
	@ValueMapValue
	private String imgLinkTarget;

	/** The gs image ref. */
	@ValueMapValue
	private String gsImageRef;

	/** The gs img alt text. */
	@ValueMapValue
	private String gsImgAltText;

	/** The gs title text 1. */
	@ValueMapValue
	private String gsTitleText1;

	/** The gs title text 2. */
	@ValueMapValue
	private String gsTitleText2;

	/** The gs title color. */
	@ValueMapValue
	private String gsTitleColor;

	/** The gs text. */
	@ValueMapValue
	private String gsText;

	/** The button label. */
	@ValueMapValue
	private String buttonLabel;

	/** The button link. */
	@ValueMapValue
	private String buttonLink;

	/** The gs note text. */
	@ValueMapValue
	private String gsNoteText;

	/** The gs note text color. */
	@ValueMapValue
	private String gsNoteTextColor;

	/**
	 * Gets the banner type.
	 *
	 * @return the banner type
	 */
	public String getBannerType() {
		return bannerType;
	}

	/**
	 * Gets the desk top image ref.
	 *
	 * @return the desk top image ref
	 */
	public String getDeskTopImageRef() {
		return AbbottUtils.resolve(resourceResolver,deskTopImageRef);
	}

	/**
	 * Gets the tab image ref.
	 *
	 * @return the tab image ref
	 */
	public String getTabImageRef() {
		return AbbottUtils.resolve(resourceResolver,tabImageRef);
	}

	/**
	 * Gets the mobile image ref.
	 *
	 * @return the mobile image ref
	 */
	public String getMobileImageRef() {
		return AbbottUtils.resolve(resourceResolver,mobileImageRef);
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
	 * Gets the image link.
	 *
	 * @return the image link
	 */
	public String getImageLink() {
		if(StringUtils.isNotBlank(imageLink)) {
			return getAemServer() + AbbottUtils.getHtmlLink(resourceResolver, imageLink);
		}
		return null;
	}

	/**
	 * Gets the img link target.
	 *
	 * @return the img link target
	 */
	public String getImgLinkTarget() {
		return imgLinkTarget;
	}

	/**
	 * Gets the gs image ref.
	 *
	 * @return the gs image ref
	 */
	public String getGsImageRef() {
		return gsImageRef;
	}

	/**
	 * Gets the gs img alt text.
	 *
	 * @return the gs img alt text
	 */
	public String getGsImgAltText() {
		return gsImgAltText;
	}

	/**
	 * Gets the gs title text 1.
	 *
	 * @return the gs title text 1
	 */
	public String getGsTitleText1() {
		return gsTitleText1;
	}

	/**
	 * Gets the gs title text 2.
	 *
	 * @return the gs title text 2
	 */
	public String getGsTitleText2() {
		return gsTitleText2;
	}

	/**
	 * Gets the gs title color.
	 *
	 * @return the gs title color
	 */
	public String getGsTitleColor() {
		return gsTitleColor;
	}

	/**
	 * Gets the gs text.
	 *
	 * @return the gs text
	 */
	public String getGsText() {
		return gsText;
	}

	/**
	 * Gets the button label.
	 *
	 * @return the button label
	 */
	public String getButtonLabel() {
		return buttonLabel;
	}

	/**
	 * Gets the button link.
	 *
	 * @return the button link
	 */
	public String getButtonLink() {
		return AbbottUtils.getResolvedPath(resourceResolver, buttonLink, getStoreBasePaths(), StringUtils.EMPTY);
	}

	/**
	 * Gets the gs note text.
	 *
	 * @return the gs note text
	 */
	public String getGsNoteText() {
		return gsNoteText;
	}

	/**
	 * Gets the gs note text color.
	 *
	 * @return the gs note text color
	 */
	public String getGsNoteTextColor() {
		return gsNoteTextColor;
	}

}

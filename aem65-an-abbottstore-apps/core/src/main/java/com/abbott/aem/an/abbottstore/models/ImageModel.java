package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.utils.AbbottUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The Class ImageModel.
 */
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ImageModel extends UrlServiceModel{

	/** The resource resolver. */
	@SlingObject
	private ResourceResolver resourceResolver;

	/** The alt text. */
	@ValueMapValue
	private String imgAltText;

	/** The image link. */
	@ValueMapValue
	private String imageLink;

	/** The file reference image. */
	@ValueMapValue
	private String fileReferenceImage;

	/** The img link target. */
	@ValueMapValue
	private Boolean imgLinkTarget;

	/**
	 * Gets the alt text.
	 *
	 * @return the alt text
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
		}else {
			return getAemServer();
		}
	}

	/**
	 * Gets the file reference image.
	 *
	 * @return the file reference image
	 */
	public String getFileReferenceImage() {
		return getAemServer()+AbbottUtils.resolve(resourceResolver, fileReferenceImage);
	}

	/**
	 * Gets the img link target.
	 *
	 * @return the img link target
	 */
	public Boolean getImgLinkTarget() {
		return imgLinkTarget;
	}
}

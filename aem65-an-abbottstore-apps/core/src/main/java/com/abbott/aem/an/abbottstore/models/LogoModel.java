package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.constants.CommonConstants;
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
 *         Logo
 * 
 *         Logo Model is the SlingModel to hold the details of individual logo
 *         component
 * 
 *         Version Number: 1.0
 */
@Model(adaptables = { Resource.class, SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class LogoModel extends UrlServiceModel{

	/** The resource resolver. */
	@SlingObject
	private ResourceResolver resourceResolver;

	/** The logo image. */
	@ValueMapValue
	private String logoImage;

	/** The alt text. */
	@ValueMapValue
	private String altText;

	/** The redirection link. */
	@ValueMapValue
	private String redirectionLink;

	/** The redirection target. */
	@ValueMapValue
	private String redirectionTarget;

	/** The title. */
	@ValueMapValue
	private String title;

	/**
	 * Gets the logo image.
	 *
	 * @return the logo image
	 */
	public String getLogoImage() {
		return getAemServer()+AbbottUtils.resolve(resourceResolver,logoImage);
	}

	/**
	 * Gets the alt text.
	 *
	 * @return the alt text
	 */
	public String getAltText() {
		return altText;
	}

	/**
	 * Gets the redirection link.
	 *
	 * @return the redirection link
	 */
	public String getRedirectionLink() {
			if(StringUtils.equals(redirectionLink,CommonConstants.ABBOTTSTORE_HOME_PAGE_PATH) || StringUtils.startsWith(redirectionLink,CommonConstants.GLUCERNA_HOME_PAGE_PATH)){
				return CommonConstants.FORWARD_SLASH;
			}
			else{
				return AbbottUtils.getResolvedPath(resourceResolver, redirectionLink, getStoreBasePaths(), StringUtils.EMPTY);
			}
	}

	/**
	 * Gets the redirection target.
	 *
	 * @return the redirection target
	 */
	public String getRedirectionTarget() {
		return redirectionTarget;
	}

	/**
	 * Gets the title.
	 *
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

}

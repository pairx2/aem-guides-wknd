package com.abbott.aem.an.similac.core.models;

import javax.inject.Inject;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.ExporterOption;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.an.similac.core.services.StoreConfigService;
import com.abbott.aem.an.similac.core.utils.CommonConstants;
import com.abbott.aem.an.similac.core.utils.SimilacUtils;

/**
 * 
 *  Logo Model is the SlingModel to hold the details of individual logo component
 * 
 */
@Model(adaptables = { Resource.class, SlingHttpServletRequest.class },resourceType = { "an/similac/components/content/logo" }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = "jackson", extensions = "json", options = { @ExporterOption(name = "SerializationFeature.WRITE_DATES_AS_TIMESTAMPS", value = "true") })
public class LogoModel {
	
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
	
	/** The store service. */
	@Inject
	private StoreConfigService storeService;
		
	/**
	 * Gets the logo image.
	 *
	 * @return the logo image
	 */
	public String getLogoImage() {
		return storeService.getDomainName().concat(logoImage);
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
		String link =  SimilacUtils.linkChecker(redirectionLink);
		
		if(StringUtils.startsWith(link, CommonConstants.SIMILAC_CONTENT_EN_ROOT_PATH)) {
			link = StringUtils.replace(link, CommonConstants.SIMILAC_CONTENT_EN_ROOT_PATH, StringUtils.EMPTY);
		} else if(StringUtils.startsWith(link, CommonConstants.SIMILAC_CONTENT_ROOT_PATH)) {
			link = StringUtils.replace(link,CommonConstants.SIMILAC_CONTENT_ROOT_PATH, StringUtils.EMPTY);
		}
		
		return storeService.getDomainName().concat(link);
		
	}
	
	/**
	 * Gets the redirection target.
	 *
	 * @return the redirection target
	 */
	public String getRedirectionTarget() {
		return redirectionTarget;
	}

}

package com.abbott.aem.an.similac.core.models;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.ExporterOption;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.an.similac.core.services.StoreConfigService;
import com.abbott.aem.an.similac.core.utils.SimilacUtils;

/**
 * 
 * Footer Model is the SlingModel to hold the details of individual product
 * footer component
 * 
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class },resourceType = { "an/similac/components/content/footer"}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = "jackson", extensions = "json", options = { @ExporterOption(name = "SerializationFeature.WRITE_DATES_AS_TIMESTAMPS", value = "true") })
public class FooterModel {

	/** The store service. */
	@Inject
	private StoreConfigService storeService;

	@ValueMapValue
	private String abbottLogoURL;

	@ValueMapValue
	private String abbottLogo;

	@ValueMapValue
	private String abbottLogoAlttext;

	@ValueMapValue
	private String socialiconsHeader;

	@ValueMapValue
	private String instagramURL;

	@ValueMapValue
	private String youtubeURL;

	@ValueMapValue
	private String facebookURL;

	@ValueMapValue
	private String copyrightsText;

	@ValueMapValue
	private String instagramIcon;

	@ValueMapValue
	private String instagramAlttext;

	@ValueMapValue
	private String youtubeIcon;

	@ValueMapValue
	private String youtubeAltText;

	@ValueMapValue
	private String facebookIcon;

	@ValueMapValue
	private String facebookAltText;

	public String getAbbottLogoURL() {
		return SimilacUtils.linkChecker(abbottLogoURL);
	}

	public String getAbbottLogo() {
		return storeService.getDomainName().concat(abbottLogo);
	}

	public String getAbbottLogoAlttext() {
		return abbottLogoAlttext;
	}

	public String getSocialiconsHeader() {
		return socialiconsHeader;
	}

	public String getCopyrightsText() {
		return copyrightsText;
	}

	public String getInstagramURL() {
		return SimilacUtils.linkChecker(instagramURL);
	}

	public String getYoutubeURL() {
		return SimilacUtils.linkChecker(youtubeURL);
	}

	public String getFacebookURL() {
		return SimilacUtils.linkChecker(facebookURL);
	}

	public String getInstagramIcon() {
		return storeService.getDomainName().concat(instagramIcon);
	}

	public String getInstagramAlttext() {
		return instagramAlttext;
	}

	public String getYoutubeIcon() {
		return storeService.getDomainName().concat(youtubeIcon);
	}

	public String getYoutubeAltText() {
		return youtubeAltText;
	}

	public String getFacebookIcon() {
		return storeService.getDomainName().concat(facebookIcon);
	}

	public String getFacebookAltText() {
		return facebookAltText;
	}

}
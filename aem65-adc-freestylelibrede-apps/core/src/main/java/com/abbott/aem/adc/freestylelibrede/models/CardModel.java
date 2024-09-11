package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;
import javax.inject.Named;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
/**
 * Sling model class for Card component
 * 
 * @author RuMalik 
 *
 */
@Model(adaptables=Resource.class, defaultInjectionStrategy=DefaultInjectionStrategy.OPTIONAL)
public class CardModel {
	
	@Inject 
	private String imagePosition;
	
	@Inject
	@Named("title")
	private String cardTitle;
	
	@Inject
	private String image;
	
	@Inject
	private String imageAltText;
	
	@Inject
	private String description;
	
	@Inject
	private String ctaLabel;
	
	@Externalize
	private String ctaLink;
	
	@Inject
	private Boolean showCta;
	
	@Inject 
	private String ctaAction;
	
	@Inject
	private String secondaryCtaLabel;
	
	@Externalize
	private String secondaryCtaLink;
	
	@Inject 
	private String secondaryCtaAction;	
	@Inject 
	private String ctaStyling;
	@Inject 
	private String secondaryCtaStyling;
	
	/**
	 * 
	 * @return ctaStyling
	 */
	public String getCtaStyling() {
		return ctaStyling;
	}
	/**
	 * 
	 * @return secondaryCtaStyling
	 */
	public String getSecondaryCtaStyling() {
		return secondaryCtaStyling;
	}

	/**
	 * 
	 * @return secondaryCtaLabel
	 */
	public String getSecondaryCtaLabel() {
		return secondaryCtaLabel;
	}

	/**
	 * 
	 * @return secondaryCtaLink
	 */
	public String getSecondaryCtaLink() {
		return secondaryCtaLink;
	}

	/**
	 * 
	 * @return secondaryCtaAction
	 */
	public String getSecondaryCtaAction() {
		return secondaryCtaAction;
	}


	/**
	 * @return the cardTitle
	 */
	public final String getCardTitle() {
		return cardTitle;
	}

	
	/**
	 * @return the imagePosition
	 */
	public final String getImagePosition() {
		return imagePosition;
	}

	/**
	 * @return the image
	 */
	public final String getImage() {
		return image;
	}
	
	/**
	 * @return the imageAltText
	 */
	public final String getImageAltText() {
		return imageAltText;
	}

	/**
	 * @return the description
	 */
	public final String getDescription() {
		return description;
	}

	/**
	 * @return the ctaLabel
	 */
	public final String getCtaLabel() {
		return ctaLabel;
	}
	
	/**
	 * @return the ctaLink
	 */
	public final String getCtaLink() {
		return ctaLink;
	}
	
	/**
	 * @return the showCta
	 */
	public final Boolean getShowCta() {
		return showCta;
	}
	
	/**
	 * @return the ctaAction
	 */
	public final String getCtaAction() {
		return ctaAction;
	}

}
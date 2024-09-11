package com.abbott.aem.epd.acare.core.models.components;

import java.util.List;

import com.abbott.aem.epd.acare.core.models.ExternalUrlModel;
import com.adobe.cq.sightly.SightlyWCMMode;
import org.osgi.annotation.versioning.ConsumerType;


/**
 *
 * Model for Email footer component
 */

@ConsumerType
public interface FooterEmail {

	/**
	 * @return the footer type of this component
	 */
	public String getFooterType();
	public void setFooterType(String footerType);

	/**
	 * @return the text color of this component
	 */
	public String getTextColor();
	public void setTextColor(String textColor);

	/**
	 * @return the subscriptionText of this component
	 */
	public String getSubscriptionText();
	public void setSubscriptionText(String subscriptionText);

	/**
	 * @return the Subscription link of this component
	 */
	public String getSubscriptionLink();


	/**
	 * @return the link text of this component
	 */
	public String getLinkText();
	public void setLinkText(String linkText);

	/**
	 * @return the disclaimer text of this component
	 */
	public String getText();

	/**
	 * @return the Link Items of this component
	 */
	public List<LinkItem> getLinkItem();

	/**
	 * @return the Social Image list of this component
	 */
	public List<SocialImage> getSocialImage();

	/**
	 * @return the footer cta text of this component
	 */
	public String getFooterCtaText();
	public void setFooterCtaText(String footerCtaText);

	/**
	 * @return the footer cta link of this component
	 */
	public String getFooterCtaLink();

	/**
	 * @return the Arrow Icon for card navigation of this component
	 */
	public String getArrowImage();

	/**
	 * @return the Arrow Icon alt text of this component
	 */
	public String getArrowAltText();
	public void setArrowAltText(String arrowAltText);

	/**
	 * @return the left logo of this component
	 */
	public String getLeftLogo();


	/**
	 * @return the right logo of this component
	 */
	public String getRightLogo();

	/**
	 * @return the leftlogo link of this component
	 */
	public String getLeftLogoLink();

	/**
	 * @return the rightlogo link of this component
	 */
	public String getRightLogoLink();

	/**
	 * @return the Background Color of this component
	 */
	public String getBGColor();

	/**
	 * @return String imageTile
	 */
	public String getImageTile();
	public void setWcmmode(SightlyWCMMode wcmmode);
	public void setExternalizerModel(ExternalUrlModel externalizerModel);

	/**
	 * @return the social tile color of this component
	 */
	public String getSocialTileColor();
	public void setSocialTileColor(String socialTileColor);

	/**
	 * @return the footer heading text of this component
	 */
	public String getFooterHeading();
	public void setFooterHeading(String footerHeading);

	/**
	 * @return the footer subheading text of this component
	 */
	public String getFooterSubheading();
	public void setFooterSubheading(String footerSubheading);
	/**
	 * @return the first card image of this component
	 */
	public String getFirstCardImage();


	/**
	 * @return the first card image alt text of this component
	 */
	public String getCard1AltText();
	public void setCard1AltText(String card1AltText);

	/**
	 * @return the first card link of this component
	 */
	public String getCard1Link();


	/**
	 * @return the first card title of this component
	 */
	public String getCard1Title();
	public void setCard1Title(String card1Title);

	/**
	 * @return the first card subtitle of this component
	 */
	public String getCard1Subtitle();
	public void setCard1Subtitle(String card1Subtitle);

	/**
	 * @return the First Card of this component with domain parameter
	 */


	/**
	 * @return the second card image of this component
	 */
	public String getCard2Image();

	/**
	 * @return the second card image alt text of this component
	 */
	public String getCard2AltText();
	public void setCard2AltText(String card2AltText);

	/**
	 * @return the second card link of this component
	 */
	public String getCard2Link();

	/**
	 * @return the second card title of this component
	 */
	public String getCard2Title();
	public void setCard2Title(String card2Title);

	/**
	 * @return the second card subtitle of this component
	 */
	public String getCard2Subtitle();
	public void setCard2Subtitle(String card2Subtitle);

	/**
	 * @return the Second Card of this component with domain parameter
	 */
	public String getSecondCardImage();


	/**
	 * @return the DisclaimerTxt of this component
	 */
	public String getDisclaimerText();
	public void setDisclaimerText(String text);

	public String getAssetDomain();
	public void setAssetDomain(String assetDomain);

	public String getShortTitle();
	public void setShortTitle(String shortTitle);
	public String getImageTileColor();
	public void setImageTileColor(String imageTileColor);
	public String getImageTileAltText();
	public void setImageTileAltText(String imageTileAltText);
	public String getLeftLogoAltText();
	public void setLeftLogoAltText(String leftLogoAltText);
	public String getRightLogoAltText();
	public void setRightLogoAltText(String rightLogoAltText);
	public String getLogoTileColor();
	public void setLogoTileColor(String logoTileColor);


	public void init();

}
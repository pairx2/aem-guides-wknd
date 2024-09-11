package com.abbott.aem.epd.acare.core.models.components.impl;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import com.drew.lang.annotations.NotNull;
import lombok.*;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.abbott.aem.epd.acare.core.models.ExternalUrlModel;
import com.abbott.aem.epd.acare.core.models.components.FooterEmail;
import com.abbott.aem.epd.acare.core.models.components.LinkItem;
import com.abbott.aem.epd.acare.core.models.components.SocialImage;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.sightly.SightlyWCMMode;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.wcm.api.Page;


@Data
@EqualsAndHashCode(callSuper = false)
@ToString
@Model(adaptables = {SlingHttpServletRequest.class}, adapters = {FooterEmail.class}, resourceType = {
		FooterEmailImpl.RESOURCE_TYPE}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class FooterEmailImpl implements FooterEmail {

	public static final String RESOURCE_TYPE = "epd/acare/components/email/footer-email-rwd";
	@Inject
	@ScriptVariable
	@NonNull
	public Page currentPage;

	@Inject
	//@Self
	@ScriptVariable
	@NotNull
	public ExternalUrlModel externalizerModel;

	private String assetDomain;

	private InheritanceValueMap ivm;

	@ScriptVariable
	public SightlyWCMMode wcmmode;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String footerType;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String textColor;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String subscriptionText;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String subscriptionLink;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String linkText;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String text;

	@ChildResource
	@Setter(AccessLevel.NONE)
	protected List<LinkItem> linkItem;

	@ChildResource
	@Setter(AccessLevel.NONE)
	protected List<SocialImage> socialImage;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String footerCtaText;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String footerCtaLink;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String arrowImage;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String arrowAltText;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String footerHeading;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String footerSubheading;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String card1Image;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String card1AltText;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String card1Link;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String card1Title;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String card1Subtitle;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String card2Image;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String card2AltText;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String card2Link;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String card2Title;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String card2Subtitle;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String socialTileColor;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String shortTitle;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String imageTile;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String imageTileColor;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String imageTileAltText;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String leftLogo;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	public String leftLogoLink;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String leftLogoAltText;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String rightLogo;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String rightLogoLink;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String rightLogoAltText;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String logoTileColor;

	/**
	 * init method to initialize the value
	 */
	@PostConstruct
	public void init() {
		ivm = new HierarchyNodeInheritanceValueMap(currentPage.getContentResource());
		this.assetDomain = ivm.getInherited("assetDomain", String.class);
	}

	/**
	 * This method returns the disclaimer text authored on this component
	 * @return String disclaimerText
	 */
	@Override
	public String getDisclaimerText() {
		return text;
	}
	@Override
	public void setDisclaimerText(String text){this.text=text;}

	@Override
	public void setWcmmode(SightlyWCMMode wcmmode){
		this.wcmmode=wcmmode;
	}

	/**
	 * This method returns the leftLogo authored on parent page/current page
	 * @return String leftLogo
	 */
	@Override
	public String getLeftLogo() {
		if(wcmmode.isDisabled() && null != this.leftLogo && null != assetDomain && !assetDomain.isEmpty()){
			leftLogo = assetDomain + this.leftLogo;
		}
		return leftLogo;
	}
	/**
	 * This method returns the right logo authored on parent page/current page
	 * @return String rightLogo
	 */
	@Override
	public String getRightLogo() {
		if(wcmmode.isDisabled() && null != this.rightLogo && null != assetDomain && !assetDomain.isEmpty()){
			rightLogo = assetDomain + this.rightLogo;
		}
		return rightLogo;
	}

	/**
	 * This method returns the left logo link authored on this component
	 * @return String link
	 */
	@Override
	public String getLeftLogoLink(){
		String link = this.leftLogoLink;
		return externalizerModel.getExternalizedUrl(link);

	}
	@Override
	public void setExternalizerModel(ExternalUrlModel externalizerModel){
		this.externalizerModel=externalizerModel;
	}


	/**
	 * This method returns the left logo link authored on this component
	 * @return String link
	 */
	@Override
	public String getRightLogoLink(){
		String link = this.rightLogoLink;
		return externalizerModel.getExternalizedUrl(link);
	}

	/**
	 * This method returns the background color authored on parent page/current page
	 * @return String bgColor
	 */
	@Override
	public String getBGColor() {
		String inheritedBGColor = ivm.getInherited("footerBGColor", String.class);

		if(null != inheritedBGColor){
			return inheritedBGColor;
		}
		else{
			return "#ffffff";
		}
	}

	/**
	 * This method returns the asset domain prefixed footer tile image authored on this component
	 * @return String imageTile
	 */
	@Override
	public String getImageTile() {
		String tileImage;
		if(wcmmode.isDisabled() && null != this.imageTile && null != assetDomain && !assetDomain.isEmpty()){
			tileImage = assetDomain + this.imageTile;
		}
		else{
			tileImage = this.imageTile;
		}
		return tileImage;
	}


	/**
	 * This method returns the asset domain prefixed first card image authored on this component
	 * @return String firstCardImage
	 */
	@Override
	public String getFirstCardImage() {
		String firstCardImage;
		if(wcmmode.isDisabled() && null != this.card1Image && null != assetDomain && !assetDomain.isEmpty()){
			firstCardImage = assetDomain + card1Image;
		}
		else{
			firstCardImage = card1Image;
		}
		return firstCardImage;
	}


	/**
	 * This method returns the asset domain prefixed second card image authored on this component
	 * @return String secondCardImage
	 */
	@Override
	public String getSecondCardImage() {
		String secondCardImage;
		if(wcmmode.isDisabled() && null != this.card2Image && null != assetDomain && !assetDomain.isEmpty()){
			secondCardImage = assetDomain + card2Image;
		}
		else{
			secondCardImage = card2Image;
		}
		return secondCardImage;
	}

	/**
	 * This method returns the asset domain prefixed image authored on this component
	 * @return String arrowImage
	 */
	@Override
	public String getArrowImage() {
		if(wcmmode.isDisabled() && null != this.arrowImage && null != assetDomain && !assetDomain.isEmpty()){
			arrowImage = assetDomain + this.arrowImage;
		}
		return arrowImage;
	}

	/**
	 * This method returns the externalized subscription link authored on this component
	 * @return String link
	 */
	@Override
	public String getSubscriptionLink(){
		String link = this.subscriptionLink;
		return externalizerModel.getExternalizedUrl(link);
	}

	/**
	 * This method returns the externalized first card link authored on this component
	 * @return String link
	 */
	@Override
	public String getCard1Link(){
		String link = this.card1Link;
		return externalizerModel.getExternalizedUrl(link);
	}

	/**
	 * This method returns the externalized second card link authored on this component
	 * @return String link
	 */
	@Override
	public String getCard2Link(){
		String link = this.card2Link;
		return externalizerModel.getExternalizedUrl(link);
	}

	/**
	 * This method returns the externalized footer cta link authored on this component
	 * @return String link
	 */
	@Override
	public String getFooterCtaLink(){
		String link = this.footerCtaLink;
		return externalizerModel.getExternalizedUrl(link);
	}

	/**
	 * This method returns the list of link authored on this component
	 * @return List itemList
	 */
	@Override
	public List<LinkItem> getLinkItem(){
		List<LinkItem> itemList = this.linkItem;
		if(null != itemList && itemList.size()>0){
			for(LinkItem itemObj : itemList){
				itemObj.setLink(externalizerModel.getExternalizedUrl(itemObj.getLink()));
			}
		}
		return itemList;
	}

	/**
	 * This method returns the list of social icon and link authored on this component
	 * @return List itemList
	 */
	@Override
	public List<SocialImage> getSocialImage(){
		List<SocialImage> itemList = this.socialImage;
		if(null != itemList && itemList.size()>0){
			for(SocialImage itemObj : itemList){
				if(wcmmode.isDisabled() && null != itemObj.getSocialIcon() && null != assetDomain && !assetDomain.isEmpty()){
					itemObj.setSocialIcon(assetDomain + itemObj.getSocialIcon());
				}
				itemObj.setLink(externalizerModel.getExternalizedUrl(itemObj.getLink()));
			}
		}
		return itemList;
	}
	@Override
	public String getFooterType(){return footerType;}
	@Override
	public void setFooterType(String footerType){this.footerType=footerType;}
	@Override
	public String getTextColor() {return textColor;}
	@Override
	public void setTextColor(String textColor) {this.textColor=textColor;}
	@Override
	public String getSubscriptionText(){return subscriptionText;}
	@Override
	public void setSubscriptionText(String subscriptionText) {this.subscriptionText=subscriptionText;}
	@Override
	public String getLinkText(){return linkText;}
	@Override
	public void setLinkText(String linkText){this.linkText=linkText;}
	@Override
	public String getFooterCtaText(){return footerCtaText;}
	@Override
	public void setFooterCtaText(String footerCtaText){ this.footerCtaText=footerCtaText;}
	@Override
	public String getArrowAltText(){return arrowAltText;}
	@Override
	public void setArrowAltText(String arrowAltText){this.arrowAltText=arrowAltText;}
	@Override
	public String getFooterHeading(){return footerHeading;}
	@Override
	public void setFooterHeading(String footerHeading){this.footerHeading=footerHeading;}
	@Override
	public String getFooterSubheading(){return footerSubheading;}
	@Override
	public void setFooterSubheading(String footerSubheading){this.footerSubheading=footerSubheading;}
	@Override
	public String getCard1AltText(){return card1AltText;}
	@Override
	public void setCard1AltText(String card1AltText){this.card1AltText=card1AltText;}
	@Override
	public String getAssetDomain(){return assetDomain;}
	@Override
	public void setAssetDomain(String assetDomain){this.assetDomain=assetDomain;}
	public String getCard1Title(){return card1Title;}
	public void setCard1Title(String card1Title) {this.card1Title=card1Title;}
	public String getCard1Subtitle(){return card1Subtitle;}
	public void setCard1Subtitle(String card1Subtitle){this.card1Subtitle=card1Subtitle;}
	public String getCard2AltText(){return card2AltText;}
	public void setCard2AltText(String card2AltText){this.card2AltText=card2AltText;}
	public String getCard2Title(){return card2Title;}
	public void setCard2Title(String card2Title){this.card2Title=card2Title;}
	public String getCard2Subtitle(){return card2Subtitle;}
	public void setCard2Subtitle(String card2Subtitle){this.card2Subtitle=card2Subtitle;}
	public String getSocialTileColor(){return socialTileColor;}
	public void setSocialTileColor(String socialTileColor){this.socialTileColor=socialTileColor;}
	public String getShortTitle(){return shortTitle;}
	public void setShortTitle(String shortTitle){this.shortTitle=shortTitle;}
	public String getImageTileColor(){return imageTileColor;}
	public void setImageTileColor(String imageTileColor){this.imageTileColor=imageTileColor;}
	public String getImageTileAltText(){return imageTileAltText;}
	public void setImageTileAltText(String imageTileAltText){this.imageTileAltText=imageTileAltText;}
	public String getLeftLogoAltText(){return leftLogoAltText;}
	public void setLeftLogoAltText(String leftLogoAltText){this.leftLogoAltText=leftLogoAltText;}
	public String getRightLogoAltText(){return rightLogoAltText;}
	public void setRightLogoAltText(String rightLogoAltText){this.rightLogoAltText=rightLogoAltText;}
	public String getLogoTileColor(){return logoTileColor;}
	public void setLogoTileColor(String logoTileColor){this.logoTileColor=logoTileColor;}
}

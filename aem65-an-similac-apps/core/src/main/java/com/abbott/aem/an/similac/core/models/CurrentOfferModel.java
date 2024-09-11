package com.abbott.aem.an.similac.core.models;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.RepositoryException;


import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.ExporterOption;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.an.similac.core.beans.CurrentOffersBean;
import com.abbott.aem.an.similac.core.beans.CurrentOffersBean.HcpInfo;
import com.abbott.aem.an.similac.core.beans.CurrentOffersBean.Offer;
import com.abbott.aem.an.similac.core.beans.CurrentOffersBean.TargetOffer;
import com.abbott.aem.an.similac.core.beans.CurrentOffersBean.Tpg;
import com.abbott.aem.an.similac.core.beans.MarkRedeemedBean;
import com.abbott.aem.an.similac.core.beans.OfferCouponBean;
import com.abbott.aem.an.similac.core.beans.OfferCouponBean.Coupon;

/**
 * CurrentOfferModel is the SlingModel to hold the details of current offer
 * components
 * 
 * @author Cognizant + IBM
 *
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = "jackson", extensions = "json", options = {
		@ExporterOption(name = "SerializationFeature.WRITE_DATES_AS_TIMESTAMPS", value = "true") })
public class CurrentOfferModel {

	private static final Logger LOGGER = LoggerFactory.getLogger(CurrentOfferModel.class);

	private static final String OFFER_TITLE = "offerTitle";

	private static final String OFFER_DESC = "offerDescription";

	private static final String OFFER_BUTTON_LABEL = "offerButtonLabel";

	private static final String OFFER_IMAGE_URL = "offerImgUrl";

	private static final String OFFER_HREF = "offerHref";
	
	private static final String OFFER_ANALYTICS_LABEL = "offersListAnalyticsLabel";
	
	private static final String TPG_OFFER_TITLE= "tpgOfferTitle";
	
	private static final String TPG_OFFER_SUBTITLE= "tpgOfferSubTitle";
	
	private static final String TPG_OFFER_IMAGE_URL= "tpgOfferImgUrl";
	
	private static final String TPG_OFFER_IMAGE_SMURL= "tpgOfferImgSMUrl";
	
	private static final String TPG_OFFER_PAGE_URL= "tpgOfferPageUrl";
	
	private static final String TPG_OFFER_TYPE= "tpgOfferType";
	
	private static final String TPG_OFFER_TOP_IMAGE_URL= "tpgOfferTopImgUrl";
	
	private static final String TPG_OFFER_SHOW_OFFER_VALUE= "tpgOfferShowOfferVal";
	
	private static final String TPG_OFFER_DISCLAIMER= "tpgOfferDisclaimer";
	
	private static final String NEW_OFFER_TITLE_TPG= "newOfferTitleTpg";

	private static final String NEW_OFFER_SUBTITLE_TPG= "newOfferSubTitleTpg";
	
	private static final String NEW_OFFER_BUTTON_LABEL_TPG= "newOfferButtonLabelTpg";
	
	private static final String NEW_OFFER_ANALYTIC_LABEL_TPG= "newOfferAnalyticsLabelTpg";
	
	private static final String OPEN_OFFER_TITLE_TPG= "openOfferTitleTpg";
	
	private static final String OPEN_OFFER_SUBTITLE_TPG= "openOfferSubTitleTpg";
	
	private static final String OPEN_OFFER_BUTTON_LABEL_TPG= "openOfferButtonLabelTpg";
	
	private static final String OPEN_OFFER_ANALYTICS_LABEL_TPG= "newOfferAnalyticsLabelTpg";
	
	private static final String REDEEMED_OFFER_TITLE_TPG= "redeemedOfferTitleTpg";
	
	private static final String REDEEMED_OFFER_SUBTITLE_TPG= "redeemedOfferSubTitleTpg";
	
	private static final String REDEEMED_OFFER_BUTTON_LABEL_TPG= "redeemedOfferButtonLabelTpg";
	
	private static final String REDEEMED_LABEL_TPG= "redeemedOnLabelTpg";
	
	private static final String REDEEMED_OFFER_ANALYTICS_LABEL_TPG= "redeemedOfferAnalyticsLabelTpg";
	
	
	@SlingObject
	private Resource resource;

	@ChildResource(name = "offerList")
	private Resource offerListResource;
	
	@ChildResource(name = "tpgOffers")
	private Resource tpgOfferResource;

	@ValueMapValue
	private String title;

	@ValueMapValue
	private String thanksDigitalLabel;

	@ValueMapValue
	private String thanksLabel;

	@ValueMapValue
	private String digitalMessage;

	@ValueMapValue
	private String paperMessage;

	@ValueMapValue
	private String shippingLabel;

	@ValueMapValue
	private String shippingLink;

	@ValueMapValue
	private String availableLabel;

	@ValueMapValue
	private String offersLabel;

	@ValueMapValue
	private String redeemOfferMessage;

	@ValueMapValue
	private String offerAvailableLabel;

	@ValueMapValue
	private String moreDaysLabel;

	@ValueMapValue
	private String moreDaysLabelBogo;

	@ValueMapValue
	private String earnPointsText;

	@ValueMapValue
	private String saveFiveImgUrl;

	@ValueMapValue
	private String saveTenImgUrl;

	@ValueMapValue
	private String ggImgUrl;
	
	@ValueMapValue
	private String targetImgUrl;
	
	@ValueMapValue
	private String tpgImgUrl;
	
	@ValueMapValue
	private String couponLogo;
	
	@ValueMapValue
	private String targetCouponTitle;
	
	@ValueMapValue
	private String newOfferTitle;

	@ValueMapValue
	private String newOfferSubTitle;

	@ValueMapValue
	private String newOfferButtonLabel;

	@ValueMapValue
	private String openOfferTitle;

	@ValueMapValue
	private String openOfferSubTitle;

	@ValueMapValue
	private String openOfferButtonLabel;

	@ValueMapValue
	private String redeemedOfferTitle;

	@ValueMapValue
	private String redeemedOfferSubTitle;

	@ValueMapValue
	private String redeemedOfferButtonLabel;
	
	@ValueMapValue
	private String redeemedOnLabel;
	
	@ValueMapValue
	private String newOfferTitleTpg;

	@ValueMapValue
	private String newOfferSubTitleTpg;

	@ValueMapValue
	private String newOfferButtonLabelTpg;

	@ValueMapValue
	private String openOfferTitleTpg;

	@ValueMapValue
	private String openOfferSubTitleTpg;

	@ValueMapValue
	private String openOfferButtonLabelTpg;

	@ValueMapValue
	private String redeemedOfferTitleTpg;

	@ValueMapValue
	private String redeemedOfferSubTitleTpg;

	@ValueMapValue
	private String redeemedOfferButtonLabelTpg;
	
	@ValueMapValue
	private String redeemedOnLabelTpg;
	
	@ValueMapValue
	private String newOfferHeaderTitleTarget;

	@ValueMapValue
	private String newOfferExpiryTitleTarget;

	@ValueMapValue
	private String newOfferTitleTarget;
	
	@ValueMapValue
	private String newOfferTitleTarget1;

	@ValueMapValue
	private String newOfferSubTitleTarget1;
	
	@ValueMapValue
	private String newOfferSubTitleTarget2;

	@ValueMapValue
	private String newOfferSubTitleTarget3;
	
	@ValueMapValue
	private String newOfferCriteriaTarget;

	@ValueMapValue
	private String newOfferDescriptionTargetOne;

	@ValueMapValue
	private String newOfferDescriptionTargetTwo;

	@ValueMapValue
	private String newOfferButtonLabelRedeemTarget;

	@ValueMapValue
	private String newOfferButtonLabelMarkRedeemTarget;
	
	@ValueMapValue
	private String newOfferButtonOnlineTarget;

	@ValueMapValue
	private String newOfferButtonStoreTarget;

	@ValueMapValue
	private String newOfferPromoCodeTarget;

	@ValueMapValue
	private String newOfferPromoURLTarget;
	
	@ValueMapValue
	private Boolean newTargetOfferShowOfferVal;

	@ValueMapValue
	private String openOfferHeaderTitleTarget;

	@ValueMapValue
	private String openOfferExpiryTitleTarget;

	@ValueMapValue
	private String openOfferTitleTarget;

	@ValueMapValue
	private String openOfferTitleTarget1;
	
	@ValueMapValue
	private String openOfferSubTitleTarget1;
	
	@ValueMapValue
	private String openOfferSubTitleTarget2;
	
	@ValueMapValue
	private String openOfferSubTitleTarget3;

	@ValueMapValue
	private String openOfferCriteriaTarget;

	@ValueMapValue
	private String openOfferDescriptionTargetOne;
	
	@ValueMapValue
	private String openOfferDescriptionTargetTwo;

	@ValueMapValue
	private String openOfferButtonOnlineTarget;

	@ValueMapValue
	private String openOfferButtonStoreTarget;

	@ValueMapValue
	private String openOfferPromoCodeTarget;

	@ValueMapValue
	private String openedOfferTitleTarget;

	@ValueMapValue
	private String openedOfferInfoTarget;

	@ValueMapValue
	private String openOfferPromoURLTarget;
	
	@ValueMapValue
	private Boolean openTargetOfferShowOfferVal;

	@ValueMapValue
	private String redeemedOfferHeaderTitleTarget;

	@ValueMapValue
	private String redeemedOfferExpiryTitleTarget;

	@ValueMapValue
	private String redeemedOfferTitleTarget;

	@ValueMapValue
	private String redeemedOfferTitleTarget1;
	
	@ValueMapValue
	private String redeemedOfferSubTitleTarget;

	@ValueMapValue
	private String redeemedOfferCriteriaTarget;
	
	@ValueMapValue
	private Boolean redeemedTargetOfferShowOfferVal;
	
	@ValueMapValue
	private String currentOfferAnalyticsLabel;
	
	@ValueMapValue
	private String newOfferAnalyticsLabel;
	
	@ValueMapValue
	private String openOfferAnalyticsLabel;
	  
	@ValueMapValue 
	private String redeemedOfferAnalyticsLabel;
	
	@ValueMapValue
	private String newOfferAnalyticsLabelTpg;
	
	@ValueMapValue
	private String openOfferAnalyticsLabelTpg;
	  
	@ValueMapValue 
	private String redeemedOfferAnalyticsLabelTpg;
	  
	@ValueMapValue 
	private String newTargetOfferAnalyticsLabelOnline;
	
	@ValueMapValue 
	private String newTargetOfferAnalyticsLabelStore;
	  
	@ValueMapValue 
	private String openTargetOfferAnalyticsLabelOnline;
	
	@ValueMapValue 
	private String openTargetOfferAnalyticsLabelStore;
	  
	@ValueMapValue 
	private String redeemedTargetOfferAnalyticsLabel;
	
	@ValueMapValue
	private String newOfferCriteriaTargetOnline;
	
	@ValueMapValue
	private String newOfferCriteriaTargetStore;
	
	@ValueMapValue
	private String openOfferCriteriaTargetOnline;
	
	@ValueMapValue
	private String openOfferCriteriaTargetStore;
	  
    @ValueMapValue
	private String eventCategory;
	  
	@ValueMapValue
	private String eventAction;  
	
	@ValueMapValue
	private String redeemSelection;
	
	@ValueMapValue
	private String redeemNote;
	
	@ValueMapValue
	private String submitRedeemLabel;
	
	@ValueMapValue
	private String cancelRedeemLabel;
	
	@ValueMapValue
	private String titleExpire;
	
	@ValueMapValue
	private String redeemExpireOfferMessage;
	
	@ValueMapValue
	private String buttonLabelSelectRetailer;
	
	@ValueMapValue
	private String selectRetailerNote;
	
	@ValueMapValue
	private String buttonLabelRedeem;

	@ValueMapValue
	private String buttonLabelMarkRedeem;
	
	@ValueMapValue
	private String retailerPageURL;
	
	@ValueMapValue
	private String retailerCouponPageURL;

	@ValueMapValue
	private String amazonOfferTitle;

	@ValueMapValue
	private String amazonOfferSubTitle;
	
	@ValueMapValue
	private String amazonOfferImgUrl;
		
	@ValueMapValue
	private String amazonOfferImgSMUrl;
		
	@ValueMapValue
	private String amazonOfferPageUrl;
	
	@ValueMapValue
	private Boolean amazonOfferShowOfferVal;

	@ValueMapValue
	private String tpgOfferTitle;

	@ValueMapValue
	private String tpgOfferSubTitle;
	
	@ValueMapValue
	private String tpgOfferImgUrl;

	@ValueMapValue
	private String tpgOfferImgSMUrl;

	@ValueMapValue
	private String tpgOfferPageUrl;
	
	@ValueMapValue
	private String tpgOfferType;
	
	@ValueMapValue
	private String tpgOfferTopImgUrl;
	
	@ValueMapValue
	private String tpgOfferDisclaimer;
	
	@ValueMapValue
	private Boolean tpgOfferShowOfferVal;

	@ValueMapValue
	private String targetOfferImgUrl;

	@ValueMapValue
	private String targetOfferImgSMUrl;

	@ValueMapValue
	private String targetOfferPageUrl;

	@ValueMapValue
	private String unassignedOfferTitle;

	@ValueMapValue
	private String unassignedOfferSubTitle;
	
	@ValueMapValue
	private Boolean unassignedOfferShowOfferVal;
	
	@ValueMapValue
	private String retailerAlreadySelected;
	
	@ValueMapValue
	private String dataGtmRedeemOffer;
	
	@ValueMapValue
	private String dataGtmMarkRedeemed;
	
	@ValueMapValue
	private String dataGtmSelectMarkRedeemed;
	
	@ValueMapValue
	private String offerText;
	
	@ValueMapValue
	private String errorText;
	
	private CurrentOffersBean currentOffers;

	private OfferCouponBean offerCoupon;
	
	private LinkHelperModel linkHelper = new LinkHelperModel();

	@PostConstruct
	private void initMethod() {
		populateCurrentOffers();
	}

	/**
	 * This method will populate the current offer component object
	 */
	public void populateCurrentOffers() {

		currentOffers = new CurrentOffersBean();
		currentOffers.setTitle(title);
		currentOffers.setTitleExpire(titleExpire);
		currentOffers.setThanksDigitalLabel(thanksDigitalLabel);
		currentOffers.setThanksLabel(thanksLabel);
		currentOffers.setDigitalMessage(digitalMessage);
		currentOffers.setPaperMessage(paperMessage);
		currentOffers.setShippingLabel(shippingLabel);
		currentOffers.setShippingLink(shippingLink);
		currentOffers.setAvailableLabel(availableLabel);
		currentOffers.setOffersLabel(offersLabel);
		currentOffers.setRedeemOfferMessage(redeemOfferMessage);
		currentOffers.setRedeemExpireOfferMessage(redeemExpireOfferMessage);
		currentOffers.setOfferAvailableLabel(offerAvailableLabel);
		currentOffers.setMoreDaysLabel(moreDaysLabel);
		currentOffers.setMoreDaysLabelBogo(moreDaysLabelBogo);
		currentOffers.setEarnPointsText(earnPointsText);
		currentOffers.setSaveFiveImgUrl(saveFiveImgUrl);
		currentOffers.setSaveTenImgUrl(saveTenImgUrl);
		currentOffers.setGgImgUrl(ggImgUrl);
		currentOffers.setTargetImgUrl(targetImgUrl);
		currentOffers.setTpgImgUrl(tpgImgUrl);
		currentOffers.setCouponLogo(couponLogo);
		currentOffers.setTargetCouponTitle(targetCouponTitle);
		currentOffers.setButtonLabelSelectRetailer(buttonLabelSelectRetailer);
		currentOffers.setSelectRetailerNote(selectRetailerNote);
		currentOffers.setButtonLabelRedeem(buttonLabelRedeem);	
		currentOffers.setButtonLabelMarkRedeem(buttonLabelMarkRedeem);
		linkHelper.setLinkHref(retailerPageURL);
		currentOffers.setRetailerPageURL(linkHelper.getLinkHref());
		linkHelper.setLinkHref(retailerCouponPageURL);
		currentOffers.setRetailerCouponPageURL(linkHelper.getLinkHref());
		
		if(currentOfferAnalyticsLabel != null) {
			currentOffers.setDataGtmLabel(getAnalyticsLabel(currentOfferAnalyticsLabel));
		}	
		
		if(dataGtmRedeemOffer != null) {
			currentOffers.setDataGtmRedeemOffer(dataGtmRedeemOffer);
		}
		
		if(dataGtmMarkRedeemed !=null) {
			currentOffers.setDataGtmMarkRedeemed(dataGtmMarkRedeemed);
		}
		currentOffers.setAmazonOffer(getAmazonOffer());
		currentOffers.setNewOfferTarget(getNewOfferTarget());
		currentOffers.setOpenOfferTarget(getOpenOfferTarget());
		currentOffers.setRedeemedOfferTarget(getRedeemedOfferTarget());
		
		if(offerListResource != null) {
			currentOffers.setOfferList(getOfferList(offerListResource));
		}
		if(tpgOfferResource != null) {
			currentOffers.setTpgOffers(getTpgOffers(tpgOfferResource));
		}
		currentOffers.setHcpInfo(getHcpInfo());
		currentOffers.setMarkAsRedeemed(getMarkAsRedeemed());
		currentOffers.setUnassignedOffer(getUnassignedOffer());
		currentOffers.setRetailerAlreadySelected(retailerAlreadySelected);
	}

	private HcpInfo getHcpInfo() {
		HcpInfo hcpInfo = currentOffers.new HcpInfo();
		if(offerText != null) {
		hcpInfo.setOfferText(offerText);  
		}
		if(errorText != null) {
			hcpInfo.setErrorText(errorText);
		}
		return hcpInfo;
	}

	private OfferCouponBean getUnassignedOffer() {
		offerCoupon = new OfferCouponBean();
		offerCoupon.setTitle(unassignedOfferTitle);
		offerCoupon.setSubTitle(unassignedOfferSubTitle);
		offerCoupon.setShowOfferValue(unassignedOfferShowOfferVal);
		return offerCoupon;
	}

	private OfferCouponBean getAmazonOffer() {
		offerCoupon = new OfferCouponBean();
		offerCoupon.setNewOffer(getAmazonNewOffer());
		offerCoupon.setOpenOffer(getAmazonOpenOffer());
		offerCoupon.setRedeemedOffer(getAmazonRedeemedOffer());
		offerCoupon.setTitle(amazonOfferTitle);
		offerCoupon.setSubTitle(amazonOfferSubTitle);
		offerCoupon.setImgUrl(amazonOfferImgSMUrl);
		offerCoupon.setImgSMUrl(amazonOfferImgSMUrl);
		offerCoupon.setPageUrl(amazonOfferPageUrl);
		offerCoupon.setShowOfferValue(amazonOfferShowOfferVal);
		return offerCoupon;
	}

	
	/**
	 * Returns the New Offer object
	 * 
	 * @return NewOffer
	 */
	private Coupon getAmazonNewOffer() {
		Coupon newOffer = offerCoupon.new Coupon();
		newOffer.setTitle(newOfferTitle);
		newOffer.setSubTitle(newOfferSubTitle);
		newOffer.setButtonLabel(newOfferButtonLabel);
		if (newOfferAnalyticsLabel != null) {
			newOffer.setDataGtmLabel(getAnalyticsLabel(newOfferAnalyticsLabel));
		}
		return newOffer;
	}

	/**
	 * Returns the Open Offer object
	 * 
	 * @return OpenOffer
	 */
	private Coupon getAmazonOpenOffer() {
		Coupon openOffer = offerCoupon.new Coupon();
		openOffer.setTitle(openOfferTitle);
		openOffer.setSubTitle(openOfferSubTitle);
		openOffer.setButtonLabel(openOfferButtonLabel);
		if (openOfferAnalyticsLabel != null) {
			openOffer.setDataGtmLabel(getAnalyticsLabel(openOfferAnalyticsLabel));
		}
		return openOffer;
	}

	/**
	 * Returns the Redeemed Offer Target object
	 * 
	 * @return RedeemedOffer 
	 */
	private Coupon getAmazonRedeemedOffer() {
		Coupon redeemedOffer = offerCoupon.new Coupon();
		redeemedOffer.setTitle(redeemedOfferTitle);
		redeemedOffer.setSubTitle(redeemedOfferSubTitle);
		redeemedOffer.setButtonLabel(redeemedOfferButtonLabel);
		redeemedOffer.setRedeemedOnLabel(redeemedOnLabel);
		if(redeemedOfferAnalyticsLabel != null) {
			redeemedOffer.setDataGtmLabel(getAnalyticsLabel(redeemedOfferAnalyticsLabel));
		}
			
		return redeemedOffer;
	}

	/**
	 * Returns the New Offer object
	 * 
	 * @return NewOffer
	 */
	private Coupon getTPGNewOffer(Node childNode) {
		Coupon newOffer = offerCoupon.new Coupon();
		try {
		newOffer.setTitle(childNode.getProperty(NEW_OFFER_TITLE_TPG).getString());
		newOffer.setSubTitle(childNode.getProperty(NEW_OFFER_SUBTITLE_TPG).getString());
		newOffer.setButtonLabel(childNode.getProperty(NEW_OFFER_BUTTON_LABEL_TPG).getString());
		if (childNode.getProperty(NEW_OFFER_ANALYTIC_LABEL_TPG) != null) {
			newOffer.setDataGtmLabel(getAnalyticsLabel(childNode.getProperty(NEW_OFFER_ANALYTIC_LABEL_TPG).getValue().getString()));
			
		}
		} catch (RepositoryException e) {
			LOGGER.error("Repository exception occured in getTPGNewOffer :: ",e);
		}
		return newOffer;
	}

	/**
	 * Returns the Open Offer object
	 * 
	 * @return OpenOffer
	 */
	private Coupon getTPGOpenOffer(Node childNode) {
		Coupon openOffer = offerCoupon.new Coupon();
		try {
	    openOffer.setTitle(childNode.getProperty(OPEN_OFFER_TITLE_TPG).getString());
		openOffer.setSubTitle(childNode.getProperty(OPEN_OFFER_SUBTITLE_TPG).getString());
		openOffer.setButtonLabel(childNode.getProperty(OPEN_OFFER_BUTTON_LABEL_TPG).getString());
		if (childNode.getProperty(OPEN_OFFER_ANALYTICS_LABEL_TPG) != null) {
			openOffer.setDataGtmLabel(getAnalyticsLabel(childNode.getProperty(OPEN_OFFER_ANALYTICS_LABEL_TPG).getValue().getString()));
		}
		} catch (RepositoryException e) {
			LOGGER.error("Repository exception occured in getTPGOpenOffer :: ",e);
		}
		return openOffer;
	}

	/**
	 * Returns the Redeemed Offer Target object
	 * 
	 * @return RedeemedOffer 
	 */
	private Coupon getTPGRedeemedOffer(Node childNode) {
		Coupon redeemedOffer = offerCoupon.new Coupon();
		try {
		redeemedOffer.setTitle(childNode.getProperty(REDEEMED_OFFER_TITLE_TPG).getString());
		redeemedOffer.setSubTitle(childNode.getProperty(REDEEMED_OFFER_SUBTITLE_TPG).getString());
		redeemedOffer.setButtonLabel(childNode.getProperty(REDEEMED_OFFER_BUTTON_LABEL_TPG).getString());
		redeemedOffer.setRedeemedOnLabel(childNode.getProperty(REDEEMED_LABEL_TPG).getString());
		if(childNode.getProperty(REDEEMED_OFFER_ANALYTICS_LABEL_TPG) != null) {
			redeemedOffer.setDataGtmLabel(getAnalyticsLabel(childNode.getProperty(REDEEMED_OFFER_ANALYTICS_LABEL_TPG).getValue().getString()));
		}
		} catch (RepositoryException e) {
			LOGGER.error("Repository exception occured in getTPGOpenOffer :: ",e);
		}
		return redeemedOffer;
	}
	
	/**
	 * Returns the New Offer Target object
	 * 
	 * @return TargetOffer
	 */
	private TargetOffer getNewOfferTarget() {
		TargetOffer newOfferTarget = currentOffers.new TargetOffer();
		newOfferTarget.setHeaderTitle(newOfferHeaderTitleTarget);
		newOfferTarget.setExpiryTitle(newOfferExpiryTitleTarget);
		newOfferTarget.setTitle(newOfferTitleTarget);
		newOfferTarget.setTitle1(newOfferTitleTarget1);
		newOfferTarget.setSubTitle1(newOfferSubTitleTarget1);
		newOfferTarget.setSubTitle2(newOfferSubTitleTarget2);
		newOfferTarget.setSubTitle3(newOfferSubTitleTarget3);
		newOfferTarget.setOfferCriteria(newOfferCriteriaTarget);
		newOfferTarget.setOfferCriteriaOnline(newOfferCriteriaTargetOnline);
		newOfferTarget.setOfferCriteriaStore(newOfferCriteriaTargetStore);
		newOfferTarget.setOfferDescription1(newOfferDescriptionTargetOne);
		newOfferTarget.setOfferDescription2(newOfferDescriptionTargetTwo);
		newOfferTarget.setButtonLabelRedeem(newOfferButtonLabelRedeemTarget);
		newOfferTarget.setButtonLabelMarkRedeem(newOfferButtonLabelMarkRedeemTarget);
		newOfferTarget.setButtonLabelOnline(newOfferButtonOnlineTarget);
		newOfferTarget.setButtonLabelStore(newOfferButtonStoreTarget);
		newOfferTarget.setPromoCodeTitle(newOfferPromoCodeTarget);
		newOfferTarget.setPromoURL(newOfferPromoURLTarget);
		newOfferTarget.setShowOfferValue(newTargetOfferShowOfferVal);
		if (newTargetOfferAnalyticsLabelOnline != null) {
			newOfferTarget.setDataGtmLabelOnline(getAnalyticsLabel(newTargetOfferAnalyticsLabelOnline));
		}
		if (newTargetOfferAnalyticsLabelStore != null) {
			newOfferTarget.setDataGtmLabelStore(getAnalyticsLabel(newTargetOfferAnalyticsLabelStore));
		}
		newOfferTarget.setImgUrl(targetOfferImgUrl);
		newOfferTarget.setImgSMUrl(targetOfferImgSMUrl);
		newOfferTarget.setPageUrl(targetOfferPageUrl);
		return newOfferTarget;
	}
	
	/**
	 * Returns the Open Offer Target object
	 * 
	 * @return TargetOffer
	 */
	private TargetOffer getOpenOfferTarget() {
		TargetOffer openOfferTarget = currentOffers.new TargetOffer();
		openOfferTarget.setHeaderTitle(openOfferHeaderTitleTarget);
		openOfferTarget.setExpiryTitle(openOfferExpiryTitleTarget);
		openOfferTarget.setTitle(openOfferTitleTarget);
		openOfferTarget.setTitle1(openOfferTitleTarget1);
		openOfferTarget.setSubTitle1(openOfferSubTitleTarget1);
		openOfferTarget.setSubTitle2(openOfferSubTitleTarget2);
		openOfferTarget.setSubTitle3(openOfferSubTitleTarget3);
		openOfferTarget.setOfferCriteria(openOfferCriteriaTarget);
		openOfferTarget.setOfferCriteriaOnline(openOfferCriteriaTargetOnline);
		openOfferTarget.setOfferCriteriaStore(openOfferCriteriaTargetStore);
		openOfferTarget.setOfferDescription1(openOfferDescriptionTargetOne);
		openOfferTarget.setOfferDescription2(openOfferDescriptionTargetTwo);
		openOfferTarget.setButtonLabelOnline(openOfferButtonOnlineTarget);
		openOfferTarget.setButtonLabelStore(openOfferButtonStoreTarget);
		openOfferTarget.setPromoCodeTitle(openOfferPromoCodeTarget);
		openOfferTarget.setOpenedOfferTitle(openedOfferTitleTarget);
		openOfferTarget.setOpenedOfferInfo(openedOfferInfoTarget);
		openOfferTarget.setPromoURL(openOfferPromoURLTarget);
		openOfferTarget.setShowOfferValue(openTargetOfferShowOfferVal);
		if(openTargetOfferAnalyticsLabelOnline != null) {
			openOfferTarget.setDataGtmLabelOnline(getAnalyticsLabel(openTargetOfferAnalyticsLabelOnline));}
			if(openTargetOfferAnalyticsLabelStore != null) {
				openOfferTarget.setDataGtmLabelStore(getAnalyticsLabel(openTargetOfferAnalyticsLabelStore));}
		return openOfferTarget;
	}

	/**
	 * Returns the Redeemed Offer Target object
	 * 
	 * @return TargetOffer
	 */
	private TargetOffer getRedeemedOfferTarget() {
		TargetOffer redeemedOfferTarget = currentOffers.new TargetOffer();
		redeemedOfferTarget.setHeaderTitle(redeemedOfferHeaderTitleTarget);
		redeemedOfferTarget.setExpiryTitle(redeemedOfferExpiryTitleTarget);
		redeemedOfferTarget.setTitle(redeemedOfferTitleTarget);
		redeemedOfferTarget.setTitle1(redeemedOfferTitleTarget1);
		redeemedOfferTarget.setSubTitle(redeemedOfferSubTitleTarget);
		redeemedOfferTarget.setOfferCriteria(redeemedOfferCriteriaTarget);
		redeemedOfferTarget.setShowOfferValue(redeemedTargetOfferShowOfferVal);
		if(redeemedTargetOfferAnalyticsLabel != null) {
			redeemedOfferTarget.setDataGtmLabel(getAnalyticsLabel(redeemedTargetOfferAnalyticsLabel));
		}
		return redeemedOfferTarget;
	}
	
	/**
	 * This methods will return the offer list
	 * 
	 * @param offerResource
	 * @return List<Offer>
	 */
	public List<Offer> getOfferList(Resource offerResource) {
		
		List<Offer> offerList;
		offerList = new ArrayList<>();
		Node node = offerResource.adaptTo(Node.class);
		if (node != null) {
			try {
				NodeIterator nodeIterator = node.getNodes();
				while (nodeIterator.hasNext()) {
					Offer offer = populateOfferList(nodeIterator.nextNode());
					offerList.add(offer);
				}
			} catch (RepositoryException e) {
				LOGGER.error("Repository exception occured in getOfferList :: ",e);
			}
		}
		return Collections.unmodifiableList(offerList);
	}

	/**
	 * This methods will populate the retailer object
	 * 
	 * @param childNode
	 * @return Offer
	 * @throws RepositoryException
	 */
	private Offer populateOfferList(Node childNode) throws RepositoryException {

		Offer offer = new CurrentOffersBean().new Offer();
		if (childNode.hasProperty(OFFER_TITLE)) {
			offer.setTitle(childNode.getProperty(OFFER_TITLE).getValue().getString());
		}
		if (childNode.hasProperty(OFFER_DESC)) {
			offer.setDescription(childNode.getProperty(OFFER_DESC).getValue().getString());
		}
		if (childNode.hasProperty(OFFER_BUTTON_LABEL)) {
			offer.setButtonLabel(childNode.getProperty(OFFER_BUTTON_LABEL).getValue().getString());
		}
		if (childNode.hasProperty(OFFER_IMAGE_URL)) {
			offer.setImgUrl(childNode.getProperty(OFFER_IMAGE_URL).getValue().getString());
		}
		if (childNode.hasProperty(OFFER_HREF)) {
			offer.setHref(childNode.getProperty(OFFER_HREF).getValue().getString());
		}
		if (childNode.hasProperty(OFFER_ANALYTICS_LABEL)) {
			offer.setDataGtmLabel(getAnalyticsLabel(childNode.getProperty(OFFER_ANALYTICS_LABEL).getValue().getString()));
		}
		
		return offer;
	}

	/**
	 * This methods will return the Tpg offer
	 * 
	 * @param tpgResource
	 * @return List<Tpg>
	 */
	public List<Tpg> getTpgOffers(Resource tpgResource) {

		List<Tpg> tpgOffers;
		tpgOffers = new ArrayList<>();
		Node node = tpgResource.adaptTo(Node.class);
		if (node != null) { 
			try {
				NodeIterator nodeIterator = node.getNodes();
				while (nodeIterator.hasNext()) {
					Node childNode = nodeIterator.nextNode();
					Tpg tpg = populateTpgOffers(childNode);
					tpg.setNewOffer(getTPGNewOffer(childNode));
					tpg.setOpenOffer(getTPGOpenOffer(childNode));
					tpg.setRedeemedOffer(getTPGRedeemedOffer(childNode));
					tpgOffers.add(tpg);
				}
			} catch (RepositoryException e) {
				LOGGER.error("Repository exception occured in getTpgOffer :: ",e);
			}
		}
		return Collections.unmodifiableList(tpgOffers);
	}

	/**
	 * This methods will populate the retailer object
	 * 
	 * @param childNode
	 * @return tpg
	 * @throws RepositoryException
	 */
	private Tpg populateTpgOffers(Node childNode) throws RepositoryException {

		Tpg tpg = new CurrentOffersBean().new Tpg();
		if (childNode.hasProperty(TPG_OFFER_TITLE)) {
			tpg.setTitle(childNode.getProperty(TPG_OFFER_TITLE).getValue().getString());
		}
		if (childNode.hasProperty(TPG_OFFER_SUBTITLE)) {
			tpg.setSubTitle(childNode.getProperty(TPG_OFFER_SUBTITLE).getValue().getString());
		}
		if (childNode.hasProperty(TPG_OFFER_IMAGE_URL)) {
			tpg.setImgUrl(childNode.getProperty(TPG_OFFER_IMAGE_URL).getValue().getString());
		}
		if (childNode.hasProperty(TPG_OFFER_IMAGE_SMURL)) {
			tpg.setImgSMUrl(childNode.getProperty(TPG_OFFER_IMAGE_SMURL).getValue().getString());
		}
		if (childNode.hasProperty(TPG_OFFER_PAGE_URL)) {
			tpg.setPageUrl(childNode.getProperty(TPG_OFFER_PAGE_URL).getValue().getString());
		}
		if (childNode.hasProperty(TPG_OFFER_TYPE)) {
			tpg.setOfferType(childNode.getProperty(TPG_OFFER_TYPE).getValue().getString());
		}
		if (childNode.hasProperty(TPG_OFFER_TOP_IMAGE_URL)) {
			tpg.setTpgOfferImage(childNode.getProperty(TPG_OFFER_TOP_IMAGE_URL).getValue().getString());
		}
		if (childNode.hasProperty(TPG_OFFER_DISCLAIMER)) {
			tpg.setOfferDisclaimer(childNode.getProperty(TPG_OFFER_DISCLAIMER).getValue().getString());
		}
		if (childNode.hasProperty(TPG_OFFER_SHOW_OFFER_VALUE)) {
			tpg.setShowOfferValue(childNode.getProperty(TPG_OFFER_SHOW_OFFER_VALUE).getValue().getBoolean());
		}
		
		return tpg;
	}

	private String getAnalyticsLabel(String analyticsLabel) {
		
		String eventLabel = null;
		if (eventCategory != null) {
			eventLabel = eventCategory;
		}
		if (eventAction != null) {

			eventLabel = eventLabel != null ? (eventLabel.concat("|") + eventAction) : eventAction;
		}
		if (analyticsLabel != null) {

			eventLabel = eventLabel != null ? (eventLabel.concat("|") + analyticsLabel) : analyticsLabel;
		}
		return eventLabel;
		
	}
 
	private MarkRedeemedBean getMarkAsRedeemed() {
		MarkRedeemedBean markAsRedeemed = new MarkRedeemedBean();
		markAsRedeemed.setRedeemSelection(redeemSelection);
		markAsRedeemed.setRedeemNote(redeemNote);
		markAsRedeemed.setSubmitRedeemLabel(submitRedeemLabel);
		markAsRedeemed.setCancelRedeemLabel(cancelRedeemLabel);
		markAsRedeemed.setDataGtmLabel(dataGtmSelectMarkRedeemed);
		return markAsRedeemed;
	}
	
	/**
	 * This methods will return the Current Offers bean object
	 * 
	 * @return CurrentOffersBean
	 */
	public CurrentOffersBean getCurrentOffers() {
		return currentOffers;
	}

}
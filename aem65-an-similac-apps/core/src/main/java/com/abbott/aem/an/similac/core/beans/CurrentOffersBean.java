package com.abbott.aem.an.similac.core.beans;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

import com.abbott.aem.an.similac.core.beans.OfferCouponBean.Coupon;

public class CurrentOffersBean {

	private String title;
	private String thanksDigitalLabel;
	private String thanksLabel;
	private String digitalMessage;
	private String paperMessage;
	private String shippingLabel;
	private String shippingLink;
	private String availableLabel;
	private String offersLabel;
	private String redeemOfferMessage;
	private String offerAvailableLabel;
	private String moreDaysLabel;
	private String moreDaysLabelBogo;
	private String earnPointsText;
	private String saveFiveImgUrl;
	private String saveTenImgUrl;
	private String ggImgUrl;
	private String targetImgUrl;
	private String tpgImgUrl;
	private String couponLogo;
	private String targetCouponTitle;
	private String dataGtmLabel;
	private String titleExpire;
	private String redeemExpireOfferMessage;
	private String buttonLabelSelectRetailer;
	private String retailerAlreadySelected;
	private String retailerPageURL;
	private String retailerCouponPageURL;
	private String selectRetailerNote;
	private String buttonLabelRedeem;
	private String buttonLabelMarkRedeem;
	private String dataGtmRedeemOffer;
	private String dataGtmMarkRedeemed;
	private OfferCouponBean amazonOffer;
	private OfferCouponBean unassignedOffer;
	private TargetOffer openOfferTarget;
	private TargetOffer newOfferTarget;
	private TargetOffer redeemedOfferTarget;
	private MarkRedeemedBean markAsRedeemed;
	private HcpInfo hcpInfo;

	@Setter
	@Getter
	private List<Offer> offerList;

	@Setter
	@Getter
	private List<Tpg> tpgOffers;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getThanksDigitalLabel() {
		return thanksDigitalLabel;
	}

	public void setThanksDigitalLabel(String thanksDigitalLabel) {
		this.thanksDigitalLabel = thanksDigitalLabel;
	}

	public String getThanksLabel() {
		return thanksLabel;
	}

	public void setThanksLabel(String thanksLabel) {
		this.thanksLabel = thanksLabel;
	}

	public String getDigitalMessage() {
		return digitalMessage;
	}

	public void setDigitalMessage(String digitalMessage) {
		this.digitalMessage = digitalMessage;
	}

	public String getPaperMessage() {
		return paperMessage;
	}

	public void setPaperMessage(String paperMessage) {
		this.paperMessage = paperMessage;
	}

	public String getShippingLabel() {
		return shippingLabel;
	}

	public void setShippingLabel(String shippingLabel) {
		this.shippingLabel = shippingLabel;
	}

	public String getShippingLink() {
		return shippingLink;
	}

	public void setShippingLink(String shippingLink) {
		this.shippingLink = shippingLink;
	}

	public String getAvailableLabel() {
		return availableLabel;
	}

	public void setAvailableLabel(String availableLabel) {
		this.availableLabel = availableLabel;
	}

	public String getOffersLabel() {
		return offersLabel;
	}

	public void setOffersLabel(String offersLabel) {
		this.offersLabel = offersLabel;
	}

	public String getRedeemOfferMessage() {
		return redeemOfferMessage;
	}

	public void setRedeemOfferMessage(String redeemOfferMessage) {
		this.redeemOfferMessage = redeemOfferMessage;
	}

	public String getOfferAvailableLabel() {
		return offerAvailableLabel;
	}

	public void setOfferAvailableLabel(String offerAvailableLabel) {
		this.offerAvailableLabel = offerAvailableLabel;
	}

	public String getMoreDaysLabel() {
		return moreDaysLabel;
	}

	public void setMoreDaysLabel(String moreDaysLabel) {
		this.moreDaysLabel = moreDaysLabel;
	}

	public String getMoreDaysLabelBogo() {
		return moreDaysLabelBogo;
	}

	public void setMoreDaysLabelBogo(String moreDaysLabelBogo) {
		this.moreDaysLabelBogo = moreDaysLabelBogo;
	}

	public String getEarnPointsText() {
		return earnPointsText;
	}

	public void setEarnPointsText(String earnPointsText) {
		this.earnPointsText = earnPointsText;
	}

	public String getSaveFiveImgUrl() {
		return saveFiveImgUrl;
	}

	public void setSaveFiveImgUrl(String saveFiveImgUrl) {
		this.saveFiveImgUrl = saveFiveImgUrl;
	}

	public String getSaveTenImgUrl() {
		return saveTenImgUrl;
	}

	public void setSaveTenImgUrl(String saveTenImgUrl) {
		this.saveTenImgUrl = saveTenImgUrl;
	}

	public String getGgImgUrl() {
		return ggImgUrl;
	}

	public void setGgImgUrl(String ggImgUrl) {
		this.ggImgUrl = ggImgUrl;
	}

	public String getTargetImgUrl() {
		return targetImgUrl;
	}

	public void setTargetImgUrl(String targetImgUrl) {
		this.targetImgUrl = targetImgUrl;
	}

	public String getTpgImgUrl() {
		return tpgImgUrl;
	}

	public void setTpgImgUrl(String tpgImgUrl) {
		this.tpgImgUrl = tpgImgUrl;
	}

	public String getCouponLogo() {
		return couponLogo;
	}

	public void setCouponLogo(String couponLogo) {
		this.couponLogo = couponLogo;
	}

	public String getTargetCouponTitle() {
		return targetCouponTitle;
	}

	public void setTargetCouponTitle(String targetCouponTitle) {
		this.targetCouponTitle = targetCouponTitle;
	}

	public OfferCouponBean getAmazonOffer() {
		return amazonOffer;
	}

	public void setAmazonOffer(OfferCouponBean amazonOffer) {
		this.amazonOffer = amazonOffer;
	}

	public TargetOffer getOpenOfferTarget() {
		return openOfferTarget;
	}

	public void setOpenOfferTarget(TargetOffer openOfferTarget) {
		this.openOfferTarget = openOfferTarget;
	}

	public TargetOffer getNewOfferTarget() {
		return newOfferTarget;
	}

	public void setNewOfferTarget(TargetOffer newOfferTarget) {
		this.newOfferTarget = newOfferTarget;
	}

	public TargetOffer getRedeemedOfferTarget() {
		return redeemedOfferTarget;
	}

	public void setRedeemedOfferTarget(TargetOffer redeemedOfferTarget) {
		this.redeemedOfferTarget = redeemedOfferTarget;
	}

	public String getDataGtmLabel() {
		return dataGtmLabel;
	}

	public void setDataGtmLabel(String dataGtmLabel) {
		this.dataGtmLabel = dataGtmLabel;
	}

	public String getTitleExpire() {
		return titleExpire;
	}

	public void setTitleExpire(String titleExpire) {
		this.titleExpire = titleExpire;
	}

	public String getRedeemExpireOfferMessage() {
		return redeemExpireOfferMessage;
	}

	public void setRedeemExpireOfferMessage(String redeemExpireOfferMessage) {
		this.redeemExpireOfferMessage = redeemExpireOfferMessage;
	}

	public String getButtonLabelSelectRetailer() {
		return buttonLabelSelectRetailer;
	}

	public void setButtonLabelSelectRetailer(String buttonLabelSelectRetailer) {
		this.buttonLabelSelectRetailer = buttonLabelSelectRetailer;
	}

	public String getRetailerAlreadySelected() {
		return retailerAlreadySelected;
	}

	public void setRetailerAlreadySelected(String retailerAlreadySelected) {
		this.retailerAlreadySelected = retailerAlreadySelected;
	}

	public String getRetailerPageURL() {
		return retailerPageURL;
	}

	public void setRetailerPageURL(String retailerPageURL) {
		this.retailerPageURL = retailerPageURL;
	}

	public String getRetailerCouponPageURL() {
		return retailerCouponPageURL;
	}

	public void setRetailerCouponPageURL(String retailerCouponPageURL) {
		this.retailerCouponPageURL = retailerCouponPageURL;
	}

	public String getSelectRetailerNote() {
		return selectRetailerNote;
	}

	public void setSelectRetailerNote(String selectRetailerNote) {
		this.selectRetailerNote = selectRetailerNote;
	}

	public String getButtonLabelRedeem() {
		return buttonLabelRedeem;
	}

	public void setButtonLabelRedeem(String buttonLabelRedeem) {
		this.buttonLabelRedeem = buttonLabelRedeem;
	}

	public String getButtonLabelMarkRedeem() {
		return buttonLabelMarkRedeem;
	}

	public void setButtonLabelMarkRedeem(String buttonLabelMarkRedeem) {
		this.buttonLabelMarkRedeem = buttonLabelMarkRedeem;
	}

	public MarkRedeemedBean getMarkAsRedeemed() {
		return markAsRedeemed;
	}

	public void setMarkAsRedeemed(MarkRedeemedBean markAsRedeemed) {
		this.markAsRedeemed = markAsRedeemed;
	}

	public OfferCouponBean getUnassignedOffer() {
		return unassignedOffer;
	}

	public void setUnassignedOffer(OfferCouponBean unassignedOffer) {
		this.unassignedOffer = unassignedOffer;
	}

	public String getDataGtmRedeemOffer() {
		return dataGtmRedeemOffer;
	}

	public void setDataGtmRedeemOffer(String dataGtmRedeemOffer) {
		this.dataGtmRedeemOffer = dataGtmRedeemOffer;
	}

	public String getDataGtmMarkRedeemed() {
		return dataGtmMarkRedeemed;
	}

	public void setDataGtmMarkRedeemed(String dataGtmMarkRedeemed) {
		this.dataGtmMarkRedeemed = dataGtmMarkRedeemed;
	}

	public HcpInfo getHcpInfo() {
		return hcpInfo;
	}

	public void setHcpInfo(HcpInfo hcpInfo) {
		this.hcpInfo = hcpInfo;
	}

	public class Tpg {

		private String offerType;
		private String title;
		private String subTitle;
		private String imgUrl;
		private String imgSMUrl;
		private String pageUrl;
		private String tpgOfferImage;
		private Boolean showOfferValue;
		private String offerDisclaimer;
		private Coupon newOffer;
		private Coupon openOffer;
		private Coupon redeemedOffer;

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public Coupon getNewOffer() {
			return newOffer;
		}

		public void setNewOffer(Coupon newOffer) {
			this.newOffer = newOffer;
		}

		public String getSubTitle() {
			return subTitle;
		}

		public void setSubTitle(String subTitle) {
			this.subTitle = subTitle;
		}

		public String getImgSMUrl() {
			return imgSMUrl;
		}

		public void setImgSMUrl(String imgSMUrl) {
			this.imgSMUrl = imgSMUrl;
		}

		public Coupon getOpenOffer() {
			return openOffer;
		}

		public void setOpenOffer(Coupon openOffer) {
			this.openOffer = openOffer;
		}

		public String getOfferType() {
			return offerType;
		}

		public void setOfferType(String offerType) {
			this.offerType = offerType;
		}

		public String getPageUrl() {
			return pageUrl;
		}

		public void setPageUrl(String pageUrl) {
			this.pageUrl = pageUrl;
		}

		public Coupon getRedeemedOffer() {
			return redeemedOffer;
		}

		public void setRedeemedOffer(Coupon redeemedOffer) {
			this.redeemedOffer = redeemedOffer;
		}

		public String getImgUrl() {
			return imgUrl;
		}

		public void setImgUrl(String imgUrl) {
			this.imgUrl = imgUrl;
		}

		public String getTpgOfferImage() {
			return tpgOfferImage;
		}

		public void setTpgOfferImage(String tpgOfferImage) {
			this.tpgOfferImage = tpgOfferImage;
		}

		public Boolean getShowOfferValue() {
			return showOfferValue;
		}

		public void setShowOfferValue(Boolean showOfferValue) {
			this.showOfferValue = showOfferValue;
		}

		public String getOfferDisclaimer() {
			return offerDisclaimer;
		}

		public void setOfferDisclaimer(String offerDisclaimer) {
			this.offerDisclaimer = offerDisclaimer;
		}

	}

	public class Offer {

		private String title;
		private String description;
		private String buttonLabel;
		private String imgUrl;
		private String href;
		private String dataGtmLabel;

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public String getButtonLabel() {
			return buttonLabel;
		}

		public void setButtonLabel(String buttonLabel) {
			this.buttonLabel = buttonLabel;
		}

		public String getImgUrl() {
			return imgUrl;
		}

		public void setImgUrl(String imgUrl) {
			this.imgUrl = imgUrl;
		}

		public String getHref() {
			return href;
		}

		public void setHref(String href) {
			this.href = href;
		}

		public String getDataGtmLabel() {
			return dataGtmLabel;
		}

		public void setDataGtmLabel(String dataGtmLabel) {
			this.dataGtmLabel = dataGtmLabel;
		}
	}

	public class TargetOffer {

		private String headerTitle;
		private String expiryTitle;
		private String title;
		private String title1;
		private String subTitle;
		private String subTitle1;
		private String subTitle2;
		private String subTitle3;
		private String offerCriteria;
		private String offerCriteriaOnline;
		private String offerCriteriaStore;
		private String offerDescription1;
		private String offerDescription2;
		private String buttonLabelRedeem;
		private String buttonLabelMarkRedeem;
		private String buttonLabelOnline;
		private String buttonLabelStore;
		private String promoCodeTitle;
		private String openedOfferTitle;
		private String openedOfferInfo;
		private String promoURL;
		private String dataGtmLabel;
		private String dataGtmLabelOnline;
		private String dataGtmLabelStore;
		private String imgUrl;
		private String imgSMUrl;
		private String pageUrl;
		private Boolean showOfferValue;

		public String getHeaderTitle() {
			return headerTitle;
		}

		public void setHeaderTitle(String headerTitle) {
			this.headerTitle = headerTitle;
		}

		public String getExpiryTitle() {
			return expiryTitle;
		}

		public void setExpiryTitle(String expiryTitle) {
			this.expiryTitle = expiryTitle;
		}

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public String getSubTitle() {
			return subTitle;
		}

		public void setSubTitle(String subTitle) {
			this.subTitle = subTitle;
		}

		public String getOfferCriteria() {
			return offerCriteria;
		}

		public void setOfferCriteria(String offerCriteria) {
			this.offerCriteria = offerCriteria;
		}

		public String getOfferCriteriaOnline() {
			return offerCriteriaOnline;
		}

		public void setOfferCriteriaOnline(String offerCriteriaOnline) {
			this.offerCriteriaOnline = offerCriteriaOnline;
		}

		public String getOfferCriteriaStore() {
			return offerCriteriaStore;
		}

		public void setOfferCriteriaStore(String offerCriteriaStore) {
			this.offerCriteriaStore = offerCriteriaStore;
		}

		public String getButtonLabelOnline() {
			return buttonLabelOnline;
		}

		public void setButtonLabelOnline(String buttonLabelOnline) {
			this.buttonLabelOnline = buttonLabelOnline;
		}

		public String getButtonLabelStore() {
			return buttonLabelStore;
		}

		public void setButtonLabelStore(String buttonLabelStore) {
			this.buttonLabelStore = buttonLabelStore;
		}

		public String getPromoCodeTitle() {
			return promoCodeTitle;
		}

		public void setPromoCodeTitle(String promoCodeTitle) {
			this.promoCodeTitle = promoCodeTitle;
		}

		public String getOpenedOfferTitle() {
			return openedOfferTitle;
		}

		public void setOpenedOfferTitle(String openedOfferTitle) {
			this.openedOfferTitle = openedOfferTitle;
		}

		public String getOpenedOfferInfo() {
			return openedOfferInfo;
		}

		public void setOpenedOfferInfo(String openedOfferInfo) {
			this.openedOfferInfo = openedOfferInfo;
		}

		public String getPromoURL() {
			return promoURL;
		}

		public void setPromoURL(String promoURL) {
			this.promoURL = promoURL;
		}

		public String getDataGtmLabel() {
			return dataGtmLabel;
		}

		public void setDataGtmLabel(String dataGtmLabel) {
			this.dataGtmLabel = dataGtmLabel;
		}

		public String getDataGtmLabelOnline() {
			return dataGtmLabelOnline;
		}

		public void setDataGtmLabelOnline(String dataGtmLabelOnline) {
			this.dataGtmLabelOnline = dataGtmLabelOnline;
		}

		public String getDataGtmLabelStore() {
			return dataGtmLabelStore;
		}

		public void setDataGtmLabelStore(String dataGtmLabelStore) {
			this.dataGtmLabelStore = dataGtmLabelStore;
		}

		public String getTitle1() {
			return title1;
		}

		public void setTitle1(String title1) {
			this.title1 = title1;
		}

		public String getOfferDescription1() {
			return offerDescription1;
		}

		public void setOfferDescription1(String offerDescription1) {
			this.offerDescription1 = offerDescription1;
		}

		public String getOfferDescription2() {
			return offerDescription2;
		}

		public void setOfferDescription2(String offerDescription2) {
			this.offerDescription2 = offerDescription2;
		}

		public String getSubTitle1() {
			return subTitle1;
		}

		public void setSubTitle1(String subTitle1) {
			this.subTitle1 = subTitle1;
		}

		public String getSubTitle2() {
			return subTitle2;
		}

		public void setSubTitle2(String subTitle2) {
			this.subTitle2 = subTitle2;
		}

		public String getSubTitle3() {
			return subTitle3;
		}

		public void setSubTitle3(String subTitle3) {
			this.subTitle3 = subTitle3;
		}

		public String getButtonLabelRedeem() {
			return buttonLabelRedeem;
		}

		public void setButtonLabelRedeem(String buttonLabelRedeem) {
			this.buttonLabelRedeem = buttonLabelRedeem;
		}

		public String getButtonLabelMarkRedeem() {
			return buttonLabelMarkRedeem;
		}

		public void setButtonLabelMarkRedeem(String buttonLabelMarkRedeem) {
			this.buttonLabelMarkRedeem = buttonLabelMarkRedeem;
		}

		public Boolean isShowOfferValue() {
			return showOfferValue;
		}

		public void setShowOfferValue(Boolean showOfferValue) {
			this.showOfferValue = showOfferValue;
		}

		public String getImgUrl() {
			return imgUrl;
		}

		public void setImgUrl(String imgUrl) {
			this.imgUrl = imgUrl;
		}

		public String getImgSMUrl() {
			return imgSMUrl;
		}

		public void setImgSMUrl(String imgSMUrl) {
			this.imgSMUrl = imgSMUrl;
		}

		public String getPageUrl() {
			return pageUrl;
		}

		public void setPageUrl(String pageUrl) {
			this.pageUrl = pageUrl;
		}
	}

	public class HcpInfo {

		private String offerText;
		private String errorText;

		public String getOfferText() {
			return offerText;
		}

		public void setOfferText(String offerText) {
			this.offerText = offerText;
		}

		public String getErrorText() {
			return errorText;
		}

		public void setErrorText(String errorText) {
			this.errorText = errorText;
		}
	}
}
package com.abbott.aem.an.similac.core.beans;

/**
 * Bean class to hold information about an coupon
 * 
 * @author Cognizant and IBM
 */
public class OfferCouponBean {

	private Coupon newOffer;
	private Coupon openOffer;
	private Coupon redeemedOffer;
	private String title;
	private String subTitle;
	private Boolean showOfferValue;
	private String imgUrl;
	private String imgSMUrl;
	private String pageUrl;

	public Coupon getNewOffer() {
		return newOffer;
	}

	public void setNewOffer(Coupon newOffer) {
		this.newOffer = newOffer;
	}

	public Coupon getOpenOffer() {
		return openOffer;
	}

	public void setOpenOffer(Coupon openOffer) {
		this.openOffer = openOffer;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public Coupon getRedeemedOffer() {
		return redeemedOffer;
	}

	public void setRedeemedOffer(Coupon redeemedOffer) {
		this.redeemedOffer = redeemedOffer;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getPageUrl() {
		return pageUrl;
	}

	public void setPageUrl(String pageUrl) {
		this.pageUrl = pageUrl;
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

	public Boolean getShowOfferValue() {
		return showOfferValue;
	}

	public void setShowOfferValue(Boolean showOfferValue) {
		this.showOfferValue = showOfferValue;
	}

	public class Coupon {

		private String title;
		private String subTitle;
		private String buttonLabel;
		private String redeemedOnLabel;
		private String dataGtmLabel;

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

		public String getButtonLabel() {
			return buttonLabel;
		}

		public void setButtonLabel(String buttonLabel) {
			this.buttonLabel = buttonLabel;
		}

		public String getRedeemedOnLabel() {
			return redeemedOnLabel;
		}

		public void setRedeemedOnLabel(String redeemedOnLabel) {
			this.redeemedOnLabel = redeemedOnLabel;
		}

		public String getDataGtmLabel() {
			return dataGtmLabel;
		}

		public void setDataGtmLabel(String dataGtmLabel) {
			this.dataGtmLabel = dataGtmLabel;
		}

	}

}

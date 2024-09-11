package com.abbott.aem.an.similac.core.beans;

import java.util.Map;

public class RetailerBean {

	private String title;
	private String retailerNote;
	private String subTitle;
	private String retailerPageUrl;
	private String error;
	private String selectRetailerLabel;
	private String deSelectRetailerLabel;
	private String dataGtmLabel;
	RetailerSelectedBean retailerSelected;
	private Map<String, Retailer> retailersList;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getRetailerNote() {
		return retailerNote;
	}

	public void setRetailerNote(String retailerNote) {
		this.retailerNote = retailerNote;
	}

	public String getSubTitle() {
		return subTitle;
	}

	public void setSubTitle(String subTitle) {
		this.subTitle = subTitle;
	}

	public String getRetailerPageUrl() {
		return retailerPageUrl;
	}

	public void setRetailerPageUrl(String retailerPageUrl) {
		this.retailerPageUrl = retailerPageUrl;
	}

	public String getSelectRetailerLabel() {
		return selectRetailerLabel;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public void setSelectRetailerLabel(String selectRetailerLabel) {
		this.selectRetailerLabel = selectRetailerLabel;
	}

	public String getDeSelectRetailerLabel() {
		return deSelectRetailerLabel;
	}

	public void setDeSelectRetailerLabel(String deSelectRetailerLabel) {
		this.deSelectRetailerLabel = deSelectRetailerLabel;
	}

	public Map<String, Retailer> getRetailersList() {
		return retailersList;
	}

	public void setRetailersList(Map<String, Retailer> retailersList) {
		this.retailersList = retailersList;
	}

	public String getDataGtmLabel() {
		return dataGtmLabel;
	}

	public void setDataGtmLabel(String dataGtmLabel) {
		this.dataGtmLabel = dataGtmLabel;
	}

	public RetailerSelectedBean getRetailerSelected() {
		return retailerSelected;
	}

	public void setRetailerSelected(RetailerSelectedBean retailerSelected) {
		this.retailerSelected = retailerSelected;
	}

	public class Retailer {

		private String label;
		private String retailerDescription;
		private String value;
		private Boolean isAvailable;
		private String lineOneTxt;
		private String lineTwoTxt;
		private String imgUrl;
		private String imgSMUrl;
		private String pageUrl;
		private String offerType;
		private String dataGtmLabel;
		private String dataGtmSelectLabel;

		public String getLabel() {
			return label;
		}

		public void setLabel(String label) {
			this.label = label;
		}

		public String getRetailerDescription() {
			return retailerDescription;
		}

		public void setRetailerDescription(String retailerDescription) {
			this.retailerDescription = retailerDescription;
		}

		public String getValue() {
			return value;
		}

		public void setValue(String value) {
			this.value = value;
		}

		public String getImgUrl() {
			return imgUrl;
		}

		public void setImgUrl(String imgUrl) {
			this.imgUrl = imgUrl;
		}

		public Boolean getIsAvailable() {
			return isAvailable;
		}

		public void setIsAvailable(Boolean isAvailable) {
			this.isAvailable = isAvailable;
		}

		public String getPageUrl() {
			return pageUrl;
		}

		public void setPageUrl(String pageUrl) {
			this.pageUrl = pageUrl;
		}

		public String getLineOneTxt() {
			return lineOneTxt;
		}

		public void setLineOneTxt(String lineOneTxt) {
			this.lineOneTxt = lineOneTxt;
		}

		public String getLineTwoTxt() {
			return lineTwoTxt;
		}

		public void setLineTwoTxt(String lineTwoTxt) {
			this.lineTwoTxt = lineTwoTxt;
		}

		public String getImgSMUrl() {
			return imgSMUrl;
		}

		public void setImgSMUrl(String imgSMUrl) {
			this.imgSMUrl = imgSMUrl;
		}

		public String getOfferType() {
			return offerType;
		}

		public void setOfferType(String offerType) {
			this.offerType = offerType;
		}

		public String getDataGtmLabel() {
			return dataGtmLabel;
		}

		public void setDataGtmLabel(String dataGtmLabel) {
			this.dataGtmLabel = dataGtmLabel;
		}

		public String getDataGtmSelectLabel() {
			return dataGtmSelectLabel;
		}

		public void setDataGtmSelectLabel(String dataGtmSelectLabel) {
			this.dataGtmSelectLabel = dataGtmSelectLabel;
		}
	}

}
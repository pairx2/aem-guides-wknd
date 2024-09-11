package com.abbott.aem.an.similac.core.beans;

public class OfferContainerBean {

	private String title;
	private String actionPath;
	private String actionPathGetProfile;
	private String updateLabel;
	private String noteLabel;
	private String signUpNoteLabel;
	private String registerPageUrl;
	private String registrationFormName;
	private String myOfferPageUrl;
	private String actionPathLookupUser;
	private String loginPageUrl;
	private String barCodeGenerate;
	private String errorUpdateProfileNonDOUser;
	private String offerDisruptorFragment;
	private String hcpOfferDisruptorFragment;
	private String pwaDownloadDisruptorFragment;
	private String newOfferLabel;
	private String newOfferLabel1;
	private String expiringOfferLabel;
	private String expiringOfferLabel1;
	private String DOThanksMessage;
	private String goToOfferPageText;
	private PurchaserOnlyOffer purchaserOnlyOffer;
	private CurrentOffersBean currentOffers;
	private RetailerBean retailer;
	private ScanModule scanModule;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getActionPath() {
		return actionPath;
	}

	public String getActionPathGetProfile() {
		return actionPathGetProfile;
	}

	public void setActionPathGetProfile(String actionPathGetProfile) {
		this.actionPathGetProfile = actionPathGetProfile;
	}

	public String getUpdateLabel() {
		return updateLabel;
	}

	public void setUpdateLabel(String updateLabel) {
		this.updateLabel = updateLabel;
	}

	public String getNoteLabel() {
		return noteLabel;
	}

	public void setNoteLabel(String noteLabel) {
		this.noteLabel = noteLabel;
	}

	public void setActionPath(String actionPath) {
		this.actionPath = actionPath;
	}

	public CurrentOffersBean getCurrentOffers() {
		return currentOffers;
	}

	public void setCurrentOffers(CurrentOffersBean currentOffers) {
		this.currentOffers = currentOffers;
	}

	public RetailerBean getRetailer() {
		return retailer;
	}

	public void setRetailer(RetailerBean retailer) {
		this.retailer = retailer;
	}

	public String getRegisterPageUrl() {
		return registerPageUrl;
	}

	public void setRegisterPageUrl(String registerPageUrl) {
		this.registerPageUrl = registerPageUrl;
	}

	public String getRegistrationFormName() {
		return registrationFormName;
	}

	public void setRegistrationFormName(String registrationFormName) {
		this.registrationFormName = registrationFormName;
	}

	public String getMyOfferPageUrl() {
		return myOfferPageUrl;
	}

	public void setMyOfferPageUrl(String myOfferPageUrl) {
		this.myOfferPageUrl = myOfferPageUrl;
	}

	public String getActionPathLookupUser() {
		return actionPathLookupUser;
	}

	public void setActionPathLookupUser(String actionPathLookupUser) {
		this.actionPathLookupUser = actionPathLookupUser;
	}

	public String getLoginPageUrl() {
		return loginPageUrl;
	}

	public void setLoginPageUrl(String loginPageUrl) {
		this.loginPageUrl = loginPageUrl;
	}

	public String getBarCodeGenerate() {
		return barCodeGenerate;
	}

	public void setBarCodeGenerate(String barCodeGenerate) {
		this.barCodeGenerate = barCodeGenerate;
	}

	public String getErrorUpdateProfileNonDOUser() {
		return errorUpdateProfileNonDOUser;
	}

	public void setErrorUpdateProfileNonDOUser(String errorUpdateProfileNonDOUser) {
		this.errorUpdateProfileNonDOUser = errorUpdateProfileNonDOUser;
	}

	public String getOfferDisruptorFragment() {
		return offerDisruptorFragment;
	}

	public void setOfferDisruptorFragment(String offerDisruptorFragment) {
		this.offerDisruptorFragment = offerDisruptorFragment;
	}

	public String getNewOfferLabel() {
		return newOfferLabel;
	}

	public void setNewOfferLabel(String newOfferLabel) {
		this.newOfferLabel = newOfferLabel;
	}

	public String getExpiringOfferLabel() {
		return expiringOfferLabel;
	}

	public void setExpiringOfferLabel(String expiringOfferLabel) {
		this.expiringOfferLabel = expiringOfferLabel;
	}

	public String getNewOfferLabel1() {
		return newOfferLabel1;
	}

	public void setNewOfferLabel1(String newOfferLabel1) {
		this.newOfferLabel1 = newOfferLabel1;
	}

	public String getExpiringOfferLabel1() {
		return expiringOfferLabel1;
	}

	public void setExpiringOfferLabel1(String expiringOfferLabel1) {
		this.expiringOfferLabel1 = expiringOfferLabel1;
	}

	public String getGoToOfferPageText() {
		return goToOfferPageText;
	}

	public void setGoToOfferPageText(String goToOfferPageText) {
		this.goToOfferPageText = goToOfferPageText;
	}

	public String getDOThanksMessage() {
		return DOThanksMessage;
	}

	public void setDOThanksMessage(String dOThanksMessage) {
		this.DOThanksMessage = dOThanksMessage;
	}

	public PurchaserOnlyOffer getPurchaserOnlyOffer() {
		return purchaserOnlyOffer;
	}

	public void setPurchaserOnlyOffer(PurchaserOnlyOffer purchaserOnlyOffer) {
		this.purchaserOnlyOffer = purchaserOnlyOffer;
	}

	public String getSignUpNoteLabel() {
		return signUpNoteLabel;
	}

	public void setSignUpNoteLabel(String signUpNoteLabel) {
		this.signUpNoteLabel = signUpNoteLabel;
	}

	public String getHcpOfferDisruptorFragment() {
		return hcpOfferDisruptorFragment;
	}

	public void setHcpOfferDisruptorFragment(String hcpOfferDisruptorFragment) {
		this.hcpOfferDisruptorFragment = hcpOfferDisruptorFragment;
	}

	public String getPwaDownloadDisruptorFragment() {
		return pwaDownloadDisruptorFragment;
	}

	public void setPwaDownloadDisruptorFragment(String pwaDownloadDisruptorFragment) {
		this.pwaDownloadDisruptorFragment = pwaDownloadDisruptorFragment;
	}

	public ScanModule getScanModule() {
		return scanModule;
	}

	public void setScanModule(ScanModule scanModule) {
		this.scanModule = scanModule;
	}

	public class PurchaserOnlyOffer {

		private String title;
		private String description;
		private String imgUrl;
		private String buttonLabel;

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

		public String getImgUrl() {
			return imgUrl;
		}

		public void setImgUrl(String imgUrl) {
			this.imgUrl = imgUrl;
		}

		public String getButtonLabel() {
			return buttonLabel;
		}

		public void setButtonLabel(String buttonLabel) {
			this.buttonLabel = buttonLabel;
		}
	}

	public class ScanModule {

		private Boolean showScanModule;
		private String scanModuleHeading;
		private String scanModuleDesc;
		private String scanModuleImage;
		private String switchToDigitalTitle;
		private String switchToDigitalDesc;
		private String goDigitalBtnTxt;
		private String disclaimerTxt1;
		private String popUpTxt;
		private String popUpYesBtnTxt;
		private String popUpNoBtnTxt;
		private String congratsTitle;
		private String congratsDesc1;
		private String congratsDesc2;
		private String disclaimerTxt2;
		private String disclaimerTxt3;
		private String offerTabFootnote;

		public Boolean getShowScanModule() {
			return showScanModule;
		}

		public void setShowScanModule(Boolean showScanModule) {
			this.showScanModule = showScanModule;
		}

		public String getScanModuleHeading() {
			return scanModuleHeading;
		}

		public void setScanModuleHeading(String scanModuleHeading) {
			this.scanModuleHeading = scanModuleHeading;
		}

		public String getScanModuleDesc() {
			return scanModuleDesc;
		}

		public void setScanModuleDesc(String scanModuleDesc) {
			this.scanModuleDesc = scanModuleDesc;
		}

		public String getScanModuleImage() {
			return scanModuleImage;
		}

		public void setScanModuleImage(String scanModuleImage) {
			this.scanModuleImage = scanModuleImage;
		}

		public String getSwitchToDigitalTitle() {
			return switchToDigitalTitle;
		}

		public void setSwitchToDigitalTitle(String switchToDigitalTitle) {
			this.switchToDigitalTitle = switchToDigitalTitle;
		}

		public String getSwitchToDigitalDesc() {
			return switchToDigitalDesc;
		}

		public void setSwitchToDigitalDesc(String switchToDigitalDesc) {
			this.switchToDigitalDesc = switchToDigitalDesc;
		}

		public String getGoDigitalBtnTxt() {
			return goDigitalBtnTxt;
		}

		public void setGoDigitalBtnTxt(String goDigitalBtnTxt) {
			this.goDigitalBtnTxt = goDigitalBtnTxt;
		}

		public String getDisclaimerTxt1() {
			return disclaimerTxt1;
		}

		public void setDisclaimerTxt1(String disclaimerTxt1) {
			this.disclaimerTxt1 = disclaimerTxt1;
		}

		public String getPopUpTxt() {
			return popUpTxt;
		}

		public void setPopUpTxt(String popUpTxt) {
			this.popUpTxt = popUpTxt;
		}

		public String getPopUpYesBtnTxt() {
			return popUpYesBtnTxt;
		}

		public void setPopUpYesBtnTxt(String popUpYesBtnTxt) {
			this.popUpYesBtnTxt = popUpYesBtnTxt;
		}

		public String getPopUpNoBtnTxt() {
			return popUpNoBtnTxt;
		}

		public void setPopUpNoBtnTxt(String popUpNoBtnTxt) {
			this.popUpNoBtnTxt = popUpNoBtnTxt;
		}

		public String getCongratsTitle() {
			return congratsTitle;
		}

		public void setCongratsTitle(String congratsTitle) {
			this.congratsTitle = congratsTitle;
		}

		public String getCongratsDesc1() {
			return congratsDesc1;
		}

		public void setCongratsDesc1(String congratsDesc1) {
			this.congratsDesc1 = congratsDesc1;
		}

		public String getCongratsDesc2() {
			return congratsDesc2;
		}

		public void setCongratsDesc2(String congratsDesc2) {
			this.congratsDesc2 = congratsDesc2;
		}

		public String getDisclaimerTxt2() {
			return disclaimerTxt2;
		}

		public void setDisclaimerTxt2(String disclaimerTxt2) {
			this.disclaimerTxt2 = disclaimerTxt2;
		}

		public String getDisclaimerTxt3() {
			return disclaimerTxt3;
		}

		public void setDisclaimerTxt3(String disclaimerTxt3) {
			this.disclaimerTxt3 = disclaimerTxt3;
		}

		public String getOfferTabFootnote() {
			return offerTabFootnote;
		}

		public void setOfferTabFootnote(String offerTabFootnote) {
			this.offerTabFootnote = offerTabFootnote;
		}

	}

}
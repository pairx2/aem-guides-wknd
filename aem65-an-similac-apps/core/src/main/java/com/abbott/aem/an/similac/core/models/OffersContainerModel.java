package com.abbott.aem.an.similac.core.models;

import static com.abbott.aem.an.similac.core.utils.CommonConstants.ERROR_UPDATE_PROFILE_NON_DO;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.an.similac.core.beans.OfferContainerBean;
import com.abbott.aem.an.similac.core.beans.OfferContainerBean.PurchaserOnlyOffer;
import com.abbott.aem.an.similac.core.beans.OfferContainerBean.ScanModule;
import com.google.gson.GsonBuilder;

/**
 * OffersContainerModel is the SlingModel to hold the details of my offer and
 * form components
 * 
 * @author Cognizant + IBM
 *
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class OffersContainerModel {

	private static final Logger LOGGER = LoggerFactory.getLogger(OffersContainerModel.class);

	private static final String TITLE = "title";

	private static final String ACTION_PATH = "actionPath";
	
	private static final String ACTION_PATH_GET_PROFILE = "actionPathGetProfile";

	private static final String UPDATE_LABEL = "updateLabel";

	private static final String NOTE_LABEL = "noteLabel";
	
	private static final String SIGN_UP_NOTE_LABEL = "signUpNoteLabel";
	
	private static final String PURCHASER_ONLY_TITLE = "purchaserOnlyOfferTitle";
	
	private static final String DESCRIPTION = "purchaserOnlyOfferDec";
	
	private static final String IMG_URL = "purchaserOnlyOfferImgUrl";
	
	private static final String BUTTON_LABEL = "purchaserOnlyOfferBtnLabel";

	private static final String OFFER_DISTRUPTOR_FRAG = "offerDisruptorFragment";
	
	private static final String HCP_OFFER_DISTRUPTOR_FRAG = "hcpOfferDisruptorFragment";

	private static final String PWA_DOWNLOAD_DISTRUPTOR_FRAG = "pwaDownloadDisruptorFragment";
	
	private static final String NEW_OFFER_LABEL = "newOfferLabel";
	
	private static final String NEW_OFFER_LABEL_1 = "newOfferLabel1";
	
	private static final String EXPIRING_OFFER_LABEL = "expiringOfferLabel";
	
	private static final String EXPIRING_OFFER_LABEL_1 = "expiringOfferLabel1";
	
	private static final String DO_THANKS_MESSAGE = "DOThanksMessage";

	private static final String GOTO_OFFER_PAGE_TEXT = "goToOfferPageText";
	
	private static final String SHOW_SCAN_MODULE = "showScanModule";
	
	private static final String SCAN_MODULE_HEADING = "scanModuleHeading";
	
	private static final String SCAN_MODULE_DESC = "scanModuleDesc";
	
	private static final String SCAN_MODULE_IMAGE = "scanModuleImage";
	
	private static final String SWITCH_TO_DIGITAL = "switchToDigitalTitle";
	
	private static final String SWITCH_TO_DIGITAL_DESC = "switchToDigitalDesc";
	
	private static final String GO_DIGITAL_TXT = "goDigitalBtnTxt";
	
	private static final String DISCLAIMER_TXT_1 = "disclaimerTxt1";
	
	private static final String POP_UP_TXT = "popUpTxt";
	
	private static final String POP_UP_YES_BTN_TXT = "yesBtnTxt";
	
	private static final String POP_UP_NO_BTN_TXT = "noBtnTxt";
	
	private static final String CONGRATS_TITLE = "congratsTitle";
	
	private static final String CONGRATS_DESC1 = "congratsDesc1";

	private static final String CONGRATS_DESC2 = "congratsDesc2";
	
	private static final String DISCLAIMER_TXT_2 = "disclaimerTxt2";

	private static final String DISCLAIMER_TXT_3 = "disclaimerTxt3";
	
	private static final String OFFERTAB_FOOTNOTE = "offerTabFootnote";

	@SlingObject
	private Resource resource;

	@ChildResource(name = "currentOffers")
	private Resource currentOffersResource;

	@ChildResource(name = "retailer")
	private Resource retailerResource;

	private OfferContainerBean myOfferContainerBean;

	private String myOffersJson;

	@PostConstruct
	public void activate() {
		if (resource != null) {
			populateMyOffers();
		}
	}

	/**
	 * Populate my offer details form component properties
	 * 
	 * @throws Exception
	 */
	private void populateMyOffers() {
		try {

			ValueMap formProperties = resource.adaptTo(ValueMap.class);
			myOfferContainerBean = new OfferContainerBean();
			if (formProperties == null) {
				return;
			}
			myOfferContainerBean.setTitle(formProperties.get(TITLE, String.class));
			myOfferContainerBean.setActionPath(formProperties.get(ACTION_PATH, String.class));
			myOfferContainerBean.setActionPathGetProfile(formProperties.get(ACTION_PATH_GET_PROFILE, String.class));
			myOfferContainerBean.setUpdateLabel(formProperties.get(UPDATE_LABEL, String.class));
			myOfferContainerBean.setNoteLabel(formProperties.get(NOTE_LABEL, String.class));
			myOfferContainerBean.setSignUpNoteLabel(formProperties.get(SIGN_UP_NOTE_LABEL, String.class));
			myOfferContainerBean.setRegisterPageUrl(formProperties.get("registerPageUrl", String.class));
			myOfferContainerBean.setRegistrationFormName(formProperties.get("registrationFormName", String.class));
			myOfferContainerBean.setMyOfferPageUrl(formProperties.get("myOfferPageUrl", String.class));
			myOfferContainerBean.setActionPathLookupUser(formProperties.get("actionPathLookupUser", String.class));
			myOfferContainerBean.setLoginPageUrl(formProperties.get("loginPageUrl", String.class));
			myOfferContainerBean.setBarCodeGenerate(formProperties.get("barCodeGenerate", String.class));
			myOfferContainerBean.setErrorUpdateProfileNonDOUser(formProperties.get(ERROR_UPDATE_PROFILE_NON_DO, String.class));
			myOfferContainerBean.setOfferDisruptorFragment(formProperties.get(OFFER_DISTRUPTOR_FRAG, String.class));
			myOfferContainerBean.setHcpOfferDisruptorFragment(formProperties.get(HCP_OFFER_DISTRUPTOR_FRAG, String.class));
			myOfferContainerBean.setPwaDownloadDisruptorFragment(formProperties.get(PWA_DOWNLOAD_DISTRUPTOR_FRAG, String.class));
			myOfferContainerBean.setNewOfferLabel(formProperties.get(NEW_OFFER_LABEL, String.class));
			myOfferContainerBean.setNewOfferLabel1(formProperties.get(NEW_OFFER_LABEL_1, String.class));
			myOfferContainerBean.setExpiringOfferLabel(formProperties.get(EXPIRING_OFFER_LABEL, String.class));
			myOfferContainerBean.setExpiringOfferLabel1(formProperties.get(EXPIRING_OFFER_LABEL_1, String.class));
			myOfferContainerBean.setDOThanksMessage(formProperties.get(DO_THANKS_MESSAGE, String.class));
			myOfferContainerBean.setGoToOfferPageText(formProperties.get(GOTO_OFFER_PAGE_TEXT, String.class));
			myOfferContainerBean.setPurchaserOnlyOffer(populatePurchaserOnlyOffer(formProperties));
			myOfferContainerBean.setScanModule(populateScanModuleInfo(formProperties));
			
			if (currentOffersResource != null) {
				CurrentOfferModel currentOffersModel = currentOffersResource.adaptTo(CurrentOfferModel.class);
				if (currentOffersModel != null) {
					myOfferContainerBean.setCurrentOffers(currentOffersModel.getCurrentOffers());
				}
			}

			if (retailerResource != null) {
				RetailerModel retailerModel = retailerResource.adaptTo(RetailerModel.class);
				if (retailerModel != null) {
					myOfferContainerBean.setRetailer(retailerModel.getRetailer());
				}
			}

		} catch (RuntimeException e) {
			LOGGER.error("Exception in populateMyOffers ::",e);
		}
	}

	/**
	 *This methods will populate the Purchaser Only Offer data
	 *
	 * @param formProperties
	 * 
	 * @return PurchaserOnlyOffer
	 */
	private PurchaserOnlyOffer populatePurchaserOnlyOffer(ValueMap formProperties) {
		PurchaserOnlyOffer purchaseOnlyOffer = myOfferContainerBean.new PurchaserOnlyOffer();
		purchaseOnlyOffer.setTitle(formProperties.get(PURCHASER_ONLY_TITLE, String.class));
		purchaseOnlyOffer.setDescription(formProperties.get(DESCRIPTION, String.class));
		purchaseOnlyOffer.setImgUrl(formProperties.get(IMG_URL, String.class));
		purchaseOnlyOffer.setButtonLabel(formProperties.get(BUTTON_LABEL, String.class));
		return purchaseOnlyOffer;
	}
	
	private ScanModule populateScanModuleInfo(ValueMap formProperties) {
		ScanModule scanModule = myOfferContainerBean.new ScanModule();
		scanModule.setShowScanModule(formProperties.get(SHOW_SCAN_MODULE, Boolean.class));
		scanModule.setScanModuleHeading(formProperties.get(SCAN_MODULE_HEADING, String.class));
		scanModule.setScanModuleDesc(formProperties.get(SCAN_MODULE_DESC, String.class));
		scanModule.setScanModuleImage(formProperties.get(SCAN_MODULE_IMAGE, String.class));
		scanModule.setSwitchToDigitalTitle(formProperties.get(SWITCH_TO_DIGITAL, String.class));
		scanModule.setSwitchToDigitalDesc(formProperties.get(SWITCH_TO_DIGITAL_DESC, String.class));
		scanModule.setGoDigitalBtnTxt(formProperties.get(GO_DIGITAL_TXT, String.class));
		scanModule.setDisclaimerTxt1(formProperties.get(DISCLAIMER_TXT_1, String.class));
		scanModule.setPopUpTxt(formProperties.get(POP_UP_TXT, String.class));
		scanModule.setPopUpYesBtnTxt(formProperties.get(POP_UP_YES_BTN_TXT, String.class));
		scanModule.setPopUpNoBtnTxt(formProperties.get(POP_UP_NO_BTN_TXT, String.class));
		scanModule.setCongratsTitle(formProperties.get(CONGRATS_TITLE, String.class));
		scanModule.setCongratsDesc1(formProperties.get(CONGRATS_DESC1, String.class));
		scanModule.setCongratsDesc2(formProperties.get(CONGRATS_DESC2, String.class));
		scanModule.setDisclaimerTxt2(formProperties.get(DISCLAIMER_TXT_2, String.class));
		scanModule.setDisclaimerTxt3(formProperties.get(DISCLAIMER_TXT_3, String.class));
		scanModule.setOfferTabFootnote(formProperties.get(OFFERTAB_FOOTNOTE, String.class));
		
		return scanModule;
	}

	/**
	 * This method will return the component details as Json string
	 * 
	 * @return String
	 */
	public String getMyOffersJson() {
		if (myOfferContainerBean != null) {
			myOffersJson = new GsonBuilder().create().toJson(myOfferContainerBean);
		}
		return myOffersJson;
	}

	/**
	 * This Method will return the OfferContainerBean object
	 * 
	 * @return OfferContainerBean
	 */
	public OfferContainerBean getContainer() {
		return myOfferContainerBean;
	}

}
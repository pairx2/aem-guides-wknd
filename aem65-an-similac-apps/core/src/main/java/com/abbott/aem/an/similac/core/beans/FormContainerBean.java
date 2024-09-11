package com.abbott.aem.an.similac.core.beans;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

public class FormContainerBean {

	private String formTitle;
	private String formName;
	private String formType;
	private String actionPath;
	private String forgotPasswordActionPath;
	private String actionPathOnLoad;
	private String actionPathToUpdateProfile;
	private String actionPathGetProfile;
	private String disclaimer;
	private String successMsgHeading;
	private String successMsgText;
	private String saveLocal;
	private String redirectOnSuccessURL;
	private String redirectOnSuccessURLNeosure;
	private String redirectOnSuccessURLOasis;
	private String redirectOnSuccessURLSubscription;
	private String chekoutLoginErrorMessage;
	private String historyRedirectUrl;
	private String redirectToPreviousPage;
	private String editMyInfo;
	private String changePwd;
	private String requiredLabel;
	private String strongMomID;
	private String emailAddress;
	private String emailNote;
	private String subTitle;
	private String addBaby;
	private String editBaby;
	private String removeBaby;
	private String label;
	private String placeholder;
	private String errorUpdateProfile;
	private String errorUpdateProfileNonDOUser;
	private String initialDataURL;
	private String mainHeadLabel;
	private String subHeadLabel;
	private String contentHead;
	private String changeShippingAddressLabel;
	private String footerNote;
	private String socialRegisterMessage;
	private String enableRecaptcha;
	private String submissionType;
	private String eventCategory;
	private String eventType;
	private String enableCampaign;
	private String editPhoneNumberLabel;
	private String enabledSmsNotificationsTxt;
	private String enablingSmsNotificationsTxt;
	private String getTextAlert;
	private String neverMiss;
	private String notificationSetting;
	private String editPhoneNumberLabelOptOut;
	private String enablingSmsNotificationsTxtGreen;
	private String enablingSmsNotificationsTxtRed;
	private String resendSMSText;
	private String saveChange;
	private String smsNotificaionOptOut;
	private String optBackClick;
	private String optBackClickTxt;
	private String optBackInTxt;

	private Map<String, FormContainerBean> personalInfo;

	@Setter
	@Getter
	private List<FormComponentBean> fields;
	private RemoveModalBox removeModalBox;
	private OptoutModalBox optoutModalBox;

	public RemoveModalBox getRemoveModalBox() {
		return removeModalBox;
	}

	public void setRemoveModalBox(RemoveModalBox removeModalBox) {
		this.removeModalBox = removeModalBox;
	}

	public OptoutModalBox getOptoutModalBox() {
		return optoutModalBox;
	}

	public void setOptoutModalBox(OptoutModalBox optoutModalBox) {
		this.optoutModalBox = optoutModalBox;
	}

	public String getFormTitle() {
		return formTitle;
	}

	public void setFormTitle(String formTitle) {
		this.formTitle = formTitle;
	}

	public String getFormType() {
		return formType;
	}

	public void setFormType(String formType) {
		this.formType = formType;
	}

	public String getFormName() {
		return formName;
	}

	public void setFormName(String formName) {
		this.formName = formName;
	}

	public String getActionPath() {
		return actionPath;
	}

	public void setActionPath(String actionPath) {
		this.actionPath = actionPath;
	}

	public String getForgotPasswordActionPath() {
		return forgotPasswordActionPath;
	}

	public void setForgotPasswordActionPath(String forgotPasswordActionPath) {
		this.forgotPasswordActionPath = forgotPasswordActionPath;
	}

	public String getEmailNote() {
		return emailNote;
	}

	public void setEmailNote(String emailNote) {
		this.emailNote = emailNote;
	}

	public String getEditMyInfo() {
		return editMyInfo;
	}

	public void setEditMyInfo(String editMyInfo) {
		this.editMyInfo = editMyInfo;
	}

	public String getChangePwd() {
		return changePwd;
	}

	public void setChangePwd(String changePwd) {
		this.changePwd = changePwd;
	}

	public String getRequiredLabel() {
		return requiredLabel;
	}

	public void setRequiredLabel(String requiredLabel) {
		this.requiredLabel = requiredLabel;
	}

	public String getStrongMomID() {
		return strongMomID;
	}

	public void setStrongMomID(String strongMomID) {
		this.strongMomID = strongMomID;
	}

	public String getEmailAddress() {
		return emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}

	public String getSubTitle() {
		return subTitle;
	}

	public void setSubTitle(String subTitle) {
		this.subTitle = subTitle;
	}

	public String getAddBaby() {
		return addBaby;
	}

	public void setAddBaby(String addBaby) {
		this.addBaby = addBaby;
	}

	public String getEditBaby() {
		return editBaby;
	}

	public void setEditBaby(String editBaby) {
		this.editBaby = editBaby;
	}

	public String getRemoveBaby() {
		return removeBaby;
	}

	public void setRemoveBaby(String removeBaby) {
		this.removeBaby = removeBaby;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public String getPlaceholder() {
		return placeholder;
	}

	public void setPlaceholder(String placeholder) {
		this.placeholder = placeholder;
	}

	public Map<String, FormContainerBean> getPersonalInfo() {
		return personalInfo;
	}

	public void setPersonalInfo(Map<String, FormContainerBean> profileBeanMap) {
		this.personalInfo = profileBeanMap;
	}

	public String getDisclaimer() {
		return disclaimer;
	}

	public void setDisclaimer(String disclaimer) {
		this.disclaimer = disclaimer;
	}

	public String getSuccessMsgHeading() {
		return successMsgHeading;
	}

	public void setSuccessMsgHeading(String successMsgHeading) {
		this.successMsgHeading = successMsgHeading;
	}

	public String getSuccessMsgText() {
		return successMsgText;
	}

	public void setSuccessMsgText(String successMsgText) {
		this.successMsgText = successMsgText;
	}

	public String getSaveLocal() {
		return saveLocal;
	}

	public void setSaveLocal(String saveLocal) {
		this.saveLocal = saveLocal;
	}

	public String getRedirectOnSuccessURL() {
		return redirectOnSuccessURL;
	}

	public String getRedirectOnSuccessURLSubscription() {
		return redirectOnSuccessURLSubscription;
	}

	public void setRedirectOnSuccessURLSubscription(String redirectOnSuccessURLSubscription) {
		this.redirectOnSuccessURLSubscription = redirectOnSuccessURLSubscription;
	}

	public String getChekoutLoginErrorMessage() {
		return chekoutLoginErrorMessage;
	}

	public void setChekoutLoginErrorMessage(String chekoutLoginErrorMessage) {
		this.chekoutLoginErrorMessage = chekoutLoginErrorMessage;
	}

	public void setRedirectOnSuccessURL(String redirectOnSuccessURL) {
		this.redirectOnSuccessURL = redirectOnSuccessURL;
	}

	public String getRedirectOnSuccessURLNeosure() {
		return redirectOnSuccessURLNeosure;
	}

	public void setRedirectOnSuccessURLNeosure(String redirectOnSuccessURLNeosure) {
		this.redirectOnSuccessURLNeosure = redirectOnSuccessURLNeosure;
	}

	public String getRedirectOnSuccessURLOasis() {
		return redirectOnSuccessURLOasis;
	}

	public void setRedirectOnSuccessURLOasis(String redirectOnSuccessURLOasis) {
		this.redirectOnSuccessURLOasis = redirectOnSuccessURLOasis;
	}

	public String getRedirectToPreviousPage() {
		return redirectToPreviousPage;
	}

	public void setRedirectToPreviousPage(String redirectToPreviousPage) {
		this.redirectToPreviousPage = redirectToPreviousPage;
	}

	public String getActionPathOnLoad() {
		return actionPathOnLoad;
	}

	public void setActionPathOnLoad(String actionPathOnLoad) {
		this.actionPathOnLoad = actionPathOnLoad;
	}

	public String getActionPathToUpdateProfile() {
		return actionPathToUpdateProfile;
	}

	public void setActionPathToUpdateProfile(String actionPathToUpdateProfile) {
		this.actionPathToUpdateProfile = actionPathToUpdateProfile;
	}

	public String getErrorUpdateProfile() {
		return errorUpdateProfile;
	}

	public void setErrorUpdateProfile(String errorUpdateProfile) {
		this.errorUpdateProfile = errorUpdateProfile;
	}

	public String getErrorUpdateProfileNonDOUser() {
		return errorUpdateProfileNonDOUser;
	}

	public void setErrorUpdateProfileNonDOUser(String errorUpdateProfileNonDOUser) {
		this.errorUpdateProfileNonDOUser = errorUpdateProfileNonDOUser;
	}

	public String getInitialDataURL() {
		return initialDataURL;
	}

	public void setInitialDataURL(String initialDataURL) {
		this.initialDataURL = initialDataURL;
	}

	public String getMainHeadLabel() {
		return mainHeadLabel;
	}

	public void setMainHeadLabel(String mainHeadLabel) {
		this.mainHeadLabel = mainHeadLabel;
	}

	public String getSubHeadLabel() {
		return subHeadLabel;
	}

	public void setSubHeadLabel(String subHeadLabel) {
		this.subHeadLabel = subHeadLabel;
	}

	public String getActionPathGetProfile() {
		return actionPathGetProfile;
	}

	public void setActionPathGetProfile(String actionPathGetProfile) {
		this.actionPathGetProfile = actionPathGetProfile;
	}

	public String getContentHead() {
		return contentHead;
	}

	public void setContentHead(String contentHead) {
		this.contentHead = contentHead;
	}

	public String getChangeShippingAddressLabel() {
		return changeShippingAddressLabel;
	}

	public void setChangeShippingAddressLabel(String changeShippingAddressLabel) {
		this.changeShippingAddressLabel = changeShippingAddressLabel;
	}

	public String getFooterNote() {
		return footerNote;
	}

	public void setFooterNote(String footerNote) {
		this.footerNote = footerNote;
	}

	public String getSocialRegisterMessage() {
		return socialRegisterMessage;
	}

	public void setSocialRegisterMessage(String socialRegisterMessage) {
		this.socialRegisterMessage = socialRegisterMessage;
	}

	public String getEnableRecaptcha() {
		return enableRecaptcha;
	}

	public void setEnableRecaptcha(String enableRecaptcha) {
		this.enableRecaptcha = enableRecaptcha;
	}

	public String getEnableCampaign() {
		return enableCampaign;
	}

	public void setEnableCampaign(String enableCampaign) {
		this.enableCampaign = enableCampaign;
	}

	public String getSubmissionType() {
		return submissionType;
	}

	public void setSubmissionType(String submissionType) {
		this.submissionType = submissionType;
	}

	public String getEventCategory() {
		return eventCategory;
	}

	public void setEventCategory(String eventCategory) {
		this.eventCategory = eventCategory;
	}

	public String getEventType() {
		return eventType;
	}

	public void setEventType(String eventType) {
		this.eventType = eventType;
	}

	public String getHistoryRedirectUrl() {
		return historyRedirectUrl;
	}

	public void setHistoryRedirectUrl(String historyRedirectUrl) {
		this.historyRedirectUrl = historyRedirectUrl;
	}

	public String getEditPhoneNumberLabel() {
		return editPhoneNumberLabel;
	}

	public void setEditPhoneNumberLabel(String editPhoneNumberLabel) {
		this.editPhoneNumberLabel = editPhoneNumberLabel;
	}

	public String getEnabledSmsNotificationsTxt() {
		return enabledSmsNotificationsTxt;
	}

	public void setEnabledSmsNotificationsTxt(String enabledSmsNotificationsTxt) {
		this.enabledSmsNotificationsTxt = enabledSmsNotificationsTxt;
	}

	public String getEnablingSmsNotificationsTxt() {
		return enablingSmsNotificationsTxt;
	}

	public void setEnablingSmsNotificationsTxt(String enablingSmsNotificationsTxt) {
		this.enablingSmsNotificationsTxt = enablingSmsNotificationsTxt;
	}

	public String getGetTextAlert() {
		return getTextAlert;
	}

	public void setGetTextAlert(String getTextAlert) {
		this.getTextAlert = getTextAlert;
	}

	public String getNeverMiss() {
		return neverMiss;
	}

	public void setNeverMiss(String neverMiss) {
		this.neverMiss = neverMiss;
	}

	public String getNotificationSetting() {
		return notificationSetting;
	}

	public void setNotificationSetting(String notificationSetting) {
		this.notificationSetting = notificationSetting;
	}

	public String getEditPhoneNumberLabelOptOut() {
		return editPhoneNumberLabelOptOut;
	}

	public void setEditPhoneNumberLabelOptOut(String editPhoneNumberLabelOptOut) {
		this.editPhoneNumberLabelOptOut = editPhoneNumberLabelOptOut;
	}

	public String getEnablingSmsNotificationsTxtGreen() {
		return enablingSmsNotificationsTxtGreen;
	}

	public void setEnablingSmsNotificationsTxtGreen(String enablingSmsNotificationsTxtGreen) {
		this.enablingSmsNotificationsTxtGreen = enablingSmsNotificationsTxtGreen;
	}

	public String getEnablingSmsNotificationsTxtRed() {
		return enablingSmsNotificationsTxtRed;
	}

	public void setEnablingSmsNotificationsTxtRed(String enablingSmsNotificationsTxtRed) {
		this.enablingSmsNotificationsTxtRed = enablingSmsNotificationsTxtRed;
	}

	public String getResendSMSText() {
		return resendSMSText;
	}

	public void setResendSMSText(String resendSMSText) {
		this.resendSMSText = resendSMSText;
	}

	public String getSaveChange() {
		return saveChange;
	}

	public void setSaveChange(String saveChange) {
		this.saveChange = saveChange;
	}

	public String getSmsNotificaionOptOut() {
		return smsNotificaionOptOut;
	}

	public void setSmsNotificaionOptOut(String smsNotificaionOptOut) {
		this.smsNotificaionOptOut = smsNotificaionOptOut;
	}

	public String getOptBackClick() {
		return optBackClick;
	}

	public void setOptBackClick(String optBackClick) {
		this.optBackClick = optBackClick;
	}

	public String getOptBackClickTxt() {
		return optBackClickTxt;
	}

	public void setOptBackClickTxt(String optBackClickTxt) {
		this.optBackClickTxt = optBackClickTxt;
	}
	
	public String getOptBackInTxt() {
		return optBackInTxt;
	}

	public void setOptBackInTxt(String optBackInTxt) {
		this.optBackInTxt = optBackInTxt;
	}

	public class RemoveModalBox {
		private String title;
		private String description;
		private String submitButton;
		private String cancelButton;

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

		public String getSubmitButton() {
			return submitButton;
		}

		public void setSubmitButton(String submitButton) {
			this.submitButton = submitButton;
		}

		public String getCancelButton() {
			return cancelButton;
		}

		public void setCancelButton(String cancelButton) {
			this.cancelButton = cancelButton;
		}
	}

	public class OptoutModalBox {
		private String modalTitle;
		private String modalDescription1;
		private String modalDescription2;
		private String modalConfirmButton;
		private String modalCancelButton;

		public String getModalTitle() {
			return modalTitle;
		}

		public void setModalTitle(String modalTitle) {
			this.modalTitle = modalTitle;
		}

		public String getModalDescription1() {
			return modalDescription1;
		}

		public void setModalDescription1(String modalDescription1) {
			this.modalDescription1 = modalDescription1;
		}

		public String getModalDescription2() {
			return modalDescription2;
		}

		public void setModalDescription2(String modalDescription2) {
			this.modalDescription2 = modalDescription2;
		}

		public String getModalConfirmButton() {
			return modalConfirmButton;
		}

		public void setModalConfirmButton(String modalConfirmButton) {
			this.modalConfirmButton = modalConfirmButton;
		}

		public String getModalCancelButton() {
			return modalCancelButton;
		}

		public void setModalCancelButton(String modalCancelButton) {
			this.modalCancelButton = modalCancelButton;
		}

	}

}

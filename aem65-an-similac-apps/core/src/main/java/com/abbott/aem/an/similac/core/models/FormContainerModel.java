package com.abbott.aem.an.similac.core.models;

import static com.abbott.aem.an.similac.core.utils.CommonConstants.ERROR_UPDATE_PROFILE;
import static com.abbott.aem.an.similac.core.utils.CommonConstants.ERROR_UPDATE_PROFILE_NON_DO;
import static com.abbott.aem.an.similac.core.utils.CommonConstants.FALSE;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;


import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.ExporterOption;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.an.similac.core.beans.FormComponentBean;
import com.abbott.aem.an.similac.core.beans.FormContainerBean;
import com.abbott.aem.an.similac.core.beans.SocialLoginBean;
import com.abbott.aem.an.similac.core.utils.SimilacUtils;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.google.gson.GsonBuilder;

/**
 * FormContainerModel is the SlingModel to hold the details of form container
 * and form components
 * 
 * @author Cognizant
 *
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class },resourceType = { "an/similac/components/form/container" } ,defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = "jackson", extensions = "json", options = { @ExporterOption(name = "SerializationFeature.WRITE_DATES_AS_TIMESTAMPS", value = "true") })
public class FormContainerModel {

	private static final Logger LOGGER = LoggerFactory.getLogger(FormContainerModel.class);

	private static final String FORM_TITLE = "formTitle";

	private static final String FORM_NAME = "formName";

	private static final String ACTION_PATH = "actionPath";

	private static final String DISCLAIME = "disclaimer";

	private static final String SUCCESS_MSG_HEADING = "successMsgHeading";

	private static final String SUCCESS_MSG_TEXT = "successMsgText";

	private static final String SAVE_LOCAL = "saveLocal";

	private static final String REDIRECTION_ON_SUCCESS_URL = "redirectOnSuccessURL";

	private static final String REDIRECTION_ON_SUCCESS_URL_NEOSURE = "redirectOnSuccessURLNeosure";

	private static final String REDIRECTION_ON_SUCCESS_URL_OASIS = "redirectOnSuccessURLOasis";

	private static final String REDIRECTION_ON_SUCCESS_URL_SUBSCRIPTION = "redirectOnSuccessURLSubscription";
	
	private static final String CHEKOUT_LOGIN_ERROR_MESSAGE = "chekoutLoginErrorMessage";

	private static final String REGISTRATION_URL = "registrationURL";

	private static final String ACCOUNT_LINKING_URL = "accountLinkingURL";

	private static final String SOCIAL_LOGIN_SUCCESS_URL = "socialLoginSuccessURL";
	
	private static final String MY_OFFERS_URL = "myOffersURL";
	
	private static final String INITIAL_DATAURL = "initialDataURL";
	
	private static final String MAIN_HEAD_LABEL = "mainHeadLabel";
	
	private static final String SUB_HEAD_LABEL = "subHeadLabel";
	
	private static final String CONTENT_HEAD = "contentHead";
	
	private static final String CHANGE_SHIPPINGADDRESS = "changeShippingAddress";
	
	private static final String FOOTER_NOTE = "footerNote";
	
	private static final String ACTION_PATH_GET_PROFILE = "actionPathGetProfile";
	
	private static final String EVENT_CATEGORY = "eventCategory";
	
	private static final String EVENT_TYPE = "eventType";
	
	private static final String SUBMISSION_TYPE = "submissionType";
	
	private static final String SOCIAL_REG_MESSAGE = "socialRegisterMessage";
	
	private static final String FORM_TYPE = "formType";

	private static final String FORGOT_PSWRD_ACTION_PATH = "forgotPasswordActionPath";
	
	private static final String HISTORY_REDIRECT_URL = "historyRedirectUrl";
	
	private static final String ENABLE_RECAPTCHA = "enableRecaptcha";
	
	private static final String REDIRECT_TO_PREVIOUS_PAGE = "redirectToPreviousPage";
	
	private static final String ACTION_PATH_ON_LOAD = "actionPathOnLoad";
	
	private static final String ACTION_PATH_TO_UPDATE_PROFILE = "actionPathToUpdateProfile";

	private static final String SITE_KEY = "reCaptchaSiteKey";
	
	private static final String CAPTCHA_NAME = "captchaValue";
	
	private static final String TYPE_HIDDEN = "hidden";
	
	private static final String TYPE_CAPTCHA = "captcha";
	
	private static final String CAPTCHA_SIZE = "invisible";
	
	private static final String EMPTY_STRING = "";
	
	private static final String CAMPAIGN = "campaign";

	@SlingObject
	private Resource resource;
		
	@ScriptVariable
	private Page currentPage;
		
	@ScriptVariable
	private ValueMap pageProperties;
		
	private FormContainerBean container;

	private SocialLoginBean socialLoginBean;

	private List<FormComponentBean> componentList = new ArrayList<>();

	private String formJson;

	private String socialLoginJson;

	@PostConstruct
	public void activate() {
		if (resource != null) {
			generateComponenetProperties();
			generateFormProperties();
		}
	}

	/**
	 * Populate form components properties
	 * 
	 * @throws Exception
	 */
	private void generateComponenetProperties() {
		for (Resource childResource : resource.getChildren()) {
			FormComponentModel componentModel = childResource.adaptTo(FormComponentModel.class);
			if (componentModel != null) {
				FormComponentBean formComponent = componentModel.getFormComponent();
				componentList.add(formComponent);
			}
		}
	}
  
	/**
	 * Populate Form containers properties
	 * 
	 * @throws Exception
	 */
	private void generateFormProperties() {
		try {
			ValueMap formProperties = resource.adaptTo(ValueMap.class);
			container = new FormContainerBean();
			container.setFields(componentList);
			if (formProperties == null) {
				return;
			}
			container.setFormTitle(formProperties.get(FORM_TITLE, String.class));
			container.setFormType(formProperties.get(FORM_TYPE, String.class));
			container.setFormName(formProperties.get(FORM_NAME, String.class));
			container.setActionPath(formProperties.get(ACTION_PATH, String.class));
			container.setForgotPasswordActionPath(formProperties.get(FORGOT_PSWRD_ACTION_PATH, String.class));
			container.setDisclaimer(formProperties.get(DISCLAIME, String.class));
			container.setSuccessMsgHeading(formProperties.get(SUCCESS_MSG_HEADING, String.class));
			container.setSuccessMsgText(formProperties.get(SUCCESS_MSG_TEXT, String.class));
			container.setSaveLocal(formProperties.get(SAVE_LOCAL, String.class));
			container.setRedirectOnSuccessURL(SimilacUtils.linkChecker(formProperties.get(REDIRECTION_ON_SUCCESS_URL, String.class)));
			container.setRedirectOnSuccessURLNeosure(SimilacUtils.linkChecker(formProperties.get(REDIRECTION_ON_SUCCESS_URL_NEOSURE, String.class)));
			container.setRedirectOnSuccessURLOasis(SimilacUtils.linkChecker(formProperties.get(REDIRECTION_ON_SUCCESS_URL_OASIS, String.class)));
			container.setRedirectOnSuccessURLSubscription(SimilacUtils.linkChecker(formProperties.get(REDIRECTION_ON_SUCCESS_URL_SUBSCRIPTION, String.class)));
			container.setChekoutLoginErrorMessage(SimilacUtils.linkChecker(formProperties.get(CHEKOUT_LOGIN_ERROR_MESSAGE, String.class)));
			container.setHistoryRedirectUrl(SimilacUtils.linkChecker(formProperties.get(HISTORY_REDIRECT_URL, String.class)));
			container.setEnableRecaptcha(formProperties.get(ENABLE_RECAPTCHA, FALSE));
			container.setRedirectToPreviousPage(formProperties.get(REDIRECT_TO_PREVIOUS_PAGE, FALSE));
			container.setActionPathOnLoad(formProperties.get(ACTION_PATH_ON_LOAD, String.class));
			container.setActionPathToUpdateProfile(formProperties.get(ACTION_PATH_TO_UPDATE_PROFILE, String.class));
			container.setErrorUpdateProfile(formProperties.get(ERROR_UPDATE_PROFILE, String.class));
			container.setErrorUpdateProfileNonDOUser(formProperties.get(ERROR_UPDATE_PROFILE_NON_DO, String.class));
			container.setActionPathGetProfile(formProperties.get(ACTION_PATH_GET_PROFILE, String.class));
			container.setSocialRegisterMessage(formProperties.get(SOCIAL_REG_MESSAGE, String.class));
			container.setEventCategory(formProperties.get(EVENT_CATEGORY, String.class));
			container.setEventType(formProperties.get(EVENT_TYPE, String.class));
			container.setSubmissionType(formProperties.get(SUBMISSION_TYPE, String.class));
			populateManageAddress(formProperties);
			populateSocialLogin(formProperties);
			if(container.getEnableRecaptcha()!=null && container.getEnableRecaptcha().equalsIgnoreCase("true")) {			
				generateCaptchaProperties();
			}
			if(container.getEnableCampaign()!=null && container.getEnableCampaign().equalsIgnoreCase("true")) {			
				addCampaignParameters();
			}
			
		} catch (RuntimeException e) {
			LOGGER.error("Exception in generateFormProperties ::",e);
		}
	}
    /**
	 * This method returns the campaign properties required in json
	 */
	private void addCampaignParameters() {
		
		FormComponentBean formComponent = new FormComponentBean();
		formComponent.setName(CAMPAIGN);
		formComponent.setType(TYPE_HIDDEN);
		
		componentList.add(formComponent);		
	}

	/**
	 * This method returns the invisible captcha properties required in json
	 */
	private void generateCaptchaProperties() {
		
		if (currentPage == null) {
			PageManager pageManager = resource.getResourceResolver().adaptTo(PageManager.class);
			currentPage = pageManager.getContainingPage(resource);
		}
		
		InheritanceValueMap iProperties = new HierarchyNodeInheritanceValueMap(currentPage.getContentResource());
		String siteKey = iProperties.getInherited(SITE_KEY, String.class);
		setTypeForCaptcha(TYPE_HIDDEN, EMPTY_STRING, EMPTY_STRING, CAPTCHA_NAME);
		setTypeForCaptcha(TYPE_CAPTCHA, CAPTCHA_SIZE, siteKey, CAPTCHA_NAME);
	}

	private void setTypeForCaptcha(String type, String invisible, String siteKey, String captchaValue) {
		
		FormComponentBean formComponent = new FormComponentBean();
		formComponent.setSitekey(siteKey);
		formComponent.setName(captchaValue);
		formComponent.setType(type);
		formComponent.setSize(invisible);

		componentList.add(formComponent);
		
	}

	/**
	 * This method will return the Form Component details as Json string
	 * 
	 * @return String
	 */
	public String getFormJson() {
		if (container != null) {
			formJson = new GsonBuilder().create().toJson(container);
		}
		
		return formJson;
	}

	public FormContainerBean getContainer() {
		return container;
	}

	/**
	 * This method populates the manage address labels
	 * 
	 * @param formProperties
	 */
	private void populateManageAddress(ValueMap formProperties) {
		container.setInitialDataURL(formProperties.get(INITIAL_DATAURL, String.class));
		container.setMainHeadLabel(formProperties.get(MAIN_HEAD_LABEL, String.class));
		container.setSubHeadLabel(formProperties.get(SUB_HEAD_LABEL, String.class));
		container.setChangeShippingAddressLabel(formProperties.get(CHANGE_SHIPPINGADDRESS, String.class));
		container.setContentHead(formProperties.get(CONTENT_HEAD, String.class));
		container.setFooterNote(formProperties.get(FOOTER_NOTE, String.class));
	}
	
	public SocialLoginBean getSocialLoginBean() {
		return socialLoginBean;
	}

	/**
	 * Populate the Social login
	 * 
	 * @param formProperties
	 * 
	 * @throws Exception
	 */
	public void populateSocialLogin(ValueMap formProperties) {
		socialLoginBean = new SocialLoginBean();
		if (formProperties != null) {
			socialLoginBean.setRegistrationURL(SimilacUtils.linkChecker(formProperties.get(REGISTRATION_URL, String.class)));
			socialLoginBean.setAccountLinkingURL(SimilacUtils.linkChecker(formProperties.get(ACCOUNT_LINKING_URL, String.class)));
			socialLoginBean.setSocialLoginSuccessURL(SimilacUtils.linkChecker(formProperties.get(SOCIAL_LOGIN_SUCCESS_URL, String.class)));
			socialLoginBean.setMyOffersURL(SimilacUtils.linkChecker(formProperties.get(MY_OFFERS_URL, String.class)));
		}
	}
     
	/**
	 * This method will return the Account linking details as JSON string
	 * 
	 * @return String
	 */
	public String getSocialLoginJson() {

		if (socialLoginBean != null) {
			socialLoginJson = new GsonBuilder().create().toJson(socialLoginBean);
		}
		return socialLoginJson;
	}

}
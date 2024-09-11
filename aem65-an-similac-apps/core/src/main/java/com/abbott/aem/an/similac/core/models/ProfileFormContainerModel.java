package com.abbott.aem.an.similac.core.models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.an.similac.core.beans.FormComponentBean;
import com.abbott.aem.an.similac.core.beans.FormContainerBean;
import com.abbott.aem.an.similac.core.beans.FormContainerBean.OptoutModalBox;
import com.abbott.aem.an.similac.core.beans.FormContainerBean.RemoveModalBox;
import com.google.gson.GsonBuilder;

/**
 * ProfileFormContainerModel is the SlingModel to hold the details of profile form container
 * and form components
 * 
 * @author Cognizant + IBM
 *
 */
@Model(adaptables = {
    Resource.class,
    SlingHttpServletRequest.class
}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ProfileFormContainerModel {

    private static final Logger LOGGER = LoggerFactory.getLogger(ProfileFormContainerModel.class);

    private static final String FORM_TITLE = "formTitle";

    private static final String FORM_NAME = "formName";

    private static final String ACTION_PATH = "actionPath";

    private static final String EDIT_MY_INFO = "editMyInfo";

    @SuppressWarnings("squid:S2068")
    private static final String CHANGE_PWD = "changePwd";
    
    private static final String REQUIRED_LABEL = "requiredLabel";
    
    private static final String STRONG_MOM_ID = "strongMomID";
    
    private static final String EMAIL_ADDRESS = "emailAddress";
    
    private static final String EMAIL_NOTE = "emailHelperText";
    
    private static final String LABEL = "label";

    private static final String PLACEHOLDER = "placeholder";
    
    private static final String SUB_TITLE = "subTitle";

    private static final String ADD_BABY = "addBaby";
   
    private static final String REMOVE_BABY = "removeBaby";

    private static final String EDIT_BABY = "editBaby";
    
    private static final String TITLE = "title";

    private static final String DESCRIPTION = "description";

    private static final String SUBMIT_BUTTON = "submitButton";

    private static final String CANCEL_BUTTON = "cancelButton";

    private static final String GET_TEXT_ALERT = "getTextAlert";
    
    private static final String NEVER_MISS = "neverMiss";
    
    private static final String NOTIFICATION_SETTING = "notificationSetting";
    
    private static final String EDIT_PHONE_NUMBER_LABEL_OPT_OUT = "editPhoneNumberLabelOptOut";
    
    private static final String EDIT_PHONE_LABEL = "editPhoneNumberLabel";
      
    private static final String ENABLED_NOTIFICATIONS_TXT = "enabledSmsNotificationsTxt";
    
    private static final String ENABLING_NOTIFICATIONS_TXT_GREEN = "enablingSmsNotificationsTxtGreen";
    
    private static final String ENABLING_NOTIFICATIONS_TXT_RED = "enablingSmsNotificationsTxtRed";
    
    private static final String ENABLING_NOTIFICATIONS_TXT = "enablingSmsNotificationsTxt";
    
    private static final String RESEND_SMS_TEXT = "resendSMSText";

    private static final String SAVE_CHANGE = "saveChange";
    
    private static final String SMS_NOTIFICAION_OPT_OUT = "smsNotificaionOptOut";
    
    private static final String OPT_BACK_CLICK = "optBackClick";
    
    private static final String OPT_BACK_CLICK_TXT = "optBackClickTxt";
    
    private static final String OPT_BACK_IN_TXT = "optBackInTxt";

    private static final String OPT_OUT_MODAL_TITLE = "modalTitle";
    
    private static final String OPT_OUT_MODAL_DESCRIPTION1 = "modalDescription1";
    
    private static final String OPT_OUT_MODAL_DESCRIPTION2 = "modalDescription2";
    
    private static final String OPT_OUT_MODAL_CONFIRM_BUTTON = "modalConfirmButton";
    
    private static final String OPT_OUT_MODAL_CANCEL_BUTTON = "modalCancelButton";
    
    @SlingObject
    private Resource resource;
    
    private FormContainerBean container;

    private FormContainerBean profContainer;

    private Map <String, FormContainerBean > profileMap = new HashMap <> ();
    
    private String profileFormJson;

    @PostConstruct
    public void activate() {
        if (resource != null) {
            generateComponentProperties();
            generateFormProperties();
        }
    }

    /**
     * Populate form components properties for the child resources
     * 
     * @throws Exception
     */
    private void generateComponentProperties() {
        Iterator < Resource > children = resource.listChildren();
        while (children.hasNext()) {
        	Resource childResource = children.next();
        	List < FormComponentBean > componentList = new ArrayList < > ();
            for (Resource child: childResource.getChildren()) {
            	FormComponentModel componentModel = child.adaptTo(FormComponentModel.class);
                
                 if (componentModel != null) {
                	FormComponentBean componentBean = componentModel.getFormComponent();
                    componentList.add(componentBean);
                 }
                generateProfileContainer(childResource, componentList);
            }
         }
    }
    
    /**
     * Populate all container form components properties 
     * 
     * @throws Exception
     */
    private FormContainerBean generateProfileContainer(Resource res, List < FormComponentBean > list) {
        try {
            ValueMap formProperties = res.adaptTo(ValueMap.class);
            profContainer = new FormContainerBean();
            RemoveModalBox removeModalBox = profContainer.new RemoveModalBox();
            removeModalBox.setTitle(formProperties.get(TITLE, String.class));
            removeModalBox.setDescription(formProperties.get(DESCRIPTION, String.class));
            removeModalBox.setSubmitButton(formProperties.get(SUBMIT_BUTTON, String.class));
            removeModalBox.setCancelButton(formProperties.get(CANCEL_BUTTON, String.class));
            if(formProperties.get(TITLE) != null || formProperties.get(DESCRIPTION) != null) {
            profContainer.setRemoveModalBox(removeModalBox); }
            profContainer.setFields(list);

            profContainer.setFormTitle(formProperties.get(FORM_TITLE, String.class));
            profContainer.setFormName(formProperties.get(FORM_NAME, String.class));
            profContainer.setActionPath(formProperties.get(ACTION_PATH, String.class));
            profContainer.setEditMyInfo(formProperties.get(EDIT_MY_INFO, String.class));
            profContainer.setStrongMomID(formProperties.get(STRONG_MOM_ID, String.class));
            profContainer.setEmailAddress(formProperties.get(EMAIL_ADDRESS, String.class));
            profContainer.setEmailNote(formProperties.get(EMAIL_NOTE, String.class));
            profContainer.setChangePwd(formProperties.get(CHANGE_PWD, String.class));
            profContainer.setRequiredLabel(formProperties.get(REQUIRED_LABEL, String.class));
            profContainer.setLabel(formProperties.get(LABEL, String.class));
            profContainer.setSubTitle(formProperties.get(SUB_TITLE, String.class));

            profContainer.setPlaceholder(formProperties.get(PLACEHOLDER, String.class));
            profContainer.setAddBaby(formProperties.get(ADD_BABY, String.class));
            profContainer.setRemoveBaby(formProperties.get(REMOVE_BABY, String.class));
            profContainer.setEditBaby(formProperties.get(EDIT_BABY, String.class));
            
            profContainer.setEditPhoneNumberLabel(formProperties.get(EDIT_PHONE_LABEL, String.class));
            profContainer.setGetTextAlert(formProperties.get(GET_TEXT_ALERT, String.class));
            profContainer.setNeverMiss(formProperties.get(NEVER_MISS, String.class));
            profContainer.setNotificationSetting(formProperties.get(NOTIFICATION_SETTING, String.class));
            profContainer.setEditPhoneNumberLabelOptOut(formProperties.get(EDIT_PHONE_NUMBER_LABEL_OPT_OUT, String.class));
            profContainer.setEditPhoneNumberLabel(formProperties.get(EDIT_PHONE_LABEL, String.class));
            profContainer.setEnabledSmsNotificationsTxt(formProperties.get(ENABLED_NOTIFICATIONS_TXT, String.class));
            profContainer.setEnablingSmsNotificationsTxtGreen(formProperties.get(ENABLING_NOTIFICATIONS_TXT_GREEN, String.class));
            profContainer.setEnablingSmsNotificationsTxtRed(formProperties.get(ENABLING_NOTIFICATIONS_TXT_RED, String.class));
            profContainer.setEnablingSmsNotificationsTxt(formProperties.get(ENABLING_NOTIFICATIONS_TXT, String.class));
            profContainer.setResendSMSText(formProperties.get(RESEND_SMS_TEXT, String.class));
            profContainer.setSaveChange(formProperties.get(SAVE_CHANGE, String.class));
            profContainer.setSmsNotificaionOptOut(formProperties.get(SMS_NOTIFICAION_OPT_OUT, String.class));
            profContainer.setOptBackClick(formProperties.get(OPT_BACK_CLICK, String.class));
            profContainer.setOptBackClickTxt(formProperties.get(OPT_BACK_CLICK_TXT, String.class));
            profContainer.setOptBackInTxt(formProperties.get(OPT_BACK_IN_TXT, String.class));
            
            OptoutModalBox optoutModalBox = profContainer.new OptoutModalBox();
            optoutModalBox.setModalTitle(formProperties.get(OPT_OUT_MODAL_TITLE, String.class));
            optoutModalBox.setModalDescription1(formProperties.get(OPT_OUT_MODAL_DESCRIPTION1, String.class));
            optoutModalBox.setModalDescription2(formProperties.get(OPT_OUT_MODAL_DESCRIPTION2, String.class));
            optoutModalBox.setModalConfirmButton(formProperties.get(OPT_OUT_MODAL_CONFIRM_BUTTON, String.class));
            optoutModalBox.setModalCancelButton(formProperties.get(OPT_OUT_MODAL_CANCEL_BUTTON, String.class));
            
            profContainer.setOptoutModalBox(optoutModalBox);
            
            profileMap.put((formProperties.get(FORM_NAME, String.class)), profContainer);
            
            
        } catch (RuntimeException e) {
        	LOGGER.warn("Exception in generateProfileContainer :: ",e);
        }
        return profContainer;
      }
    
    /**
     * Populate parent container form component properties 
     * 
     * @throws Exception
     */
    private void generateFormProperties() {
        try {
            ValueMap formProperties = resource.adaptTo(ValueMap.class);
            container = new FormContainerBean();
            if (formProperties == null) {
                return;
            }
            container.setFormTitle(formProperties.get(FORM_TITLE, String.class));
            container.setFormName(formProperties.get(FORM_NAME, String.class));
            container.setActionPath(formProperties.get(ACTION_PATH, String.class));
            container.setPersonalInfo(profileMap);

        } catch (RuntimeException e) {
            LOGGER.warn("Exception in generateFormProperties :: ",e);
        }
    }

    /**
     * This method will return the profile Form Component details as Json string
     * 
     * @return String
     */
    public String getProfileFormJson() {
        if (container != null) {
            profileFormJson = new GsonBuilder().create().toJson(container);
            
        }
        return profileFormJson;
    }

    public FormContainerBean getContainer() {
        return container;
    }

}
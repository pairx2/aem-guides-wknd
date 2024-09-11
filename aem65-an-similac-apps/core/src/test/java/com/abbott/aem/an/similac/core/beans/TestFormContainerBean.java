package com.abbott.aem.an.similac.core.beans;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.an.similac.core.beans.FormContainerBean.RemoveModalBox;

@ExtendWith(MockitoExtension.class)
class TestFormContainerBean {

	FormContainerBean formContainerBean;
	
	@Test
	void testPOJO() {
		formContainerBean = new FormContainerBean();
		
		RemoveModalBox removeModalBox = formContainerBean.new RemoveModalBox();
		removeModalBox.setTitle("title");
		removeModalBox.setDescription("desc");
		removeModalBox.setSubmitButton("submit button");
		removeModalBox.setCancelButton("cancel button");
		formContainerBean.setRemoveModalBox(removeModalBox);	
		formContainerBean.setFormType("form type");
		formContainerBean.setEmailNote("email note");
		formContainerBean.setEditMyInfo("edit my info");
		formContainerBean.setChangePwd("change pwd");
		formContainerBean.setStrongMomID("strong mom Id");
		formContainerBean.setEmailAddress("email id");
		formContainerBean.setSubTitle("sub title");
		formContainerBean.setAddBaby("add baby");
		formContainerBean.setEditBaby("edit baby");
		formContainerBean.setRemoveBaby("remove baby");
		formContainerBean.setLabel("label");
		formContainerBean.setPlaceholder("placeholder");
		formContainerBean.setChangeShippingAddressLabel("change shipping address");
		formContainerBean.setEnableCampaign("enable campaign");
		formContainerBean.setEditPhoneNumberLabel("edit phone number");
		formContainerBean.setEnabledSmsNotificationsTxt("enabled sms notification text");
		formContainerBean.setEnablingSmsNotificationsTxt("enabling sms notification text");
		formContainerBean.setEditPhoneNumberLabel("edit phone number");
		
		assertEquals("title", formContainerBean.getRemoveModalBox().getTitle());
		assertEquals("desc", formContainerBean.getRemoveModalBox().getDescription());
		assertEquals("submit button", formContainerBean.getRemoveModalBox().getSubmitButton());
		assertEquals("cancel button", formContainerBean.getRemoveModalBox().getCancelButton());		
		assertNotNull(formContainerBean.getRemoveModalBox());
		assertEquals("form type", formContainerBean.getFormType());
		assertEquals("email note", formContainerBean.getEmailNote());
		assertEquals("edit my info", formContainerBean.getEditMyInfo());
		assertEquals("change pwd", formContainerBean.getChangePwd());
		assertEquals("strong mom Id", formContainerBean.getStrongMomID());
		assertEquals("email id", formContainerBean.getEmailAddress());
		assertEquals("sub title", formContainerBean.getSubTitle());
		assertEquals("add baby", formContainerBean.getAddBaby());
		assertEquals("edit baby", formContainerBean.getEditBaby());
		assertEquals("remove baby", formContainerBean.getRemoveBaby());
		assertEquals("label", formContainerBean.getLabel());
		assertEquals("placeholder", formContainerBean.getPlaceholder());
		assertEquals("change shipping address", formContainerBean.getChangeShippingAddressLabel());
		assertEquals("enable campaign", formContainerBean.getEnableCampaign());
		assertEquals("edit phone number", formContainerBean.getEditPhoneNumberLabel());		
		assertEquals("enabled sms notification text", formContainerBean.getEnabledSmsNotificationsTxt());
		assertEquals("enabling sms notification text", formContainerBean.getEnablingSmsNotificationsTxt());
		assertEquals("edit phone number", formContainerBean.getEditPhoneNumberLabel());		
	}
}

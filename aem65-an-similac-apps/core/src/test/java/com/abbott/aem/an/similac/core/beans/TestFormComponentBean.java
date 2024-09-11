package com.abbott.aem.an.similac.core.beans;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.an.similac.core.beans.FormComponentBean.HelpInformation;
import com.abbott.aem.an.similac.core.beans.FormComponentBean.RenderOnDetails;

@ExtendWith(MockitoExtension.class)
class TestFormComponentBean {
	
	FormComponentBean formComponentBean;
	
	@Test
	void testPOJO() {
		formComponentBean = new FormComponentBean();		
		formComponentBean.setOnFocusLabel("onFocus");
		formComponentBean.setDataGtmLabel("data GTM");
		formComponentBean.setSize("size");
		formComponentBean.setTheme("theme");
		formComponentBean.setRender("render");
		formComponentBean.setSitekey("site key");
		formComponentBean.setAutocomplete("auto complete");
		formComponentBean.setImagePath("image path");
		formComponentBean.setMappedField("mapped field");
		formComponentBean.setRefrenceName("ref name");
		formComponentBean.setValidateONValue("validate ON");
		formComponentBean.setFieldType("field type");
		formComponentBean.setRow("row");
		formComponentBean.setDisabled("disabled");
		
		RenderOnDetails renderOnDetails = formComponentBean.new RenderOnDetails();
		renderOnDetails.setEcomOnly("ecom only");
		renderOnDetails.setFieldName("field name");
		renderOnDetails.setValue("value");
		renderOnDetails.setFieldMapped("field mapped");
		renderOnDetails.setMagento("magento");
		renderOnDetails.setOtp("otp");
		formComponentBean.setRenderOn(renderOnDetails);		
		formComponentBean.setFieldLoader("field loader");
		formComponentBean.setHtml("html");
		formComponentBean.setErrorUpdateProfile("error update profile");
		formComponentBean.setErrorUpdateProfileNonDOUser("error update profile non DO user");
		
		HelpInformation helpInformation = formComponentBean.new HelpInformation();
		helpInformation.setRenderOn(formComponentBean.new RenderOnDetails());
		formComponentBean.setHelp(helpInformation);
				
		assertEquals("onFocus",formComponentBean.getOnFocusLabel());
		assertEquals("data GTM",formComponentBean.getDataGtmLabel());
		assertEquals("size",formComponentBean.getSize());
		assertEquals("theme",formComponentBean.getTheme());
		assertEquals("render",formComponentBean.getRender());
		assertEquals("site key",formComponentBean.getSitekey());
		assertEquals("auto complete",formComponentBean.getAutocomplete());
		assertEquals("image path",formComponentBean.getImagePath());
		assertEquals("mapped field",formComponentBean.getMappedField());
		assertEquals("ref name",formComponentBean.getRefrenceName());
		assertEquals("validate ON",formComponentBean.getValidateONValue());
		assertEquals("field type",formComponentBean.getFieldType());
		assertEquals("row",formComponentBean.getRow());
		assertEquals("disabled",formComponentBean.getDisabled());	
		assertNotNull(formComponentBean.getRenderOn());
		assertEquals("ecom only", formComponentBean.getRenderOn().getEcomOnly());
		assertEquals("field name", formComponentBean.getRenderOn().getFieldName());
		assertEquals("value", formComponentBean.getRenderOn().getValue());
		assertEquals("field mapped", formComponentBean.getRenderOn().getFieldMapped());
		assertEquals("magento", formComponentBean.getRenderOn().getMagento());
		assertEquals("otp", formComponentBean.getRenderOn().getOtp());	
		assertEquals("field loader",formComponentBean.getFieldLoader());
		assertEquals("html",formComponentBean.getHtml());
		assertEquals("error update profile",formComponentBean.getErrorUpdateProfile());
		assertEquals("error update profile non DO user",formComponentBean.getErrorUpdateProfileNonDOUser());		
		assertNotNull(formComponentBean.getHelp().getRenderOn());
	}
}

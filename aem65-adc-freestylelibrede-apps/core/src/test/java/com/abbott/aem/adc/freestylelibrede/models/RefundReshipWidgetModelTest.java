package com.abbott.aem.adc.freestylelibrede.models;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class})
public class RefundReshipWidgetModelTest  extends BaseModelTest<RefundReshipWidgetModel> {
    
	@InjectMocks
	private RefundReshipWidgetModel model;

    @BeforeEach
	void setup() {
		model = loadModel(RefundReshipWidgetModel.class);
	}

    @Test
	public void getTitle() {
		Assert.assertEquals("Title", model.getTitle());
	}

	@Test
	public void getHeading() {
		Assert.assertEquals("Heading for Radio Button", model.getHeading());
	}

	@Test
	public void getCtaText() {
		Assert.assertEquals("CTA Text", model.getCtaText());
	}

	@Test
	public void getCtaType() {
		Assert.assertEquals("primary", model.getCtaType());
	}

	@Test
	public void getSuccessTitle(){
		Assert.assertEquals("Success Title", model.getSuccessTitle());
	}

	@Test
	public void getSuccessMessage(){
		Assert.assertEquals("Success Message", model.getSuccessMessage());
	}
	
	@Test
	public void getMilliSeconds(){
		Assert.assertEquals("900", model.getMilliSeconds());
	}

	@Test
	public void getRadioButtonsLabel(){
		Assert.assertEquals("label1", model.getRadioButtons().get(0).getLabel());
	}

	@Test
	public void getRadioButtonsKey(){
		Assert.assertEquals("key1", model.getRadioButtons().get(0).getKey());
	}
	
	@Test
	public void getRadioButtonsLabelOne(){
		Assert.assertEquals("label2", model.getRadioButtons().get(1).getLabel());
	}

	@Test
	public void getRadioButtonsKeyOne(){
		Assert.assertEquals("key2", model.getRadioButtons().get(1).getKey());
	}
	
}

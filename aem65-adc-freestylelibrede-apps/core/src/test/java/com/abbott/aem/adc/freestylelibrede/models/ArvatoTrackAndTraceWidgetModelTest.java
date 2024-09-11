package com.abbott.aem.adc.freestylelibrede.models;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class})
public class ArvatoTrackAndTraceWidgetModelTest  extends BaseModelTest<ArvatoTrackAndTraceWidgetModel> {
    
	@InjectMocks
	private ArvatoTrackAndTraceWidgetModel model;

    @BeforeEach
	void setup() {
		model = loadModel(ArvatoTrackAndTraceWidgetModel.class);
	}

    @Test
	public void getHeading() {
		Assert.assertEquals("Heading", model.getHeading());
	}

	@Test
	public void getSubHeading() {
		Assert.assertEquals("subHeading", model.getSubHeading());
	}

	@Test
	public void getOrderIDText() {
		Assert.assertEquals("order ID Text", model.getOrderIDText());
	}

	@Test
	public void getOrderIDValidationRegex() {
		Assert.assertEquals("order id regex", model.getOrderIDValidationRegex());
	}

	@Test
	public void getOrderIDLength() {
		Assert.assertEquals("3", model.getOrderIDLength());
	}

	@Test
	public void getZipCodeText(){
		Assert.assertEquals("zip code text", model.getZipCodeText());
	}

	@Test
	public void getZipCodeValidationRegex(){
		Assert.assertEquals("zip code regex", model.getZipCodeValidationRegex());
	}

	@Test
	public void getZipCodeLength(){
		Assert.assertEquals("3", model.getZipCodeLength());
	}

	@Test
	public void getSubmitButtonText(){
		Assert.assertEquals("submit button text", model.getSubmitButtonText());
	}
	
	@Test
	public void getZipCodePlaceHolderText(){
		Assert.assertEquals("Zip Code PlaceHolder", model.getZipCodePlaceHolderText());
	}

	@Test
	public void getOrderIdPlaceHolderText(){
		Assert.assertEquals("Order ID PlaceHolder", model.getOrderIdPlaceHolderText());
	}
	
	@Test
	public void getSubmitCtaStyle(){
		Assert.assertEquals("submit-cta-style", model.getSubmitCtaStyle());
	}

	@Test
	public void getSuccessLink(){
		Assert.assertEquals("/content/page", model.getSuccessLink());
	}
	
	
}

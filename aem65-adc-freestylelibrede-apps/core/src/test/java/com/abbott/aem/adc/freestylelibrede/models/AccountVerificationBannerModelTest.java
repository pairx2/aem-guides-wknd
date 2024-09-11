package com.abbott.aem.adc.freestylelibrede.models;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class})
public class AccountVerificationBannerModelTest  extends BaseModelTest<AccountVerificationBannerModel> {
    
	@InjectMocks
	private AccountVerificationBannerModel model;

    @BeforeEach
	void setup() {
		model = loadModel(AccountVerificationBannerModel.class);
	}

    @Test
	public void getHeading() {
		Assert.assertEquals("Registrierung erfolgreich", model.getHeading());
	}

	@Test
	public void getSubHeading() {
		Assert.assertEquals("Haben Sie schon die Technische Einweisung erhalten?", model.getSubHeading());
	}

	@Test
	public void getBannerDescription() {
		Assert.assertEquals("Vielen Dank für die Bestätigung Ihrer E-Mail-Adresse.<br>  Sie können sich nun in Ihrem Benutzerkonto anmelden.", model.getBannerDescription());
	}

	@Test
	public void getBannerSubHeadingInfoText() {
		Assert.assertEquals("Info Text", model.getBannerSubHeadingInfoText());
	}

	@Test
	public void getSubDescription(){
		Assert.assertEquals("Die Technische Einweisung ist gesetzliche Voraussetzung für die Anwendung und Erstattung des Messsystems durch Ihre gesetzliche Krankenversicherung.", model.getSubDescription());
	}

	@Test
	public void getHmmUrl(){
		Assert.assertEquals("https://technische-einweisung.freestylelibre.de/traininginfocapture?customerid=", model.getHmmUrl());
	}

	@Test
	public void isDisableTraining(){
		Assert.assertEquals(true, model.isDisableTraining());
	}

	@Test
	public void getCTASection(){
		Assert.assertEquals("<p>RTE for Section for Yes</p>\r\n", model.getBannerButtons().get(0).getCtaSection());
	}

	@Test
	public void getCtaTargetSectiontId(){
		Assert.assertEquals("yes-section", model.getBannerButtons().get(0).getCtaTargetSectiontId());
	}

	@Test
	public void getCTAText(){
		Assert.assertEquals("Ja", model.getBannerButtons().get(0).getCta().getText());
	}

	@Test
	public void getCTAType(){
		Assert.assertEquals("primary", model.getBannerButtons().get(0).getCta().getType());
	}
	
}

package com.abbott.aem.adc.freestylelibrede.models;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import com.abbott.aem.adc.freestylelibrede.models.injector.ExternalizeInjector;
import com.abbott.aem.adc.freestylelibrede.services.ExternalizerService;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class})
public class ConfirmTechnicalTrainingModelTest  extends BaseModelTest<ConfirmTechnicalTrainingModel> {
    
	@InjectMocks
	private ConfirmTechnicalTrainingModel model;

    @InjectMocks
	ExternalizeInjector externalizeInjector = new ExternalizeInjector();

    @Mock
	ExternalizerService externalizerService;

    @BeforeEach
	void setup() {
		model = loadModel(ConfirmTechnicalTrainingModel.class);
	}

    @Test
	public void getHeading() {
		Assert.assertEquals("FreeStyle Libre 3", model.getProductTrainings().get(0).getHeading());
	}

	@Test
	public void getProductVersion() {
		Assert.assertEquals("FreeStyleLibre v.3", model.getProductTrainings().get(0).getProductVersion());
	}

	@Test
	public void getTechnicalTrainingDoneMessage() {
		Assert.assertEquals("Sie haben Ihre Teilname bereits bestätigt", model.getProductTrainings().get(0).getTechnicalTrainingDoneMessage());
	}

	@Test
	public void getTechnicalTrainingNotDoneMessage() {
		Assert.assertEquals("Sie haben Ihre Teilname noch nicht bestätigt", model.getProductTrainings().get(0).getTechnicalTrainingNotDoneMessage());
	}

	@Test
	public void getCTAText(){
		Assert.assertEquals("jetzt Teilnahme bestätigen", model.getProductTrainings().get(0).getCta().getText());
	}

	@Test
	public void getCTAType(){
		Assert.assertEquals("primary", model.getProductTrainings().get(0).getCta().getType());
	}

	@Test
	public void getCTAction(){
		Assert.assertEquals("_self", model.getProductTrainings().get(0).getCta().getAction());
	}

	@Test
	public void getBanner(){
		Assert.assertEquals("<p>Test Banner Message</p>\r\n", model.getBanner());
	}

	@Test
	public void getHmmUrl(){
		Assert.assertEquals("https://technische-einweisung.freestylelibre.de/traininginfocapture?customerid=", model.getHmmUrl());
	}

	@Test
	public void getTechnicalTrainingTabMapping(){
		Assert.assertEquals("technical-training-tab-id", model.getTechnicalTrainingTabMapping());
	}

	@Test
	public void getHmmProductVersion(){
		Assert.assertEquals("FreeStyleLibre v.3", model.getProductTrainings().get(0).getHmmProductVersion());
	}
	
}

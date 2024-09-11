package com.abbott.aem.adc.freestylelibrede.models;

import static org.mockito.ArgumentMatchers.any;

import org.apache.sling.models.spi.Injector;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.models.injector.ExternalizeInjector;
import com.abbott.aem.adc.freestylelibrede.services.ExternalizerService;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class})
public class CustomerInfoModelTest  extends BaseModelTest<CustomerInfoModel> {
    
	@InjectMocks
	private CustomerInfoModel model;

    @InjectMocks
	ExternalizeInjector externalizeInjector = new ExternalizeInjector();

    @Mock
	ExternalizerService externalizerService;

    @BeforeEach
	void setup() {
		Mockito.when(externalizerService.externalizeIfNecessary(any(), any())).thenReturn("#tech-training");
		context.registerService(Injector.class, externalizeInjector);
		context.registerService(ExternalizerService.class, externalizerService);
		model = loadModel(CustomerInfoModel.class);
	}

    @Test
	public void getHeading() {
		Assert.assertEquals("test heading", model.getHeading());
	}

	@Test
	public void getDeactivateHeading() {
		Assert.assertEquals("Deactivate", model.getDeactivateHeading());
	}

	@Test
	public void getDeactivateDescription() {
		Assert.assertEquals("Test description", model.getDeactivateDescription());
	}

	@Test
	public void getDeactivateConfirmation() {
		Assert.assertEquals("Confirmation Deactivation", model.getDeactivateConfirmation());
	}

	@Test
	public void getDeactivateRedirect(){
		Assert.assertEquals("#tech-training", model.getDeactivateRedirect());
	}

	@Test
	public void getEnableTechnicalTrainingPopUp(){
		Assert.assertEquals(true, model.getEnableTechnicalTrainingPopUp());
	}

	@Test
	public void getTechnicalTrainingPopUpHeading(){
		Assert.assertEquals("demo pop up heading ", model.getTechnicalTrainingPopUpHeading());
	}

	@Test
	public void getTechnicalTrainingPopUpMessage(){
		Assert.assertEquals("demo pop up message", model.getTechnicalTrainingPopUpMessage());
	}

	@Test
	public void getPopUpCtaType(){
		Assert.assertEquals("primary", model.getCta().getType());
	}

	@Test
	public void getPopUpCtaText(){
		Assert.assertEquals("demo pop up button text", model.getCta().getText());
	}

	@Test
	public void getPopUpCtaLink(){
		Assert.assertEquals("#tech-training", model.getCta().getLink());
	}
	
}

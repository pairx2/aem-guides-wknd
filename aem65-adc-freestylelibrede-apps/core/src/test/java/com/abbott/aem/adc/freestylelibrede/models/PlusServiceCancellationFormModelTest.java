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
public class PlusServiceCancellationFormModelTest  extends BaseModelTest<PlusServiceCancellationFormModel> {
    
	@InjectMocks
	private PlusServiceCancellationFormModel model;

    @InjectMocks
	ExternalizeInjector externalizeInjector = new ExternalizeInjector();

    @Mock
	ExternalizerService externalizerService;

    @BeforeEach
	void setup() {
		model = loadModel(PlusServiceCancellationFormModel.class);
	}

	@Test
	public void getFieldId() {
		Assert.assertEquals("23456", model.getFields().get(0).getFieldId());
	}

    @Test
	public void getFieldName() {
		Assert.assertEquals("Vorname", model.getFields().get(0).getFieldName());
	}

	@Test
	public void getFieldplaceholder() {
		Assert.assertEquals("Vorname", model.getFields().get(0).getFieldplaceholder());
	}

	@Test
	public void isRequired() {
		Assert.assertEquals(true, model.getFields().get(0).isRequired());
	}

	@Test
	public void getTextLimit() {
		Assert.assertEquals(new Integer(300), model.getFields().get(0).getTextLimit());
	}

	@Test
	public void getValidationmessage() {
		Assert.assertEquals("This field is mandatory", model.getFields().get(0).getValidationmessage());
	}

	@Test
	public void getFieldType(){
		Assert.assertEquals("text-field", model.getFields().get(0).getFieldType());
	}

	@Test
	public void getOption(){
		Assert.assertEquals("nächstmöglicher Zeitpunkt", model.getFields().get(4).getOptions().get(0).getOption());
	}

	@Test
	public void getValue(){
		Assert.assertEquals("nächstmöglicher Zeitpunkt", model.getFields().get(4).getOptions().get(0).getValue());
	}

	@Test
	public void getServiceEndpoint(){
		Assert.assertEquals("REST_URL", model.getServiceEndpoint());
	}

	@Test
	public void getEndpointpath(){
		Assert.assertEquals("/plus-service-cancellation", model.getEndpointpath());
	}

	@Test
	public void isEnablecaptcha(){
		Assert.assertEquals(true, model.isEnablecaptcha());
	}

	@Test
	public void getDisclaimerText(){
		Assert.assertEquals("Test disclaimer test", model.getDisclaimerText());
	}

	@Test
	public void getCtagetText(){
		Assert.assertEquals("jetzt Kündigen", model.getCta().getText());
	}

	@Test
	public void getCtagetType(){
		Assert.assertEquals("secondary", model.getCta().getType());
	}

	@Test
	public void getPlusServiceCancellationErrorMessage(){
		Assert.assertEquals("Error Message", model.getPlusServiceCancellationErrorMessage());
	}

	@Test
	public void getConfirmationPageTitle(){
		Assert.assertEquals("Kündigung erhalten!", model.getConfirmationPageTitle());
	}

	@Test
	public void getConfirmationPageDescription(){
		Assert.assertEquals("<p>Schade, dass Sie den PlusService gekündigt haben. Wir haben Ihnen als Bestätigung eine E-Mail zugesendet. Bitte prüfen Sie Ihren Posteingang.</p>\r\n", model.getConfirmationPageDescription());
	}

	@Test
	public void getConfirmationPageCtagetText(){
		Assert.assertEquals("speichern / Drucken", model.getConfirmationPageCta().getText());
	}

	@Test
	public void getConfirmationPageCtagetType(){
		Assert.assertEquals("secondary", model.getConfirmationPageCta().getType());
	}

	@Test
	public void getConfirmationPageCancellationDateLabel(){
		Assert.assertEquals("Eingang der Kündigung", model.getConfirmationPageCancellationDateLabel());
	}
}

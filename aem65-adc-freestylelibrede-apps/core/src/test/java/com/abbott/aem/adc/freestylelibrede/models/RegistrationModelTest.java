package com.abbott.aem.adc.freestylelibrede.models;

import static org.mockito.ArgumentMatchers.any;
import org.apache.sling.models.spi.Injector;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
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

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class RegistrationModelTest extends BaseModelTest<RegistrationModel> {

	private RegistrationModel model;

	@InjectMocks
	ExternalizeInjector externalizeInjector = new ExternalizeInjector();
	@Mock
	ExternalizerService externalizerService;

	@Mock
	private Resource mockSelf;

	@Mock
	private ResourceResolver mockResourceResolver;

	private final AemContext context = new AemContext();

	@BeforeEach
	void setup() {
		context.registerService(Injector.class, externalizeInjector);
		context.registerService(ExternalizerService.class, externalizerService);		
		context.addModelsForClasses(RegistrationModel.class);
	}

	@Test
	public void getRegistrationHeading() {
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("RegistrationHeading", model.getRegistrationHeading());

	}

	@Test
	public void getRegistrationSubheading() {
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("RegistrationSubheading", model.getRegistrationSubheading());

	}

	@Test
	public void getContinueCtastyle() {
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("ContinueCtastyle", model.getContinueCtastyle());

	}

	@Test
	public void getLoginLink() {
		Mockito.when(externalizerService.externalizeIfNecessary(any(), any())).thenReturn("LoginLink");
		model = loadModel(RegistrationModel.class);
	 	Assert.assertEquals("LoginLink", model.getLoginLink());

	}

	@Test
	public void getAccountHeading() {
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("AccountHeading", model.getAccountHeading());

	}

	@Test
	public void getAccountSubheading() {
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("AccountSubheading", model.getAccountSubheading());

	}

	@Test
	public void getAccountCancelCtastyle() {
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("AccountCancelCtastyle", model.getAccountCancelCtastyle());

	}

	@Test
	public void getAccountRegisterCtaStyle() {
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("AccountRegisterCtaStyle", model.getAccountRegisterCtaStyle());

	}

	@Test
	public void getContactHeading() {
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("ContactHeading", model.getContactHeading());

	}

	@Test
	public void getContactSubHeading() {
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("ContactSubHeading", model.getContactSubHeading());

	}

	@Test
	public void getInformationalMsg() {
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("InformationalMsg", model.getInformationalMsg());

	}

	@Test
	public void getContactBackCtaStyle() {
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("ContactBackCtaStyle", model.getContactBackCtaStyle());

	}

	@Test
	public void getContactContinueCtaStyle() {
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("ContactContinueCtaStyle", model.getContactContinueCtaStyle());

	}

	@Test
	public void getInsuranceHeading() {
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("InsuranceHeading", model.getInsuranceHeading());

	}

	@Test
	public void getInsuranceSubHeading() {
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("InsuranceSubHeading", model.getInsuranceSubHeading());

	}

	@Test
	public void getCheckoutLink() {
		Mockito.when(externalizerService.externalizeIfNecessary(any(), any())).thenReturn("CheckoutLink");
		model = loadModel(RegistrationModel.class);		
		Assert.assertEquals("CheckoutLink", model.getCheckoutLink());

	}

	@Test
	public void getRxLink() {
		Mockito.when(externalizerService.externalizeIfNecessary(any(), any())).thenReturn("RxLink");
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("RxLink", model.getRxLink());

	}

	@Test
	public void getDefaultLink() {
		Mockito.when(externalizerService.externalizeIfNecessary(any(), any())).thenReturn("DefaultLink");
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("DefaultLink", model.getDefaultLink());

	}

	@Test
	public void getAccountLink() {
		Mockito.when(externalizerService.externalizeIfNecessary(any(), any())).thenReturn("AccountLink");
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("AccountLink", model.getAccountLink());

	}

	@Test
	public void getReaderInfoText() {
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("ReaderInfoText", model.getReaderInfoText());

	}

	@Test
	public void getInsuranceBackCtaStyle() {
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("InsuranceBackCtaStyle", model.getInsuranceBackCtaStyle());

	}

	@Test
	public void getInsuranceContinueCtaStyle() {
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("InsuranceContinueCtaStyle", model.getInsuranceContinueCtaStyle());

	}

	@Test
	public void getReaderInfoTextUnit() {
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("ReaderInfoTextUnit", model.getReaderInfoTextUnit());

	}

	@Test
	public void getPrivacyPolicy() {
		Mockito.when(externalizerService.externalizeIfNecessary(any(), any())).thenReturn("PrivacyPolicy");
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("PrivacyPolicy", model.getPrivacyPolicy());

	}

	@Test
	public void getTermsAndConditions() {
		Mockito.when(externalizerService.externalizeIfNecessary(any(), any())).thenReturn("TermsAndConditions");
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("TermsAndConditions", model.getTermsAndConditions());

	}

	@Test
	public void getTrainingLink() {
		Mockito.when(externalizerService.externalizeIfNecessary(any(), any())).thenReturn("TrainingLink");
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("TrainingLink", model.getTrainingLink());

	}

	@Test
	public void getAccountDisclaimer() {
		Mockito.when(externalizerService.externalizeIfNecessary(any(), any())).thenReturn("AccountDisclaimer");
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("AccountDisclaimer", model.getAccountDisclaimer());

	}

	@Test
	public void  getRegistrationSubheadingDescription(){
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("RegistrationSubheadingDescription", model.getRegistrationSubheadingDescription());
	}

    @Test
	public void getInformationText(){
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("InformationText", model.getInformationText());
	}

    @Test
	public void getCustomerNumberRegex(){
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("CustomerNumberRegex", model.getCustomerNumberRegex());
	}

    @Test
	public void getKvnrRegex(){
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("KvnrRegex", model.getKvnrRegex());
	}

    @Test
	public void isEnableCaptcha(){
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals(true, model.isEnableCaptcha());
	}

	@Test
	public void  getOfflineRegistrationSuccessHeading(){
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("OfflineRegistrationSuccessHeading", model.getOfflineRegistrationSuccessHeading());
	}

	@Test
	public void  getOfflineRegistrationSuccessSubheading(){
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("OfflineRegistrationSuccessSubheading", model.getOfflineRegistrationSuccessSubheading());
	}

	@Test
	public void  getAccountSubHeadingDescription(){
		model = loadModel(RegistrationModel.class);
		Assert.assertEquals("accountSubHeadingDescription", model.getAccountSubHeadingDescription());
	}
}

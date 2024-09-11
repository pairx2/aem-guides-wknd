package com.abbott.aem.adc.freestylelibrede.models;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.ArgumentMatchers.any;
import org.apache.sling.models.spi.Injector;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import com.abbott.aem.adc.freestylelibrede.models.injector.ExternalizeInjector;
import com.abbott.aem.adc.freestylelibrede.services.ExternalizerService;

@ExtendWith({ AemContextExtension.class,MockitoExtension.class})
public class PlusServiceModelTest  extends BaseModelTest<PlusServiceModel> {

	@InjectMocks
    ExternalizeInjector externalizeInjector = new ExternalizeInjector();

    @Mock
    ExternalizerService externalizerService;
   
	@InjectMocks
	private PlusServiceModel model;

    @Test
	public void getSubscriptionHeading() {
		model = loadModel(PlusServiceModel.class);
		Assert.assertEquals("PLUSSERVICE", model.getSubscriptionHeading());
	}

	@Test
	public void getSubscriptionImage() {
		model = loadModel(PlusServiceModel.class);
		Assert.assertEquals("/content/dam/adc/freestylelibrede/de/de/header/plus service icon.png", model.getSubscriptionImage());
	}

	@Test
	public void getInformationalHeading() {
		model = loadModel(PlusServiceModel.class);
		Assert.assertEquals("Immer bestens  versorgt", model.getInformationalHeading());
	}

	@Test
	public void getInformationalDesc() {
		model = loadModel(PlusServiceModel.class);
		Assert.assertEquals("Mit dem PlusService bekommen Sie jedes Quartal automatisch ein Paket mit 7 Sensoren bequem zu Ihnen nach Hause geliefert bekommen. Es erleichtert Ihnen das Diabetesmanagement durch eine lückenlose Versorgung, die keine zusätzliche Einwirkung Ihrerseits benötigt. Bestellen Sie jetzt den PlusService, um alles weitere kümmern wir uns für Sie.", model.getInformationalDesc());
	}

	@Test
	public void getProductSku(){
		model = loadModel(PlusServiceModel.class);
		Assert.assertEquals("1-71538-01", model.getProductSku());
	}

	@Test
	public void getMoreInfoPath(){

		Mockito.when(externalizerService.externalizeIfNecessary(any(),any())).thenReturn("/content/adc/freestylelibrede/de/de/v3/produkte/freestyle-libre-plusservice.html");
		context.registerService(Injector.class, externalizeInjector);
		context.registerService(ExternalizerService.class, externalizerService);
		model = loadModel(PlusServiceModel.class);
		Assert.assertEquals("/content/adc/freestylelibrede/de/de/v3/produkte/freestyle-libre-plusservice.html", model.getMoreInfoPath());
	}

	@Test
	public void getMoreInfoStyle(){
		model = loadModel(PlusServiceModel.class);
		Assert.assertEquals("primary", model.getMoreInfoStyle());
	}

	@Test
	public void getInformationalPriceSuperscript(){
		model = loadModel(PlusServiceModel.class);
		Assert.assertEquals("*", model.getInformationalPriceSuperscript());
	}

	@Test
	public void getInformationalMessage(){
		model = loadModel(PlusServiceModel.class);
		Assert.assertEquals("*inkl. Mehrwertsteuer, ohne Versand, jederzeit kündbar, Lieferung erfolgt alle 3 Monate", model.getInformationalMessage());
	}

	@Test
	public void getBookServicePath(){
		Mockito.when(externalizerService.externalizeIfNecessary(any(),any())).thenReturn("/content/adc/freestylelibrede/de/de/v3/produkte/freestyle-libre-plusservice.html");
		context.registerService(Injector.class, externalizeInjector);
		context.registerService(ExternalizerService.class, externalizerService);
		model = loadModel(PlusServiceModel.class);
		Assert.assertEquals("/content/adc/freestylelibrede/de/de/v3/produkte/freestyle-libre-plusservice.html", model.getBookServicePath());
	}

	@Test
	public void getPrivacyPolicyPath(){
		Mockito.when(externalizerService.externalizeIfNecessary(any(),any())).thenReturn("/content/adc/freestylelibrede/de/de/v3/datenschutzerklaerung.html");
		context.registerService(Injector.class, externalizeInjector);
		context.registerService(ExternalizerService.class, externalizerService);
		model = loadModel(PlusServiceModel.class);
		Assert.assertEquals("/content/adc/freestylelibrede/de/de/v3/datenschutzerklaerung.html", model.getPrivacyPolicyPath());
	}

	@Test
	public void getTermsAndConditionPath(){
		Mockito.when(externalizerService.externalizeIfNecessary(any(),any())).thenReturn("/content/adc/freestylelibrede/de/de/v3/agb.html");
		context.registerService(Injector.class, externalizeInjector);
		context.registerService(ExternalizerService.class, externalizerService);
		model = loadModel(PlusServiceModel.class);
		Assert.assertEquals("/content/adc/freestylelibrede/de/de/v3/agb.html", model.getTermsAndConditionPath());
	}

	@Test
	public void getTrainingMaterialsPath(){
		Mockito.when(externalizerService.externalizeIfNecessary(any(),any())).thenReturn("/content/adc/freestylelibrede/de/de/v3/anmelden/login.html");
		context.registerService(Injector.class, externalizeInjector);
		context.registerService(ExternalizerService.class, externalizerService);
		model = loadModel(PlusServiceModel.class);
		Assert.assertEquals("/content/adc/freestylelibrede/de/de/v3/anmelden/login.html", model.getTrainingMaterialsPath());
	}

	@Test
	public void getConfirmationPath(){
		Mockito.when(externalizerService.externalizeIfNecessary(any(),any())).thenReturn("/content/adc/freestylelibrede/de/de/v3/mein-konto/kundenkonto.html");
		context.registerService(Injector.class, externalizeInjector);
		context.registerService(ExternalizerService.class, externalizerService);
		model = loadModel(PlusServiceModel.class);
		Assert.assertEquals("/content/adc/freestylelibrede/de/de/v3/mein-konto/kundenkonto.html", model.getConfirmationPath());
	}

	@Test
	public void getCTAType(){
		model = loadModel(PlusServiceModel.class);
		Assert.assertEquals("<p>Ich habe die <a href=\"/content/adc/freestylelibrede/de/de/v3/datenschutzerklaerung.html\" target=\"_blank\">Datenschutzbestimmungen</a> gelesen und akzeptiert. Ich habe die <a href=\"/content/adc/freestylelibrede/de/de/v3/agb.html\" target=\"_blank\">Allgemeinen Geschäftsbedingungen</a> gelesen und akzeptiert*</p>\r\n", model.getCheckboxes().get(0).getText());
	}

	@Test
	public void getTabName(){
		model = loadModel(PlusServiceModel.class);
		Assert.assertEquals("#plus_service", model.getTabName());
	}
	
}

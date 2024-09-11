package com.abbott.aem.adc.freestylelibrede.models;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.ArgumentMatchers.any;

import com.abbott.aem.adc.freestylelibrede.models.injector.ExternalizeInjector;
import com.abbott.aem.adc.freestylelibrede.services.ExternalizerService;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.models.spi.Injector;

@ExtendWith({ AemContextExtension.class,MockitoExtension.class})
public class NewsletterSignupModelTest  extends BaseModelTest<NewsletterSignupModel> {
    
	@InjectMocks
	private NewsletterSignupModel model;

	@InjectMocks
	ExternalizeInjector externalizeInjector = new ExternalizeInjector();
	@Mock
	ExternalizerService externalizerService;

	private final AemContext context = new AemContext();

	@BeforeEach
	void setup() {
		context.registerService(Injector.class, externalizeInjector);
		context.registerService(ExternalizerService.class, externalizerService);		
		context.addModelsForClasses(RegistrationModel.class);
	}

    @Test
	public void getHeading() {
		model = loadModel(NewsletterSignupModel.class);
		Assert.assertEquals("Bleiben Sie auf dem Laufenden!", model.getHeading());
	}

	@Test
	public void getSubHeading() {
		model = loadModel(NewsletterSignupModel.class);
		Assert.assertEquals("Jetzt zum Newsletter anmelden und aktuelle Infos zu Aktionen und Diabetesmanagement <br/>mit FreeStyle Libre erhalten<br>", model.getSubheading());
	}

	@Test
	public void getPrivacyPolicy() {
		Mockito.when(externalizerService.externalizeIfNecessary(any(), any())).thenReturn("/content/adc/freestylelibrede/de/de/v3/datenschutzerklaerung");
		model = loadModel(NewsletterSignupModel.class);
		Assert.assertEquals("/content/adc/freestylelibrede/de/de/v3/datenschutzerklaerung", model.getPrivacyPolicy());

	}

	@Test
	public void getTermsAndConditions() {
		Mockito.when(externalizerService.externalizeIfNecessary(any(), any())).thenReturn("/content/adc/freestylelibrede/de/de/v3/agb");
		model = loadModel(NewsletterSignupModel.class);
		Assert.assertEquals("/content/adc/freestylelibrede/de/de/v3/agb", model.getTermsAndConditions());

	}
	
}

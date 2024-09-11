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
import com.abbott.aem.adc.freestylelibrede.services.OCRConfigurationService;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class OCRRegistrationModelTest extends BaseModelTest<OCRRegistrationModel> {

	@InjectMocks
	private OCRRegistrationModel model;

	@InjectMocks
	ExternalizeInjector externalizeInjector = new ExternalizeInjector();

	@Mock
	ExternalizerService externalizerService;

	@Mock
	private OCRConfigurationService mockOcrConfigurationService;

	private final AemContext context = new AemContext();

	@BeforeEach
	void setup() {
				
		context.registerService(Injector.class, externalizeInjector);
		context.registerService(ExternalizerService.class, externalizerService);
		context.registerService(OCRConfigurationService.class, mockOcrConfigurationService);			
		context.addModelsForClasses(OCRRegistrationModel.class);

	}

	@Test
	public void getHeading() {
		model = loadModel(OCRRegistrationModel.class);
		Assert.assertEquals("Heading", model.getHeading());

	}

	@Test
	public void getSubheading() {

		model = loadModel(OCRRegistrationModel.class);
		Assert.assertEquals("Subheading", model.getSubheading());
	}

	@Test
	public void getUploadStyle() {

		model = loadModel(OCRRegistrationModel.class);
		Assert.assertEquals("UploadStyle", model.getUploadStyle());

	}

	@Test
	public void getRxCheckoutPageURL() {
		
		Mockito.when(externalizerService.externalizeIfNecessary(any(), any())).thenReturn("www.freestylelibre.de/page");
		model = loadModel(OCRRegistrationModel.class);
		Assert.assertEquals("www.freestylelibre.de/page", model.getRxCheckoutPageURL());
		
	}
	
    @Test
    public void testEndpoint() {
         Mockito.when(mockOcrConfigurationService.getEndpoint()).thenReturn("end point");
         model.getEndpoint();
         Assert.assertEquals("end point", model.getEndpoint());
    }

			
}

package com.abbott.aem.adc.freestylelibrede.models;

import static org.mockito.ArgumentMatchers.any;
import java.util.ArrayList;
import java.util.List;
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
import com.abbott.aem.adc.freestylelibrede.services.PaymentConfigurationService;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class PaymentModelTest extends BaseModelTest<PaymentModel> {

	@InjectMocks
	private PaymentModel model;

	@InjectMocks
	ExternalizeInjector externalizeInjector = new ExternalizeInjector();

	@Mock
	PaymentConfigurationService paymentConfigurationService;

	@Mock
	ExternalizerService externalizerService;

	@Mock
	PaymentCheckboxModel mockpaymentCheckboxModel;

	private final AemContext context = new AemContext();

	@BeforeEach
	void setup() {

		Mockito.when(externalizerService.externalizeIfNecessary(any(), any()))
				.thenReturn("www.freestylelibre.de/confirmationpage", "www.freestylelibre.de/MyAccount");
		context.registerService(Injector.class, externalizeInjector);
		context.registerService(ExternalizerService.class, externalizerService);
		context.registerService(PaymentConfigurationService.class, paymentConfigurationService);
		model = loadModel(PaymentModel.class);
	}

	@Test
	public void getConfirmationPage() {

		Assert.assertEquals("www.freestylelibre.de/confirmationpage", model.getConfirmationPage());
	}

	@Test
	public void getAccountPagePath() {

		Assert.assertEquals("www.freestylelibre.de/MyAccount", model.getAccountPagePath());

	}

	@Test
	public void isEnableDesign() {
		Assert.assertEquals(false, model.isEnableDesign());
	}

	@Test
	public void isEnableCreateOrderCall() {
		Assert.assertEquals(false, model.isEnableCreateOrderCall());
    }

	@Test
	public void enableNewPaymentFlow(){
		Assert.assertEquals(false, model.isEnableNewPaymentFlow());
	}

	@Test
	public void getAccountPageTab() {

		Assert.assertEquals("AccountPageTab", model.getAccountPageTab());

	}

	@Test
	public void testEndpoint() {
		Mockito.when(paymentConfigurationService.getPayonEndpoint()).thenReturn("payment point");
		model.getPayonEndpoint();
		Assert.assertEquals("payment point", model.getPayonEndpoint());

	}

	@Test
	public void getCheckboxes() {
		List<PaymentCheckboxModel> list = new ArrayList<PaymentCheckboxModel>();
		list.add(mockpaymentCheckboxModel);
		Assert.assertNull(model.getCheckboxes());

	}

}

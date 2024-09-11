package com.abbott.aem.adc.freestylelibrede.services.impl;

import java.io.IOException;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.models.BaseModelTest;
import com.abbott.aem.adc.freestylelibrede.services.impl.PaymentConfigurationServiceImpl.Configuration;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class PaymentConfigurationServiceImplTest extends BaseModelTest<PaymentConfigurationServiceImpl> {

	PaymentConfigurationServiceImpl paymentConfigurationServiceImpl = new PaymentConfigurationServiceImpl();
	String endpoint;
	private final AemContext context = new AemContext();
	@Mock
	Configuration config;

	@BeforeEach
	void setup() throws IOException {
		paymentConfigurationServiceImpl.init(config);
		endpoint = "https://test.oppwa.com";
	}

	@Test
	void testGetEndpoint() {
		paymentConfigurationServiceImpl.getPayonEndpoint();
		Assert.assertNotNull(endpoint);

	}
}

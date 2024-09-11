package com.abbott.aem.adc.freestylelibrede.services.impl;

import java.io.IOException;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.services.impl.OcrConfigurationServiceImpl.Configuration;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class OcrConfigurationServiceImplTest {

	OcrConfigurationServiceImpl OcrConfigurationServiceImpl = new OcrConfigurationServiceImpl();

	String endpoint;
	@Mock
	Configuration configuration;

	@BeforeEach
	void setup() throws IOException {
		OcrConfigurationServiceImpl.init(configuration);
		endpoint = "http://localhost:4502";
	}

	@Test
	void testGetEndpoint() {

		OcrConfigurationServiceImpl.getEndpoint();
		Assert.assertNotNull(endpoint);

	}
}

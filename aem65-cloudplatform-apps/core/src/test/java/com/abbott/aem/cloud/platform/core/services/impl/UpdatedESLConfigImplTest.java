package com.abbott.aem.cloud.platform.core.services.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.cloud.platform.core.services.impl.UpdatedESLConfigurationImpl.Config;

import io.wcm.testing.mock.aem.junit5.AemContext;

@ExtendWith({ MockitoExtension.class })
class UpdatedESLConfigImplTest {

	@Mock
	Config config;
	
	@InjectMocks
	UpdatedESLConfigurationImpl configImpl;

	public final AemContext context = new AemContext();
	final Map<String, Object> properties = new HashMap<>();
	

	@BeforeEach
	void setUp() throws IOException {
		MockitoAnnotations.openMocks(this);
		Mockito.when(config.environment()).thenReturn("dev");
		Mockito.when(config.eslApiUrl()).thenReturn("https://esl.com");
		Mockito.when(config.xApplicationAccessKey()).thenReturn("KWDFRPMNASGTREQCTYUJ");
		Mockito.when(config.contentType()).thenReturn("application/json");
		Mockito.when(config.xOriginSecret()).thenReturn("9jkbsd345hk");
	}

	@Test
	void testConfigValues() {
		configImpl.activate(config);
		assertEquals("dev", configImpl.getEnvironment());
		assertEquals("https://esl.com", configImpl.getApiUrl());
		assertEquals("KWDFRPMNASGTREQCTYUJ", configImpl.getxApplicationAccessKey());
		assertEquals("application/json", configImpl.getContentType());
		assertEquals("9jkbsd345hk", configImpl.getxOriginSecret());
	}
}

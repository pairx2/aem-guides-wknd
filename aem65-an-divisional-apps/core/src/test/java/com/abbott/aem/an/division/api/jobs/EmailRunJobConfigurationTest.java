package com.abbott.aem.an.division.api.jobs;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.an.division.api.jobs.EmailRunJobConfiguration.Config;


@ExtendWith(MockitoExtension.class)
class EmailRunJobConfigurationTest {
	
	@InjectMocks
	EmailRunJobConfiguration emailRunJobConfiguration;
	
	
	
	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
	}
	
	@Test
	void testEmailRunJobConfigurations() {
		Config config = mock(Config.class);
		Mockito.when(config.getApplicationId()).thenReturn("app123");
		Mockito.when(config.getDomainName()).thenReturn("abbott");
		Mockito.when(config.getServiceUrl()).thenReturn("http://abbott.com/service");
		Mockito.when(config.getApplicationAccessKey()).thenReturn("access_key");
		Mockito.when(config.getOriginSecretKey()).thenReturn("origin_secret_key");
		emailRunJobConfiguration.activate(config);
		assertEquals("app123", emailRunJobConfiguration.getApplicationId());
		assertEquals("abbott", emailRunJobConfiguration.getDomainName());
		assertEquals("http://abbott.com/service", emailRunJobConfiguration.getServiceUrl());
		assertEquals("access_key", emailRunJobConfiguration.getApplicationAccessKey());
		assertEquals("origin_secret_key", emailRunJobConfiguration.getOriginSecretKey());
	}

}

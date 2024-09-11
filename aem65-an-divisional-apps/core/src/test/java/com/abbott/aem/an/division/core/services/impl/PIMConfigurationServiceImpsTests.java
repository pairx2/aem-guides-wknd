package com.abbott.aem.an.division.core.services.impl;

import static org.junit.jupiter.api.Assertions.*;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.abbott.aem.an.division.core.services.impl.PIMConfigurationServiceImpl.Config;
@SuppressWarnings("unlikely-arg-type")
class PIMConfigurationServiceImpsTests {
		
	Config pimConfigs;
		
	PIMConfigurationServiceImpl service=new PIMConfigurationServiceImpl();
	
	@BeforeEach
	void setUp() {
		MockitoAnnotations.initMocks(getClass());
	}
	
	@Test
	void testForAllReturnStatements() {
		equals(service.getEnvironment());
		equals(service.getEnvironmentType());
		equals(service.getRunMode());
		equals(service.getProductsRootPath());
		equals(service.getProductsParentRootPath());
		equals(service.getPdpTemplate());
		equals(service.getApiUrl());
		equals(service.getxApplicationId());
		equals(service.getxOriginSecret());
		equals(service.getxCountryCode());
		equals(service.getxPreferredLanguage());
		equals(service.getProxylbAbbottCorp());
		equals(service.getxSecretHeader());
		equals(service.productBaseImagePath());
		equals(service.pdpSeoContentFragmentModel());
		equals(service.pdpSeoContentFragmentPath());
		equals(service.unavailableImagePath());
		equals(service.isUsingProxy());
	}		

}



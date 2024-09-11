package com.abbott.aem.platform.search.coveoconnector.core.service.impl;

import static org.junit.jupiter.api.Assertions.fail;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.when;
import com.abbott.aem.platform.search.coveoconnector.core.service.impl.FormConfigurationServiceImpl.Config;


@ExtendWith(MockitoExtension.class)
class FormConfigurationServiceImplTest {

	@InjectMocks
	FormConfigurationServiceImpl confService;
	
	@Mock
	Config config;
	
	@BeforeEach
	public void setup() throws Exception {
		when(config.apiKey()).thenReturn("apikey");
		when(config.platformUrl()).thenReturn("platformurl");
		when(config.organizationId()).thenReturn("orgid");
		when(config.pushUrl()).thenReturn("pushurl");
		when(config.sourceId()).thenReturn("sourceid");
		when(config.sourceName()).thenReturn("sourceName");
		when(config.connectorUrl()).thenReturn("url");
		when(config.inheritanceLogicProperties()).thenReturn(new String[] {"division","sitename"});
		
	}
	@Test
	void testActivate() throws Exception {
		confService.activate(config);
		assert(confService.getCoveoApiKey().equals("apikey"));
		assert(confService.getCoveoConnectorUrl().equals("url"));
		assert(confService.getCoveoPlatformUrl().equals("platformurl"));
		assert(confService.getCoveoOrganizationId().equals("orgid"));
		assert(confService.getCoveoPushUrl().equals("pushurl"));
		assert(confService.getCoveoSourceId().equals("sourceid"));
		assert(confService.getCoveoSourceName().equals("sourceName"));
		assert(confService.getInheritanceLogicProperties().length>0);
	}

}

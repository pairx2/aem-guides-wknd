package com.abbott.aem.bts.cybersecurity.services.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class SessionConfigServiceImplTest {

	AemContext ctx = new AemContext();

	SessionConfigServiceImpl sessionConfigService = Mockito.spy(new SessionConfigServiceImpl());

	Map<String, Object> parameters = new HashMap<>();

	@BeforeEach
	void setup() {
		
		parameters.put("isTimeoutEnabled", true);
		parameters.put("getInactivityTimeout", 8);
		parameters.put("getPopupTimer", 2);
		ctx.registerInjectActivateService(sessionConfigService, parameters);
	}

	@Test
	void testIsTimeoutEnabled() {
		Boolean expected = true;
		Boolean actual = sessionConfigService.isTimeoutEnabled();
		assertEquals(expected, actual); 
	}

	@Test
	void testGetInactivityTimeoutLimit() {
		Integer expected = 8;
		Integer actual = sessionConfigService.getInactivityTimeoutLimit();
		assertEquals(expected, actual); 
		
	}
	
	@Test
	void testGetPopupTimer() {
		Integer expected = 2;
		Integer actual = sessionConfigService.getPopupTimer();
		assertEquals(expected, actual); 
	}
	
}

package com.abbott.aem.bts.cybersecurity.components.model.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.osgi.service.component.annotations.Reference;

import com.abbott.aem.bts.cybersecurity.components.model.SessionPopup;
import com.abbott.aem.bts.cybersecurity.services.SessionConfigService;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class SessionPopupImplTest {

	private final AemContext ctx = new AemContext();
	
	@Reference
	SessionConfigService sessionConfigService;
	
	@BeforeEach
	public void setUp() throws Exception {

		sessionConfigService = Mockito.mock(SessionConfigService.class);
		Mockito.lenient().when(sessionConfigService.isTimeoutEnabled()).thenReturn(true);
		Mockito.lenient().when(sessionConfigService.getInactivityTimeoutLimit()).thenReturn(8);
		Mockito.lenient().when(sessionConfigService.getPopupTimer()).thenReturn(2);
		ctx.registerService(SessionConfigService.class, sessionConfigService);
		ctx.addModelsForClasses(SessionPopup.class);
		ctx.load().json("/com/abbott/aem/bts/cybersecurity/components/model/impl/SessionPopupImplTest.json", "/content");
	}
	
	@Test
	void tesisTimeoutEnabled() {
		final Boolean expected = true;
		ctx.currentResource("/content/sessionpopup");
		SessionPopup sessionPopup = ctx.request().adaptTo(SessionPopup.class);
		Boolean actual = sessionPopup.isTimeoutEnabled();
		assertEquals(sessionPopup.isTimeoutEnabled(), actual);
		assertEquals(expected, actual);
	}
	
	
	@Test
	void testGetInactivityTimeoutMessage() {
		final String expected = "Your session is about to expire due to inactivity.";
		ctx.currentResource("/content/sessionpopup");
		SessionPopup sessionPopup = ctx.request().adaptTo(SessionPopup.class);
		String actual = sessionPopup.getInactivityTimeoutMessage();
		assert (sessionPopup.getInactivityTimeoutMessage() != null);
		assertEquals(sessionPopup.getInactivityTimeoutMessage(), actual);
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetAlertPrefix() {
		final String expected = "Session expires in:";
		ctx.currentResource("/content/sessionpopup");
		SessionPopup sessionPopup = ctx.request().adaptTo(SessionPopup.class);
		String actual = sessionPopup.getTimeoutAlertPrefix();
		assertEquals(sessionPopup.getTimeoutAlertPrefix(), actual);
		assertEquals(expected, actual);
	}

	
	@Test
	void tesGetTimeoutLimit() {
		final Integer expected = 8;
		
		ctx.currentResource("/content/sessionpopup");
		SessionPopup sessionPopup = ctx.request().adaptTo(SessionPopup.class);
		Integer actual = sessionPopup.getInactivityTimeoutLimit();
		assertEquals(sessionPopup.getInactivityTimeoutLimit(), actual);
		assertEquals(expected, actual);
	}

	@Test
	void tesGetTimerLimit() {
		final Integer expected = 2;
		
		ctx.currentResource("/content/sessionpopup");
		SessionPopup sessionPopup = ctx.request().adaptTo(SessionPopup.class);
		Integer actual = sessionPopup.getTimerLimit();
		assertEquals(sessionPopup.getTimerLimit(), actual);
		assertEquals(expected, actual);
	}
}

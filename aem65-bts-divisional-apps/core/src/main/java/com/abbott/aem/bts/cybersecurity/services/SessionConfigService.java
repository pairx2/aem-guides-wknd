package com.abbott.aem.bts.cybersecurity.services;

public interface SessionConfigService {
	Boolean isTimeoutEnabled();
	Integer getInactivityTimeoutLimit();
	Integer getPopupTimer();
}

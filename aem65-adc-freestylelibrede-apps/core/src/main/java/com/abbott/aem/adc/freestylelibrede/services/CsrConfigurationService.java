package com.abbott.aem.adc.freestylelibrede.services;

public interface CsrConfigurationService {
	String getOrgId();
	String getChatScript();
	String getChatUrl();
	String getChatLiveAgentContentUrl();
	String getChatLiveAgentUrl();
	String getChatInit();
	String getEndpoint();
	String getChatDeploymentId();
	String getChatButtonId();
	String getCsrChatGroup();
	boolean isOfflineSupportEnabled();
}

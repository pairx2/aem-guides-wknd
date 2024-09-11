package com.abbott.aem.adc.freestylelibrede.models;

import com.abbott.aem.adc.freestylelibrede.services.CsrConfigurationService;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;

import javax.annotation.PostConstruct;

@Model(adaptables = Resource.class)
public class ChatButtonModel {
    @OSGiService
    private CsrConfigurationService csrConfigurationService;

    private String chatEndpoint;
    private String chatInit;
    private String orgId;
    private String liveAgentContentURL;
    private String deploymentId;
    private String buttonId;
    private String liveAgentURL;
    private String script;
    private String url;
    private String csrChatGroup;
	private boolean offlineSupportEnabled;

    @PostConstruct
    private void init() {
        chatEndpoint = csrConfigurationService.getEndpoint();
        chatInit = csrConfigurationService.getChatInit();
        orgId = csrConfigurationService.getOrgId();
        liveAgentContentURL = csrConfigurationService.getChatLiveAgentContentUrl();
        deploymentId = csrConfigurationService.getChatDeploymentId();
        buttonId = csrConfigurationService.getChatButtonId();
        liveAgentURL = csrConfigurationService.getChatLiveAgentUrl();
        script = csrConfigurationService.getChatScript();
        url = csrConfigurationService.getChatUrl();
        csrChatGroup = csrConfigurationService.getCsrChatGroup();
        offlineSupportEnabled = csrConfigurationService.isOfflineSupportEnabled();
    }

    public String getChatEndpoint() {
        return chatEndpoint;
    }

    public String getChatInit() {
        return chatInit;
    }

    public String getOrgId() {
        return orgId;
    }

    public String getLiveAgentContentURL() {
        return liveAgentContentURL;
    }

    public String getDeploymentId() {
        return deploymentId;
    }

    public String getButtonId() {
        return buttonId;
    }

    public String getLiveAgentURL() {
        return liveAgentURL;
    }

    public String getScript() {
        return script;
    }

    public String getUrl() {
        return url;
    }

	public String getCsrChatGroup() {
		return csrChatGroup;
	}

	public boolean isOfflineSupportEnabled() {
		return offlineSupportEnabled;
	}
    
    
}

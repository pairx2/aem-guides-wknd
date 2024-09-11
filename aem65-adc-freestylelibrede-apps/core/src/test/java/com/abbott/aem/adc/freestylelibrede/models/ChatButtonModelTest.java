package com.abbott.aem.adc.freestylelibrede.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.services.CsrConfigurationService;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class ChatButtonModelTest extends BaseModelTest<ChatButtonModel> {

    private final AemContext context = new AemContext();

    @Mock
    CsrConfigurationService csrConfigurationService;

    ChatButtonModel model;

    @BeforeEach
    void setup(){
        Mockito.when(csrConfigurationService.getEndpoint()).thenReturn("http://www.salesforce.com");
        Mockito.when(csrConfigurationService.getChatInit()).thenReturn("http://www.salesforce.com/chat-init");
        Mockito.when(csrConfigurationService.getOrgId()).thenReturn("org-id");
        Mockito.when(csrConfigurationService.getChatLiveAgentContentUrl()).thenReturn("http://www.salesforce.com/live-agent-content");
        Mockito.when(csrConfigurationService.getChatLiveAgentUrl()).thenReturn("http://www.salesforce.com/live-agent-url");
        Mockito.when(csrConfigurationService.getChatDeploymentId()).thenReturn("depId");
        Mockito.when(csrConfigurationService.getChatButtonId()).thenReturn("buttonId");
        Mockito.when(csrConfigurationService.getChatScript()).thenReturn("script");
        Mockito.when(csrConfigurationService.getChatUrl()).thenReturn("chatURL");
        Mockito.when(csrConfigurationService.getCsrChatGroup()).thenReturn("csrChatGroup");
        Mockito.when(csrConfigurationService.isOfflineSupportEnabled()).thenReturn(true);

        context.registerService(CsrConfigurationService.class,csrConfigurationService);
        model = loadModel(ChatButtonModel.class);
    }
    @Test
    void getChatEndpoint() {
        Assert.assertEquals("http://www.salesforce.com",model.getChatEndpoint());
    }

    @Test
    void getChatInit() {
        Assert.assertEquals("http://www.salesforce.com/chat-init",model.getChatInit());
    }

    @Test
    void getOrgId() {
        Assert.assertEquals("org-id",model.getOrgId());
    }

    @Test
    void getLiveAgentContentURL() {
        Assert.assertEquals("http://www.salesforce.com/live-agent-content",model.getLiveAgentContentURL());
    }

    @Test
    void getDeploymentId() {
        Assert.assertEquals("depId",model.getDeploymentId());
    }

    @Test
    void getButtonId() {
        Assert.assertEquals("buttonId",model.getButtonId());
    }

    @Test
    void getLiveAgentURL() {
        Assert.assertEquals("http://www.salesforce.com/live-agent-url",model.getLiveAgentURL());
    }

    @Test
    void getScript() {
        Assert.assertEquals("script",model.getScript());
    }

    @Test
    void getUrl() {
        Assert.assertEquals("chatURL",model.getUrl());
    }
    
    @Test
    void getCsrChatGroup() {
    	Assert.assertEquals("csrChatGroup",model.getCsrChatGroup());
    }
    
    @Test
    void isOfflineSupportEnabled() {
    	Assert.assertTrue(model.isOfflineSupportEnabled());
    }
}
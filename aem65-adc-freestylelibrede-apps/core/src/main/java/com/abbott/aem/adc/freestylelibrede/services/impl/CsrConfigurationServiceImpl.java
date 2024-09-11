package com.abbott.aem.adc.freestylelibrede.services.impl;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

import com.abbott.aem.adc.freestylelibrede.services.CsrConfigurationService;

@Component(
		service = CsrConfigurationService.class,
		immediate = true,
		configurationPolicy = ConfigurationPolicy.REQUIRE
)
@Designate(ocd = CsrConfigurationServiceImpl.Configuration.class)
public class CsrConfigurationServiceImpl implements CsrConfigurationService {
	private String orgId;
	private String chatScript;
	private String chatUrl;
	private String chatLiveAgentContentURL;
	private String chatLiveAgentUrl;
	private String chatInit;
	private String endpoint;
	private String chatDeploymentId;
	private String chatButtonId;
	private String csrChatGroup;
	private boolean offlineSupportEnabled;
	

	@Activate
	public void init(Configuration configuration) {
		orgId = configuration.csr_orgid();
		chatScript = configuration.csr_chat_script();
		chatUrl = configuration.csr_chat_url();
		chatLiveAgentContentURL = configuration.csr_chat_liveAgent_ContentURL();
		chatLiveAgentUrl = configuration.csr_chat_liveAgent_URL();
		chatInit = configuration.csr_chat_init();
		endpoint = configuration.csr_endpoint();
		chatDeploymentId = configuration.csr_chat_deploymentId();
		chatButtonId = configuration.csr_chat_buttonId();
		csrChatGroup = configuration.csr_chat_group();
		offlineSupportEnabled = configuration.is_offline_support_enabled();
	}

	@Override
	public String getOrgId() {
		return orgId;
	}

	@Override
	public String getChatScript() {
		return chatScript;
	}

	@Override
	public String getChatUrl() {
		return chatUrl;
	}

	@Override
	public String getChatLiveAgentContentUrl() {
		return chatLiveAgentContentURL;
	}

	@Override
	public String getChatLiveAgentUrl() {
		return chatLiveAgentUrl;
	}

	@Override
	public String getChatInit() {
		return chatInit;
	}

	@Override
	public String getEndpoint() {
		return endpoint;
	}

	@Override
	public String getChatDeploymentId() {
		return chatDeploymentId;
	}

	@Override
	public String getChatButtonId() {
		return chatButtonId;
	}	
	
	@Override
	public String getCsrChatGroup() {
		return csrChatGroup;
	}
	
	@Override
	public boolean isOfflineSupportEnabled() {
		return offlineSupportEnabled;
	}



	@SuppressWarnings("squid:S00100")
	@ObjectClassDefinition(name = "ADC Freestyle Libre DE - CSR Configuration Service")
	protected static @interface Configuration {
		@AttributeDefinition(
				name = "Organisation ID"
		)
		String csr_orgid() default "00D4E000000DoHz";

		@AttributeDefinition(
				name = "Script to load to chat"
		)
		String csr_chat_script() default "https://b2c--0037.cs83.my.salesforce.com/embeddedservice/5.0/esw.min.js";

		@AttributeDefinition(
				name = "URL on which the chat should run"
		)
		String csr_chat_url() default "https://service.force.com";

		@AttributeDefinition(
				name = "Chat Live Agent Content URL"
		)
		String csr_chat_liveAgent_ContentURL() default "https://c.la1-c1cs-par.salesforceliveagent.com/content";

		@AttributeDefinition(
				name = "Chat Live Agent URL"
		)
		String csr_chat_liveAgent_URL() default "https://d.la1-c1cs-par.salesforceliveagent.com/chat";

		@AttributeDefinition(
				name = "Chat Init URL"
		)
		String csr_chat_init() default "https://0037-chatting.cs83.force.com/liveAgent";

		@AttributeDefinition(
				name = "Chat Endpoint"
		)
		String csr_endpoint() default "https://b2c--0037.cs83.my.salesforce.com";

		@AttributeDefinition(
				name = "Chat Deployment ID"
		)
		String csr_chat_deploymentId() default "5724E0000008Pj6";

		@AttributeDefinition(
				name = "Chat Button ID"
		)
		String csr_chat_buttonId() default "5734E0000008SiY";
		@AttributeDefinition(
				name = "Csr Ghat Group"
		)
		String csr_chat_group() default "CSR_Chat_Group";
		@AttributeDefinition(
                name = "Is Offline Support Enabled",
                type = AttributeType.BOOLEAN
        )
        boolean is_offline_support_enabled() default true;
	}
}
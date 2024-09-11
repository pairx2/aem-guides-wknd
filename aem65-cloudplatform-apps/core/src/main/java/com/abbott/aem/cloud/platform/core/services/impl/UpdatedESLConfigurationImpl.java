package com.abbott.aem.cloud.platform.core.services.impl;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.cloud.platform.core.constants.CommonConstants;
import com.abbott.aem.cloud.platform.core.services.UpdatedESLConfiguration;

@Component(service = UpdatedESLConfiguration.class, immediate = true)
@Designate(ocd = UpdatedESLConfigurationImpl.Config.class)

public class UpdatedESLConfigurationImpl implements UpdatedESLConfiguration {

	@ObjectClassDefinition(name = "Updated ESL Configuration", description = "Configurations for Updated ESL integration")
	public static @interface Config {

		@AttributeDefinition(name = "Environment Name", description = "Environment Name", defaultValue = CommonConstants.EMPTY)
		public String environment();

		@AttributeDefinition(name = "Product Api Url", description = "ESL API URL", defaultValue = CommonConstants.EMPTY)
		public String eslApiUrl();

		@AttributeDefinition(name = "xapplication access key", description = "x application access key used for ESL API", defaultValue = CommonConstants.EMPTY)
		public String xApplicationAccessKey();

		@AttributeDefinition(name = "Content Type", description = "Content Type for ESL API", defaultValue = CommonConstants.EMPTY)
		public String contentType();
		
		@AttributeDefinition(name = "xoriginsecret", description = "xoriginsecret used for ESL API", defaultValue = "")
		public String xOriginSecret();

	}

	private static final Logger LOGGER = LoggerFactory.getLogger(UpdatedESLConfigurationImpl.class);

	private String apiUrl;
	private String xApplicationAccessKey;
	private String environment;
	private String contentType;
	private String xOriginSecret;

	@Activate
	protected void activate(final Config eslConfigs) {

		LOGGER.debug("in activate method of UpdatedESLConfigurationImpl");
		this.environment = eslConfigs.environment();
		this.apiUrl = eslConfigs.eslApiUrl();
		this.xApplicationAccessKey = eslConfigs.xApplicationAccessKey();
		this.contentType = eslConfigs.contentType();
		this.xOriginSecret = eslConfigs.xOriginSecret();
	}

	public String getEnvironment() {
		return environment;
	}

	public String getContentType() {
		return contentType;
	}

	public String getApiUrl() {
		return apiUrl;
	}

	public String getxApplicationAccessKey() {
		return xApplicationAccessKey;
	}	
	
	public String getxOriginSecret() {
		return xOriginSecret;
	}

}
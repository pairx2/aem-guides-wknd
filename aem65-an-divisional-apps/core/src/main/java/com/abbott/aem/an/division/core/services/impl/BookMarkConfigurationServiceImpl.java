package com.abbott.aem.an.division.core.services.impl;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.an.division.core.services.BookMarkConfigurationService;
import com.abbott.aem.an.division.core.utils.Constants;

@Component(service = BookMarkConfigurationService.class, immediate = true)
@Designate(ocd = BookMarkConfigurationServiceImpl.Config.class)

public class BookMarkConfigurationServiceImpl implements BookMarkConfigurationService {

	@ObjectClassDefinition(name = "AN PPC Bookshelf Author ESL Configuration", description = "Configurations for Bookmark ESL integration")
	public static @interface Config {

		@AttributeDefinition(name = "Bookmark Api Url", description = "ESL API URL", defaultValue = Constants.EMPTY)
		public String eslApiUrl();

		@AttributeDefinition(name = "xapplication access key", description = "x application access key used for ESL API", defaultValue = Constants.EMPTY)
		public String xApplicationAccessKey();

		@AttributeDefinition(name = "Content Type", description = "Content Type for ESL API", defaultValue = Constants.EMPTY)
		public String contentType();

		@AttributeDefinition(name = "Country Code", description = "Country code value used for Bookmark API", defaultValue = Constants.EMPTY)
		public String xCountryCode();

		@AttributeDefinition(name = "Preferred Language", description = "Preferred language used for Bookmark API", defaultValue = Constants.EMPTY)
		public String xPreferredLanguage();

		@AttributeDefinition(name = "Application ID", description = "Application ID used for Bookmark API", defaultValue = Constants.EMPTY)
		public String xApplicationId();

		@AttributeDefinition(name = "Domain URL", description = "Domain URL used for ESL API", defaultValue = Constants.EMPTY)
		public String domainUrl();
		
		@AttributeDefinition(name = "Session Path", description = "Session Path For Event", defaultValue = Constants.EMPTY)
		public String sessionPath();
		
		@AttributeDefinition(name = "Module of an Article", description = "Module of an Article", defaultValue = Constants.EMPTY)
		public String[] module();
		
		@AttributeDefinition(name = "Origin Secret Key", description = "Origin Secret Key", defaultValue = Constants.EMPTY)
		public String xOriginSecretKey();

	}

	private static final Logger LOGGER = LoggerFactory.getLogger(BookMarkConfigurationServiceImpl.class);

	private String apiUrl;
	private String xApplicationAccessKey;
	private String contentType;
	private String countryCode;
	private String preferredLanguage;
	private String domainUrl;
	private String xApplicationId;
	private String sessionPath;
	private String xOriginSecretkey;
	private String[] module;

	@Activate
	protected void activate(final Config eslConfigs) {

		this.apiUrl = eslConfigs.eslApiUrl();
		this.xApplicationAccessKey = eslConfigs.xApplicationAccessKey();
		this.contentType = eslConfigs.contentType();
		this.xApplicationId = eslConfigs.xApplicationId();
		this.preferredLanguage = eslConfigs.xPreferredLanguage();
		this.countryCode = eslConfigs.xCountryCode();
		this.domainUrl = eslConfigs.domainUrl();
		this.sessionPath = eslConfigs.sessionPath();
		this.xOriginSecretkey = eslConfigs.xOriginSecretKey();
		this.module = eslConfigs.module();
		LOGGER.info("In activate method of BookMarkConfigurationServiceImpl ==> {} == {} == {} == {} == {} == {} == {} == {} == {} ",this.apiUrl,this.xApplicationAccessKey,this.contentType,this.xApplicationId,this.preferredLanguage, this.countryCode, this.domainUrl, this.sessionPath,this.module);
	}

	public String getDomainUrl() {
		return domainUrl;
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

	public String getCountryCode() {
		return countryCode;
	}

	public String getPreferredLanguage() {
		return preferredLanguage;
	}

	public String getxApplicationId() {
		return xApplicationId;
	}
	
	public String getSessionPath() {
		return sessionPath;
	}
	
	public String getxOriginSecretKey() {
		return xOriginSecretkey;
	}
	
	public String[] getModule() {
		return module.clone();
	}
}

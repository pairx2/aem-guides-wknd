package com.abbott.aem.an.division.api.jobs;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(immediate = true, service = EmailRunJobConfiguration.class)
@Designate(ocd = EmailRunJobConfiguration.Config.class)
public class EmailRunJobConfiguration {
	private static final Logger LOGGER = LoggerFactory.getLogger(EmailRunJobConfiguration.class);

	@ObjectClassDefinition(name = "Abbott Division - Email ESL API Configuration", description = "Abbott Division - Email ESL API Configuration")
	public @interface Config {

		@AttributeDefinition(name = "Application Id", description = "Email API request have to contain below key as a 'x-application-access-id' header",defaultValue="anaemworkflow")
		String getApplicationId();
		
		@AttributeDefinition(name = "Domain Name", description = "Email API request have to contain below as a 'domainName'",defaultValue="https://dev2.services.abbott")
		String getDomainName();
		
		@AttributeDefinition(name = "Service URL", description = "Email API request have to contain below as a 'serviceUrl'",defaultValue="/api/system/notification/notification" )
		String getServiceUrl();
		
		@AttributeDefinition(name = "Application Access Key", description = "Email API request have to contain below key as a 'x-application-access-key' header", defaultValue="YWVtc3lzdGVtYWNjZXNzMmdyYXBocWw=")
		String getApplicationAccessKey();
		
		@AttributeDefinition(name = "Origin Secret Key", description = "Email API request have to contain below key as a 'origin-secret-key' header", defaultValue="c5b292d1290fce1c463af73ead3897a8")
		String getOriginSecretKey();

	}
	private String accessId;
	private String domainName;
	private String serviceUrl;
	private String applicationAccessKey;
	private String originSecretKey;

	@Activate
	@Modified
	protected void activate(final Config config) {		
		this.accessId = config.getApplicationId();
		this.domainName = config.getDomainName();
		this.serviceUrl = config.getServiceUrl();
		this.applicationAccessKey = config.getApplicationAccessKey();
		this.originSecretKey = config.getOriginSecretKey();
		LOGGER.debug("In Activate Email Configuration ==> {} == {} == {} == {} ", this.accessId , this.domainName , this.serviceUrl , this.applicationAccessKey, this.originSecretKey);
	}

	public String getApplicationId() {
		return accessId;
	}
	
	public String getDomainName() {
		return domainName;
	}
	
	public String getServiceUrl() {
		return serviceUrl;
	}
	
	public String getApplicationAccessKey() {
		return applicationAccessKey;
	}
	
	public String getOriginSecretKey() {
		return originSecretKey;
	}
	

}

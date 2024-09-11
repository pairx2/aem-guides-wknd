package com.abbott.aem.cloud.platform.core.redirects.services;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Abbott Platform - URL Redirect Service Configuration", description = "URL Redirect Service Configuration Details")
public @interface ManageUrlRedirectConfig {

	@AttributeDefinition(name = "Host Name", description = "HostName For Enterprise Services")
	String getHostName() default "https://dev2.services.abbott";

	@AttributeDefinition(name = "Origin Secret Key", description = "Origin Secret Key For Enterprise Services")
	String getOriginSecret();
	
	@AttributeDefinition(name = "URL Redirection EndPoint", description = "Endpoint For URL Redirection API")
	String getEndpoint() default "/api/system/url-redirection";
	
	@AttributeDefinition(name = "Application Access Key", description = "Application Access Key For Enterprise Services")
	String getAccessKey();

	@AttributeDefinition(name = "Pipeline ID", description = "Pipeline ID For URL Redirection")
	String getPipelineId() default "pipeline1";
	
}

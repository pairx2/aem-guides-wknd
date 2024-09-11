package com.abbott.aem.cloud.platform.core.redirects.models;

import org.apache.sling.caconfig.annotation.Configuration;
import org.apache.sling.caconfig.annotation.Property;

@Configuration(name = "URLRedirect", label = "URL Redirect Configuration", description = "URL Redirect Configuration")
public @interface UrlRedirectConfig {
	
	@Property(label = "x-preferred-language", description = "x-preferred-language")
	String preferredLanguage();

	@Property(label = "Site Id", description = "Site Id")
	String siteId();

	@Property(label = "x-country-code", description = "x-country-code")
	String countryCode();

	@Property(label = "x-application-id", description = "x-application-id")
	String applicationId();
	
	@Property(label = "state", description = "state")
	String state() default "NEW";

}

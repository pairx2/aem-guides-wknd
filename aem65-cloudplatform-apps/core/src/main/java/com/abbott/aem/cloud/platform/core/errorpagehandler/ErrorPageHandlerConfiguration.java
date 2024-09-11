/*
* Copyright (c) Abbott
*/
package com.abbott.aem.cloud.platform.core.errorpagehandler;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.osgi.service.metatype.annotations.Option;

/**
 * This is the configuration class that takes properties for a error handler to run
 */
@ObjectClassDefinition(name = "ErrorPageHandlerConfiguration", description = "Error Page Handler Configuration")
public @interface ErrorPageHandlerConfiguration {
	
	@AttributeDefinition(
			name = "Enable", 
			description = "Enables/Disables the error handler. [Required]", 
			type = AttributeType.BOOLEAN)
	public boolean enabled() default true;

	@AttributeDefinition(
			name = "Vanity Dispatch Check", 
			description = "Enables/Disables Vanity Dispatch check, "
            + "if this is enabled and current request URI is a valid vanity (after performing resource resolver mapping), "
            + "request will be forwarded to it. [Optional... but recommended when using resource resolver based out-going mapping] [Default: false]", 
			type = AttributeType.BOOLEAN)
	public boolean vanity_dispatch_enabled() default true;

	@AttributeDefinition(
			name = "Error page extension", 
			description = "Examples: html, htm, xml, json. [Optional] [Default: html]", 
			type = AttributeType.STRING)
	public String errorpage_extension() default "html";
	
	@AttributeDefinition(
			name = "Fallback error page name", 
			description = "Error page name (not path) to use if a valid Error Code/Error Servlet Name cannot be "
                    + "retrieved from the Request. [Required] [Default: 500]", 
			type = AttributeType.STRING)
	public String errorpage_fallbackname() default "500";
	
	@AttributeDefinition(
			name = "System error page", 
			description = "Absolute path to system Error page resource to serve if no other more appropriate "
                    + "error pages can be found. Does not include extension. [Optional... but highly recommended]", 
			type = AttributeType.STRING)
	public String errorpage_systempath() default "";
	
	@AttributeDefinition(
			name = "Error page paths", 
			description = "List of inclusive content trees under which error pages may reside, "
                    + "along with the name of the the default error page for the content tree. This is a "
                    + "fallback/less powerful option to adding the ./errorPages property to CQ Page property dialogs."
                    + " Example: /content/geometrixx/en:errors [Optional]", 
			type = AttributeType.STRING)
	public String[] paths() default {};
	
	@AttributeDefinition(
			name = "Not Found Behavior", 
			description = "Default resource not found behavior. [Default: Respond with 404]", 
			options = { @Option(label = "Redirect to Login", value = "redirect-to-login"), 
						@Option(label = "Respond with 404", value = "respond-with-404") })
	public String notfound_behavior() default "respond-with-404";
	
   	@AttributeDefinition(
			name = "Not Found Exclusions", 
			description = "Regex path patterns that will act in the \"other\" (redirect-to-login vs. "
                    + " respond-with-404) way to the \"Not Found Behavior\". This allows the usual Not Found behavior"
                    + " to be defined via \"not-found.behavior\" with specific exclusions defined here. [Optional]", 
			type = AttributeType.STRING)
	public String[] notfound_exclusionpathpatterns() default {};
	
	@AttributeDefinition(
			name = "Serve authenticated from cache", 
			description = "Serve authenticated requests from the error page cache. [ Default: false ]", 
			type = AttributeType.BOOLEAN)
	public boolean cache_serveauthenticated() default false;
	
	@AttributeDefinition(
			name = "TTL (in seconds)", 
			description = "TTL for each cache entry in seconds. [ Default: 300 ]", 
			type = AttributeType.INTEGER)
	public int cache_ttl() default 300;
	
	@AttributeDefinition(
			name = "Enable placeholder images", 
			description = "Enable image error handling  [ Default: false ]", 
			type = AttributeType.BOOLEAN)
	public boolean errorimages_enabled() default false;
	
	@AttributeDefinition(
			name = "Error image path/selector", 
			description = "Accepts a selectors.extension (ex. `.img.png`) absolute, or relative path. "
                    + "If an extension or relative path, this value is applied to the resolved error page."
                    + " Note: This concatenated path must resolve to a nt:file else a 200 response will be sent."
                    + " [ Optional ] [ Default: .img.png ]", 
			type = AttributeType.STRING)
	public String errorimages_path() default ".img.png";
	
	@AttributeDefinition(
			name = "Error image extensions", 
			description = "List of valid image extensions (no proceeding .) to handle. "
                    + "Example: 'png' "
                    + "[ Optional ] [ Default: png, jpeg, jpeg, gif ]", 
			type = AttributeType.STRING)
	public String[] errorimages_extensions() default {"jpg", "jpeg", "png", "gif"};
}
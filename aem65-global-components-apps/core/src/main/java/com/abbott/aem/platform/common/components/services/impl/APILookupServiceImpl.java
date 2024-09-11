package com.abbott.aem.platform.common.components.services.impl;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

import lombok.Data;

import com.abbott.aem.platform.common.components.services.APILookupService;
import com.abbott.aem.platform.common.components.services.ApiResponse;
import com.abbott.aem.platform.common.components.services.HttpService;
import com.abbott.aem.platform.common.components.services.HttpMethod;
import com.abbott.aem.platform.common.constants.CommonConstants;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.tagging.TagConstants;
import com.day.cq.wcm.api.Page;

import org.apache.http.HttpException;
import org.apache.http.HttpStatus;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpHeaders;
import org.apache.sling.api.resource.Resource;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * The Class APILookupServiceImpl.
 */
@Data
@Component(service = APILookupService.class)
@Designate(ocd = APILookupServiceImpl.Config.class)
public class APILookupServiceImpl implements APILookupService {

	/**
	 * The Constant SITE_NAME.
	 */
	protected static final String SITE_NAME = "siteName";
	/**
	 * The Constant US.
	 */
	private static final String US = "US";
	/**
	 * The Constant LOGGER.
	 */
	private static final Logger LOGGER = LoggerFactory.getLogger(APILookupServiceImpl.class);
	/**
	 * The Constant ABBOTTCOM.
	 */
	private static final String ABBOTTCOM = "abbottcom";
	/**
	 * The config.
	 */
	protected Config config;
	/**
	 * The domain name.
	 */
	private String domainName;
	/**
	 * The secret key.
	 */
	private String secretKey;
	/**
	 * The api endpoints.
	 */
	private Map<String, String> apiEndpoints;
	
	/**
	 * The country name.
	 */
	private static final String SITE_COUNTRY_CODE = "countryCode";
	
	/**
	 * Configure.
	 *
	 * @param config the config
	 */
	@Activate
	@Modified
	void configure(Config config) {
		this.config = config;
		this.domainName = StringUtils.removeEnd(this.config.getDomainName(), TagConstants.SEPARATOR);
		this.secretKey = this.config.getSecretKey();
		String[] endpoints = this.config.getEnterpriseServiceApiEndpoints();
		if (endpoints.length > 0) {
			apiEndpoints = Arrays.asList(endpoints).stream().map(elem -> elem.split("::")).collect(Collectors.toMap(e -> e[0].trim(), e -> e[1].trim()));
		}
	}

	/**
	 * Prepare request header.
	 *
	 * @param page the page
	 * @return the hash map
	 */
	private HashMap<String, String> prepareRequestHeader(Page page) {
		HashMap<String, String> requestHeaders = new HashMap<>();
		LOGGER.debug("Entered prepareRequestHeader with resource {}", page.getPath());
		InheritanceValueMap inheritedProperties = getInheritanceValueMap(page.getContentResource());
		Locale locale = page.getLanguage();
		requestHeaders.put(CommonConstants.X_APPLICATION_ID, getInheritedProperty(inheritedProperties, SITE_NAME, ABBOTTCOM));
		requestHeaders.put(CommonConstants.X_PREFERRED_LANGUAGE, locale.getLanguage().toUpperCase());
		String country = getInheritedProperty(inheritedProperties, SITE_COUNTRY_CODE, StringUtils.EMPTY);
		if (StringUtils.isNotBlank(country)) {
			requestHeaders.put(CommonConstants.X_COUNTRY_CODE, country.toUpperCase());
		} else if (StringUtils.isNotBlank(locale.getCountry())) {			
			requestHeaders.put(CommonConstants.X_COUNTRY_CODE, locale.getCountry().toUpperCase());
		} else {
			requestHeaders.put(CommonConstants.X_COUNTRY_CODE, US);
		}
		requestHeaders.put(HttpHeaders.CONTENT_TYPE, "application/json");
		if (StringUtils.isNotBlank(this.secretKey)) {
			requestHeaders.put(CommonConstants.X_ORIGIN_SECRET, this.secretKey);
		}
		LOGGER.debug("MAP is:::::{}", requestHeaders);

		return requestHeaders;
	}

	/**
	 * Gets the inheritance value map.
	 *
	 * @param pageResource the page resource
	 * @return the inheritance value map
	 */
	public HierarchyNodeInheritanceValueMap getInheritanceValueMap(Resource pageResource) {
		return new HierarchyNodeInheritanceValueMap(pageResource);
	}

	/**
	 * Process request.
	 *
	 * @param page        the page
	 * @param relEndPoint the rel end point
	 * @param httpMethod  the http method
	 * @param requestBody the request body
	 * @return the string
	 * @throws IOException Signals that an I/O exception has occurred.
	 * @throws HttpException 
	 */
	@Override
	public String processRequest(Page page, String relEndPoint, HttpMethod httpMethod, String requestBody) throws IOException, HttpException {
		LOGGER.debug("resource is:{}", page.getPath());
		String lookUpEndpointUrl = StringUtils.startsWith(relEndPoint, this.domainName) ? relEndPoint : this.domainName.concat(relEndPoint);
		LOGGER.debug("lookUpEndpointUrl is:{}", lookUpEndpointUrl);
		HashMap<String, String> requestHeaders = prepareRequestHeader(page);
		ApiResponse httpResponse = executeRequest(httpMethod, lookUpEndpointUrl, requestHeaders, requestBody);
		return sendResponseString(httpResponse);
	}

	/**
	 * Execute request.
	 *
	 * @param httpMethod      the http method
	 * @param requestEndpoint the request endpoint
	 * @param requestHeaders  the request headers
	 * @param requestBody     the request body
	 * @return the api response
	 * @throws IOException Signals that an I/O exception has occurred.
	 */
	private ApiResponse executeRequest(HttpMethod httpMethod, String requestEndpoint, HashMap<String, String> requestHeaders, String requestBody) throws IOException {
		LOGGER.debug("requestHeaders is:{}", requestHeaders);
		HttpService httpservice = getHTTPService(httpMethod, requestEndpoint, requestHeaders, requestBody);
		return httpservice.executeHTTPRequest();
	}

	/**
	 * Gets the HTTP service.
	 *
	 * @param httpMethod      the http method
	 * @param requestEndpoint the request endpoint
	 * @param requestHeaders  the request headers
	 * @param requestBody     the request body
	 * @return the HTTP service
	 */
	public HttpService getHTTPService(HttpMethod httpMethod, String requestEndpoint,
			Map<String, String> requestHeaders, String requestBody) {
		return new HttpServiceImpl(requestEndpoint, httpMethod, new HashMap<>(requestHeaders), requestBody);
	}

	/**
	 * Send response string.
	 *
	 * @param httpResponse the http response
	 * @return the string
	 * @throws HttpException the http exception
	 */
	private String sendResponseString(ApiResponse httpResponse) throws HttpException {
		String responseString = httpResponse.getResponseString();
		LOGGER.debug("responseString {}", responseString);
		if (httpResponse.getResponseCode() == HttpStatus.SC_OK) {
			return responseString;
		} else {
			throw new HttpException("Error while getteing the API response");
		}
	}

	/**
	 * Gets the inherited property.
	 *
	 * @param inheritedProperties the inherited properties
	 * @param propName            the prop name
	 * @param defaultValue        the default value
	 * @return the inherited property
	 */
	private String getInheritedProperty(InheritanceValueMap inheritedProperties, String propName, String defaultValue) {
		String propVal;
		if (inheritedProperties.getInherited(propName, String.class) != null) {
			propVal = inheritedProperties.getInherited(propName, String.class);
		} else {
			propVal = defaultValue;
		}
		return propVal;
	}

	/**
	 * Gets the request endpoint.
	 *
	 * @param relUrl the rel url
	 * @return the request endpoint
	 */
	@Override
	public String getRequestEndpoint(String relUrl) {
		return domainName.concat(relUrl);
	}

	/**
	 * Gets the API end point for key.
	 *
	 * @param apiEndpointKey the API end point key
	 * @return the API end point URL
	 * @throws IllegalArgumentException if key is not configured/present.
	 */
	@Override
	public String getAPIEndpointForKey(String apiEndpointKey) {
		if (apiEndpoints.containsKey(apiEndpointKey)) {
			return domainName.concat(apiEndpoints.get(apiEndpointKey));
		} else {
			throw new IllegalArgumentException("API endpoint for the provided key " + apiEndpointKey + " doesn't exist");
		}
	}
	
	/**
	 * Gets the Relative API end point for key i.e. without domain prefix.
	 * 
	 * @param apiEndpointKey the API end point key
	 * @return the API end point relative URL i.e. without domain prefix
	 * @throws IllegalArgumentException if key is not configured/present.
	 */
	@Override
	public String getRelativeAPIEndpointForKey(String apiEndpointKey) {
		if (apiEndpoints.containsKey(apiEndpointKey)) {
			return apiEndpoints.get(apiEndpointKey);
		} else {
			throw new IllegalArgumentException("API endpoint for the provided key " + apiEndpointKey + " doesn't exist");
		}
	}
	
	@Override
	public String getSecretKey() {
		return this.secretKey;
	}

	/**
	 * The Interface Config.
	 */
	@ObjectClassDefinition(name = "Abbott Enterprise Service API",
						   description = "Service API configuration details")
	public @interface Config {

		/**
		 * Gets the domain name.
		 *
		 * @return the domain name
		 */
		@AttributeDefinition(name = "API Endpoint HTTP Domain",
							 description = "Service API Domain name") String getDomainName() default "https://dev2.services.abbott";

		/**
		 * Gets the secret key.
		 *
		 * @return the secret key
		 */
		@AttributeDefinition(name = "API Secret Key",
							 description = "API secret key which is encrypted") String getSecretKey() default "";

		/**
		 * Gets the enterprise service api endpoints.
		 *
		 * @return the enterprise service api endpoints
		 */
		@AttributeDefinition(name = "API Endpoints",
							 description = "API End Points, format example: {key}::{relative " + "api endpoint url}") String[] getEnterpriseServiceApiEndpoints() default { "siteSearch::/api/public/search/sitesearch",
				"querySuggest::/api/public/search/querySuggest", "geolocation::/api/public/lookup/geolocation" , "sessionApi::/api/private/profile/session", "searchRegisterApi::/api/public/event/registercontentevent"};
	}

}
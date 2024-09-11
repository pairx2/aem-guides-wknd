package com.abbott.aem.bts.cybersecurity.services.impl;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.apache.http.HttpException;
import org.apache.http.HttpStatus;
import org.apache.commons.lang3.StringUtils;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.bts.cybersecurity.constants.SchedulerConstants;
import com.abbott.aem.bts.cybersecurity.services.JsonFetchService;
import com.abbott.aem.bts.cybersecurity.services.impl.HttpServiceImpl.HttpMethod;
import com.abbott.aem.platform.common.components.services.ApiResponse;
import com.abbott.aem.platform.common.components.services.HttpService;
import com.abbott.aem.platform.common.constants.CommonConstants;

/**
 *
 * This Service helps us to getting the JSON from the API.
 *
 *
 */
@Component(service = JsonFetchService.class)
@Designate(ocd = JsonFetchServiceImpl.jsonFetchConfig.class)
public class JsonFetchServiceImpl implements JsonFetchService {

	private final Logger log = LoggerFactory.getLogger(JsonFetchServiceImpl.class);

	String domainName = null;
	String endPoint = null;
	String applicationAccessKey = null;
	String applicationId = null;
	String secretKey = null;

	@Override
	public String getJson() throws HttpException {
		String response = null;
		try {
			response = processRequest(String.format("%1$s%2$s", domainName, endPoint), HttpMethod.GET, null);
		} catch (IOException e) {
			log.error("Exception in getJson method", e);
		}
		return response;
	}

	private Map<String, String> prepareRequestHeader() {
		Map<String, String> requestHeaders = new HashMap<>();
		if (StringUtils.isNotBlank(this.applicationId)) {
			requestHeaders.put(CommonConstants.X_APPLICATION_ID, this.applicationId);
		}
		requestHeaders.put(CommonConstants.X_PREFERRED_LANGUAGE, SchedulerConstants.X_PREFERRED_LANGUAGE_VALUE);
		requestHeaders.put(CommonConstants.X_COUNTRY_CODE, SchedulerConstants.X_COUNTRY_CODE_VALUE);
		if (StringUtils.isNotBlank(this.applicationAccessKey)) {
			requestHeaders.put(SchedulerConstants.X_APPLICATION_ACCESS_KEY, this.applicationAccessKey);
		}
		if (StringUtils.isNotBlank(this.secretKey)) {
			requestHeaders.put(CommonConstants.X_ORIGIN_SECRET, this.secretKey);
		}
		log.debug("MAP is:::::{}", requestHeaders);
		return requestHeaders;
	}

	public String processRequest(String relEndPoint, HttpMethod httpMethod, String requestBody) throws IOException, HttpException  {
		log.debug("lookUpEndpointUrl is:{}", relEndPoint);
		Map<String, String> requestHeaders = prepareRequestHeader();
		ApiResponse httpResponse = executeRequest(httpMethod, relEndPoint, requestHeaders, requestBody);
		return sendResponseString(httpResponse);
	}

	private ApiResponse executeRequest(HttpMethod httpMethod, String requestEndpoint,
									   Map<String, String> requestHeaders, String requestBody) throws IOException {
		log.debug("requestHeaders is:{}", requestHeaders);
		HttpService httpservice = getHTTPService(httpMethod, requestEndpoint, requestHeaders, requestBody);
		return httpservice.executeHTTPRequest();
	}

	public HttpService getHTTPService(HttpMethod httpMethod, String requestEndpoint, Map<String, String> requestHeaders,
									  String requestBody) {
		return new HttpServiceImpl(requestEndpoint, httpMethod, requestHeaders, requestBody);
	}

	protected String sendResponseString(ApiResponse httpResponse) throws HttpException {
		String responseString = httpResponse.getResponseString();
		if (httpResponse.getResponseCode() == HttpStatus.SC_OK) {
			return responseString;
		} else {
			throw new HttpException("Error while getting the API response");
		}
	}

	@Activate
	@Modified
	void configure(jsonFetchConfig config) {
		log.debug("its here");
		domainName = config.domainName();
		endPoint = config.enterpriseServiceApiEndpoints();
		applicationAccessKey = config.applicationAccessKey();
		applicationId = config.applicationID();
		secretKey = config.secretKey();
	}

	@ObjectClassDefinition(name = "Abbott Cybersecurity Json Fetch")
	public @interface jsonFetchConfig {
		@AttributeDefinition(name = "API Endpoint HTTP Domain", description = "Service API Domain name")
		String domainName() default "https://dev2.services.abbott";

		@AttributeDefinition(name = "Application access Key", description = "Applicatipn access key which is encrypted")
		String applicationAccessKey() default "";

		@AttributeDefinition(name = "API Endpoints", description = "API End Points")
		String enterpriseServiceApiEndpoints() default "/api/system/getproductmetadata?type=productsecurity";

		@AttributeDefinition(name = "Application ID", description = "Application ID")
		String applicationID() default "cybersecurity";

		@AttributeDefinition(name = "API secret key", description = "API secret access key which is encrypted")
		String secretKey() default "";
	}
}

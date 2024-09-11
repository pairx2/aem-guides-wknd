
package com.abbott.aem.add.division.core.components.util;

import java.io.IOException;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.cloud.api.configuration.ApiRunJobConfiguration;
import com.abbott.aem.cloud.api.configuration.ESLDomainURLService;
import com.abbott.aem.platform.common.components.services.APILookupService;

@Component(immediate = true, service = ESLPostMethodUtil.class)
public class ESLPostMethodUtil {

	private static final Logger log = LoggerFactory.getLogger(ESLPostMethodUtil.class);
	private static final String X_APPLICATION_ID = "x-application-id";
	private static final String X_COUNTRY_CODE = "x-country-code";
	private static final String X_PREFERRED_LANGUAGE = "x-preferred-language";
	private static final String X_APPLICATION_ACCESS_KEY = "x-application-access-key";
	public static final String X_ORIGIN_SECRET = "x-origin-secret";
	private static final String CONTENT_TYPE = "Content-Type";

	@Reference
	private APILookupService apiLookupService;

	@Reference
	private ApiRunJobConfiguration keyConfig;

	@Reference
	private ESLDomainURLService domainConfig;

	private String resultSet = "";

	public String getProductResult(String lookup, String appId, String entity) {

		try {
		
			String apiKey = keyConfig.getApiKey();
			String originSecret = keyConfig.getESLOriginSecretKey();

			String endPoint = apiLookupService.getRequestEndpoint(lookup);
			log.debug(" lookup ==> {} ", lookup);
			log.debug(" endPoint ==> {} ", endPoint);
			
			HttpPost post = new HttpPost(endPoint);
			post.addHeader(X_APPLICATION_ID, appId);
			post.addHeader(X_PREFERRED_LANGUAGE, "en");
			post.addHeader(X_COUNTRY_CODE, "US");
			post.addHeader(X_APPLICATION_ACCESS_KEY, apiKey);
			post.addHeader(X_ORIGIN_SECRET, originSecret);
			post.addHeader(CONTENT_TYPE, "application/json");

			post.setEntity(new StringEntity(entity));

			log.debug(" X_APPLICATION_ACCESS_KEY ==> {} ", apiKey);
			log.debug(" X_ORIGIN_SECRET ==>  {} ", originSecret);

			try (CloseableHttpClient httpClient = HttpClients.createDefault();
					CloseableHttpResponse postResponse = httpClient.execute(post)) {

				if (postResponse.getStatusLine().getStatusCode() != 200) {
					log.debug("response code {} ", postResponse.getStatusLine().getStatusCode());
				}

				resultSet = EntityUtils.toString(postResponse.getEntity());
			}

		} catch (IllegalStateException | IOException e) {
			log.error(" Exception in ESLPostMethod {} ", e.getMessage());
		}
		log.debug(" results set from response in new method  {}", resultSet);

		return resultSet;
	}

}
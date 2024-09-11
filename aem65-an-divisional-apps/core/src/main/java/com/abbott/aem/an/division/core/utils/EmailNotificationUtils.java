package com.abbott.aem.an.division.core.utils;

import java.io.IOException;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.an.division.api.jobs.EmailRunJobConfiguration;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@Component(service = EmailNotificationUtils.class, immediate = true)
public class EmailNotificationUtils {

	private final Logger logger = LoggerFactory.getLogger(EmailNotificationUtils.class);
	
	private static final String X_APPLICATION_ID = "x-application-id";
	private static final String X_COUNTRY_CODE = "x-country-code";
	private static final String X_PREFERRED_LANGUAGE = "x-preferred-language";
	private static final String X_APPLICATION_ACCESS_KEY = "x-application-access-key";
	private static final String X_ORIGIN_SECRET_KEY = "x-origin-secret";
	private static final String CONTENT_TYPE = "Content-Type";
	

	// Method for Email Notification
		public String sendEmailNotification(String emailContent, EmailRunJobConfiguration emailJobs, String itemType) {
			logger.debug(" Inside sendEmailNotification  {}", emailContent);
			String requestBody;
			try {
				String xApplicationId = emailJobs.getApplicationId();
				String xApplicationAccessKey = emailJobs.getApplicationAccessKey();
				String xOriginSecretkey = emailJobs.getOriginSecretKey();
				String domainName = emailJobs.getDomainName();
				String[] domainUrlSplit= domainName.split("//");
				String[] domainServer= domainUrlSplit[domainUrlSplit.length-1].split("[.]");
				String environmentName = !domainServer[0].equalsIgnoreCase("services") ?  domainServer[0] : "Prod";
				logger.debug("environmentName {}",environmentName);
				String serviceURL = emailJobs.getServiceUrl();
				logger.debug("Email Headers:xApplicationId, xApplicationAccessKey, xOriginSecretkey, domainName, serviceURL {}, {}, {}, {}, {}",xApplicationId,xApplicationAccessKey,xOriginSecretkey, domainName,serviceURL);
	            if(itemType.equalsIgnoreCase("Activated_Items")) {
				 requestBody = "{\"notificationChannelList\": [ { \"channelType\": \"EMAIL\", \"channelKey\": "
						+ "\"PIMAEMNotification@abbott.com\" } ], \"payLoad\": { \"requestMap\": "
						+ "{ \"requestType\": \"order_confirmation\",  \"subject\":  \"Abbott Nutrition Workflow Activated Items Available for Review in "+ environmentName + "\","
						+ "\"content\": " + "\"" + emailContent + "\" }}}";
	            }
	            else {
	            	 requestBody = "{\"notificationChannelList\": [ { \"channelType\": \"EMAIL\", \"channelKey\": "
							+ "\"PIMAEMNotification@abbott.com\" } ], \"payLoad\": { \"requestMap\": "
							+ "{ \"requestType\": \"order_confirmation\",  \"subject\":  \"Abbott Nutrition Workflow De-Activated Items Available for Review in "+ environmentName + "\","
							+ "\"content\": " + "\"" + emailContent + "\" }}}";
	            }

	            logger.debug(" < ===== RequestBody Email Notification ====> {}", requestBody);
				JsonObject jsonObject = new JsonParser().parse(requestBody).getAsJsonObject();
				StringBuilder entity = new StringBuilder();
				String result = "";
				entity.append(jsonObject.toString());
				HttpPost post = new HttpPost(domainName + serviceURL);
				logger.debug(" full URL  ======>  {} and {} ", domainName, serviceURL);
				post.addHeader(X_APPLICATION_ID, xApplicationId);
				post.addHeader(X_PREFERRED_LANGUAGE, "en");
				post.addHeader(X_COUNTRY_CODE, "US");
				post.addHeader(X_APPLICATION_ACCESS_KEY, xApplicationAccessKey);
				post.addHeader(X_ORIGIN_SECRET_KEY, xOriginSecretkey);
				post.addHeader(CONTENT_TYPE, "application/json");
				post.setEntity(new StringEntity(entity.toString()));
				logger.debug("URL : {}", post.getURI());
				try (CloseableHttpClient httpClient = HttpClients.createDefault();
						CloseableHttpResponse response = httpClient.execute(post)) {
					if (response.getStatusLine().getStatusCode() != 200) {
						logger.debug("response code {} ", response.getStatusLine().getStatusCode());
					}
					result = EntityUtils.toString(response.getEntity());
				}
				logger.debug("JSON Response : {}", result);
				logger.debug("Email Notification JSON Response : {}", result);
				return result;
			} catch (IllegalStateException | IOException e) {
				logger.error("Error in Send Email Notification ", e);
			}
			return "";
		}
}

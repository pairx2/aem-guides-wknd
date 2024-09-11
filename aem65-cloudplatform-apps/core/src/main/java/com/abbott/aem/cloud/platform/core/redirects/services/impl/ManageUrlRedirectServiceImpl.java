package com.abbott.aem.cloud.platform.core.redirects.services.impl;

import static com.abbott.aem.cloud.platform.core.redirects.Types.States.*;
import com.abbott.aem.cloud.platform.core.redirects.models.*;
import com.abbott.aem.cloud.platform.core.redirects.services.ManageUrlRedirectConfig;
import com.abbott.aem.cloud.platform.core.redirects.services.ManageUrlRedirectService;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.NameConstants;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.caconfig.ConfigurationBuilder;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Calendar;
import java.util.List;

import javax.jcr.Session;

@Slf4j
@Component(service = ManageUrlRedirectService.class, immediate = true)
@Designate(ocd = ManageUrlRedirectConfig.class)
public class ManageUrlRedirectServiceImpl implements ManageUrlRedirectService {

	private static final String X_APPLICATION_ID = "x-application-id";
	private static final String X_COUNTRY_CODE = "x-country-code";
	private static final String X_PREFERRED_LANGUAGE = "x-preferred-language";
	private static final String X_APPLICATION_ACCESS_KEY = "x-application-access-key";
	private static final String X_ORIGIN_SECRET = "x-origin-secret";
	private static final String VERSION = "version";
	private static final String LAST_UPDATED_ON = "lastUpdatedOn";
	private static final String LAST_APPLIED_ON = "lastAppliedOn";
	private static final String LAST_PROMOTED_ON = "lastPromotedOn";
	private static final String LAST_CREATED_ON = "createdOn";
	private static final String STATE = "state";
	private static final String APPLY = "apply";
	private static final String PROMOTE = "promote";
	private static final String CREATE = "create";
	private static final String FETCH = "fetch";
	private static final String EMPTY_LIST = "emptyList";
	private static final String RESPONSE = "response";
	private static final String STATE_LOGGER = "State: {}";
	
	private String hostName;
	private String pipelineId;
	private String endPoint;
	private String accessKey;
	private String originSecret;
	private String user;

	private static final String ERROR_MESSAGE = "Oops!! Something went wrong. Please contact platform team.";

	private static final String CONCURRENCY_ERROR_MESSAGE = "Concurrency Error!! <br> Looks like the state has changed. <br> Fetching latest rules as other users might have taken some action.";

	private static final String OVERWRITE_SUCCESS_MESSAGE = "URL Redirects successfully overwritten from ESL";

	@Activate
	@Modified
	protected void activate(final ManageUrlRedirectConfig config) {
		log.debug("Start ACTIVATE Endpoint");
		this.hostName = config.getHostName();
		this.pipelineId = config.getPipelineId();
		this.endPoint = config.getEndpoint();
		this.accessKey = config.getAccessKey();
		this.originSecret = config.getOriginSecret();
		log.debug(
				"ManageUrlRedirectServiceImpl Activate with hostname: {}, endpoint: {}, accesskey: {} and pipelineid: {}",
				this.hostName, this.endPoint, this.accessKey, this.pipelineId);
	}

	@Override
	public CreateApplyPromoteResponse applyRedirectRule(Resource resource) {
		CreateApplyPromoteResponse applyResponse;
		UrlRedirectConfig urlRedirectConfig = getConfiguration(resource);
		String state = urlRedirectConfig.state();
		try {
			String response;
			log.debug(STATE_LOGGER, state);
			if (DRAFT.name().equals(state)) {
				response = createConnection(urlRedirectConfig, APPLY, null,user);
				applyResponse = createResponse(response, APPLIED.name(), state, "Rules applied successfully.");
			} else {
				applyResponse = CreateApplyPromoteResponse.builder().status(false).state(state)
						.message(CONCURRENCY_ERROR_MESSAGE)
						.errorCode(400).build();
			}
		} catch (RuntimeException | IOException e) {
			log.error("Error occured in applyRedirectRule: {}", e.getMessage(), e);
			applyResponse = CreateApplyPromoteResponse.builder().status(false).state(state)
					.message(ERROR_MESSAGE).errorCode(-1).build();
		}
		return applyResponse;
	}

	@Override
	public CreateApplyPromoteResponse promoteRedirectRule(Resource resource) {
		CreateApplyPromoteResponse promoteResponse;
		UrlRedirectConfig urlRedirectConfig = getConfiguration(resource);
		try {
			String response;
			log.debug(STATE_LOGGER, urlRedirectConfig.state());
			if (APPLIED.name().equals(urlRedirectConfig.state())) {
				response = createConnection(urlRedirectConfig, PROMOTE, null,user);
				promoteResponse = createResponse(response, PROMOTED.name(), urlRedirectConfig.state(),"Rules promoted successfully.");
			} else {
				promoteResponse = CreateApplyPromoteResponse.builder().status(false).state(urlRedirectConfig.state())
						.message(CONCURRENCY_ERROR_MESSAGE)
						.errorCode(400).build();
			}
		} catch (RuntimeException | IOException e) {
			log.error("Error occured in applyRedirectRule: {}", e.getMessage(), e);
			promoteResponse = CreateApplyPromoteResponse.builder().status(false).state(urlRedirectConfig.state())
					.message(ERROR_MESSAGE).errorCode(-1).build();
		}
		return promoteResponse;
	}

	@Override
	public CreateApplyPromoteResponse createRedirectRule(Resource resource, UrlRedirect redirectResource) {
		UrlRedirectConfig urlRedirectConfig = getConfiguration(resource);
		CreateApplyPromoteResponse createResponse;
		try {
			String response;
			user = getUser(resource);
			log.debug(STATE_LOGGER, urlRedirectConfig.state());
			if (EDITED.name().equals(urlRedirectConfig.state())) {
				List<Rule> mappings = redirectResource.getMappings();
				log.info("Rules - "+mappings);
				for (Rule rule:mappings) {
					log.info("Rules Added - "+rule);
				}
				response = createConnection(urlRedirectConfig, CREATE, mappings,user);
				updateRedirectProperties(resource, redirectResource);
				createResponse = createResponse(response, DRAFT.name(), urlRedirectConfig.state(),"Rules saved successfully.");
			} else {
				createResponse = CreateApplyPromoteResponse.builder().status(false).state(urlRedirectConfig.state())
						.message(CONCURRENCY_ERROR_MESSAGE)
						.errorCode(400).build();
			}

		} catch (RuntimeException | IOException e) {
			log.error("Error occured in createRedirectRule: {}", e.getMessage(), e);
			createResponse = CreateApplyPromoteResponse.builder().status(false).state(urlRedirectConfig.state())
					.message(ERROR_MESSAGE).errorCode(-1).build();
		}
		return createResponse;
	}

	private String getUser(Resource resource) {
		ValueMap property = resource.adaptTo(ValueMap.class);
		user = property.get(NameConstants.PN_PAGE_LAST_MOD_BY, "");
		return user;
	}

	private String createConnection(UrlRedirectConfig urlRedirectConfig, String requestType, List<Rule> mappings, String user)
			throws IOException {
		log.debug("Starting createConnection for requestType: {}", requestType);
		log.info("mappings" + mappings);
		String siteId = urlRedirectConfig.siteId();
		
		String jsonInputString = "";

		switch (requestType) {
			case APPLY:
				log.debug("RequestType Apply");
				jsonInputString = new Gson()
						.toJson(ApplyPromoteRedirectRequest.builder().action(APPLY).pipelineId(this.pipelineId).build());
				break;
			case PROMOTE:
				log.debug("RequestType promote");
				jsonInputString = new Gson().toJson(
						ApplyPromoteRedirectRequest.builder().action(PROMOTE).pipelineId(this.pipelineId).build());
				break;
			case CREATE:
				log.debug("RequestType create");
				jsonInputString = new ObjectMapper().writeValueAsString(CreateRedirectRequest.builder().action(CREATE)
						.pipelineId(this.pipelineId).mappings(mappings).modifiedBy(user).build());
				break;
			case FETCH:
				log.debug("RequestType fetch");
				break;
			default:
				log.debug("Invalid requestType: {}", requestType);

		}
        log.info("jsonInputString" + jsonInputString);
		StringBuilder sb = new StringBuilder(this.hostName);
		sb.append(this.endPoint);
		sb.append("?siteId=");
		sb.append(siteId);
		URL url = new URL(sb.toString());
		StringBuilder response = new StringBuilder();
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		log.debug("Application key: {}, countrycode: {}, preferedlang: {}", urlRedirectConfig.applicationId(),
				urlRedirectConfig.countryCode(), urlRedirectConfig.preferredLanguage());
		con.addRequestProperty(X_APPLICATION_ID, urlRedirectConfig.applicationId());
		con.addRequestProperty(X_COUNTRY_CODE, urlRedirectConfig.countryCode());
		con.addRequestProperty(X_PREFERRED_LANGUAGE, urlRedirectConfig.preferredLanguage());
		con.addRequestProperty(X_APPLICATION_ACCESS_KEY, this.accessKey);
		con.addRequestProperty(X_ORIGIN_SECRET, this.originSecret);
		con.setRequestProperty("Content-Type", "application/json");
		con.setRequestProperty("Accept", "application/json");
		con.setConnectTimeout(32000);
		con.setReadTimeout(32000);

		if(requestType.equalsIgnoreCase(FETCH)){
			con.setRequestMethod("GET");
		}
		else{
			con.setRequestMethod("POST");
			con.setDoOutput(true);
			try (OutputStream os = con.getOutputStream()) {
				byte[] input = jsonInputString.getBytes(StandardCharsets.UTF_8);
				os.write(input, 0, input.length);
			}
		}

		try (BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(), StandardCharsets.UTF_8))) {
			String responseLine = null;
			while ((responseLine = br.readLine()) != null) {
				response.append(responseLine.trim());
			}
			log.info("Response: {}", response.toString());
		}
		return response.toString();
	}

	public UrlRedirectConfig getConfiguration(Resource resource) {
		ConfigurationBuilder cb = resource.adaptTo(ConfigurationBuilder.class);
		return cb.as(UrlRedirectConfig.class);
	}

	@Override
	public void updateState(Resource resource, String status, String userName) throws PersistenceException {
		log.debug("State change initiated");
		ModifiableValueMap properties = resource.adaptTo(ModifiableValueMap.class);
		
		properties.replace(STATE, status);
		if(null!=userName) {
			properties.replace(NameConstants.PN_PAGE_LAST_MOD_BY, userName);
			properties.replace(NameConstants.PN_PAGE_LAST_MOD, Calendar.getInstance());
			
		}
				
		
		resource.getResourceResolver().commit();
	}

	private CreateApplyPromoteResponse createResponse(String response, String successState, String failState, String successMessage) {
		JsonObject jsonObject = new JsonParser().parse(response).getAsJsonObject();
		Boolean status = Boolean.parseBoolean(jsonObject.get("status").toString());
		Integer errorCode = Integer.parseInt(jsonObject.get("errorCode").toString());
		log.debug("Status {}", status);
		if (Boolean.TRUE.equals(status)) {
			if (errorCode == 0) {
				return CreateApplyPromoteResponse.builder().status(true).state(successState).message(successMessage)
						.errorCode(errorCode).build();
			} else {
				return CreateApplyPromoteResponse.builder().status(true).state(successState)
						.message(ERROR_MESSAGE).errorCode(errorCode).build();
			}
		} else {
			return CreateApplyPromoteResponse.builder().status(false).state(failState).message(ERROR_MESSAGE)
					.errorCode(errorCode).build();
		}
	}


	@Override
	public CreateApplyPromoteResponse checkRedirectRuleConsistency(Resource mappingResource, String path) {
		UrlRedirectConfig urlRedirectConfig = getConfiguration(mappingResource);
		UrlRedirect urlRedirect = getUrlRedirect(urlRedirectConfig,FETCH);
		try {
			if (null != urlRedirect) {
				return validateData(mappingResource, urlRedirect, path);
			}
			else{
				return CreateApplyPromoteResponse.builder().status(false).state(EMPTY_LIST)
						.message("No Redirection ruleset found for the requested application").errorCode(0).build();
			}
		} catch (RuntimeException e) {
			log.error("Error occurred in checkRedirectRuleConsistency: {}", e.getMessage(), e);
			return CreateApplyPromoteResponse.builder().status(false)
					.message(ERROR_MESSAGE).errorCode(-1).build();
		}
	}

	@Override
	public CreateApplyPromoteResponse overwriteUrlRedirects(Resource resource, String path) {
		String resourcePath = resource.getResourceResolver().resolve(path).getChild(JcrConstants.JCR_CONTENT).getPath();
		UrlRedirectConfig urlRedirectConfig = getConfiguration(resource);
		UrlRedirect urlRedirect = getUrlRedirect(urlRedirectConfig, FETCH);
		try {
			if (null != urlRedirect) {
				updateRedirectProperties(resource, urlRedirect);
				if (urlRedirect.getMappings() != null && !urlRedirect.getMappings().isEmpty()) {
					urlRedirect.updateNode(resource.getResourceResolver(), resourcePath);
					return CreateApplyPromoteResponse.builder().state("overwritten")
							.message(OVERWRITE_SUCCESS_MESSAGE).errorCode(0).build();
				}else {
					urlRedirect.deleteMappings(resource.getResourceResolver(), resource.getChild("mappings"));
					return CreateApplyPromoteResponse.builder().status(false).state(EMPTY_LIST)
							.message("No rules found in ESL. Existing rules in AEM deleted").errorCode(0).build();
				}
			}else {
				return CreateApplyPromoteResponse.builder().status(false).state(EMPTY_LIST)
						.message("No Redirection ruleset found for the requested application").errorCode(0).build();
			}
		} catch (PersistenceException e) {
			log.error("Error occurred in overwriteUrlRedirects: {}", e.getMessage(), e);
			return CreateApplyPromoteResponse.builder().status(false).state(urlRedirectConfig.state())
					.message(ERROR_MESSAGE).errorCode(-1).build();
		}
	}

	/**
	 * Fetches the data from ESL by calling the get api
	 *
	 * @param urlRedirectConfig the properties of resource in AEM
	 * @param requestType       the request type
	 * @return the data from ESL
	 */
	private UrlRedirect getUrlRedirect(UrlRedirectConfig urlRedirectConfig, String requestType) {
		UrlRedirect urlRedirect = null;
		try {
			String response = createConnection(urlRedirectConfig, requestType, null,user);
			JsonObject jsonObject = new JsonParser().parse(response).getAsJsonObject();
			Boolean status = Boolean.parseBoolean(jsonObject.get("status").toString());
			Integer errorCode = Integer.parseInt(jsonObject.get("errorCode").toString());
			if (Boolean.TRUE.equals(status) && errorCode == 0 && jsonObject.get(RESPONSE).isJsonObject()) {
				String environment = jsonObject.getAsJsonObject(RESPONSE).getAsJsonArray("pipelines").get(0).getAsJsonObject().getAsJsonArray("environments").get(0).getAsString();
				urlRedirect = new Gson().fromJson(jsonObject.getAsJsonObject(RESPONSE).getAsJsonObject("redirectionRuleSets").getAsJsonObject(environment), UrlRedirect.class);
			}
		} catch (IOException e) {
			log.error("Exception in getUrlRedirect{}", e.getMessage(), e);
		}
		return urlRedirect;
	}

	/**
	 * Checks consistency of data between AEM and ESL with ESL being single source of truth.
	 *
	 * @param mappingResource the mapping resource in AEM
	 * @param eslData         the data from ESL
	 * @param path            the path of the configuration in AEM
	 * @return the standard response message based on data concurrency checks
	 */
	private CreateApplyPromoteResponse validateData(Resource mappingResource, UrlRedirect eslData, String path) {

		UrlRedirect aemData = mappingResource.getResourceResolver().resolve(path).adaptTo(UrlRedirect.class);
         log.debug("aem status" + aemData.getStatus());
         log.debug("esl status" + eslData.getStatus());
         
		if (StringUtils.equals(EDITED.name(),(aemData.getStatus()))
				&& !StringUtils.equals(eslData.getRulesetVersion(), aemData.getRulesetVersion())) {
			// When state in AEM is EDITED
			// AND both AEM and ESL versions are different, the user is shown a prompt for overwrite.
			return CreateApplyPromoteResponse.builder().state("outdated").message("There is a more updated " +
					"configuration. Please click yes to refresh locally.")
					.errorCode(0).build();
		}
		else if ((!StringUtils.equals(aemData.getStatus(), eslData.getStatus()) && !StringUtils.equals(EDITED.name(),(aemData.getStatus())))
				|| (!StringUtils.equals(aemData.getRulesetVersion(), eslData.getRulesetVersion()))
				|| (eslData.getLastAppliedOn().compareTo(aemData.getLastAppliedOn()) != 0)
				|| (eslData.getLastPromotedOn().compareTo(aemData.getLastPromotedOn()) != 0)) {
			// When states in both AEM AND ESL are different and state in AEM is not EDITED
			// OR versions in both AEM AND ESL are different
			// OR last applied timestamps in both AEM AND ESL are different
			// OR last promoted timestamps in both AEM AND ESL are different
			// The data in AEM is overwritten with no prompt for the user.
			return overwriteUrlRedirects(mappingResource, path);
		}
		else {
			return CreateApplyPromoteResponse.builder().state("latest").message("No need to update!")
					.errorCode(0).build();
		}
	}

	/**
	 * Updates site level properties in AEM from ESL
	 *
	 * @param mappingResource the mapping resource in AEM
	 * @param urlRedirect     the data from ESL
	 * @throws PersistenceException
	 */
	private void updateRedirectProperties(Resource mappingResource, UrlRedirect urlRedirect) throws PersistenceException {
		log.debug("Properties change initiated");
		ModifiableValueMap properties = mappingResource.adaptTo(ModifiableValueMap.class);
		if(null != urlRedirect.getRulesetVersion()){
			properties.put(VERSION, urlRedirect.getRulesetVersion());
		}
		if (null != urlRedirect.getLastUpdatedOn()) {
			properties.put(LAST_UPDATED_ON, urlRedirect.getLastUpdatedOn());
		}
		if (null != urlRedirect.getLastAppliedOn()) {
			properties.put(LAST_APPLIED_ON, urlRedirect.getLastAppliedOn());
		}
		if (null != urlRedirect.getLastPromotedOn()) {
			properties.put(LAST_PROMOTED_ON, urlRedirect.getLastPromotedOn());
		}
		if (null != urlRedirect.getCreatedOn()) {
			properties.put(LAST_CREATED_ON, urlRedirect.getCreatedOn());
		}
		if (null != urlRedirect.getStatus()) {
			properties.put(STATE, urlRedirect.getStatus());
		}
		mappingResource.getResourceResolver().commit();
	}

}
package com.abbott.aem.an.division.core.utils;

import java.io.IOException;
import java.io.StringReader;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Collections;
import java.util.Map;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.observation.Event;
import javax.jcr.observation.EventIterator;
import javax.jcr.observation.EventListener;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.Header;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.ComponentContext;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Reference;
import javax.jcr.observation.ObservationManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.an.division.core.services.BookMarkConfigurationService;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.stream.JsonReader;

@Component(immediate = true, service = EventListener.class)
public class BookMarkFlagJob implements EventListener {

	private static final Logger log = LoggerFactory.getLogger(BookMarkFlagJob.class);

	@Reference
	private ResourceResolverFactory resourceResolverFactory;

	@Reference
	BookMarkConfigurationService bookMarkConfig;

	@SuppressWarnings("AEM Rules:AEM-3")
	private Session session;

	@SuppressWarnings("AEM Rules:AEM-3")
	private ResourceResolver resolver;

	private ObservationManager observationManager;

	private static final String JCRCONTENT = "/jcr:content";
	private static final String DEACTIVATE = "Deactivate";
	private static final String CREATE = "create";
	private static final String DELETE = "delete";
	private static final String PAGE_ID = "pageId";
	private static final String STATUS_RESPONSE = "statusResponse";
	private static final String BOOKMARK_FLAG = "bookmarkFlag";
	private static final String ACTION = "action";
	private static final String REPLICATION_ACTION = "cq:lastReplicationAction_publish";
	String pageHashId;
	String authorName;
	String aemPageUrl;
	String shortUrl;
	String bookmarkFlag;
	int eventType;

	@Activate
	public void activate(ComponentContext context) {
		log.debug(" Event Listener Started ");

		Map<String, Object> serviceParams = Collections.singletonMap(ResourceResolverFactory.SUBSERVICE,
				Constants.HCP_SUBSERVICE);
		try {
			resolver = resourceResolverFactory.getServiceResourceResolver(serviceParams);
			log.debug("resolver for bookmark ::" + resolver);
			session = resolver.adaptTo(Session.class);
			log.debug("Session for bookmark ::" + session);
			observationManager = session.getWorkspace().getObservationManager();
			observationManager.addEventListener(this, Event.PROPERTY_ADDED | Event.PROPERTY_CHANGED,
					bookMarkConfig.getSessionPath(), true, null, null, false);
			log.debug("Session Started");
		} catch (RepositoryException | LoginException e) {
			log.error("Exception while listening {0}", e);
		}
	}

	@Deactivate
	public void deactivate(ComponentContext componentContext) {

		try {
			if (observationManager != null) {
				observationManager.removeEventListener(this);
				log.debug("Removed JCR event listener - Bookmark");
			}
			if (resourceResolverFactory != null) {
				resourceResolverFactory = null;
				log.debug("Removed Factory for event listener - Bookmark");
			}
		} catch (RepositoryException re) {
			log.error("Error removing the JCR event listener - Bookmark", re);
		} finally {
			if (session != null) {
				session.logout();
				log.debug("session is closed");
				session = null;
			}
			if (resolver != null) {
				resolver.close();
				log.debug("Resolver is closed");
				resolver = null;
			}
		}

	}

	@Override
	public void onEvent(EventIterator events) {
		try {
			while (events.hasNext()) {
				Event event = events.nextEvent();
				log.debug("Event type : {}", event.getType());
				String path = event.getPath();
				log.debug("Event path : {}", path);
				eventType = event.getType();
				Resource resPage;
				if (path != null) {
					if (path.contains(BOOKMARK_FLAG)) {
						resPage = getResourcePagePath(path);
						createBookMark(resPage);
					}
					if ((path.contains(REPLICATION_ACTION) && event.getType() == 16)) {
						resPage = getResourcePagePath(path);
						deleteBookMark(resPage);
					}
				}
			}

		} catch (RepositoryException e1) {
			log.error("Exception on Events {0}", e1);
		}
	}

	public void createBookMark(Resource resourcePage) {
		try {
			bookmarkFlag = resourcePage.getValueMap().get(BOOKMARK_FLAG, String.class);
			if (bookmarkFlag.equalsIgnoreCase("true")) {
				shortUrl = concatPagePath(aemPageUrl);
				if (eventType == 4 || eventType == 16) {
					pageHashId = genreateHashId(aemPageUrl);
					log.debug("Value of pageHashId : {}", pageHashId);
					ModifiableValueMap modValueMap = resourcePage.adaptTo(ModifiableValueMap.class);
					modValueMap.put(PAGE_ID, pageHashId);
					resolver.commit();

				}
				String jcrPageTitle = resourcePage.getValueMap().get(JcrConstants.JCR_TITLE, String.class);
				String pageModule = null;
				String[] pathSplit = aemPageUrl.split("/");
				for (String moduleValue : bookMarkConfig.getModule()) {
					if (Arrays.asList(pathSplit).contains(moduleValue)) {
						pageModule = (moduleValue.contains("-")) ? moduleValue.replace("-", " ") : moduleValue;
					}
				}
				JsonObject requestParams = new JsonObject();
				requestParams.addProperty(ACTION, CREATE);
				requestParams.addProperty(PAGE_ID, pageHashId);
				requestParams.addProperty("url", shortUrl);
				requestParams.addProperty("title", jcrPageTitle);
				requestParams.addProperty("module", pageModule);
				requestParams.addProperty("external", "false");
				String createParams = requestParams.toString();
				log.debug("Get Request Params:{}", createParams);
				callEslApi(createParams, resourcePage);

			} else {
				ModifiableValueMap modValueMap = resourcePage.adaptTo(ModifiableValueMap.class);
				modValueMap.remove(PAGE_ID);
				modValueMap.remove(STATUS_RESPONSE);
				resolver.commit();
			}
		} catch (IOException e) {
			log.error("Exception on Create Book mark {0}", e);
		}
	}

	public void deleteBookMark(Resource deleteResourcePage) {
		try {
			String replicateAction = deleteResourcePage.getValueMap().get(REPLICATION_ACTION, String.class);
			bookmarkFlag = deleteResourcePage.getValueMap().get(BOOKMARK_FLAG, String.class);
			if (replicateAction.equalsIgnoreCase(DEACTIVATE) && bookmarkFlag.equalsIgnoreCase("true")) {
				shortUrl = concatPagePath(aemPageUrl);
				pageHashId = deleteResourcePage.getValueMap().get(PAGE_ID, String.class);
				log.debug("Value of deleted page : {}", pageHashId);
				JsonObject requestParams = new JsonObject();
				requestParams.addProperty(ACTION, DELETE);
				requestParams.addProperty(PAGE_ID, pageHashId);
				String unpublishParams = requestParams.toString();
				log.debug("Get Request Params:{}", unpublishParams);
				callEslApi(unpublishParams, deleteResourcePage);
				ModifiableValueMap modValueMap = deleteResourcePage.adaptTo(ModifiableValueMap.class);
				modValueMap.replace(BOOKMARK_FLAG, "false");
				modValueMap.remove(PAGE_ID);
				modValueMap.remove(STATUS_RESPONSE);
				resolver.commit();
			}
		} catch (IOException e) {
			log.error("Exception on Deletion Book mark {0}", e);
		}
	}

	public String concatPagePath(String shortPageUrl) {
		shortPageUrl = shortPageUrl.replace(bookMarkConfig.getSessionPath(), bookMarkConfig.getDomainUrl())
				.concat(".html");
		return shortPageUrl;
	}

	public Resource getResourcePagePath(String eventPath) {
		log.debug("Into Resource page method using resolver");
		PageManager pageManager = (resolver).adaptTo(PageManager.class);
		Page pageResource = pageManager.getContainingPage(eventPath);
		aemPageUrl = pageResource.getPath();
		log.debug("aemPageUrl : {}", aemPageUrl);
		return (resolver).getResource(StringUtils.join(aemPageUrl, JCRCONTENT));
	}

	public void callEslApi(String params, Resource apiResource) throws IOException {
		log.debug("Entering into the function :: callESLRestAPI");
		String statusReason = null;
		HttpPost post = new HttpPost(bookMarkConfig.getApiUrl());
		StringEntity entity = new StringEntity(params, ContentType.APPLICATION_JSON);
		post.setEntity(entity);
		post.setHeader(Constants.APPLICATION_ID, bookMarkConfig.getxApplicationId());
		post.setHeader(Constants.COUNTRY_CODE, bookMarkConfig.getCountryCode());
		post.setHeader(Constants.CONTENT_TYPE, bookMarkConfig.getContentType());
		post.setHeader(Constants.APPLICATION_ACCESS_KEY, bookMarkConfig.getxApplicationAccessKey());
		post.setHeader(Constants.PREFERRED_LANGUAGE, bookMarkConfig.getPreferredLanguage());
		post.setHeader(Constants.ORIGIN_SECRET, bookMarkConfig.getxOriginSecretKey());
		Header[] headers = post.getAllHeaders();
		int count = 0;
		log.debug("API URL to ESL {}", bookMarkConfig.getApiUrl());
		for (Header head : headers) {
			log.debug("Request Headers for ESL API " + count + " {}", head);
			count++;
		}
		log.debug("Request Body for ESL API Workflow {}", EntityUtils.toString(entity));
		try (CloseableHttpClient httpclient = HttpClients.createDefault();
				CloseableHttpResponse response = httpclient.execute(post);) {
			log.debug("Response from ESL : {}", response);
			String eslResponse = EntityUtils.toString(response.getEntity());
			log.debug("Status of ESL Response: Data {}", eslResponse);
			if (null != eslResponse) {
				JsonReader jsonReader = new JsonReader(new StringReader(eslResponse));
				jsonReader.setLenient(true);
				JsonObject eslResponseData = new JsonParser().parse(jsonReader).getAsJsonObject();
				log.debug("Status of ESL Response for reader: Data {}", eslResponseData);
				if (!eslResponseData.isJsonNull()) {
					JsonObject responseObject = eslResponseData.get("response").getAsJsonObject();
					statusReason = responseObject.get("statusReason").getAsString();
					ModifiableValueMap statusModVal = apiResource.adaptTo(ModifiableValueMap.class);
					statusModVal.put(STATUS_RESPONSE, statusReason);
					resolver.commit();
				}

			} else {
				log.error("Status of ESL Response For Bookmark PPC :null");
			}

		} catch (IOException ex) {
			throw new IOException("Error Occurred Utils callRestAPI", ex);
		}
	}

	public String genreateHashId(String input) {
		try {
			MessageDigest digest;
			digest = MessageDigest.getInstance("SHA-256");
			byte[] hash = digest.digest(input.getBytes());
			BigInteger number = new BigInteger(1, hash);
			StringBuilder hexString = new StringBuilder(number.toString(16));
			while (hexString.length() < 64) {
				hexString.insert(0, '0');
			}
			return hexString.toString();
		} catch (NoSuchAlgorithmException e) {
			log.error("NoSuchAlgorithmException {}", e);
			return "";
		}

	}

}
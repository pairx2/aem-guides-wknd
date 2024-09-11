package com.abbott.aem.corp.division.core.components.jobs;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpHeaders;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.event.jobs.Job;
import org.apache.sling.event.jobs.consumer.JobConsumer;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.abbott.aem.cloud.api.jobs.AbbottJob;
import com.abbott.aem.corp.division.core.components.services.MostReadArticlesJobConsumerConfiguration;
import com.abbott.aem.platform.common.components.services.APILookupService;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.Replicator;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import static org.apache.sling.event.jobs.consumer.JobConsumer.PROPERTY_TOPICS;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Locale;
import java.util.Map;
import javax.jcr.Session;
import javax.xml.bind.ValidationException;
import static org.osgi.framework.Constants.SERVICE_DESCRIPTION;
import static org.osgi.service.event.EventConstants.SERVICE_ID;

@Component(immediate = true, service = { JobConsumer.class, AbbottJob.class }, property = {
		PROPERTY_TOPICS + "=" + MostReadArticlesJob.MOSTREAD_ARTICLES, SERVICE_ID + "=Most Read Articles Consumer Job",
		SERVICE_DESCRIPTION + "=This job fetches top five articles" })
@Designate(ocd = MostReadArticlesJobConsumerConfiguration.class)
public class MostReadArticlesJob implements JobConsumer, AbbottJob {

	public static final String MOSTREAD_ARTICLES = "corp/content/mostreadarticles";

	private final Logger log = LoggerFactory.getLogger(MostReadArticlesJob.class);
	/** The Constant ABBOTTCOM. */
	public static final String ABBOTTCOM = "abbottcom";

	/** The Constant SITE_NAME. */
	public static final String SITE_NAME = "siteName";

	/** The Constant X_COUNTRY_CODE. */
	public static final String X_COUNTRY_CODE = "x-country-code";

	/** The Constant X_PREFERRED_LANGUAGE. */
	public static final String X_PREFERRED_LANGUAGE = "x-preferred-language";

	/** The Constant X_APPLICATION_ID. */
	public static final String X_APPLICATION_ID = "x-application-id";

	private static final String RESPONSE_ARRAY = "response";

	private static final String ROOT_PATH = "/content/corp/abbott";

	private static final String CONTENT_TYPE = "application/json";

	private static final String CORPNEWSROOM = "/corpnewsroom";

	private static final String DAMPATH = "/content/dam/corp/abbott/";

	private static final String TRENDING = "/trending";

	private static final String MASTER_NODE = "/jcr:content/data/master";

	private static final String CNT_TRENDING = "/cnt-trending";
	
	private static final String X_ORIGIN_SECRET = "x-origin-secret";

	private static final String DOT = ".";

	@Reference
	ResourceResolverFactory resolverFactory;
	
	Resource resource;

	String countryCode = "us";

	String languageCode = "en";

	String serviceUrl;


	@Reference
	APILookupService apiLookupService;
		
	
	@Reference
	Replicator replicator;

	String contentPath;
		
	@Override
	public JobResult process(Job job) {
		try {
			ResourceResolver resourceResolver = getResourceResolver();
			Session session = null;
			if (null != resourceResolver) {
					resource = resourceResolver.getResource(ROOT_PATH);
					session =resourceResolver.adaptTo(Session.class);
				if (null != resource) {
					Iterator<Resource> countriesList = resource.listChildren();
					while (countriesList.hasNext()) {
						getCountryResource(countriesList,resourceResolver,session);
					}
				}
			}
		} catch (LoginException  e) {
			log.error("LoginException ", e);
		}
		return JobResult.OK;
	}
	
	
	public void getCountryResource(Iterator<Resource> countriesList,ResourceResolver resourceResolver,Session session) {
		
		Resource countryResource = countriesList.next();
		if (null != countryResource) {
			Iterator<Resource> countryNode = countryResource.listChildren();
			while (countryNode.hasNext()) {
				Resource childResource = countryNode.next();
				log.debug("childResource :" + childResource);
				String path = childResource.getPath();
				if (!path.contains(JcrConstants.JCR_CONTENT)) {
					contentPath = childResource.getPath();
					if (null != contentPath) {
						fetchTopFiveArticles(contentPath,resourceResolver,session);
				}
			}
		}						
	 }
	}

	public void fetchTopFiveArticles(String contentPath,ResourceResolver resourceResolver,Session session) {

		String path = contentPath + CORPNEWSROOM;
		String domainName = apiLookupService.getRequestEndpoint("");
		String secretKey =  apiLookupService.getSecretKey();
		PageManager pageManager = resourceResolver.adaptTo(PageManager.class);

		if (null != pageManager) {
			Page page = pageManager.getPage(path);
			if (page != null) {
				Locale locale = page.getLanguage();
				languageCode = locale.getLanguage();
				countryCode = locale.getCountry();
				if (StringUtils.equalsIgnoreCase(countryCode, "AR")) {
					countryCode = "es";
				}
				String requestBody = "{\"type\": \"mostread\", \"start_date\": \"" + getDate() + "\"}";
				HttpPost post = new HttpPost(domainName + serviceUrl);
				log.debug("URL : " + domainName + serviceUrl);
				JsonObject jsonObject = new JsonParser().parse(requestBody).getAsJsonObject();
				StringBuilder entity = new StringBuilder();
				entity.append(jsonObject.toString());
				post.addHeader(X_APPLICATION_ID, ABBOTTCOM);
				post.addHeader(X_PREFERRED_LANGUAGE, languageCode);
				post.addHeader(X_COUNTRY_CODE, countryCode);
				post.addHeader(HttpHeaders.CONTENT_TYPE, CONTENT_TYPE);
				if (StringUtils.isNotBlank(secretKey)) {
					post.addHeader(X_ORIGIN_SECRET, secretKey);
				}
				try {
					post.setEntity(new StringEntity(entity.toString()));
				} catch (UnsupportedEncodingException e) {
					log.error("Error in setEntity" + e);
				}
				fetchResponseFromESLService(post, resourceResolver, session);
			}
		}
	}

	public void fetchResponseFromESLService(HttpPost post,ResourceResolver resourceResolver,Session session ) {
		try (CloseableHttpClient httpClient = HttpClients.createDefault();
				CloseableHttpResponse postResponse = httpClient.execute(post)) {
			String resultSet = EntityUtils.toString(postResponse.getEntity()).trim();
			log.info("resultSet :" + resultSet.trim());
			if (StringUtils.contains(resultSet, RESPONSE_ARRAY)) {
				JsonObject resObject = new JsonParser().parse(resultSet).getAsJsonObject();	
				int errorCode = resObject.get("errorCode").getAsInt();
				if (errorCode != 0) {
                    throw new ValidationException("No Records found");                   
			} else {
				getArticleList(resObject,resourceResolver,session);
			}
		}
		}catch (IllegalStateException | IOException e) {
			log.error(" Exception in fetchResponseFromESLService", e);
		}
		catch (ValidationException e) {
			log.error("ValidationException from fetchResponse", e);
		}
	}

	public void getArticleList(JsonObject responseObject,ResourceResolver resourceResolver,Session session) {

		JsonArray responseArray = responseObject.getAsJsonArray(RESPONSE_ARRAY);
		String[] pageURL = new String[responseArray.size()];
		String[] articlePagePath = new String[responseArray.size()];
		String page=null;
		for (int index = 0; index < responseArray.size(); index++) {
			String[] pagePath = responseArray.get(index).getAsJsonObject().get("pageUrl").getAsString()
					.split("corpnewsroom", 2);
			page=pagePath[1];
			if(null !=page && page.contains("?")) {
				String[] path= page.split("\\?",2);
				page =path[0];
			}
			articlePagePath[index] = contentPath + CORPNEWSROOM + page;
			if(null !=page && page.contains(DOT)){
				pageURL[index] = articlePagePath[index].substring(0,articlePagePath[index].lastIndexOf(DOT));
				articlePagePath[index] = articlePagePath[index].substring(0,articlePagePath[index].lastIndexOf(DOT));
			}

		}
		getcntTrendingPath(pageURL, articlePagePath,resourceResolver,session);
	}

	public void getcntTrendingPath(String[] pageURL, String[] articlePagePath,ResourceResolver resourceResolver,Session session) {
		if(StringUtils.equalsIgnoreCase(countryCode,"es") && StringUtils.equalsIgnoreCase(languageCode,"es"))
		{    countryCode = "latam";
		}
		String cntTrendingPath = DAMPATH + languageCode + "-" + countryCode.toLowerCase() + CNT_TRENDING;
		log.debug("dampath" +cntTrendingPath);		
		String[] cntrendingPath = new String[5];
		for (int index = 0; index < 5; index++) {
			String cntnodesChildPath = cntTrendingPath + TRENDING + index + MASTER_NODE;
			cntrendingPath[index] = cntnodesChildPath;
		}
		updatecntTrendingPath(cntrendingPath, pageURL, articlePagePath,resourceResolver,session);
	}

	public void updatecntTrendingPath(String[] cntrendingPath, String[] pagePath, String[] articlePagePath,ResourceResolver resourceResolver,Session session) {
		for (int pageCount = 0; pageCount < pagePath.length; pageCount++) {
			for (int cntNodeCount = 0; cntNodeCount < cntrendingPath.length; cntNodeCount++) {
					if (pageCount == cntNodeCount && null != pagePath[pageCount]) {
						String page = pagePath[pageCount] + "/jcr:content";
						Resource pageResource = resourceResolver.getResource(page);
						if (null != pageResource) {
							getArticlePageData(pageResource,cntrendingPath,cntNodeCount,articlePagePath,page,resourceResolver,session);
						}
					}
				}
			}
	}

	public void getArticlePageData(Resource pageResource,String[] cntrendingPath,int cntNodeCount,String[] articlePagePath,String page,ResourceResolver resourceResolver,Session session) {
		
		ValueMap valueMap = pageResource.getValueMap();
		String image = valueMap.get("articleimage", "");
		String imagePath = null;
		if (StringUtils.isNotBlank(image)) {
			imagePath = "<p><img src=" + image + " width=\"100%\"></p>";
		}
		String articledate = valueMap.get("authoredDate", "");
		String subHeading = valueMap.get("articlesubtitle", "");
		String detailDescription = valueMap.get("articledescription", "");
		Page articlePage = resourceResolver.adaptTo(PageManager.class).getContainingPage(page);
		String parentPageTitle = articlePage.getParent().getTitle();
		ValueMap pageProperties =articlePage.getParent().getProperties();
	    String articleColor = pageProperties.get("articlecolor","color-light-blue");
				

		log.debug(" articlecolor of title" + articleColor );

		if (null != parentPageTitle) {
			parentPageTitle = parentPageTitle +"{{" + articleColor + "}} ";
		}
		updatecntTrendingContentFragment(cntrendingPath[cntNodeCount], imagePath, articledate,
				subHeading, detailDescription, articlePagePath[cntNodeCount], parentPageTitle,resourceResolver,session);
		
	}
	public void updatecntTrendingContentFragment(String cntPath, String imagePath, String articleDate,
			String subHeading, String detailDescription, String articlePagePath, String parentPageTitle,ResourceResolver resourceResolver,Session session) {
		Resource cfchild = resourceResolver.getResource(cntPath);
		ModifiableValueMap setData = cfchild.adaptTo(ModifiableValueMap.class);
		if (StringUtils.isNotBlank(imagePath)) {
			setData.put("mainimage", imagePath);
		}
		if (StringUtils.isNotBlank(parentPageTitle)) {
			setData.put("heading", parentPageTitle);
		}
		if (StringUtils.isNotBlank(articleDate)) {
			setData.put("publishdate", articleDate);
		}
		if (StringUtils.isNotBlank(subHeading)) {
			subHeading=subHeading.replaceAll("<[^>]++>", "");
			String heading = "<p>" + subHeading + "</p>";
			setData.put("subheading", heading);
		}
		if (StringUtils.isNotBlank(detailDescription)) {
			detailDescription=detailDescription.replaceAll("<[^>]++>", "");
			String description = "<p>" + detailDescription + "</p>";
			setData.put("detaildescription", description);
		}
		if (StringUtils.isNotBlank(articlePagePath)) {
			setData.put("contentdetailsreference", articlePagePath+DOT+"html");
		}
		try {
			resourceResolver.commit();
			replicator.replicate(session, ReplicationActionType.ACTIVATE, cntPath);
			log.info(" ResourceResolver commit");
		} catch (PersistenceException  | ReplicationException  e) {
			log.error("Error in updatecntTrendingPath", e);
		}	
	}

	public String getDate() {

		String finalFormat = "";
		final Calendar startDate = Calendar.getInstance();
		startDate.add(Calendar.DATE, -7);
		DateFormat dateFormat = new SimpleDateFormat("EEE. dd MMM. yyyy");
		finalFormat = dateFormat.format(startDate.getTime());
		return finalFormat;
	}

	

	public HierarchyNodeInheritanceValueMap getInheritanceValueMap(Resource pageResource) {
		return new HierarchyNodeInheritanceValueMap(pageResource);
	}

	public ResourceResolver getResourceResolver() throws LoginException {
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put(ResourceResolverFactory.SUBSERVICE, "gm-system-user");
		return resolverFactory.getServiceResourceResolver(paramMap);
	}

	@Override
	public String getTopic() {
		return MostReadArticlesJob.MOSTREAD_ARTICLES;
	}

	@Activate
	@Modified
	void configure(MostReadArticlesJobConsumerConfiguration config) {
		serviceUrl = config.serviceUrl();
	}

}


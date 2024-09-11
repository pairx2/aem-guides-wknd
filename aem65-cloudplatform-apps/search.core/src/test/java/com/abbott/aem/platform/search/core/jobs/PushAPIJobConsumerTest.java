package com.abbott.aem.platform.search.core.jobs;

import com.abbott.aem.platform.search.coveoconnector.core.service.FormConfigurationService;
import com.abbott.aem.platform.search.coveoconnector.core.utils.CoveoConfigUtils;
import com.abbott.aem.platform.search.coveoconnector.core.utils.CoveoPushUtilities;
import com.day.cq.commons.Externalizer;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.replication.Agent;
import com.day.cq.replication.AgentFilter;
import com.day.cq.replication.AgentManager;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.wcm.testing.mock.aem.junit5.AemContext;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.wrappers.ValueMapDecorator;
import org.apache.sling.event.jobs.Job;
import org.apache.sling.event.jobs.consumer.JobConsumer.JobResult;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import javax.jcr.Node;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;
import javax.net.ssl.HttpsURLConnection;
import javax.servlet.ServletException;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import static com.abbott.aem.platform.search.core.jobs.CoveoPushAPIJobConsumer.JCR_CONTENT;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyBoolean;
import static org.mockito.ArgumentMatchers.anyMap;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PushAPIJobConsumerTest {

	private static final String EXTERNALIZER_DOMAIN_NAME = "externalizerDomainName";
	private static final String PUBLISH = "publish";
	private static final String PLATFORM_URL = "PlatformUrl";
	private static final String PUSH_URL = "https://localhost:4502/pushURL";
	private static final String API_KEY = "apiKey";
	private static final String SOURCEID = "sourceid";
	private static final String ORG_ID = "orgId";
	private static final String CONTENT_WE_RETAIL_US_EN = "/content/we-retail/us/en";
	private static final String CONTENT_WE_RETAIL_US = "/content/we-retail/us";
	private static final String CONTENT_WE_RETAIL_US_JCR_CONTENT = "/content/we-retail/us/jcr:content";
	private static final String CONTENT_WE_RETAIL_US_EN_JCR_CONTENT = "/content/we-retail/us/en/jcr:content";

	private static final String ACTION_PATH = CONTENT_WE_RETAIL_US_EN;

	@InjectMocks
	CoveoPushAPIJobConsumer coveoPushAPIJobConsumer;

	@Mock
	Job job;

	@Mock
	AgentManager agentManager;

	@Mock
	AgentFilter agentFilter;

	@Mock
	FormConfigurationService configFetch;

	private final AemContext ctx = new AemContext();

	@Mock
	ResourceResolverFactory resResolverFactory;

	@Mock
	ResourceResolver resolver;

	@Mock
	Resource jcrContentResource;
	
	@Mock
	Resource jcrContentResourceParent;

	@Mock
	Session session;

	@Mock
	Resource resource;

	@Spy
	CoveoPushUtilities coveoPushUtilities;

	@Mock
	ObjectMapper mapper;

	@Mock
	ValueMap pagePropertiesMap;
	
	@Mock
	ValueMap pagePropertiesMapParent;

	@Mock
	Externalizer externalizer;

	@Mock
	InheritanceValueMap inheritedProp;

	@Mock
	QueryBuilder queryBuilder;

	@Mock
	Query query;

	@Mock
	SearchResult result;

	@Mock
	private Hit hit;

	@Spy
	CoveoConfigUtils coveoConfigUtils;

	@Mock
	HttpsURLConnection connection;

	@Mock
	HttpsURLConnection finalConnection;

	@Mock
	ValueMap configValueMap;

	@Mock
	Resource configRes;

	@Mock
	Node jcrContentNode;

	@Mock
	Property property;

	@Mock
	BufferedOutputStream outputStream;

	@Mock
	BufferedInputStream bufferedInputStream;

	Map<String, Object> resourcePropmap;

	@BeforeEach
	public void setup() throws Exception {
		when(job.getProperty("actionType")).thenReturn("Activate");
		when(job.getProperty("actionPath")).thenReturn(CONTENT_WE_RETAIL_US_EN);
		when(job.getProperty("replicationFilter")).thenReturn(agentFilter);

		Agent agent = mock(Agent.class);
		Map<String, Agent > agentMap = new HashMap<>();
		agentMap.put("publish", agent);

		when(agentManager.getAgents()).thenReturn(agentMap);
		when(agentFilter.isIncluded(agent)).thenReturn(true);
		when(agentFilter.isIncluded(agent)).thenReturn(true);
		when(agent.getId()).thenReturn("publish");

		coveoPushAPIJobConsumer.configFetch = configFetch;
		when(configFetch.getCoveoOrganizationId()).thenReturn(ORG_ID);
		when(configFetch.getCoveoSourceId()).thenReturn(SOURCEID);
		when(configFetch.getCoveoApiKey()).thenReturn(API_KEY);
		when(configFetch.getCoveoPushUrl()).thenReturn(PUSH_URL);
		when(configFetch.getCoveoPlatformUrl()).thenReturn(PLATFORM_URL);
		when(configFetch.getDamAllowedExtensionTypes()).thenReturn(new String[]{"html", "jpg"});

		String[] inheritanceLogicProperties = { "division", "siteName", "cq:language" };
		when(configFetch.getInheritanceLogicProperties()).thenReturn(inheritanceLogicProperties);

		coveoPushAPIJobConsumer.resolverFactory = resResolverFactory;

		Map<String, Object> parameters = new HashMap<>();
		parameters.put(ResourceResolverFactory.SUBSERVICE, "readService");

		when(resResolverFactory.getServiceResourceResolver(parameters)).thenReturn(resolver);
		when(resolver.adaptTo(Session.class)).thenReturn(session);
		// doNothing().when(session).logout();
		when(resolver.getResource(ACTION_PATH)).thenReturn(resource);

		Node node = Mockito.mock(Node.class);
		when(resource.adaptTo(Node.class)).thenReturn(node);
		when(node.getPath()).thenReturn(CONTENT_WE_RETAIL_US_EN);

		resourcePropmap = new HashMap<>();
		resourcePropmap.put("jcr:primaryType", "cq:Page");
		resourcePropmap.put("contentFragment", Boolean.TRUE);
		resourcePropmap.put("hideInSitemap", Boolean.FALSE);
		resourcePropmap.put("pageFieldMapping", "[{\"type\": \"asset\"}]");
		ValueMap resourcePropertiesMap = new ValueMapDecorator(resourcePropmap);
		when(resource.adaptTo(ValueMap.class)).thenReturn(resourcePropertiesMap);

		when(resolver.getResource(CONTENT_WE_RETAIL_US_EN_JCR_CONTENT)).thenReturn(jcrContentResource);
		when(resolver.getResource(CONTENT_WE_RETAIL_US_JCR_CONTENT)).thenReturn(jcrContentResourceParent);
		
		when(resolver.adaptTo(Externalizer.class)).thenReturn(externalizer);
		when(resolver.map(CONTENT_WE_RETAIL_US_EN)).thenReturn(CONTENT_WE_RETAIL_US_EN);
		when(externalizer.externalLink(resolver, PUBLISH, resolver.map(CONTENT_WE_RETAIL_US_EN)))
				.thenReturn("http://localhost:4503/content/we-retail/us/en");
		
		// when(pagePropertiesMap.containsKey("division")).thenReturn(true);
		/*
		 * when(pagePropertiesMap.containsKey("siteName")).thenReturn(true);
		 * when(pagePropertiesMap.containsKey("contentCategory")).thenReturn(true);
		 * when(pagePropertiesMap.containsKey("jcr:language")).thenReturn(true);
		 * when(pagePropertiesMap.containsKey("jcr:title")).thenReturn(true);
		 * when(pagePropertiesMap.containsKey("jcr:description")).thenReturn(true);
		 */
		// when(pagePropertiesMap.containsKey(EXTERNALIZER_DOMAIN_NAME)).thenReturn(true);

		/*
		 * when(pagePropertiesMap.get("division")).thenReturn("mydivision");
		 * when(pagePropertiesMap.get("siteName")).thenReturn("my site");
		 * when(pagePropertiesMap.get("contentCategory")).thenReturn("HOME");
		 * when(pagePropertiesMap.get("jcr:language")).thenReturn("en");
		 * when(pagePropertiesMap.get("jcr:title")).thenReturn("EN");
		 * when(pagePropertiesMap.get("jcr:description")).
		 * thenReturn("This is my home page");
		 */

		// when(pagePropertiesMap.get(EXTERNALIZER_DOMAIN_NAME)).thenReturn(PUBLISH);

		
		// when(pagePropertiesMap.get("jcr:lastReplicated",
		// Calendar.class)).thenReturn(cal);
		
		coveoPushAPIJobConsumer.coveoPushUtilities = coveoPushUtilities;
		coveoPushUtilities.setAccessToken(API_KEY);
		coveoPushUtilities.setCoveoPlatformUrl(PLATFORM_URL);
		coveoPushUtilities.setCoveoPushUrl(PUSH_URL);
		coveoPushUtilities.setInheritanceLogicProperties(inheritanceLogicProperties);
		coveoPushUtilities.setOrganizationId(ORG_ID);
		coveoPushUtilities.setSourceId(SOURCEID);
		coveoPushUtilities.setMapper(mapper);
		when(jcrContentResource.adaptTo(ValueMap.class)).thenReturn(pagePropertiesMap);
		when(pagePropertiesMap.containsKey("hideInSitemap")).thenReturn(true);
		when(pagePropertiesMap.get("hideInSitemap", Boolean.class)).thenReturn(false);
		
		//Checking for excludeChildPagesCoveoPush Property
		when(jcrContentResourceParent.adaptTo(ValueMap.class)).thenReturn(pagePropertiesMapParent);
		when(pagePropertiesMapParent.containsKey("excludeChildPagesCoveoPush") && pagePropertiesMap.containsKey("coveoPush")).thenReturn(true);
		boolean parentPageProperties = pagePropertiesMapParent.get("excludeChildPagesCoveoPush") != null ? pagePropertiesMapParent.get("excludeChildPagesCoveoPush", Boolean.class) : false;
		boolean pageProperties = pagePropertiesMap.get("coveoPush") != null ? pagePropertiesMap.get("coveoPush", Boolean.class) : false;
		if(String.valueOf(parentPageProperties).equalsIgnoreCase("true") && String.valueOf(pageProperties).equalsIgnoreCase("true")) {
			when(parentPageProperties && pageProperties).thenReturn(false);
		}
		if(String.valueOf(parentPageProperties).equalsIgnoreCase("true") && String.valueOf(pageProperties).equalsIgnoreCase("false")) {
			when(parentPageProperties && pageProperties).thenReturn(true);
		}
		if(String.valueOf(parentPageProperties).equalsIgnoreCase("false") && String.valueOf(pageProperties).equalsIgnoreCase("true")) {
			when(parentPageProperties && pageProperties).thenReturn(true);
		}
		if(String.valueOf(parentPageProperties).equalsIgnoreCase("false") && String.valueOf(pageProperties).equalsIgnoreCase("false")) {
			when(parentPageProperties && pageProperties).thenReturn(true);
		}
		
		/*
		 * when(configValueMap.get("assetFieldMapping", String.class)).thenReturn(
		 * "[   {      \"aemField\":\"jcr:title\",      \"coveoType\":\"STRING\",      \"coveoField\":\"assettitle\"   },   {      \"aemField\":\"dc:description\",      \"coveoType\":\"STRING\",      \"coveoField\":\"assetdescription\"   },   {      \"aemField\":\"jcr:lastModified\",      \"coveoType\":\"DATE\",      \"coveoField\":\"lastmodified\"   },   {      \"aemField\":\"jcr:language\",      \"coveoType\":\"STRING\",      \"coveoField\":\"language\"   },   {      \"aemField\":\"cq:tags\",      \"coveoType\":\"STRING\",      \"coveoField\":\"tags\"   },   {      \"aemField\":\"cq:lastReplicated\",      \"coveoType\":\"DATE\",      \"coveoField\":\"publishdate\"   },   {      \"aemField\":\"siteName\",      \"coveoType\":\"STRING\",      \"coveoField\":\"site\"   },   {      \"aemField\":\"dam:MIMEtype\",      \"coveoType\":\"STRING\",      \"coveoField\":\"contenttype\"   },   {      \"aemField\":\"division\",      \"coveoType\":\"STRING\",      \"coveoField\":\"divisionname\"   }]"
		 * );
		 */
		// doReturn(outputStream).when(coveoPushUtilities).getOutPutStream(any());
		// doReturn(bufferedInputStream).when(coveoPushUtilities).getInputStream(any());
		// doNothing().when(bufferedInputStream).read();
		// when(bufferedInputStream.read()).thenReturn(0);
		// doNothing().when(outputStream).write(any());
		// doNothing().when(outputStream).close();;
	}

	@MockitoSettings(strictness = Strictness.WARN)
	@Test
	void testProcessForAuthor() throws IOException, RepositoryException, ServletException {

		when(job.getProperty("actionType")).thenReturn("Activate");
		when(job.getProperty("actionPath")).thenReturn(CONTENT_WE_RETAIL_US_EN);
		when(job.getProperty("replicationFilter")).thenReturn(agentFilter);

		when(agentManager.getAgents()).thenReturn(new HashMap<>());

		JobResult jobResult = coveoPushAPIJobConsumer.process(job);
		assertEquals(JobResult.OK, jobResult);
	}

	@MockitoSettings(strictness = Strictness.WARN)
	@Test
	void testActivatePage() throws IOException, RepositoryException, ServletException {
		//Change the strictness level only for this test method:
		when(job.getProperty("actionType")).thenReturn("Activate");
		when(job.getProperty("actionPath")).thenReturn(CONTENT_WE_RETAIL_US_EN);

		when(resource.getPath()).thenReturn(CONTENT_WE_RETAIL_US_EN);
		when(resolver.getResource(resource.getPath() + JCR_CONTENT)).thenReturn(resource);
		when(resolver.getResource(CONTENT_WE_RETAIL_US_EN + "/jcr:content/data/master")).thenReturn(resource);
		when(resource.getResourceResolver()).thenReturn(resolver);
		when(resource.getValueMap()).thenReturn(pagePropertiesMap);
		when(pagePropertiesMap.get("coveoPush", Boolean.class)).thenReturn(Boolean.TRUE);
		when(resource.getParent()).thenReturn(resource);
		when(jcrContentNode.getPath()).thenReturn(CONTENT_WE_RETAIL_US_EN);

		doReturn(connection).when(coveoPushUtilities).createHTTPSConnection(any());
		doReturn(201).when(connection).getResponseCode();
		URL url = new URL(
				"https://localhost:4502/pushURL/v1/organizations/orgId/sources/sourceid/documents?documentId=http%3A%2F%2Flocalhost%3A4503%2Fcontent%2Fwe-retail%2Fus%2Fen.html");
		doReturn(finalConnection).when(coveoPushUtilities).createHTTPSConnection(url);
		doReturn(202).when(finalConnection).getResponseCode();
		when(jcrContentResource.adaptTo(Node.class)).thenReturn(jcrContentNode);
		when(jcrContentNode.hasProperty(any())).thenReturn(true);
		when(jcrContentNode.getProperty(any())).thenReturn(property);
		when(property.isMultiple()).thenReturn(false);
		when(property.getString()).thenReturn("some text go here");
		when(jcrContentNode.getPath()).thenReturn(CONTENT_WE_RETAIL_US_EN_JCR_CONTENT);

		Calendar cal = Calendar.getInstance();
		when(pagePropertiesMap.get("jcr:lastModified", Calendar.class)).thenReturn(cal);
		when(pagePropertiesMap.get("jcr:created", Calendar.class)).thenReturn(cal);
		when(pagePropertiesMap.get("cq:lastReplicated", Calendar.class)).thenReturn(cal);

		when(resolver.adaptTo(QueryBuilder.class)).thenReturn(queryBuilder);

		Map<String, String> map = new HashMap<>();
		map.put("path", "/content");
		map.put("1_property", "coveoPush");
		map.put("1_property.value", "true");
		map.put("p.limit", "-1");
		when(queryBuilder.createQuery(PredicateGroup.create(map), session)).thenReturn(query);
		when(query.getResult()).thenReturn(result);
		when(result.getHits()).thenReturn(Collections.singletonList(hit));
		when(hit.getPath()).thenReturn(CONTENT_WE_RETAIL_US_EN);

		when(resolver.getResource("/var/coveoconnector/coveomappings")).thenReturn(configRes);
		when(configRes.adaptTo(ValueMap.class)).thenReturn(configValueMap);
		when(configValueMap.get("pageFieldMapping", String.class)).thenReturn(
				"[{      \"aemField\":\"jcr:title\",      \"coveoType\":\"STRING\",      \"coveoField\":\"title\"   },   {      \"aemField\":\"jcr:description\",      \"coveoType\":\"STRING\",      \"coveoField\":\"description\"   },   {      \"aemField\":\"jcr:lastModified\",      \"coveoType\":\"DATE\",      \"coveoField\":\"lastmodified\"   },   {      \"aemField\":\"jcr:language\",      \"coveoType\":\"STRING\",      \"coveoField\":\"language\"   },   {      \"aemField\":\"jcr:created\",      \"coveoType\":\"DATE\",      \"coveoField\":\"date\"   },   {      \"aemField\":\"cq:tags\",      \"coveoType\":\"STRING\",      \"coveoField\":\"tags\"   },   {      \"aemField\":\"jcr:createdBy\",      \"coveoType\":\"STRING\",      \"coveoField\":\"author\"   },   {      \"aemField\":\"cq:lastReplicated\",      \"coveoType\":\"DATE\",      \"coveoField\":\"publishdate\"   },   {      \"aemField\":\"siteName\",      \"coveoType\":\"STRING\",      \"coveoField\":\"site\"   },   {      \"aemField\":\"contentType\",      \"coveoType\":\"STRING\",      \"coveoField\":\"contenttype\"   },   {      \"aemField\":\"contentCategory\",      \"coveoType\":\"STRING\",      \"coveoField\":\"contentcategory\"   },   {      \"aemField\":\"clickableuri\",      \"coveoType\":\"STRING\",      \"coveoField\":\"url\"   },   {      \"aemField\":\"division\",      \"coveoType\":\"STRING\",      \"coveoField\":\"divisionname\"   }]");


		//isCoveoPush
		when(resource.getParent()).thenReturn(jcrContentResourceParent);
		when(jcrContentResourceParent.getPath()).thenReturn(CONTENT_WE_RETAIL_US);
		when(resolver.getResource(CONTENT_WE_RETAIL_US + "/jcr:content")).thenReturn(jcrContentResourceParent);
		when(jcrContentResourceParent.getValueMap()).thenReturn(pagePropertiesMap);
		when(pagePropertiesMap.get("excludeChildPagesCoveoPush")).thenReturn("false");
		when(jcrContentResourceParent.adaptTo(Node.class)).thenReturn(jcrContentNode);
		when(pagePropertiesMap.get("coveoPush")).thenReturn("false");

		doReturn("Sample Body HTML").when(coveoPushUtilities).getHTMlContent(any(), any(), any());
		doNothing().when(coveoPushUtilities).writeStream(any(), any());
		
		JobResult jobR = coveoPushAPIJobConsumer.process(job);
		assertEquals(JobResult.OK.name(), jobR.name());
	}

	@MockitoSettings(strictness = Strictness.WARN)
	@Test
	void testActivateRootPage() throws IOException, RepositoryException, ServletException {
		//Change the strictness level only for this test method:
		when(job.getProperty("actionType")).thenReturn("Activate");
		when(job.getProperty("actionPath")).thenReturn(CONTENT_WE_RETAIL_US_EN);

		when(resource.getPath()).thenReturn(CONTENT_WE_RETAIL_US_EN);
		when(resolver.getResource(CONTENT_WE_RETAIL_US_EN + JCR_CONTENT)).thenReturn(resource);
		when(resolver.getResource(CONTENT_WE_RETAIL_US_EN + "/jcr:content/data/master")).thenReturn(jcrContentResource);
		when(resource.getResourceResolver()).thenReturn(resolver);
		when(resource.getValueMap()).thenReturn(pagePropertiesMap);
		when(pagePropertiesMap.get("coveoPush", Boolean.class)).thenReturn(Boolean.TRUE);

		when(jcrContentNode.getPath()).thenReturn(CONTENT_WE_RETAIL_US_EN + "/jcr:content/data/master");
		when(resource.getParent()).thenReturn(jcrContentResourceParent);
		when(jcrContentResourceParent.getPath()).thenReturn("/en");

		when(jcrContentNode.getPath()).thenReturn(CONTENT_WE_RETAIL_US_EN);

		doReturn(connection).when(coveoPushUtilities).createHTTPSConnection(any());
		doReturn(201).when(connection).getResponseCode();
		URL url = new URL(
				"https://localhost:4502/pushURL/v1/organizations/orgId/sources/sourceid/documents?documentId=http%3A%2F%2Flocalhost%3A4503%2Fcontent%2Fwe-retail%2Fus%2Fen.html");
		doReturn(finalConnection).when(coveoPushUtilities).createHTTPSConnection(url);
		doReturn(202).when(finalConnection).getResponseCode();
		when(jcrContentResource.adaptTo(Node.class)).thenReturn(jcrContentNode);
		when(jcrContentNode.hasProperty(any())).thenReturn(true);
		when(jcrContentNode.getProperty(any())).thenReturn(property);
		when(property.isMultiple()).thenReturn(false);
		when(property.getString()).thenReturn("some text go here");
		when(jcrContentNode.getPath()).thenReturn(CONTENT_WE_RETAIL_US_EN_JCR_CONTENT);

		Calendar cal = Calendar.getInstance();
		when(pagePropertiesMap.get("jcr:lastModified", Calendar.class)).thenReturn(cal);
		when(pagePropertiesMap.get("jcr:created", Calendar.class)).thenReturn(cal);
		when(pagePropertiesMap.get("cq:lastReplicated", Calendar.class)).thenReturn(cal);

		when(resolver.adaptTo(QueryBuilder.class)).thenReturn(queryBuilder);

		Map<String, String> map = new HashMap<>();
		map.put("path", "/content");
		map.put("1_property", "coveoPush");
		map.put("1_property.value", "true");
		map.put("p.limit", "-1");
		when(queryBuilder.createQuery(PredicateGroup.create(map), session)).thenReturn(query);
		when(query.getResult()).thenReturn(result);
		when(result.getHits()).thenReturn(Collections.singletonList(hit));
		when(hit.getPath()).thenReturn(CONTENT_WE_RETAIL_US_EN);

		when(resolver.getResource("/var/coveoconnector/coveomappings")).thenReturn(configRes);
		when(configRes.adaptTo(ValueMap.class)).thenReturn(configValueMap);
		when(configValueMap.get("pageFieldMapping", String.class)).thenReturn(
				"[{      \"aemField\":\"jcr:title\",      \"coveoType\":\"STRING\",      \"coveoField\":\"title\"   },   {      \"aemField\":\"jcr:description\",      \"coveoType\":\"STRING\",      \"coveoField\":\"description\"   },   {      \"aemField\":\"jcr:lastModified\",      \"coveoType\":\"DATE\",      \"coveoField\":\"lastmodified\"   },   {      \"aemField\":\"jcr:language\",      \"coveoType\":\"STRING\",      \"coveoField\":\"language\"   },   {      \"aemField\":\"jcr:created\",      \"coveoType\":\"DATE\",      \"coveoField\":\"date\"   },   {      \"aemField\":\"cq:tags\",      \"coveoType\":\"STRING\",      \"coveoField\":\"tags\"   },   {      \"aemField\":\"jcr:createdBy\",      \"coveoType\":\"STRING\",      \"coveoField\":\"author\"   },   {      \"aemField\":\"cq:lastReplicated\",      \"coveoType\":\"DATE\",      \"coveoField\":\"publishdate\"   },   {      \"aemField\":\"siteName\",      \"coveoType\":\"STRING\",      \"coveoField\":\"site\"   },   {      \"aemField\":\"contentType\",      \"coveoType\":\"STRING\",      \"coveoField\":\"contenttype\"   },   {      \"aemField\":\"contentCategory\",      \"coveoType\":\"STRING\",      \"coveoField\":\"contentcategory\"   },   {      \"aemField\":\"clickableuri\",      \"coveoType\":\"STRING\",      \"coveoField\":\"url\"   },   {      \"aemField\":\"division\",      \"coveoType\":\"STRING\",      \"coveoField\":\"divisionname\"   }]");

		doReturn("Sample Body HTML").when(coveoPushUtilities).getHTMlContent(any(), any(), any());

		doNothing().when(coveoPushUtilities).writeStream(any(), any());

		JobResult jobR = coveoPushAPIJobConsumer.process(job);
		assertEquals(JobResult.OK.name(), jobR.name());
	}


	@MockitoSettings(strictness = Strictness.WARN)
	@Test
	void testActivateRootPageWhenApiFailed() throws IOException, RepositoryException, ServletException {
		//Change the strictness level only for this test method:
		when(job.getProperty("actionType")).thenReturn("Activate");
		when(job.getProperty("actionPath")).thenReturn(CONTENT_WE_RETAIL_US_EN);

		when(resource.getPath()).thenReturn(CONTENT_WE_RETAIL_US_EN);
		when(resolver.getResource(CONTENT_WE_RETAIL_US_EN + JCR_CONTENT)).thenReturn(resource);
		when(resolver.getResource(CONTENT_WE_RETAIL_US_EN + "/jcr:content/data/master")).thenReturn(jcrContentResource);
		when(resource.getResourceResolver()).thenReturn(resolver);
		when(resource.getValueMap()).thenReturn(pagePropertiesMap);
		when(pagePropertiesMap.get("coveoPush", Boolean.class)).thenReturn(Boolean.TRUE);

		when(jcrContentNode.getPath()).thenReturn(CONTENT_WE_RETAIL_US_EN + "/jcr:content/data/master");
		when(resource.getParent()).thenReturn(jcrContentResourceParent);
		when(jcrContentResourceParent.getPath()).thenReturn("/en");

		when(jcrContentNode.getPath()).thenReturn(CONTENT_WE_RETAIL_US_EN);

		doReturn(connection).when(coveoPushUtilities).createHTTPSConnection(any());
		doReturn(201).when(connection).getResponseCode();
		URL url = new URL(
				"https://localhost:4502/pushURL/v1/organizations/orgId/sources/sourceid/documents?documentId=http%3A%2F%2Flocalhost%3A4503%2Fcontent%2Fwe-retail%2Fus%2Fen.html");
		doReturn(finalConnection).when(coveoPushUtilities).createHTTPSConnection(url);
		doReturn(400).when(finalConnection).getResponseCode();
		doReturn(mock(InputStream.class)).when(finalConnection).getErrorStream();
		when(jcrContentResource.adaptTo(Node.class)).thenReturn(jcrContentNode);
		when(jcrContentNode.hasProperty(any())).thenReturn(true);
		when(jcrContentNode.getProperty(any())).thenReturn(property);
		when(property.isMultiple()).thenReturn(false);
		when(property.getString()).thenReturn("some text go here");
		when(jcrContentNode.getPath()).thenReturn(CONTENT_WE_RETAIL_US_EN_JCR_CONTENT);

		Calendar cal = Calendar.getInstance();
		when(pagePropertiesMap.get("jcr:lastModified", Calendar.class)).thenReturn(cal);
		when(pagePropertiesMap.get("jcr:created", Calendar.class)).thenReturn(cal);
		when(pagePropertiesMap.get("cq:lastReplicated", Calendar.class)).thenReturn(cal);

		when(resolver.adaptTo(QueryBuilder.class)).thenReturn(queryBuilder);

		Map<String, String> map = new HashMap<>();
		map.put("path", "/content");
		map.put("1_property", "coveoPush");
		map.put("1_property.value", "true");
		map.put("p.limit", "-1");
		when(queryBuilder.createQuery(PredicateGroup.create(map), session)).thenReturn(query);
		when(query.getResult()).thenReturn(result);
		when(result.getHits()).thenReturn(Collections.singletonList(hit));
		when(hit.getPath()).thenReturn(CONTENT_WE_RETAIL_US_EN);

		when(resolver.getResource("/var/coveoconnector/coveomappings")).thenReturn(configRes);
		when(configRes.adaptTo(ValueMap.class)).thenReturn(configValueMap);
		when(configValueMap.get("pageFieldMapping", String.class)).thenReturn(
				"[{      \"aemField\":\"jcr:title\",      \"coveoType\":\"STRING\",      \"coveoField\":\"title\"   },   {      \"aemField\":\"jcr:description\",      \"coveoType\":\"STRING\",      \"coveoField\":\"description\"   },   {      \"aemField\":\"jcr:lastModified\",      \"coveoType\":\"DATE\",      \"coveoField\":\"lastmodified\"   },   {      \"aemField\":\"jcr:language\",      \"coveoType\":\"STRING\",      \"coveoField\":\"language\"   },   {      \"aemField\":\"jcr:created\",      \"coveoType\":\"DATE\",      \"coveoField\":\"date\"   },   {      \"aemField\":\"cq:tags\",      \"coveoType\":\"STRING\",      \"coveoField\":\"tags\"   },   {      \"aemField\":\"jcr:createdBy\",      \"coveoType\":\"STRING\",      \"coveoField\":\"author\"   },   {      \"aemField\":\"cq:lastReplicated\",      \"coveoType\":\"DATE\",      \"coveoField\":\"publishdate\"   },   {      \"aemField\":\"siteName\",      \"coveoType\":\"STRING\",      \"coveoField\":\"site\"   },   {      \"aemField\":\"contentType\",      \"coveoType\":\"STRING\",      \"coveoField\":\"contenttype\"   },   {      \"aemField\":\"contentCategory\",      \"coveoType\":\"STRING\",      \"coveoField\":\"contentcategory\"   },   {      \"aemField\":\"clickableuri\",      \"coveoType\":\"STRING\",      \"coveoField\":\"url\"   },   {      \"aemField\":\"division\",      \"coveoType\":\"STRING\",      \"coveoField\":\"divisionname\"   }]");

		doReturn("Sample Body HTML").when(coveoPushUtilities).getHTMlContent(any(), any(), any());

		doNothing().when(coveoPushUtilities).writeStream(any(), any());

		JobResult jobR = coveoPushAPIJobConsumer.process(job);
		assertEquals(JobResult.FAILED, jobR);
	}

	@MockitoSettings(strictness = Strictness.WARN)
	@Test
	void testActivatePageFailed() throws IOException, LoginException, RepositoryException {
		when(job.getProperty("actionType")).thenReturn("Activate");
		when(job.getProperty("actionPath")).thenReturn(CONTENT_WE_RETAIL_US_EN);

		when(resource.getPath()).thenReturn(CONTENT_WE_RETAIL_US_EN);
		when(resolver.getResource(CONTENT_WE_RETAIL_US_EN + JCR_CONTENT)).thenReturn(resource);
		when(resolver.getResource(CONTENT_WE_RETAIL_US_EN + "/jcr:content/data/master")).thenReturn(resource);
		when(resource.getResourceResolver()).thenReturn(resolver);
		when(resource.getValueMap()).thenReturn(pagePropertiesMap);
		when(pagePropertiesMap.get("coveoPush", Boolean.class)).thenReturn(Boolean.FALSE);
		when(resource.hasChildren()).thenReturn(true);
		when(resource.getChild(JcrConstants.JCR_CONTENT)).thenReturn(jcrContentResource);
		when(jcrContentResource.adaptTo(Node.class)).thenReturn(jcrContentNode);
		when(jcrContentNode.hasProperty("coveoPush")).thenReturn(true);

		when(jcrContentNode.getProperty("coveoPush")).thenReturn(property);
		when(property.getValue()).thenThrow(new RepositoryException("RE"));
		JobResult jobR = coveoPushAPIJobConsumer.process(job);

		assertEquals(JobResult.FAILED, jobR);
	}


	@MockitoSettings(strictness = Strictness.WARN)
	@Test
	void testActivateAsset() throws IOException, RepositoryException {
		resourcePropmap.put("jcr:primaryType", "dam:Asset");
		resourcePropmap.put("contentFragment", Boolean.FALSE);

		when(job.getProperty("actionType")).thenReturn("Activate");
		when(job.getProperty("actionPath")).thenReturn(CONTENT_WE_RETAIL_US_EN);

		when(resource.getPath()).thenReturn(CONTENT_WE_RETAIL_US_EN);
		when(resolver.getResource(resource.getPath() + JCR_CONTENT)).thenReturn(resource);
		when(resource.getResourceResolver()).thenReturn(resolver);
		when(resolver.getResource(CONTENT_WE_RETAIL_US_EN + "/jcr:content/data/master")).thenReturn(resource);

		when(resolver.getResource("/var/coveoconnector/coveomappings")).thenReturn(configRes);
		when(configRes.adaptTo(ValueMap.class)).thenReturn(configValueMap);
		when(configValueMap.get("pageFieldMapping", String.class)).thenReturn(
				"[{      \"aemField\":\"jcr:title\",      \"coveoType\":\"STRING\",      \"coveoField\":\"title\"   },   {      \"aemField\":\"jcr:description\",      \"coveoType\":\"STRING\",      \"coveoField\":\"description\"   },   {      \"aemField\":\"jcr:lastModified\",      \"coveoType\":\"DATE\",      \"coveoField\":\"lastmodified\"   },   {      \"aemField\":\"jcr:language\",      \"coveoType\":\"STRING\",      \"coveoField\":\"language\"   },   {      \"aemField\":\"jcr:created\",      \"coveoType\":\"DATE\",      \"coveoField\":\"date\"   },   {      \"aemField\":\"cq:tags\",      \"coveoType\":\"STRING\",      \"coveoField\":\"tags\"   },   {      \"aemField\":\"jcr:createdBy\",      \"coveoType\":\"STRING\",      \"coveoField\":\"author\"   },   {      \"aemField\":\"cq:lastReplicated\",      \"coveoType\":\"DATE\",      \"coveoField\":\"publishdate\"   },   {      \"aemField\":\"siteName\",      \"coveoType\":\"STRING\",      \"coveoField\":\"site\"   },   {      \"aemField\":\"contentType\",      \"coveoType\":\"STRING\",      \"coveoField\":\"contenttype\"   },   {      \"aemField\":\"contentCategory\",      \"coveoType\":\"STRING\",      \"coveoField\":\"contentcategory\"   },   {      \"aemField\":\"clickableuri\",      \"coveoType\":\"STRING\",      \"coveoField\":\"url\"   },   {      \"aemField\":\"division\",      \"coveoType\":\"STRING\",      \"coveoField\":\"divisionname\"   }]");

		when(resource.getValueMap()).thenReturn(pagePropertiesMap);
		when(pagePropertiesMap.get("externalizerDomain", String.class)).thenReturn(PUBLISH);
		when(resolver.getResource(CONTENT_WE_RETAIL_US_EN + "/jcr:content/metadata")).thenReturn(resource);

		//isCoveoPush
		when(resource.getParent()).thenReturn(jcrContentResourceParent);
		when(jcrContentResourceParent.getPath()).thenReturn(CONTENT_WE_RETAIL_US);
		when(resolver.getResource(CONTENT_WE_RETAIL_US)).thenReturn(jcrContentResourceParent);
		when(jcrContentResourceParent.adaptTo(Node.class)).thenReturn(jcrContentNode);
		when(jcrContentNode.hasProperty("coveoPush")).thenReturn(true);
		when(jcrContentNode.getProperty("coveoPush")).thenReturn(property);
		Value value = mock(Value.class);
		when(property.getValue()).thenReturn(value);
		when(value.getString()).thenReturn("true");
		when(jcrContentNode.getProperty("coveoPush")).thenReturn(property);

		Resource rootResource = mock(Resource.class);
		Node rootNode = mock(Node.class);
		Property rootProp = mock(Property.class);
		Value rootValue = mock(Value.class);
		when(jcrContentResourceParent.getParent()).thenReturn(rootResource);
		when(rootResource.getPath()).thenReturn("/content/we-retail");
		when(resolver.getResource("/content/we-retail")).thenReturn(rootResource);
		when(resolver.getResource("/content/we-retail/jcr:content/metadata")).thenReturn(rootResource);
		when(rootResource.adaptTo(Node.class)).thenReturn(rootNode);
		when(rootNode.hasProperty("coveoPush")).thenReturn(true);
		when(rootNode.getProperty("coveoPush")).thenReturn(rootProp);
		when(rootProp.getValue()).thenReturn(rootValue);
		when(rootValue.getString()).thenReturn("true");

		//checkChildParentJCRProperties
		when(jcrContentResourceParent.getValueMap()).thenReturn(pagePropertiesMapParent);
		when(pagePropertiesMapParent.get("excludeChildPagesCoveoPush")).thenReturn("true");

		doReturn(connection).when(coveoPushUtilities).createHTTPSConnection(any());
		doReturn(201).when(connection).getResponseCode();
		doReturn("Ok").when(coveoPushUtilities).pushDocumentToCoveo("{\"url\":\"http://localhost:4503/content/we-retail/us/en\",\"filetype\":\"HTML\",\"path\":\"/content/we-retail/us/en\"}",  "http://localhost:4503/content/we-retail/us/en");

		JobResult jobR = coveoPushAPIJobConsumer.process(job);
		assertEquals (JobResult.OK, jobR);
	}

	@MockitoSettings(strictness = Strictness.WARN)
	@Test
	void testActivateContentFragmentAsset() throws IOException, RepositoryException {
		resourcePropmap.put("jcr:primaryType", "dam:Asset");
		resourcePropmap.put("contentFragment", Boolean.TRUE);

		when(job.getProperty("actionType")).thenReturn("Activate");
		when(job.getProperty("actionPath")).thenReturn(CONTENT_WE_RETAIL_US_EN);

		doReturn("publish").when(coveoPushUtilities).getExternalizeDomainName(any(Resource.class), any(ResourceResolver.class), anyBoolean());

		when(resource.getPath()).thenReturn(CONTENT_WE_RETAIL_US_EN);
		when(resolver.getResource(resource.getPath() + JCR_CONTENT)).thenReturn(resource);
		when(resource.getResourceResolver()).thenReturn(resolver);
		when(resolver.getResource(CONTENT_WE_RETAIL_US_EN + "/jcr:content/data/master")).thenReturn(resource);

		when(resolver.getResource("/var/coveoconnector/coveomappings")).thenReturn(configRes);
		when(configRes.adaptTo(ValueMap.class)).thenReturn(configValueMap);
		when(configValueMap.get("pageFieldMapping", String.class)).thenReturn(
				"[{      \"aemField\":\"jcr:title\",      \"coveoType\":\"STRING\",      \"coveoField\":\"title\"   },   {      \"aemField\":\"jcr:description\",      \"coveoType\":\"STRING\",      \"coveoField\":\"description\"   },   {      \"aemField\":\"jcr:lastModified\",      \"coveoType\":\"DATE\",      \"coveoField\":\"lastmodified\"   },   {      \"aemField\":\"jcr:language\",      \"coveoType\":\"STRING\",      \"coveoField\":\"language\"   },   {      \"aemField\":\"jcr:created\",      \"coveoType\":\"DATE\",      \"coveoField\":\"date\"   },   {      \"aemField\":\"cq:tags\",      \"coveoType\":\"STRING\",      \"coveoField\":\"tags\"   },   {      \"aemField\":\"jcr:createdBy\",      \"coveoType\":\"STRING\",      \"coveoField\":\"author\"   },   {      \"aemField\":\"cq:lastReplicated\",      \"coveoType\":\"DATE\",      \"coveoField\":\"publishdate\"   },   {      \"aemField\":\"siteName\",      \"coveoType\":\"STRING\",      \"coveoField\":\"site\"   },   {      \"aemField\":\"contentType\",      \"coveoType\":\"STRING\",      \"coveoField\":\"contenttype\"   },   {      \"aemField\":\"contentCategory\",      \"coveoType\":\"STRING\",      \"coveoField\":\"contentcategory\"   },   {      \"aemField\":\"clickableuri\",      \"coveoType\":\"STRING\",      \"coveoField\":\"url\"   },   {      \"aemField\":\"division\",      \"coveoType\":\"STRING\",      \"coveoField\":\"divisionname\"   }]");

		when(resource.getValueMap()).thenReturn(pagePropertiesMap);
		when(pagePropertiesMap.get("externalizerDomain", String.class)).thenReturn(PUBLISH);
		when(resolver.getResource(CONTENT_WE_RETAIL_US_EN + "/jcr:content/metadata")).thenReturn(resource);

		//isCoveoPush
		when(resource.getParent()).thenReturn(jcrContentResourceParent);
		when(jcrContentResourceParent.getPath()).thenReturn("/content/dam");

		when(resolver.getResource(CONTENT_WE_RETAIL_US)).thenReturn(jcrContentResourceParent);
		when(jcrContentResourceParent.adaptTo(Node.class)).thenReturn(jcrContentNode);
		when(jcrContentNode.hasProperty("coveoPush")).thenReturn(true);
		when(jcrContentNode.getProperty("coveoPush")).thenReturn(property);
		Value value = mock(Value.class);
		when(property.getValue()).thenReturn(value);
		when(value.getString()).thenReturn("true");
		when(jcrContentNode.getProperty("coveoPush")).thenReturn(property);

		Resource rootResource = mock(Resource.class);
		when(jcrContentResourceParent.getParent()).thenReturn(rootResource);
		when(rootResource.getPath()).thenReturn("/content/we-retail");
		when(resolver.getResource("/content/we-retail")).thenReturn(null);

		doReturn(connection).when(coveoPushUtilities).createHTTPSConnection(any());
		doReturn(201).when(connection).getResponseCode();
		doReturn("success").when(coveoPushUtilities).pushDocumentToCoveo("{\"url\":\"http://localhost:4503/content/we-retail/us/en\",\"filetype\":\"HTML\",\"path\":\"/content/we-retail/us/en\"}",  "http://localhost:4503/content/we-retail/us/en");

		JobResult jobR = coveoPushAPIJobConsumer.process(job);
		assertEquals (JobResult.OK, jobR);
	}

	@MockitoSettings(strictness = Strictness.WARN)
	@Test
	void testActivateAssetFailure() throws IOException, RepositoryException {
		resourcePropmap.put("jcr:primaryType", "dam:Asset");
		resourcePropmap.put("contentFragment", Boolean.FALSE);

		when(job.getProperty("actionType")).thenReturn("Activate");
		when(job.getProperty("actionPath")).thenReturn(CONTENT_WE_RETAIL_US_EN);

		when(resource.getPath()).thenReturn(CONTENT_WE_RETAIL_US_EN);
		when(resolver.getResource(resource.getPath() + JCR_CONTENT)).thenReturn(resource);
		when(resource.getResourceResolver()).thenReturn(resolver);
		when(resolver.getResource(CONTENT_WE_RETAIL_US_EN + "/jcr:content/data/master")).thenReturn(resource);

		when(resolver.getResource("/var/coveoconnector/coveomappings")).thenReturn(configRes);
		when(configRes.adaptTo(ValueMap.class)).thenReturn(configValueMap);
		when(configValueMap.get("pageFieldMapping", String.class)).thenReturn(
				"[{      \"aemField\":\"jcr:title\",      \"coveoType\":\"STRING\",      \"coveoField\":\"title\"   },   {      \"aemField\":\"jcr:description\",      \"coveoType\":\"STRING\",      \"coveoField\":\"description\"   },   {      \"aemField\":\"jcr:lastModified\",      \"coveoType\":\"DATE\",      \"coveoField\":\"lastmodified\"   },   {      \"aemField\":\"jcr:language\",      \"coveoType\":\"STRING\",      \"coveoField\":\"language\"   },   {      \"aemField\":\"jcr:created\",      \"coveoType\":\"DATE\",      \"coveoField\":\"date\"   },   {      \"aemField\":\"cq:tags\",      \"coveoType\":\"STRING\",      \"coveoField\":\"tags\"   },   {      \"aemField\":\"jcr:createdBy\",      \"coveoType\":\"STRING\",      \"coveoField\":\"author\"   },   {      \"aemField\":\"cq:lastReplicated\",      \"coveoType\":\"DATE\",      \"coveoField\":\"publishdate\"   },   {      \"aemField\":\"siteName\",      \"coveoType\":\"STRING\",      \"coveoField\":\"site\"   },   {      \"aemField\":\"contentType\",      \"coveoType\":\"STRING\",      \"coveoField\":\"contenttype\"   },   {      \"aemField\":\"contentCategory\",      \"coveoType\":\"STRING\",      \"coveoField\":\"contentcategory\"   },   {      \"aemField\":\"clickableuri\",      \"coveoType\":\"STRING\",      \"coveoField\":\"url\"   },   {      \"aemField\":\"division\",      \"coveoType\":\"STRING\",      \"coveoField\":\"divisionname\"   }]");

		when(resource.getValueMap()).thenReturn(pagePropertiesMap);
		when(pagePropertiesMap.get("externalizerDomain", String.class)).thenReturn(PUBLISH);
		when(resolver.getResource(CONTENT_WE_RETAIL_US_EN + "/jcr:content/metadata")).thenReturn(resource);

		//is coveo push
		when(resource.getParent()).thenReturn(jcrContentResourceParent);
		when(jcrContentResourceParent.getPath()).thenReturn(CONTENT_WE_RETAIL_US);
		when(resolver.getResource(CONTENT_WE_RETAIL_US)).thenReturn(jcrContentResourceParent);
		when(resolver.getResource(CONTENT_WE_RETAIL_US + "/jcr:content/metadata")).thenReturn(jcrContentResourceParent);

		Node mockNode = mock(Node.class);
		when(jcrContentResourceParent.adaptTo(Node.class)).thenReturn(mockNode);
		when(mockNode.hasProperty("coveoPush")).thenReturn(true);
		when(mockNode.getProperty("coveoPush")).thenThrow(new RepositoryException("RE"));

		//checkChildParentJCRProperties
		when(jcrContentResourceParent.getValueMap()).thenReturn(pagePropertiesMapParent);
		when(pagePropertiesMapParent.get("excludeChildPagesCoveoPush")).thenReturn("false");

		doReturn(connection).when(coveoPushUtilities).createHTTPSConnection(any());
		doReturn(201).when(connection).getResponseCode();
		doReturn("success").when(coveoPushUtilities).pushDocumentToCoveo("{\"url\":\"http://localhost:4503/content/we-retail/us/en\",\"filetype\":\"HTML\",\"path\":\"/content/we-retail/us/en\"}",  "http://localhost:4503/content/we-retail/us/en");

		JobResult jobR = coveoPushAPIJobConsumer.process(job);
		assertEquals (JobResult.OK, jobR);
	}

	@MockitoSettings(strictness = Strictness.WARN)
	@Test
	void testDeactivatePage() throws IOException {
		when(job.getProperty("actionType")).thenReturn("Deactivate");
		when(job.getProperty("actionPath")).thenReturn(CONTENT_WE_RETAIL_US_EN);

		when(resource.getPath()).thenReturn(CONTENT_WE_RETAIL_US_EN);
		when(resolver.getResource(resource.getPath() + JCR_CONTENT)).thenReturn(resource);
		when(resource.getResourceResolver()).thenReturn(resolver);
		when(resolver.getResource(CONTENT_WE_RETAIL_US_EN + "/jcr:content/data/master")).thenReturn(resource);

		when(resolver.getResource("/var/coveoconnector/coveomappings")).thenReturn(configRes);
		when(configRes.adaptTo(ValueMap.class)).thenReturn(configValueMap);
		when(configValueMap.get("contentFragment", Boolean.class)).thenReturn(Boolean.TRUE);
		when(configValueMap.get("hideInSitemap", Boolean.class)).thenReturn(Boolean.FALSE);
		when(configValueMap.get("hideInSitemap", Boolean.class)).thenReturn(Boolean.FALSE);
		when(configValueMap.get("pageFieldMapping", String.class)).thenReturn(
				"[{      \"aemField\":\"jcr:title\",      \"coveoType\":\"STRING\",      \"coveoField\":\"title\"   },   {      \"aemField\":\"jcr:description\",      \"coveoType\":\"DOUBLE\",      \"coveoField\":\"description\"   },   {      \"aemField\":\"jcr:lastModified\",      \"coveoType\":\"DATE\",      \"coveoField\":\"lastmodified\"   },   {      \"aemField\":\"jcr:language\",      \"coveoType\":\"LONG_64\",      \"coveoField\":\"language\"   },   {      \"aemField\":\"jcr:created\",      \"coveoType\":\"DATE\",      \"coveoField\":\"date\"   },   {      \"aemField\":\"cq:tags\",      \"coveoType\":\"STRING\",      \"coveoField\":\"tags\"   },   {      \"aemField\":\"jcr:createdBy\",      \"coveoType\":\"STRING\",      \"coveoField\":\"author\"   },   {      \"aemField\":\"cq:lastReplicated\",      \"coveoType\":\"DATE\",      \"coveoField\":\"publishdate\"   },   {      \"aemField\":\"siteName\",      \"coveoType\":\"STRING\",      \"coveoField\":\"site\"   },   {      \"aemField\":\"contentType\",      \"coveoType\":\"STRING\",      \"coveoField\":\"contenttype\"   },   {      \"aemField\":\"contentCategory\",      \"coveoType\":\"STRING\",      \"coveoField\":\"contentcategory\"   },   {      \"aemField\":\"clickableuri\",      \"coveoType\":\"STRING\",      \"coveoField\":\"url\"   },   {      \"aemField\":\"division\",      \"coveoType\":\"STRING\",      \"coveoField\":\"divisionname\"   }]");

		doReturn(connection).when(coveoPushUtilities).createHTTPSConnection(any());
		doReturn(202).when(connection).getResponseCode();
		
		JobResult jobR = coveoPushAPIJobConsumer.process(job);
		assertEquals (JobResult.OK, jobR);
	}

	@MockitoSettings(strictness = Strictness.WARN)
	@Test
	void testDeactivatePageWhenApiFail() throws IOException {
		when(job.getProperty("actionType")).thenReturn("Deactivate");
		when(job.getProperty("actionPath")).thenReturn(CONTENT_WE_RETAIL_US_EN);

		when(resource.getPath()).thenReturn(CONTENT_WE_RETAIL_US_EN);
		when(resolver.getResource(resource.getPath() + JCR_CONTENT)).thenReturn(resource);
		when(resource.getResourceResolver()).thenReturn(resolver);
		when(resolver.getResource(CONTENT_WE_RETAIL_US_EN + "/jcr:content/data/master")).thenReturn(resource);

		when(resolver.getResource("/var/coveoconnector/coveomappings")).thenReturn(configRes);
		when(configRes.adaptTo(ValueMap.class)).thenReturn(configValueMap);
		when(configValueMap.get("contentFragment", Boolean.class)).thenReturn(Boolean.TRUE);
		when(configValueMap.get("hideInSitemap", Boolean.class)).thenReturn(Boolean.FALSE);
		when(configValueMap.get("hideInSitemap", Boolean.class)).thenReturn(Boolean.FALSE);
		when(configValueMap.get("pageFieldMapping", String.class)).thenReturn(
				"[{      \"aemField\":\"jcr:title\",      \"coveoType\":\"STRING\",      \"coveoField\":\"title\"   },   {      \"aemField\":\"jcr:description\",      \"coveoType\":\"DOUBLE\",      \"coveoField\":\"description\"   },   {      \"aemField\":\"jcr:lastModified\",      \"coveoType\":\"DATE\",      \"coveoField\":\"lastmodified\"   },   {      \"aemField\":\"jcr:language\",      \"coveoType\":\"LONG_64\",      \"coveoField\":\"language\"   },   {      \"aemField\":\"jcr:created\",      \"coveoType\":\"DATE\",      \"coveoField\":\"date\"   },   {      \"aemField\":\"cq:tags\",      \"coveoType\":\"STRING\",      \"coveoField\":\"tags\"   },   {      \"aemField\":\"jcr:createdBy\",      \"coveoType\":\"STRING\",      \"coveoField\":\"author\"   },   {      \"aemField\":\"cq:lastReplicated\",      \"coveoType\":\"DATE\",      \"coveoField\":\"publishdate\"   },   {      \"aemField\":\"siteName\",      \"coveoType\":\"STRING\",      \"coveoField\":\"site\"   },   {      \"aemField\":\"contentType\",      \"coveoType\":\"STRING\",      \"coveoField\":\"contenttype\"   },   {      \"aemField\":\"contentCategory\",      \"coveoType\":\"STRING\",      \"coveoField\":\"contentcategory\"   },   {      \"aemField\":\"clickableuri\",      \"coveoType\":\"STRING\",      \"coveoField\":\"url\"   },   {      \"aemField\":\"division\",      \"coveoType\":\"STRING\",      \"coveoField\":\"divisionname\"   }]");

		doReturn(connection).when(coveoPushUtilities).createHTTPSConnection(any());
		doReturn(400).when(connection).getResponseCode();
		doReturn(mock(InputStream.class)).when(connection).getErrorStream();

		JobResult jobR = coveoPushAPIJobConsumer.process(job);
		assertEquals (JobResult.FAILED, jobR);
	}
	
	@MockitoSettings(strictness = Strictness.WARN)
	@Test
	void testDeactivatePageFailed() throws IOException, LoginException {
		when(job.getProperty("actionType")).thenReturn("Deactivate");
		when(job.getProperty("actionPath")).thenReturn(CONTENT_WE_RETAIL_US_EN);
		when(job.getProperty("replicationFilter")).thenReturn(null);

		when(resResolverFactory.getServiceResourceResolver(anyMap())).thenThrow(new LoginException("LE"));
		
		JobResult jobR = coveoPushAPIJobConsumer.process(job);
		assertEquals(JobResult.FAILED, jobR);
	}

	@MockitoSettings(strictness = Strictness.WARN)
	@Test
	void testDeactivateAsset() throws IOException, RepositoryException {
		resourcePropmap.put("jcr:primaryType", "dam:Asset");
		resourcePropmap.put("contentFragment", Boolean.TRUE);

		when(job.getProperty("actionType")).thenReturn("Deactivate");
		when(job.getProperty("actionPath")).thenReturn(CONTENT_WE_RETAIL_US_EN);

		when(resource.getPath()).thenReturn(CONTENT_WE_RETAIL_US_EN);
		when(resolver.getResource(resource.getPath() + JCR_CONTENT)).thenReturn(resource);
		when(resource.getResourceResolver()).thenReturn(resolver);
		when(resolver.getResource(CONTENT_WE_RETAIL_US_EN + "/jcr:content/data/master")).thenReturn(resource);

		when(resolver.getResource("/var/coveoconnector/coveomappings")).thenReturn(configRes);
		when(configRes.adaptTo(ValueMap.class)).thenReturn(configValueMap);
		when(configValueMap.get("pageFieldMapping", String.class)).thenReturn(
				"[{      \"aemField\":\"jcr:title\",      \"coveoType\":\"STRING\",      \"coveoField\":\"title\"   },   {      \"aemField\":\"jcr:description\",      \"coveoType\":\"DOUBLE\",      \"coveoField\":\"description\"   },   {      \"aemField\":\"jcr:lastModified\",      \"coveoType\":\"DATE\",      \"coveoField\":\"lastmodified\"   },   {      \"aemField\":\"jcr:language\",      \"coveoType\":\"LONG_64\",      \"coveoField\":\"language\"   },   {      \"aemField\":\"jcr:created\",      \"coveoType\":\"DATE\",      \"coveoField\":\"date\"   },   {      \"aemField\":\"cq:tags\",      \"coveoType\":\"STRING\",      \"coveoField\":\"tags\"   },   {      \"aemField\":\"jcr:createdBy\",      \"coveoType\":\"STRING\",      \"coveoField\":\"author\"   },   {      \"aemField\":\"cq:lastReplicated\",      \"coveoType\":\"DATE\",      \"coveoField\":\"publishdate\"   },   {      \"aemField\":\"siteName\",      \"coveoType\":\"STRING\",      \"coveoField\":\"site\"   },   {      \"aemField\":\"contentType\",      \"coveoType\":\"STRING\",      \"coveoField\":\"contenttype\"   },   {      \"aemField\":\"contentCategory\",      \"coveoType\":\"STRING\",      \"coveoField\":\"contentcategory\"   },   {      \"aemField\":\"clickableuri\",      \"coveoType\":\"STRING\",      \"coveoField\":\"url\"   },   {      \"aemField\":\"division\",      \"coveoType\":\"STRING\",      \"coveoField\":\"divisionname\"   }]");

		when(configValueMap.get("assetFieldMapping", String.class)).thenReturn("[{\"aemField\":\"searchpage\", \"coveoType\":\"STRING\",\"coveoField\":\"searchpage\"}]");
		when(resource.getValueMap()).thenReturn(pagePropertiesMap);
		when(pagePropertiesMap.get("externalizerDomain", String.class)).thenReturn(PUBLISH);

		//Mock for CoveoPushUtilities.getExternalizeDomainName, updateDocId
		TagManager tagManager = mock(TagManager.class);
		Tag tag = mock(Tag.class);
		Property tagProp = mock(Property.class);
		when(resolver.adaptTo(TagManager.class)).thenReturn(tagManager);
		Node jcrParentNode = mock(Node.class);
		when(jcrContentNode.getPath()).thenReturn(CONTENT_WE_RETAIL_US_EN);
		when(resolver.getResource(CONTENT_WE_RETAIL_US_EN + "/jcr:content/metadata")).thenReturn(resource);
		when(resolver.getResource(CONTENT_WE_RETAIL_US + "/jcr:content/metadata")).thenReturn(jcrContentResourceParent);
		when(resource.adaptTo(Node.class)).thenReturn(jcrContentNode);
		when(jcrContentResourceParent.adaptTo(Node.class)).thenReturn(jcrParentNode);
		when(jcrParentNode.getPath()).thenReturn(CONTENT_WE_RETAIL_US);
		when(jcrContentNode.getParent()).thenReturn(jcrParentNode);
		when(jcrParentNode.hasProperty("externalizerDomain")).thenReturn(true);
		when(jcrParentNode.getProperty("externalizerDomain")).thenReturn(tagProp);
		when(tagProp.getName()).thenReturn("contentType");
		when(tagProp.getString()).thenReturn("prop");
		when(tagManager.resolve("prop")).thenReturn(tag);
		when(tag.getTitle()).thenReturn("");
		Property searchPageProp = mock(Property.class);
		when(jcrContentNode.hasProperty("searchpage")).thenReturn(true);
		when(jcrContentNode.getProperty("searchpage")).thenReturn(searchPageProp);
		when(searchPageProp.isMultiple()).thenReturn(false);
		when(searchPageProp.getString()).thenReturn("{\"page\": \"/content/abbott/\"}");

		//mock for responseCode
		doReturn(connection).when(coveoPushUtilities).createHTTPSConnection(any());
		doReturn(202).when(connection).getResponseCode();

		JobResult jobR = coveoPushAPIJobConsumer.process(job);
		assertEquals(JobResult.OK, jobR);
	}
}

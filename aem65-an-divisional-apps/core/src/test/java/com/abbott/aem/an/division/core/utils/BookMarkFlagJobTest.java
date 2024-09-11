package com.abbott.aem.an.division.core.utils;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.UnsupportedRepositoryOperationException;
import javax.jcr.Workspace;
import javax.jcr.observation.Event;
import javax.jcr.observation.EventIterator;
import javax.jcr.observation.ObservationManager;

import org.apache.http.HttpEntity;
import org.apache.http.StatusLine;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.quality.Strictness;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.an.division.core.services.BookMarkConfigurationService;
import com.abbott.aem.an.division.core.services.impl.BookMarkConfigurationServiceImpl;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@MockitoSettings(strictness = Strictness.LENIENT)
@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class BookMarkFlagJobTest {

	@Mock
	private ResourceResolverFactory resourceResolverFactory;

	@Mock
	ResourceResolver resolver;

	@Mock
	private Session session;

	@Mock
	private Workspace workspace;

	@Mock
	private ObservationManager observationManager;

	@Mock
	private EventIterator eventIterator;

	@Mock
	private Event event;

	@Mock
	private BookMarkConfigurationService bookMarkConfig;

	@Mock
	private Resource resource;

	@Mock
	 ModifiableValueMap modValueMap;

	@InjectMocks
	private BookMarkFlagJob bookMarkFlagJob;

	@Mock
	private BookMarkFlagJob bookMarkFlagJobMock;

	@Mock
	PageManager pageManager;

	@Mock
	Page pageResource;

	@Mock
	ValueMap valueMap;

	@Mock
	CloseableHttpResponse response;

	@Mock
	StatusLine statusLine;

	@Mock
	HttpEntity entity;

	@InjectMocks
	BookMarkConfigurationServiceImpl configurationService;

	@Mock
	CloseableHttpClient mockClosableHttpClient;

	@BeforeEach
	public void setup() throws LoginException, RepositoryException, PersistenceException, IOException {
		MockitoAnnotations.openMocks(this);
		Map<String, Object> param = new HashMap<String, Object>();
		param.put(ResourceResolverFactory.SUBSERVICE, "hcp-system-user");
		when(resourceResolverFactory.getServiceResourceResolver(param)).thenReturn(resolver);
		when(resolver.adaptTo(Session.class)).thenReturn(session);
		when(session.getWorkspace()).thenReturn(workspace);
		when(workspace.getObservationManager()).thenReturn(observationManager);
		doNothing().when(observationManager).addEventListener(any(), anyInt(), any(String.class), any(Boolean.class),
				any(String[].class), any(String[].class), any(Boolean.class));
		when(eventIterator.hasNext()).thenReturn(true, false);
		when(eventIterator.nextEvent()).thenReturn(event);
		when(event.getType()).thenReturn(Event.NODE_ADDED);
		when(event.getPath()).thenReturn("/content/test");
		when(bookMarkConfig.getSessionPath()).thenReturn("/content");
		bookMarkFlagJob.aemPageUrl = "/content/test";
		doNothing().when(resolver).commit();
		when(resource.adaptTo(ModifiableValueMap.class)).thenReturn(modValueMap);
		when(resource.getValueMap()).thenReturn(modValueMap);
		when(resource.getValueMap()).thenReturn(valueMap);
		when(resourceResolverFactory.getServiceResourceResolver(param)).thenReturn(resolver);
		when(resource.getValueMap().get(("bookmarkFlag"), (String.class))).thenReturn("true");
		when(resource.getValueMap().get(("pageId"), (String.class))).thenReturn("1234");
		when(resource.getValueMap().get(("cq:lastReplicationAction_publish"), (String.class))).thenReturn("Deactivate");
		when(resource.getPath()).thenReturn("/content/sample-page");
		when(bookMarkConfig.getSessionPath()).thenReturn("/content/an/hcpsampling/us/en");
		when(bookMarkConfig.getDomainUrl()).thenReturn("https://dev2.pediatricproconnect.com");
		when(bookMarkConfig.getApiUrl()).thenReturn("https://dev2.services.abbott/api/system/assets/favourites");
		when(bookMarkConfig.getxApplicationId()).thenReturn("anhcpsample");
		when(bookMarkConfig.getCountryCode()).thenReturn("US");
		when(bookMarkConfig.getContentType()).thenReturn("application/json");
		when(bookMarkConfig.getxApplicationAccessKey()).thenReturn("iioPmuDHnqOhxE9Jbg8U8bx64vuBSCG");
		when(bookMarkConfig.getxOriginSecretKey()).thenReturn("c5b292d1290fce1c463af73ead3897a8");
		when(bookMarkConfig.getPreferredLanguage()).thenReturn("en_US");
		when(bookMarkConfig.getModule()).thenReturn(new String[] {"clinical-research","patient-resources","nutrition-resources"});
		String eventPath = "/content/sample-page/jcr:content";
		String concPage = "/content/sample-page";
		when(resolver.adaptTo(PageManager.class)).thenReturn(pageManager);
		when(pageManager.getContainingPage(eventPath)).thenReturn(pageResource);
		when(pageResource.getPath()).thenReturn(concPage);
		
	}

	@Test
	void testActivate() throws PersistenceException, LoginException, UnsupportedRepositoryOperationException, RepositoryException {
		when(resourceResolverFactory.getServiceResourceResolver(any())).thenReturn(resolver);
		when(resolver.adaptTo(Session.class)).thenReturn(session);
		when(session.getWorkspace()).thenReturn(workspace);
		when(workspace.getObservationManager()).thenReturn(observationManager);
		doNothing().when(observationManager).addEventListener(any(), anyInt(), any(String.class), any(Boolean.class),
				any(String[].class), any(String[].class), any(Boolean.class));
		bookMarkFlagJob.activate(null);
		verify(resolver, times(0)).commit();
	}

	@Test
	void testDeactivate() throws PersistenceException {
		bookMarkFlagJob.deactivate(null);
		verify(resolver, times(0)).commit();
	}

	@Test
	void testOnEvent() throws RepositoryException  {
		String eventPath = "/content/sample-page/bookmarkFlag";
		String eventPath2 = "/content/sample-page/cq:lastReplicationAction_publish";
		when(resolver.adaptTo(PageManager.class)).thenReturn(pageManager);
		when(pageManager.getContainingPage(eventPath)).thenReturn(pageResource);
		when(pageManager.getContainingPage(eventPath2)).thenReturn(pageResource);
		when(pageResource.getPath()).thenReturn("/content/sample-page");
		when(resolver.getResource("/content/sample-page/jcr:content")).thenReturn(resource);
		EventIterator eventIteratorMock = mock(EventIterator.class);
		when(eventIteratorMock.hasNext()).thenReturn(true, true, false);
		Event eventMock = mock(Event.class);
		Event eventMock2 = mock(Event.class);
		when(eventIteratorMock.nextEvent()).thenReturn(eventMock).thenReturn(eventMock2);
		when(eventMock.getPath()).thenReturn(eventPath);
		when(eventMock.getType()).thenReturn(4);
		when(eventMock2.getPath()).thenReturn(eventPath2);
		when(eventMock2.getType()).thenReturn(16);
		bookMarkFlagJob.onEvent(eventIteratorMock);
		verify(pageResource, times(2)).getPath();
	}

	@Test
	void testCreateBookMark() throws IOException {
		when(event.getType()).thenReturn(4);
		bookMarkFlagJob.createBookMark(resource);
		verify(pageResource, times(0)).getPath();
	}
	
	@Test
	void testCreateBookMark_Else() throws IOException {
		when(event.getType()).thenReturn(4);
		when(resource.getValueMap().get(("bookmarkFlag"), (String.class))).thenReturn("false");
		ModifiableValueMap modValueMap = mock(ModifiableValueMap.class);
		when(resource.adaptTo(ModifiableValueMap.class)).thenReturn(modValueMap);
		when(modValueMap.remove("pageId")).thenReturn("removed");
		bookMarkFlagJob.createBookMark(resource);
		verify(pageResource, times(0)).getPath();
	}

	@Test
	void testDeleteBookMark() throws IOException {
		when(resource.getPath()).thenReturn("/content/sample-page/jcr:content");
		when(resource.getValueMap().get(("cq:lastReplicationAction_publish"), (String.class))).thenReturn("Deactivate");
		String eventPath = "/content/sample-page/jcr:content";
		String concPage = "/content/sample-page";
		when(resolver.adaptTo(PageManager.class)).thenReturn(pageManager);
		when(pageManager.getContainingPage(eventPath)).thenReturn(pageResource);
		when(pageResource.getPath()).thenReturn(concPage);
		when(bookMarkConfig.getSessionPath()).thenReturn("/content/an/hcpsampling/us/en");
		when(bookMarkConfig.getDomainUrl()).thenReturn("https://dev2.pediatricproconnect.com");
		when(bookMarkConfig.getApiUrl()).thenReturn("https://dev2.services.abbott/api/system/assets/favourites");
		when(bookMarkConfig.getxApplicationId()).thenReturn("anhcpsample");
		when(bookMarkConfig.getCountryCode()).thenReturn("US");
		when(bookMarkConfig.getContentType()).thenReturn("application/json");
		when(bookMarkConfig.getxApplicationAccessKey()).thenReturn("iioPmuDHnqOhxE9Jbg8U8bx64vuBSCG");
		when(bookMarkConfig.getxOriginSecretKey()).thenReturn("c5b292d1290fce1c463af73ead3897a8");
		when(bookMarkConfig.getPreferredLanguage()).thenReturn("en_US");
		ModifiableValueMap modValueMap = mock(ModifiableValueMap.class);
		when(resource.adaptTo(ModifiableValueMap.class)).thenReturn(modValueMap);
		when(modValueMap.remove("pageId")).thenReturn("removed");
		bookMarkFlagJob.deleteBookMark(resource);
		verify(pageResource, times(0)).getPath();
	}

	@Test
	void testGetResourcePagePath() {
		String eventPath = "/content/sample-page/jcr:content";
		when(resolver.adaptTo(PageManager.class)).thenReturn(pageManager);
		when(pageManager.getContainingPage(eventPath)).thenReturn(pageResource);
		when(pageResource.getPath()).thenReturn("/content/sample-page");
		when(resolver.getResource("/content/sample-page/jcr:content")).thenReturn(resource);
		Resource resultResource = bookMarkFlagJob.getResourcePagePath(eventPath);
		assertEquals(resource, resultResource);
	}

	@Test
	void testGenerateHashId() throws Exception {
		String input = "testInput";
		String result = bookMarkFlagJob.genreateHashId(input);
		assertNotNull("Result should not be null", result);
	}

	@Test
	void testCallEslApi() throws ClientProtocolException, IOException {
		try (MockedStatic<HttpClients> mockClient = mockStatic(HttpClients.class);
				MockedStatic<EntityUtils> mockEntityUtils = mockStatic(EntityUtils.class)) {
			when(bookMarkConfig.getApiUrl()).thenReturn("http://api.example.com");
			when(bookMarkConfig.getxApplicationId()).thenReturn("yourAppId");
			when(bookMarkConfig.getCountryCode()).thenReturn("yourCountryCode");
			when(bookMarkConfig.getContentType()).thenReturn("yourContentType");
			when(bookMarkConfig.getxApplicationAccessKey()).thenReturn("yourAccessKey");
			when(bookMarkConfig.getPreferredLanguage()).thenReturn("en_US");
			when(bookMarkConfig.getxOriginSecretKey()).thenReturn("c5b292d1290fce1c463af73ead3897a8");
			String eventPath = "/content/sample-page/jcr:content";
			when(resolver.adaptTo(PageManager.class)).thenReturn(pageManager);
			when(pageManager.getContainingPage(eventPath)).thenReturn(pageResource);
			when(pageResource.getPath()).thenReturn("/content/sample-page");
			when(resolver.getResource("/content/sample-page/jcr:content")).thenReturn(resource);
			mockClient.when(HttpClients::createDefault).thenReturn(mockClosableHttpClient);
			Mockito.when(mockClosableHttpClient.execute(Mockito.any())).thenReturn(response);
			Mockito.when(response.getStatusLine()).thenReturn(statusLine);
			Mockito.when(statusLine.getStatusCode()).thenReturn(200);
			Mockito.when(response.getEntity()).thenReturn(entity);
			mockEntityUtils.when(() -> EntityUtils.toString(entity))
					.thenReturn("{\"status\": \"true\", \"response\": {\"statusReason\": \"success\"}}");
			bookMarkFlagJob.callEslApi("ESLApi", resource);
			Mockito.when(mockClosableHttpClient.execute(Mockito.any())).thenThrow(new IOException());
			verify(bookMarkConfig, times(2)).getApiUrl();
		}
	}

}
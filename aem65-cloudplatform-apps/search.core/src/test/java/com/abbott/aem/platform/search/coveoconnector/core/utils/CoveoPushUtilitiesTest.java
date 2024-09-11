package com.abbott.aem.platform.search.coveoconnector.core.utils;

import com.day.cq.commons.Externalizer;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.contentsync.handler.util.RequestResponseFactory;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.DamConstants;
import com.day.cq.dam.api.Rendition;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.TagManager;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.jackrabbit.value.StringValue;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.engine.SlingRequestProcessor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockedConstruction;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.jcr.Binary;
import javax.jcr.Node;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;
import javax.net.ssl.HttpsURLConnection;
import javax.servlet.ServletException;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockConstruction;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith({MockitoExtension.class, AemContextExtension.class})
class CoveoPushUtilitiesTest {

	//@Spy
	private CoveoPushUtilities coveoPushUtilities;

	AemContext context = new AemContext();

	@Mock
	private SlingHttpServletRequest request;

	@Mock
	private SlingHttpServletResponse response;

	@Mock
	HttpsURLConnection connection;

	@BeforeEach
	void setUp() throws IOException {
		//MockitoAnnotations.initMocks(this);
		coveoPushUtilities = new CoveoPushUtilities();
	}

	@Test
	void testCoveoPushUtilities(){
		coveoPushUtilities = new CoveoPushUtilities("orgId", "srcId", "token",
				"/serverPath","/coveoPushUrl", "/coveoPlatformUrl", new String[]{});

		assertEquals("orgId", coveoPushUtilities.getOrganizationId());
		assertEquals("srcId", coveoPushUtilities.getSourceId());
		assertEquals("/coveoPlatformUrl", coveoPushUtilities.getCoveoPlatformUrl());
		assertEquals("/coveoPushUrl", coveoPushUtilities.getCoveoPushUrl());
		assertEquals("token", coveoPushUtilities.getAccessToken());
		assertNotNull(coveoPushUtilities.getInheritanceLogicProperties());
	}

	@Test
	void testGetMapper(){
		assertNotNull(coveoPushUtilities.getMapper());
	}

	@Test
	void testGetHTMlContent() throws ServletException, IOException, RepositoryException {
		// Mocking data setup
		ResourceResolver resolver = mock(ResourceResolver.class);
		Resource resource = mock(Resource.class);
		ValueMap valueMap = mock(ValueMap.class);

		lenient().when(resource.adaptTo(ValueMap.class)).thenReturn(valueMap);
		lenient().when(valueMap.get(JcrConstants.JCR_PRIMARYTYPE)).thenReturn("dam:Asset");
		lenient().when(resource.getValueMap()).thenReturn(valueMap);
		lenient().when(valueMap.get("componentRootPath", String.class)).thenReturn("/en");

		MockedStatic<OSGIServiceReference> mockedStatic = mockStatic(OSGIServiceReference.class);
		SlingRequestProcessor processor = mock(SlingRequestProcessor.class);
		when(OSGIServiceReference.getOsgiServiceReference(SlingRequestProcessor.class)).thenReturn(processor);

		RequestResponseFactory factory = mock(RequestResponseFactory.class);
		when(OSGIServiceReference.getOsgiServiceReference(RequestResponseFactory.class)).thenReturn(factory);
		when(factory.createRequest("GET", "/content/abbott/en.html")).thenReturn(request);
		when(factory.createResponse(any(ByteArrayOutputStream.class))).thenReturn(response);

		// Execute the method and assert the results
		String htmlContent = coveoPushUtilities.getHTMlContent(resource, resolver, "/content/abbott");
		assertEquals("", htmlContent);
		mockedStatic.close();
	}

	@Test
	void testWriteStream() throws IOException {
		// Execute the method and assert the results
		HttpsURLConnection connection = mock(HttpsURLConnection.class);
		OutputStream os = mock(OutputStream.class);
		when(connection.getOutputStream()).thenReturn(os);

		String json = "{ \"key\": \"value\" }";
		coveoPushUtilities.writeStream(json, connection);
		verify(connection, times(1)).getOutputStream();
	}

	@Test
	void testDeleteDocumentOnCoveo() throws RepositoryException, IOException {
		String path = "/content/abbott";
		String type = "/content/abbott";
		ResourceResolver resolver = mock(ResourceResolver.class);
		Resource resource = mock(Resource.class);
		coveoPushUtilities.deleteDocumentOnCoveo("", path, resolver, resource,  type, false);
	}


	@Test
	void testGetPropertyValueExternalResource() throws RepositoryException {
		Calendar calendar = Calendar.getInstance();
		Node node = mock(Node.class);
		ResourceResolver resolver = mock(ResourceResolver.class);
		Property property = mock(Property.class);
		when(node.hasProperty(any())).thenReturn(true);
		when(node.getProperty(any())).thenReturn(property);
		when(property.getString()).thenReturn("test");
		when(property.getLong()).thenReturn(20L);
		when(property.getDate()).thenReturn(calendar);
		when(property.getDouble()).thenReturn(20.50);
		when(property.getBoolean()).thenReturn(true);

		String stringVal = coveoPushUtilities.getPropertyValueExternalResource(String.class, node, "", resolver, "");
		Long longVal = coveoPushUtilities.getPropertyValueExternalResource(Long.class, node, "", resolver, "");
		Date dateVal = coveoPushUtilities.getPropertyValueExternalResource(Date.class, node, "", resolver, "");
		Double doubleVal = coveoPushUtilities.getPropertyValueExternalResource(Double.class, node, "", resolver, "");
		Boolean boolVal = coveoPushUtilities.getPropertyValueExternalResource(Boolean.class, node, "", resolver, "");
		Binary binaryVal = coveoPushUtilities.getPropertyValueExternalResource(Binary.class, node, "", resolver, "");

		assertEquals("test", stringVal);
		assertEquals(20L, longVal);
		assertEquals(calendar.getTime(), dateVal);
		assertEquals(20.50, doubleVal);
		assertTrue(boolVal);
		assertNull(binaryVal);
	}

	@Test
	void testGetPropertyValueExternalResource_whenPropertyNotFound() throws RepositoryException {
		Calendar calendar = Calendar.getInstance();
		Node node = mock(Node.class);
		ResourceResolver resolver = mock(ResourceResolver.class);
		Session session = mock(Session.class);
		QueryBuilder queryBuilder = mock(QueryBuilder.class);
		Query query = mock(Query.class);
		SearchResult result = mock(SearchResult.class);
		Hit hit = mock(Hit.class);
		Resource resource = mock(Resource.class);
		Property property = mock(Property.class);

		when(node.hasProperty(any())).thenReturn(false);
		when(node.getPath()).thenReturn("/content/abbott");
		when(resolver.adaptTo(Session.class)).thenReturn(session);
		when(resolver.adaptTo(QueryBuilder.class)).thenReturn(queryBuilder);
		when(queryBuilder.createQuery(any(PredicateGroup.class), any(Session.class))).thenReturn(query);
		when(query.getResult()).thenReturn(result);
		when(result.getHits()).thenReturn(Collections.singletonList(hit));
		when(hit.getPath()).thenReturn("/content/abbott");
		when(resolver.getResource(anyString())).thenReturn(resource);
		when(resource.adaptTo(Node.class)).thenReturn(node);

		when(node.getProperty(any())).thenReturn(property);
		when(property.getString()).thenReturn("test");
		when(property.getLong()).thenReturn(20L);
		when(property.getDate()).thenReturn(calendar);
		when(property.getDouble()).thenReturn(20.50);
		when(property.getBoolean()).thenReturn(true);

		String stringVal = coveoPushUtilities.getPropertyValueExternalResource(String.class, node, "", resolver, "/externalPropPath");
		Long longVal = coveoPushUtilities.getPropertyValueExternalResource(Long.class, node, "", resolver, "/externalPropPath");
		Date dateVal = coveoPushUtilities.getPropertyValueExternalResource(Date.class, node, "", resolver, "/externalPropPath");
		Double doubleVal = coveoPushUtilities.getPropertyValueExternalResource(Double.class, node, "", resolver, "/externalPropPath");
		Boolean boolVal = coveoPushUtilities.getPropertyValueExternalResource(Boolean.class, node, "", resolver, "/externalPropPath");
		Binary binaryVal = coveoPushUtilities.getPropertyValueExternalResource(Binary.class, node, "", resolver, "/externalPropPath");

		assertEquals("test", stringVal);
		assertEquals(20L, longVal);
		assertEquals(calendar.getTime(), dateVal);
		assertEquals(20.50, doubleVal);
		assertTrue(boolVal);
		assertNull(binaryVal);
	}

	@Test
	void testGetPropertyValueExternalResource_whenNodeIsNull() throws RepositoryException {
		ResourceResolver resolver = mock(ResourceResolver.class);
		String stringVal = coveoPushUtilities.getPropertyValueExternalResource(String.class, null, "", resolver, "/externalPropPath");

		assertNull(stringVal);
	}

	@Test
	void testGetPropertyValue() throws RepositoryException {
		Calendar calendar = Calendar.getInstance();
		Node node = mock(Node.class);
		Property property = mock(Property.class);
		when(node.hasProperty(any())).thenReturn(true);
		when(node.getProperty(any())).thenReturn(property);
		when(property.getString()).thenReturn("test");
		when(property.getLong()).thenReturn(20L);
		when(property.getDate()).thenReturn(calendar);
		when(property.getDouble()).thenReturn(20.50);
		when(property.getBoolean()).thenReturn(true);

		String stringVal = coveoPushUtilities.getPropertyValue(String.class, node, "externalUrl");
		Long longVal = coveoPushUtilities.getPropertyValue(Long.class, node, "externalUrl");
		Date dateVal = coveoPushUtilities.getPropertyValue(Date.class, node, "externalUrl");
		Double doubleVal = coveoPushUtilities.getPropertyValue(Double.class, node, "externalUrl");
		Boolean boolVal = coveoPushUtilities.getPropertyValue(Boolean.class, node, "externalUrl");
		Binary binaryVal = coveoPushUtilities.getPropertyValue(Binary.class, node, "externalUrl");

		assertEquals("test", stringVal);
		assertEquals(20L, longVal);
		assertEquals(calendar.getTime(), dateVal);
		assertEquals(20.50, doubleVal);
		assertTrue(boolVal);
		assertNull(binaryVal);
	}

	@Test
	void testGetPropertyValue_whenRepositoryException() throws RepositoryException {
		Node node = mock(Node.class);
		when(node.hasProperty(anyString())).thenReturn(true);
		when(node.getProperty(anyString())).thenThrow(new RepositoryException("RE"));
		String stringVal = coveoPushUtilities.getPropertyValue(String.class, node, "externalUrl");

		assertNull(stringVal);
	}

	@Test
	void testGetPropertyValue_whenNodeIsNull() throws RepositoryException {
		String stringVal = coveoPushUtilities.getPropertyValue(String.class, null, "");

		assertNull(stringVal);
	}

	@Test
	void testGetStringOrStringArrayValueOfProperty_whenPropertyIsMultiple() throws RepositoryException {
		ResourceResolver resolver = mock(ResourceResolver.class);
		Node node = mock(Node.class);
		Property property = mock(Property.class);
		Value value = new StringValue("Abbott Home");
		when(node.hasProperty("title")).thenReturn(true);
		when(node.getProperty("title")).thenReturn(property);
		when(property.isMultiple()).thenReturn(true);
		when(property.getValues()).thenReturn(new Value[]{value});

		String actual = coveoPushUtilities.getStringOrStringArrayValueOfProperty(node, "title", resolver,
				null, new String[]{}, true, true);

		assertEquals("Abbott Home", actual);
	}

	@Test
	void testGetStringOrStringArrayValueOfProperty_whenInheritedFragmentValue() throws RepositoryException {
		ResourceResolver resolver = mock(ResourceResolver.class);
		Node node = mock(Node.class);
		TagManager tagManager = mock(TagManager.class);
		Resource resource = mock(Resource.class);
		Property property = mock(Property.class);
		when(node.hasProperty("title")).thenReturn(false, true);
		when(node.getParent()).thenReturn(node);
		when(resolver.adaptTo(TagManager.class)).thenReturn(tagManager);
		when(node.getPath()).thenReturn("/content/abbott");
		when(resolver.getResource("/content/abbott/jcr:content/metadata")).thenReturn(resource);
		when(resource.adaptTo(Node.class)).thenReturn(node);

		when(node.getProperty("title")).thenReturn(property);
		when(property.getString()).thenReturn("Abbott Home");

		String actual = coveoPushUtilities.getStringOrStringArrayValueOfProperty(node, "title", resolver,
				null, new String[]{"title"}, true, true);

		assertEquals("Abbott Home", actual);
	}

	@Test
	void testGetStringOrStringArrayValueOfProperty_whenInheritedValue() throws RepositoryException {
		ResourceResolver resolver = mock(ResourceResolver.class);
		Node node = mock(Node.class);
		Resource resource = mock(Resource.class);
		ValueMap valueMap = mock(ValueMap.class);

		when(node.hasProperty("title")).thenReturn(false, true);
		when(node.getPath()).thenReturn("/content/abbott");
		when(resolver.getResource("/content/abbott")).thenReturn(resource);
		when(resource.adaptTo(ValueMap.class)).thenReturn(valueMap);
		when(resource.getValueMap()).thenReturn(valueMap);
		when(valueMap.get(JcrConstants.JCR_PRIMARYTYPE)).thenReturn("Abbott Home");
		when(valueMap.get("title", String.class)).thenReturn("Abbott Home");

		String actual = coveoPushUtilities.getStringOrStringArrayValueOfProperty(node, "title", resolver,
				null, new String[]{"title"}, false, false);

		assertEquals("Abbott Home", actual);
	}

	@Test
	void testGetStringOrStringArrayValueOfProperty_whenExternalProperty() throws RepositoryException {
		ResourceResolver resolver = mock(ResourceResolver.class);
		Node node = mock(Node.class);
		Property property = mock(Property.class);
		Resource resource = mock(Resource.class);
		Session session = mock(Session.class);
		QueryBuilder builder = mock(QueryBuilder.class);
		Query query = mock(Query.class);
		SearchResult result = mock(SearchResult.class);
		Hit hit = mock(Hit.class);

		when(node.getPath()).thenReturn("/content/abbott");
		when(resolver.adaptTo(Session.class)).thenReturn(session);
		when(resolver.adaptTo(QueryBuilder.class)).thenReturn(builder);
		when(builder.createQuery(any(), any(Session.class))).thenReturn(query);
		when(query.getResult()).thenReturn(result);
		when(result.getHits()).thenReturn(Collections.singletonList(hit));
		when(hit.getPath()).thenReturn("/content/abbott");
		when(resolver.getResource("/content/abbott")).thenReturn(resource);
		when(resource.adaptTo(Node.class)).thenReturn(node);

		when(node.getProperty("title")).thenReturn(property);
		when(property.getString()).thenReturn("/");

		when(resolver.getResource("/")).thenReturn(resource);
		when(property.isMultiple()).thenReturn(true);
		when(property.getValues()).thenReturn(new Value[] {new StringValue("Abbott Home")});

		String actual = coveoPushUtilities.getStringOrStringArrayValueOfProperty(node, "title", resolver,
				"title", new String[]{}, false, false);

		assertEquals("Abbott Home", actual);
	}

	@Test
	void testGetStringOrStringArrayValueOfProperty_whenExternalPropertyNull() throws RepositoryException {
		ResourceResolver resolver = mock(ResourceResolver.class);
		Node node = mock(Node.class);
		Property property = mock(Property.class);
		Resource resource = mock(Resource.class);
		Session session = mock(Session.class);
		QueryBuilder builder = mock(QueryBuilder.class);
		Query query = mock(Query.class);
		SearchResult result = mock(SearchResult.class);
		Hit hit = mock(Hit.class);

		when(node.getPath()).thenReturn("/content/abbott");
		when(resolver.adaptTo(Session.class)).thenReturn(session);
		when(resolver.adaptTo(QueryBuilder.class)).thenReturn(builder);
		when(builder.createQuery(any(), any(Session.class))).thenReturn(query);
		when(query.getResult()).thenReturn(result);
		when(result.getHits()).thenReturn(Collections.singletonList(hit));
		when(hit.getPath()).thenReturn("/content/abbott");
		when(resolver.getResource("/content/abbott")).thenReturn(resource);
		when(resource.adaptTo(Node.class)).thenReturn(node);

		when(node.getProperty("title")).thenReturn(property);
		when(property.getString()).thenReturn("");

		when(resolver.getResource("")).thenReturn(resource);
		when(property.isMultiple()).thenReturn(false);

		String actual = coveoPushUtilities.getStringOrStringArrayValueOfProperty(node, "title", resolver,
				"title", new String[]{}, false, false);

		assertNull(actual);
	}

	@Test
	void testGetStringOrStringArrayValueOfProperty_whenExternalPropertyAndNodeIsNull() throws RepositoryException {
		ResourceResolver resolver = mock(ResourceResolver.class);
		String actual = coveoPushUtilities.getStringOrStringArrayValueOfProperty(null, null, resolver,
				"title", new String[]{"title"}, false, false);

		assertNull(actual);
	}

	@Test
	void testGetStringOrStringArrayValueOfProperty_whenPropertyIsNull() throws RepositoryException {
		ResourceResolver resolver = mock(ResourceResolver.class);
		Node node = mock(Node.class);
		String actual = coveoPushUtilities.getStringOrStringArrayValueOfProperty(node, null,
				resolver,null, new String[]{}, true, true);

		assertNull(actual);
	}

	@Test
	void testPushSingleItemDataToSource() throws ServletException, RepositoryException, IOException {
		ResourceResolver resolver = mock(ResourceResolver.class);
		Resource resource = mock(Resource.class);
		Node node = mock(Node.class);
		Externalizer externalizer = mock(Externalizer.class);
		Property property = mock(Property.class);

		when(resource.adaptTo(Node.class)).thenReturn(node);
		when(resource.getResourceResolver()).thenReturn(resolver);
		when(resource.getPath()).thenReturn("/content/abbott");
		when(node.getPath()).thenReturn("/content/abbott");

		when(resolver.getResource(anyString())).thenReturn(resource);
		when(resolver.adaptTo(Externalizer.class)).thenReturn(externalizer);
		when(node.hasProperty("externalizerDomain")).thenReturn(true);
		when(node.getProperty("externalizerDomain")).thenReturn(property);
		when(property.getString()).thenReturn("www.abbott.com");

		MockedConstruction<URL> mockedConstruction = mockConstruction(URL.class, (mock, context) ->{
			when(mock.openConnection()).thenReturn(connection);
		});
		when(connection.getResponseCode()).thenReturn(201, 202, 201);
		when(connection.getOutputStream()).thenReturn(mock(OutputStream.class));

		coveoPushUtilities.setCoveoPushUrl("publish");
		String actual = coveoPushUtilities.pushSingleItemDataToSource("", "/content/abbott", resolver, resource,
				DamConstants.NT_DAM_ASSET, true);

		assertEquals("OK", actual);
		mockedConstruction.close();
	}


	@Test
	void testPushSingleItemDataToSource_whenCompressedData() throws ServletException, RepositoryException, IOException {
		ResourceResolver resolver = mock(ResourceResolver.class);
		Resource resource = mock(Resource.class);
		Node node = mock(Node.class);
		ValueMap valueMap = mock(ValueMap.class);
		Asset asset = mock(Asset.class);

		when(resource.adaptTo(Node.class)).thenReturn(node);
		when(resource.getResourceResolver()).thenReturn(resolver);
		when(resource.getPath()).thenReturn("/content/abbott/metadata");
		when(node.getPath()).thenReturn("/content/abbott");
		when(resource.adaptTo(ValueMap.class)).thenReturn(valueMap);

		when(resolver.getResource(anyString())).thenReturn(resource);

		when(resource.getParent()).thenReturn(resource);
		when(resource.getResourceType()).thenReturn("dam:Asset");
		when(resource.adaptTo(Asset.class)).thenReturn(asset);
		Rendition rendition = mock(Rendition.class);
		InputStream is = mock(InputStream.class);
		when(asset.getOriginal()).thenReturn(rendition);
		when(rendition.adaptTo(InputStream.class)).thenReturn(is);
		when(is.read(any())).thenReturn(0, -1);

		MockedConstruction<URL> mockedConstruction = mockConstruction(URL.class, (mock, context) ->{
			when(mock.openConnection()).thenReturn(connection);
		});
		when(connection.getResponseCode()).thenReturn(201,201,200,202,201);
		when(connection.getOutputStream()).thenReturn(mock(OutputStream.class));
		when(connection.getInputStream()).thenReturn(mock(InputStream.class));

		coveoPushUtilities.setCoveoPushUrl("publish");
		String actual = coveoPushUtilities.pushSingleItemDataToSource("", "/content/abbott", resolver, resource,
				DamConstants.NT_DAM_ASSET, false);

		assertEquals("OK", actual);

		mockedConstruction.close();
	}
}


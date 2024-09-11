package com.abbott.aem.ardx.division.core.handler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.PathNotFoundException;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;
import javax.jcr.ValueFormatException;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.event.Event;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.dam.api.DamConstants;
import com.day.cq.replication.ReplicationException;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.NameConstants;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({MockitoExtension.class , AemContextExtension.class})
class ArdxAssetEventHandlerTest {
	private static final String SLING_RESTYPE = "sling:resource";
	private static final String CONTENT_FRAGMENT = "contentFragment";
	private static final String KEYWORD  ="keywords";
	private static final String RELATED = "related";
	private static final String OTHERS = "others";
	private static final String SLING_MEMBERS = "sling:members";
	private static final String RELATEDFRAGMENT = "relatedfragment";
	private static final String DEFAULT = "default";
	
	@InjectMocks
	private ArdxAssetEventHandler ardxAssetEventHandler;
	
	@Mock
	Event event;
	
	@Mock
	Resource assetResource;
	
	@Mock
	Hit hit;
	
	@Mock
	ResourceResolver resourceResolver;

	@Reference
	ResourceResolverFactory resolverFactory;
	
	@Mock
	Node assetNode;
	
	@Mock
	Node metadataNode;
	
	@Mock
	ModifiableValueMap mvp;
	
	@Mock
	TagManager tagManager;
	
	@Mock
	private QueryBuilder querybuilder;
	
	@BeforeEach
	public void setup() throws Exception {
		MockitoAnnotations.initMocks(this);
		ardxAssetEventHandler = new ArdxAssetEventHandler();
		resolverFactory = mock(ResourceResolverFactory.class);
		ardxAssetEventHandler.setResourceResolverFactory(resolverFactory);
		Map<String, Object> param = new HashMap<String, Object>();
        param.put(ResourceResolverFactory.SUBSERVICE, "eifu-system-user");
        resourceResolver = mock(ResourceResolver.class);
        Mockito.lenient().when(resolverFactory.getServiceResourceResolver(param)).thenReturn(resourceResolver);
        event = mock(Event.class);
	}
	
	@Test
	void testHandleEvent() throws Exception {
		ardxAssetEventHandler = new ArdxAssetEventHandler();
		final Map<String, Object> eventParams = new HashMap<>();
		eventParams.put("path", "/content/bts");
		final Event event = new Event("org/apache/sling/api/resource/Resource/ADDED", eventParams);
		ardxAssetEventHandler.handleEvent(event);
		assert (true);
	}

	@Test
	void testRelatedFragment() throws Exception {
		
		final Map<String, Object> eventParams = new HashMap<>();
		eventParams.put("path", "/content/dam/ardx/eifu/test.pdf/jcr:content/related");
		Event event = new Event("org/apache/sling/api/resource/Resource/ADDED", eventParams);
		Session session = mock(Session.class);
		Mockito.lenient().when(resourceResolver.adaptTo(Session.class)).thenReturn(session);
		Resource resource = mock(Resource.class);
		Mockito.lenient().when(resourceResolver.getResource("/content/dam/ardx/eifu/test.pdf/jcr:content/related")).thenReturn(resource);
		Resource assetResource = mock(Resource.class);
		Resource assetRes = mock(Resource.class);
		Mockito.lenient().when(resourceResolver.getResource("/content/dam/ardx/eifu/test.pdf/jcr:content")).thenReturn(assetResource);
		Node metaNode = mock(Node.class);	
		Mockito.lenient().when(resource.adaptTo(Node.class)).thenReturn(metaNode);
		NodeIterator nodeIter = mock(NodeIterator.class);
		Node assetNode = mock(Node.class);
		Node relatedNode = mock(Node.class);
		Node othersNode = mock(Node.class);
		Node slingmembersNode = mock(Node.class);
		Node cfNode = mock(Node.class);
	
		Mockito.lenient().when(assetRes.adaptTo(Node.class)).thenReturn(assetNode);
		when(assetResource.adaptTo(Node.class)).thenReturn(assetNode);
		Mockito.lenient().when(assetNode.addNode(RELATED)).thenReturn(relatedNode);
		Mockito.lenient().when(assetNode.hasNode(RELATED)).thenReturn(true);
		Mockito.lenient().when(assetNode.getNode(RELATED)).thenReturn(relatedNode);
		Mockito.lenient().when(relatedNode.addNode(OTHERS)).thenReturn(othersNode);
		Mockito.lenient().when(relatedNode.hasNode(OTHERS)).thenReturn(true);
		Mockito.lenient().when(relatedNode.getNode(OTHERS)).thenReturn(othersNode);
		Mockito.lenient().when(othersNode.addNode(SLING_MEMBERS )).thenReturn(slingmembersNode);
		Mockito.lenient().when(othersNode.hasNode(SLING_MEMBERS )).thenReturn(true);
		Mockito.lenient().when(othersNode.getNode(SLING_MEMBERS )).thenReturn(slingmembersNode);
		
		Mockito.lenient().when(slingmembersNode.addNode("contact-us-fragment")).thenReturn(cfNode);
		Mockito.lenient().when(slingmembersNode.getNodes()).thenReturn(nodeIter);
		Mockito.lenient().when(slingmembersNode.hasNodes()).thenReturn(true);
		Mockito.lenient().when(nodeIter.hasNext()).thenReturn(true,false);
		Mockito.lenient().when(nodeIter.nextNode()).thenReturn(cfNode);
		Mockito.lenient().when(cfNode.getProperty(SLING_RESTYPE)).thenReturn(mock(Property.class));
		Mockito.lenient().when(cfNode.getProperty(SLING_RESTYPE).getValue()).thenReturn(mock(Value.class));
		Mockito.lenient().when(cfNode.getProperty(SLING_RESTYPE).getValue().toString()).thenReturn("/content/dam/ardx/eifu/contact-us-fragments/san-diego-cmi");
		Resource cfResource = mock(Resource.class);
		String relatedFragmentPath = "/content/dam/ardx/eifu/contact-us-fragments/san-diego-cmi";
		Mockito.lenient().when(resourceResolver.getResource(relatedFragmentPath)).thenReturn(cfResource);
		Node resNode = mock(Node.class);
		Mockito.lenient().when(cfResource.adaptTo(Node.class)).thenReturn(resNode);
		Node jcrNode = mock(Node.class);
		Mockito.lenient().when(resNode.addNode(JcrConstants.JCR_CONTENT)).thenReturn(jcrNode);
		Mockito.lenient().when(resNode.getNode(JcrConstants.JCR_CONTENT)).thenReturn(jcrNode);
		Mockito.lenient().when(resNode.hasNode(JcrConstants.JCR_CONTENT)).thenReturn(true);
		Mockito.lenient().when(jcrNode.hasProperty(CONTENT_FRAGMENT)).thenReturn(true);
		Mockito.lenient().when(jcrNode.getProperty(CONTENT_FRAGMENT)).thenReturn(mock(Property.class));
		Mockito.lenient().when(jcrNode.getProperty(CONTENT_FRAGMENT).getString()).thenReturn("true");
		
		//check relatedfragment specific
		Resource res = mock(Resource.class);
		Mockito.lenient().when(resourceResolver.getResource("/content/dam/ardx/eifu/test.pdf/jcr:content/metadata")).thenReturn(res);
		ModifiableValueMap mvp = mock(ModifiableValueMap.class);
		when(res.adaptTo(ModifiableValueMap.class)).thenReturn(mvp);
		Map<String, String> map = new HashMap<>();
		map.put("path", "/content/dam/ardx/eifu/contact-us-fragments");
		map.put("type", DamConstants.NT_DAM_ASSET);
		map.put("property", "@jcr:content/metadata/cq:tags");
		map.put("property.value", "%" + "/" + "generic-contact");
		map.put("property.operation", "like");
		map.put("p.limit", "-1");
		
		ardxAssetEventHandler.querybuilder = querybuilder;
		Query query = mock(Query.class);
		Mockito.lenient().when(querybuilder.createQuery(PredicateGroup.create(map), session)).thenReturn(query);
		SearchResult expectedresult = mock(SearchResult.class);
		Mockito.lenient().when(query.getResult()).thenReturn(expectedresult);
		ardxAssetEventHandler.handleEvent(event);
		verify(mvp).put(RELATEDFRAGMENT,relatedFragmentPath );
		assertEquals("/content/dam/ardx/eifu/test.pdf/jcr:content/related", eventParams.get("path"));
		verify(resourceResolver).commit();
	}
	
	@Test
	void testUpdateMetadata() throws Exception{
		final Map<String, Object> eventParams = new HashMap<>();
		eventParams.put("path", "/content/dam/ardx/eifu/test.pdf/jcr:content/metadata");
		Event event = new Event("org/apache/sling/api/resource/Resource/ADDED", eventParams);
		Session session = mock(Session.class);
		Mockito.lenient().when(resourceResolver.adaptTo(Session.class)).thenReturn(session);
		Resource resource = mock(Resource.class);
		Mockito.lenient().when(resourceResolver.getResource("/content/dam/ardx/eifu/test.pdf/jcr:content/metadata")).thenReturn(resource);
		Resource assetResource = mock(Resource.class);
		Resource assetRes = mock(Resource.class);
		Mockito.lenient().when(resourceResolver.getResource("/content/dam/ardx/eifu/test.pdf/jcr:content")).thenReturn(assetResource);
		Node metaNode = mock(Node.class);
		Property property = mock(Property.class);
		Value[] values = new Value[3];
		for(int i=0; i<3; i++) {
			values[i] = mock(Value.class);
		}
		Mockito.lenient().when(values[0].getString()).thenReturn("ardx:eifu/products/test-product");
		Mockito.lenient().when(values[1].getString()).thenReturn("ardx:eifu/categories/subcategory/test-category");
		Mockito.lenient().when(values[2].getString()).thenReturn("ardx:eifu/user-role/test-role");
		TagManager tagManager = mock(TagManager.class);
		Mockito.lenient().when(resourceResolver.adaptTo(TagManager.class)).thenReturn(tagManager);
		Mockito.lenient().when(resource.adaptTo(Node.class)).thenReturn(metaNode);
		Mockito.lenient().when(metaNode.hasProperty(NameConstants.PN_TAGS)).thenReturn(true);
		Mockito.lenient().when(metaNode.getProperty(NameConstants.PN_TAGS)).thenReturn(property);
		when(property.isMultiple()).thenReturn(true);
		when(property.getValues()).thenReturn(values);
		String title = "Product-Title";
		String rtitle = "user-Title";
		String stitle = "Sub category-Title";
		String ctitle = "Category-Title";
		Tag ptag = mock(Tag.class);
		when(tagManager.resolve("ardx:eifu/products/test-product")).thenReturn(ptag);
		when(ptag.getTitle()).thenReturn(title);
		
		Tag rtag = mock(Tag.class);	
		Mockito.lenient().when(tagManager.resolve("ardx:eifu/user-role/test-role")).thenReturn(rtag);
		Mockito.lenient().when(rtag.getTitle()).thenReturn(rtitle);
		
		Tag ctag = mock(Tag.class);
		Mockito.lenient().when(tagManager.resolve("ardx:eifu/categories/subcategory/test-category")).thenReturn(ctag);
		Mockito.lenient().when(ctag.getTitle()).thenReturn(stitle);
		
		Tag subTag = mock(Tag.class);
		when(tagManager.resolve("ardx:eifu/categories/subcategory/test-category".substring(0, "ardx:eifu/categories/subcategory/test-category".lastIndexOf("/")))).thenReturn(subTag);
		Map<Locale, String> subTagTitles = new HashMap<Locale, String>();
		subTagTitles.put(new Locale(DEFAULT), ctitle);
		when(subTag.getLocalizedTitles()).thenReturn(subTagTitles);
		when(subTag.getTitle()).thenReturn(ctitle);
		
		//Testing Keyword Tags
		Tag keyTag = mock(Tag.class);
		Value[] keywordValues = new Value[1];
		keywordValues[0] = mock(Value.class);
		Mockito.lenient().when(keywordValues[0].getString()).thenReturn("ardx:eifu/keywords/test-keyword");
		Property keywordProp = mock(Property.class);
		Mockito.lenient().when(metaNode.hasProperty(KEYWORD)).thenReturn(true);
		Mockito.lenient().when(metaNode.getProperty(KEYWORD)).thenReturn(keywordProp);
		when(keywordProp.isMultiple()).thenReturn(true);
		when(keywordProp.getValues()).thenReturn(keywordValues);
		Mockito.lenient().when(tagManager.resolve("ardx:eifu/keywords/test-keyword")).thenReturn(keyTag);
		Map<Locale, String> locTitles = new HashMap<Locale, String>();
		locTitles.put(new Locale(DEFAULT), "Keyword Title");
		Mockito.lenient().when(keyTag.getLocalizedTitles()).thenReturn(locTitles);

		ModifiableValueMap mvp = mock(ModifiableValueMap.class);
		when(resource.adaptTo(ModifiableValueMap.class)).thenReturn(mvp);
		Node assetNode = mock(Node.class);
		Node relatedNode = mock(Node.class);
		Mockito.lenient().when(assetRes.adaptTo(Node.class)).thenReturn(assetNode);
		when(assetResource.adaptTo(Node.class)).thenReturn(assetNode);
		assetNode.addNode(RELATED);
		Mockito.lenient().when(assetNode.hasNode(RELATED)).thenReturn(true);
		Mockito.lenient().when(assetNode.getNode(RELATED)).thenReturn(relatedNode);
		
		Map<String, String> map = new HashMap<>();
		map.put("path", "/content/dam/ardx/eifu/contact-us-fragments");
		map.put("type", DamConstants.NT_DAM_ASSET);
		map.put("property", "@jcr:content/metadata/cq:tags");
		map.put("property.value", "%" + "/" + "generic-contact");
		map.put("property.operation", "like");
		map.put("p.limit", "-1");
		
		ardxAssetEventHandler.querybuilder = querybuilder;
		Query query = mock(Query.class);
		Mockito.lenient().when(querybuilder.createQuery(PredicateGroup.create(map), session)).thenReturn(query);
		SearchResult expectedresult = mock(SearchResult.class);
		when(query.getResult()).thenReturn(expectedresult);
		List<Hit> hits = new ArrayList<>();
		hits.add(hit);
		when(expectedresult.getHits()).thenReturn(hits);
		Resource frResource = mock(Resource.class);
		when(hit.getResource()).thenReturn(frResource);
		Node resNode = mock(Node.class);
		Mockito.lenient().when(frResource.adaptTo(Node.class)).thenReturn(resNode);
		Node jcrNode = mock(Node.class);
		Mockito.lenient().when(resNode.addNode(JcrConstants.JCR_CONTENT)).thenReturn(jcrNode);
		Mockito.lenient().when(resNode.getNode(JcrConstants.JCR_CONTENT)).thenReturn(jcrNode);
		Mockito.lenient().when(resNode.hasNode(JcrConstants.JCR_CONTENT)).thenReturn(true);
		Mockito.lenient().when(jcrNode.hasProperty(CONTENT_FRAGMENT)).thenReturn(true);
		Mockito.lenient().when(jcrNode.getProperty(CONTENT_FRAGMENT)).thenReturn(mock(Property.class));
		Mockito.lenient().when(jcrNode.getProperty(CONTENT_FRAGMENT).getString()).thenReturn("true");
		ardxAssetEventHandler.handleEvent(event);
		
		verify(metaNode).hasProperty(NameConstants.PN_TAGS);
		verify(metaNode).getProperty(NameConstants.PN_TAGS);
		verify(property).isMultiple();
		verify(property).getValues();
		verify(assetNode).hasNode(RELATED);
	}
	@Test
	void elseTestRelatedFragment() throws Exception {
		final Map<String, Object> eventParams = new HashMap<>();
		eventParams.put("path", "/content/dam/ardx/eifu/test.pdf/jcr:content/related");
		Event event = new Event("org/apache/sling/api/resource/Resource/ADDED", eventParams);
		Session session = mock(Session.class);
		Mockito.lenient().when(resourceResolver.adaptTo(Session.class)).thenReturn(session);
		Resource resource = mock(Resource.class);
		Mockito.lenient().when(resourceResolver.getResource("/content/dam/ardx/eifu/test.pdf/jcr:content/related")).thenReturn(resource);
		Resource assetResource = mock(Resource.class);
		Resource assetRes = mock(Resource.class);
		Mockito.lenient().when(resourceResolver.getResource("/content/dam/ardx/eifu/test.pdf/jcr:content")).thenReturn(assetResource);
		Node metaNode = mock(Node.class);	
		Mockito.lenient().when(resource.adaptTo(Node.class)).thenReturn(metaNode);
		NodeIterator nodeIter = mock(NodeIterator.class);
		Node assetNode = mock(Node.class);
		Node relatedNode = mock(Node.class);
		Node othersNode = mock(Node.class);
		Node slingmembersNode = mock(Node.class);
		Node cfNode = mock(Node.class);
		Mockito.lenient().when(assetRes.adaptTo(Node.class)).thenReturn(assetNode);
		when(assetResource.adaptTo(Node.class)).thenReturn(assetNode);
		Mockito.lenient().when(assetNode.addNode(RELATED)).thenReturn(relatedNode);
		Mockito.lenient().when(assetNode.hasNode(RELATED)).thenReturn(false);
		Mockito.lenient().when(assetNode.getNode(RELATED)).thenReturn(relatedNode);
		Mockito.lenient().when(relatedNode.addNode(OTHERS)).thenReturn(othersNode);
		Mockito.lenient().when(relatedNode.hasNode(OTHERS)).thenReturn(false);
		Mockito.lenient().when(relatedNode.getNode(OTHERS)).thenReturn(othersNode);
		Mockito.lenient().when(othersNode.addNode(SLING_MEMBERS )).thenReturn(slingmembersNode);
		Mockito.lenient().when(othersNode.hasNode(SLING_MEMBERS )).thenReturn(true);
		Mockito.lenient().when(othersNode.getNode(SLING_MEMBERS )).thenReturn(slingmembersNode);
		Mockito.lenient().when(slingmembersNode.addNode("contact-us-fragment")).thenReturn(cfNode);
		Mockito.lenient().when(slingmembersNode.getNodes()).thenReturn(nodeIter);
		Mockito.lenient().when(slingmembersNode.hasNodes()).thenReturn(false);
		Mockito.lenient().when(nodeIter.hasNext()).thenReturn(true,false);
		Mockito.lenient().when(nodeIter.nextNode()).thenReturn(cfNode);
		Mockito.lenient().when(cfNode.getProperty(SLING_RESTYPE)).thenReturn(mock(Property.class));
		Mockito.lenient().when(cfNode.getProperty(SLING_RESTYPE).getValue()).thenReturn(mock(Value.class));
		Mockito.lenient().when(cfNode.getProperty(SLING_RESTYPE).getValue().toString()).thenReturn("/content/dam/ardx/eifu/contact-us-fragments/san-diego-cmi");
		Resource cfResource = mock(Resource.class);
		String relatedFragmentPath = "/content/dam/ardx/eifu/contact-us-fragments/san-diego-cmi";
		Mockito.lenient().when(resourceResolver.getResource(relatedFragmentPath)).thenReturn(cfResource);
		Node resNode = mock(Node.class);
		Mockito.lenient().when(cfResource.adaptTo(Node.class)).thenReturn(resNode);
		Node jcrNode = mock(Node.class);
		Mockito.lenient().when(resNode.addNode(JcrConstants.JCR_CONTENT)).thenReturn(jcrNode);
		Mockito.lenient().when(resNode.getNode(JcrConstants.JCR_CONTENT)).thenReturn(jcrNode);
		Mockito.lenient().when(resNode.hasNode(JcrConstants.JCR_CONTENT)).thenReturn(false);
		Mockito.lenient().when(jcrNode.hasProperty(CONTENT_FRAGMENT)).thenReturn(true);
		Mockito.lenient().when(jcrNode.getProperty(CONTENT_FRAGMENT)).thenReturn(mock(Property.class));
		Mockito.lenient().when(jcrNode.getProperty(CONTENT_FRAGMENT).getString()).thenReturn("false");
		//check relatedfragment specific
		Resource res = mock(Resource.class);
		Mockito.lenient().when(resourceResolver.getResource("/content/dam/ardx/eifu/test.pdf/jcr:content/metadata")).thenReturn(res);
		ModifiableValueMap mvp = mock(ModifiableValueMap.class);
		when(res.adaptTo(ModifiableValueMap.class)).thenReturn(mvp);
		Map<String, String> map = new HashMap<>();
		map.put("path", "/content/dam/ardx/eifu/contact-us-fragments");
		map.put("type", DamConstants.NT_DAM_ASSET);
		map.put("property", "@jcr:content/metadata/cq:tags");
		map.put("property.value", "%" + "/" + "generic-contact");
		map.put("property.operation", "like");
		map.put("p.limit", "-1");
		ardxAssetEventHandler.querybuilder = querybuilder;
		Query query = mock(Query.class);
		Mockito.lenient().when(querybuilder.createQuery(PredicateGroup.create(map), session)).thenReturn(query);
		SearchResult expectedresult = mock(SearchResult.class);
		Mockito.lenient().when(query.getResult()).thenReturn(expectedresult);
		ardxAssetEventHandler.handleEvent(event);
	}
	@Test
	void elseTestUpdateMetadata() throws Exception{
		final Map<String, Object> eventParams = new HashMap<>();
		eventParams.put("path", "/content/dam/ardx/eifu/test.pdf/jcr:content/metadata");
		Event event = new Event("org/apache/sling/api/resource/Resource/ADDED", eventParams);
		Session session = mock(Session.class);
		Mockito.lenient().when(resourceResolver.adaptTo(Session.class)).thenReturn(session);
		Resource resource = mock(Resource.class);
		Mockito.lenient().when(resourceResolver.getResource("/content/dam/ardx/eifu/test.pdf/jcr:content/metadata")).thenReturn(resource);
		Resource assetResource = mock(Resource.class);
		Resource assetRes = mock(Resource.class);
		Mockito.lenient().when(resourceResolver.getResource("/content/dam/ardx/eifu/test.pdf/jcr:content")).thenReturn(assetResource);
		Node metaNode = mock(Node.class);
		Property property = mock(Property.class);
		Value[] values = new Value[1];
		for(int i=0; i<1; i++) {
			values[i] = mock(Value.class);
		}
		
		Mockito.lenient().when(values[0].getString()).thenReturn("ardx:eifu/categories");
		TagManager tagManager = mock(TagManager.class);
		Mockito.lenient().when(resourceResolver.adaptTo(TagManager.class)).thenReturn(tagManager);
		Mockito.lenient().when(resource.adaptTo(Node.class)).thenReturn(metaNode);
		Mockito.lenient().when(metaNode.hasProperty(NameConstants.PN_TAGS)).thenReturn(true);
		Mockito.lenient().when(metaNode.getProperty(NameConstants.PN_TAGS)).thenReturn(property);
		when(property.isMultiple()).thenReturn(true);
		when(property.getValues()).thenReturn(values);
		
		//Testing Keyword Tags
		Tag keyTag = mock(Tag.class);
		Value[] keywordValues = new Value[1];
		keywordValues[0] = mock(Value.class);
		Mockito.lenient().when(keywordValues[0].getString()).thenReturn("ardx:eifu/keywords/test-keyword");
		Property keywordProp = mock(Property.class);
		Mockito.lenient().when(metaNode.hasProperty(KEYWORD)).thenReturn(false);
		Mockito.lenient().when(metaNode.getProperty(KEYWORD)).thenReturn(keywordProp);
		Mockito.lenient().when(keywordProp.isMultiple()).thenReturn(true);
		Mockito.lenient().when(keywordProp.getValues()).thenReturn(keywordValues);
		Mockito.lenient().when(tagManager.resolve("ardx:eifu/keywords/test-keyword")).thenReturn(keyTag);
		Map<Locale, String> locTitles = new HashMap<Locale, String>();
		locTitles.put(new Locale(DEFAULT), "Keyword Title");
		Mockito.lenient().when(keyTag.getLocalizedTitles()).thenReturn(locTitles);

		ModifiableValueMap mvp = mock(ModifiableValueMap.class);
		when(resource.adaptTo(ModifiableValueMap.class)).thenReturn(mvp);
		Node assetNode = mock(Node.class);
		Node relatedNode = mock(Node.class);
		Mockito.lenient().when(assetRes.adaptTo(Node.class)).thenReturn(assetNode);
		when(assetResource.adaptTo(Node.class)).thenReturn(assetNode);
		assetNode.addNode(RELATED);
		Mockito.lenient().when(assetNode.hasNode(RELATED)).thenReturn(false);
		Mockito.lenient().when(assetNode.getNode(RELATED)).thenReturn(relatedNode);
		
		Map<String, String> map = new HashMap<>();
		map.put("path", "/content/dam/ardx/eifu/contact-us-fragments");
		map.put("type", DamConstants.NT_DAM_ASSET);
		map.put("property", "@jcr:content/metadata/cq:tags");
		map.put("property.value", "%" + "/" + "generic-contact");
		map.put("property.operation", "like");
		map.put("p.limit", "-1");
		
		ardxAssetEventHandler.querybuilder = querybuilder;
		Query query = mock(Query.class);
		Mockito.lenient().when(querybuilder.createQuery(PredicateGroup.create(map), session)).thenReturn(query);
		SearchResult expectedresult = mock(SearchResult.class);
		when(query.getResult()).thenReturn(expectedresult);
		List<Hit> hits = new ArrayList<>();
		hits.add(hit);
		when(expectedresult.getHits()).thenReturn(hits);
		Resource frResource = mock(Resource.class);
		when(hit.getResource()).thenReturn(frResource);
		Node resNode = mock(Node.class);
		Mockito.lenient().when(frResource.adaptTo(Node.class)).thenReturn(resNode);
		Node jcrNode = mock(Node.class);
		Mockito.lenient().when(resNode.addNode(JcrConstants.JCR_CONTENT)).thenReturn(jcrNode);
		Mockito.lenient().when(resNode.getNode(JcrConstants.JCR_CONTENT)).thenReturn(jcrNode);
		Mockito.lenient().when(resNode.hasNode(JcrConstants.JCR_CONTENT)).thenReturn(false);
		Mockito.lenient().when(jcrNode.hasProperty(CONTENT_FRAGMENT)).thenReturn(false);
		Mockito.lenient().when(jcrNode.getProperty(CONTENT_FRAGMENT)).thenReturn(mock(Property.class));
		Mockito.lenient().when(jcrNode.getProperty(CONTENT_FRAGMENT).getString()).thenReturn("false");
		ardxAssetEventHandler.handleEvent(event);
	}
	@Test
	void testException() throws ReplicationException, LoginException, PathNotFoundException, RepositoryException {
		final Map<String, Object> eventParams = new HashMap<>();
		eventParams.put("path", "/content/dam/ardx/eifu/test.pdf/jcr:content/metadata");
		Event event = new Event("org/apache/sling/api/resource/Resource/ADDED", eventParams);
		Session session = mock(Session.class);
		Mockito.lenient().when(resourceResolver.adaptTo(Session.class)).thenReturn(session);
		Resource resource = mock(Resource.class);
		Mockito.lenient().when(resourceResolver.getResource("/content/dam/ardx/eifu/test.pdf/jcr:content/metadata")).thenReturn(resource);
		Resource assetResource = mock(Resource.class);
		Mockito.lenient().when(resourceResolver.getResource("/content/dam/ardx/eifu/test.pdf/jcr:content")).thenReturn(assetResource);
		Property property = mock(Property.class);
		Mockito.lenient().when(resolverFactory.getServiceResourceResolver(eventParams)).thenReturn(resourceResolver);
		Node node = Mockito.mock(Node.class);
		Mockito.lenient().when(node.getProperty(NameConstants.PN_TAGS)).thenReturn(property);
		Mockito.lenient().when(resource.adaptTo(Node.class)).thenReturn(node);
		Mockito.lenient().when(resourceResolver.adaptTo(Session.class)).thenReturn(session);
		Mockito.lenient().when(resource.adaptTo(ModifiableValueMap.class)).thenReturn(mvp);
		Mockito.lenient().when(resourceResolver.adaptTo(TagManager.class)).thenReturn(tagManager);
		when(node.hasProperty(NameConstants.PN_TAGS)).thenReturn(true);
		doThrow(new RepositoryException("Exception occurred")).when(property).isMultiple();
		ardxAssetEventHandler.handleEvent(event);
	}
	
	@Test
	void testPathNotFoundException() throws ReplicationException, LoginException, PathNotFoundException, RepositoryException {
		final Map<String, Object> eventParams = new HashMap<>();
		eventParams.put("path", "/content/dam/ardx/eifu/test.pdf/jcr:content/metadata");
		Event event = new Event("org/apache/sling/api/resource/Resource/ADDED", eventParams);
		Session session = mock(Session.class);
		Mockito.lenient().when(resourceResolver.adaptTo(Session.class)).thenReturn(session);
		Resource resource = mock(Resource.class);
		Mockito.lenient().when(resourceResolver.getResource("/content/dam/ardx/eifu/test.pdf/jcr:content/metadata")).thenReturn(resource);
		Resource assetResource = mock(Resource.class);
		Mockito.lenient().when(resourceResolver.getResource("/content/dam/ardx/eifu/test.pdf/jcr:content")).thenReturn(assetResource);
		Property property = mock(Property.class);
		Mockito.lenient().when(resolverFactory.getServiceResourceResolver(eventParams)).thenReturn(resourceResolver);
		Node node = Mockito.mock(Node.class);
		Mockito.lenient().when(node.getProperty(NameConstants.PN_TAGS)).thenReturn(property);
		Mockito.lenient().when(resource.adaptTo(Node.class)).thenReturn(node);
		Mockito.lenient().when(resourceResolver.adaptTo(Session.class)).thenReturn(session);
		Mockito.lenient().when(resource.adaptTo(ModifiableValueMap.class)).thenReturn(mvp);
		Mockito.lenient().when(resourceResolver.adaptTo(TagManager.class)).thenReturn(tagManager);
		when(node.hasProperty(NameConstants.PN_TAGS)).thenReturn(true);
		doThrow(new PathNotFoundException("Exception occurred")).when(property).isMultiple();
		ardxAssetEventHandler.handleEvent(event);
	}
	@Test
	void testValueException() throws ReplicationException, LoginException, PathNotFoundException, RepositoryException {
		final Map<String, Object> eventParams = new HashMap<>();
		eventParams.put("path", "/content/dam/ardx/eifu/test.pdf/jcr:content/metadata");
		Event event = new Event("org/apache/sling/api/resource/Resource/ADDED", eventParams);
		Session session = mock(Session.class);
		Mockito.lenient().when(resourceResolver.adaptTo(Session.class)).thenReturn(session);
		Resource resource = mock(Resource.class);
		Mockito.lenient().when(resourceResolver.getResource("/content/dam/ardx/eifu/test.pdf/jcr:content/metadata")).thenReturn(resource);
		Resource assetResource = mock(Resource.class);
		Mockito.lenient().when(resourceResolver.getResource("/content/dam/ardx/eifu/test.pdf/jcr:content")).thenReturn(assetResource);
		Property property = mock(Property.class);
		Mockito.lenient().when(resolverFactory.getServiceResourceResolver(eventParams)).thenReturn(resourceResolver);
		Node node = Mockito.mock(Node.class);
		Mockito.lenient().when(node.getProperty(NameConstants.PN_TAGS)).thenReturn(property);
		Mockito.lenient().when(resource.adaptTo(Node.class)).thenReturn(node);
		Mockito.lenient().when(resourceResolver.adaptTo(Session.class)).thenReturn(session);
		Mockito.lenient().when(resource.adaptTo(ModifiableValueMap.class)).thenReturn(mvp);
		Mockito.lenient().when(resourceResolver.adaptTo(TagManager.class)).thenReturn(tagManager);
		when(node.hasProperty(NameConstants.PN_TAGS)).thenReturn(true);
		doThrow(new ValueFormatException("Exception occurred")).when(property).isMultiple();
		ardxAssetEventHandler.handleEvent(event);
	}
	
}

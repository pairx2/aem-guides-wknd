package com.abbott.aem.platform.search.core.utils;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.mock;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import com.abbott.aem.platform.search.coveoconnector.core.constants.CommonConstants;
import com.abbott.aem.platform.search.coveoconnector.core.utils.CoveoConfigUtils;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.Page;

@ExtendWith(MockitoExtension.class)
public class CoveoConfigUtilsTest {

	@Mock
	Page page;

	@Mock
	Resource assetContent;

	@Mock
	Iterator<Resource> nodeIter;

	@Mock
	Iterator<Hit> nodeIter1;

	@Mock
	private QueryBuilder querybuilder;

	@Mock
	Node node;

	@Mock
	ResourceResolver resolver;

	@Mock
	List<Hit> hits;

	@BeforeEach
	void setup() {
		nodeIter = mock(Iterator.class);
		Mockito.lenient().when(resolver.findResources(
				"SELECT * FROM [nt:base] AS s WHERE ISCHILDNODE([" + CommonConstants.COVEO_CONFIG_BASE_PATH
						+ "]) AND [jcr:primaryType] = '" + CommonConstants.NODE_PRIMARY_TYPE_SLING_OSGICONFIG + "'",
				javax.jcr.query.Query.JCR_SQL2)).thenReturn(nodeIter);
		Mockito.lenient().when(nodeIter.hasNext()).thenReturn(true).thenReturn(false);
		Mockito.lenient().when(nodeIter.next()).thenReturn(assetContent);
		Mockito.lenient().when(assetContent.adaptTo(Node.class)).thenReturn(node);

	}

	@Test
	void testGetCoveoConfigNodes() {
		List<Node> list = CoveoConfigUtils.getCoveoConfigNodes(resolver);
		assertNotNull(list);
	}

	@Test
	void testGetIndexedPaths() throws RepositoryException {
		Mockito.lenient().when(resolver.adaptTo(QueryBuilder.class)).thenReturn(querybuilder);
		Query query = mock(Query.class);
		Session session = mock(Session.class);
		Mockito.lenient().when(resolver.adaptTo(Session.class)).thenReturn(session);
		Map<String, String> map = new HashMap<>();
		map.put("path", "/content");
		map.put("1_property", "coveoPush");
		map.put("1_property.value", "true");
		map.put("p.limit", "-1");
		Mockito.lenient().when(querybuilder.createQuery(PredicateGroup.create(map), session)).thenReturn(query);
		SearchResult expectedresult = mock(SearchResult.class);
		Mockito.lenient().when(query.getResult()).thenReturn(expectedresult);
		List<Node> nodes = CoveoConfigUtils.getIndexedPaths(resolver);
		assertNotNull(nodes);
	}

	@Test
	void testGetIndexedPaths1() throws RepositoryException {
		Mockito.lenient().when(resolver.adaptTo(QueryBuilder.class)).thenReturn(null);

		List<Node> nodes = CoveoConfigUtils.getIndexedPaths(resolver);
		assertNull(nodes);
	}

	@Test
	void testGetIndexedData() throws RepositoryException {
		Mockito.lenient().when(resolver.adaptTo(QueryBuilder.class)).thenReturn(querybuilder);
		Query query = mock(Query.class);
		Session session = mock(Session.class);
		List<Hit> hits = mock(List.class);
		Mockito.lenient().when(resolver.adaptTo(Session.class)).thenReturn(session);
		Map<String, String> map = new HashMap<>();
		map.put("path", "/content");
		map.put("1_property", "coveoPush");
		map.put("1_property.value", "true");
		map.put("p.limit", "-1");
		Mockito.lenient().when(querybuilder.createQuery(PredicateGroup.create(map), session)).thenReturn(query);
		SearchResult expectedresult = mock(SearchResult.class);
		Mockito.lenient().when(query.getResult()).thenReturn(expectedresult);

		List<Node> nodes = CoveoConfigUtils.getIndexedData(resolver, querybuilder);
		assertNotNull(nodes);
	}

	@Test
	void testGetIndexedData1() throws RepositoryException {
		Mockito.lenient().when(resolver.adaptTo(QueryBuilder.class)).thenReturn(querybuilder);
		Query query = mock(Query.class);
		Session session = mock(Session.class);
		List<Hit> hits = mock(List.class);
		Hit hit = mock(Hit.class);
		Mockito.lenient().when(resolver.adaptTo(Session.class)).thenReturn(session);
		Map<String, String> map = new HashMap<>();
		map.put("path", "/content");
		map.put("1_property", "coveoPush");
		map.put("1_property.value", "true");
		map.put("p.limit", "-1");
		Mockito.lenient().when(querybuilder.createQuery(PredicateGroup.create(map), session)).thenReturn(query);
		SearchResult expectedresult = mock(SearchResult.class);
		Mockito.lenient().when(query.getResult()).thenReturn(expectedresult);
		nodeIter1 = mock(Iterator.class);
		Mockito.lenient().when(expectedresult.getHits()).thenReturn(hits);
		Mockito.lenient().when(hits.iterator()).thenReturn(nodeIter1);
		Mockito.lenient().when(nodeIter1.hasNext()).thenReturn(true).thenReturn(false);
		Mockito.lenient().when(nodeIter1.next()).thenReturn(hit);
		Mockito.lenient().when(hit.getPath()).thenReturn("");
		Mockito.lenient().when(resolver.getResource(hit.getPath())).thenReturn(assetContent);

		Mockito.lenient().when(assetContent.adaptTo(Node.class)).thenReturn(node);
		Mockito.lenient().when(hits.isEmpty()).thenReturn(false);
		List<Node> nodes = CoveoConfigUtils.getIndexedData(resolver, querybuilder);
		assertNotNull(nodes);
	}

	@Test
	void testGetIndexedDataNull() throws RepositoryException {
		Mockito.lenient().when(resolver.adaptTo(QueryBuilder.class)).thenReturn(querybuilder);
		Query query = mock(Query.class);
		Session session = mock(Session.class);
		Mockito.lenient().when(resolver.adaptTo(Session.class)).thenReturn(session);
		Map<String, String> map = new HashMap<>();
		map.put("path", "/content");
		map.put("1_property", "coveoPush");
		map.put("1_property.value", "true");
		map.put("p.limit", "-1");
		Mockito.lenient().when(querybuilder.createQuery(PredicateGroup.create(map), session)).thenReturn(query);
		Mockito.lenient().when(query.getResult()).thenReturn(null);
		List<Node> nodes = CoveoConfigUtils.getIndexedData(resolver, querybuilder);
		assertNotNull(nodes);
	}

}

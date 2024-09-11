package com.abbott.aem.platform.common.components.servlets;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jcr.Session;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.adobe.granite.ui.components.ds.ResourceDataSource;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;

import lombok.NonNull;

@ExtendWith(MockitoExtension.class)
class ThemesDataSourceServletTest {

    @InjectMocks
    ThemesDataSourceServlet themesDataSourceServlet;

    @NonNull
    @Mock
    SlingHttpServletRequest request;

    @NonNull
    @Mock
    SlingHttpServletResponse response;

    @Mock
    Session session;

    @Mock
    Resource resource;

    @Mock
    ResourceResolver resourceResolver;

    @Mock
    ValueMap valueMap;

    @Mock
    ResourceDataSource dataSource;

    @Mock
    private QueryBuilder builder;

    @Mock
    private Query query;

    @Mock
    private SearchResult result;

    @Spy
    DocumentBuilderFactory factory;

    @Mock
    DocumentBuilder documentBuilder;

    @Mock
    Document doc;

    @Mock
    Element root;


    private List<Hit> hits = new ArrayList<>();

    @Mock
    private Hit hit;

    @BeforeEach
    public void setUp() throws Exception {
        resourceResolver = mock(ResourceResolver.class);
        resource = mock(Resource.class);
        request = mock(SlingHttpServletRequest.class);
        response = mock(SlingHttpServletResponse.class);
        valueMap = mock(ValueMap.class);
        session = mock(Session.class);
        query = mock(Query.class);
        result = mock(SearchResult.class);
        Hit hit1 = mock(Hit.class);
        hits.add(hit1);

        Map<String, String> map = new HashMap<>();
        map.put("path", "/apps");
        map.put("type", "cq:ClientLibraryFolder");
        map.put("property", "categories");
        map.put("property.operation", "like");
        map.put("property.value", "abbott.theme%");
        map.put("p.limit", "-1");
        map.put("orderby", "path");        

        when(factory.newDocumentBuilder()).thenReturn(documentBuilder);
        when(documentBuilder.newDocument()).thenReturn(doc);
        when(doc.createElement(any())).thenReturn(root);
        when(request.getResourceResolver()).thenReturn(resourceResolver);
        when(resourceResolver.adaptTo(Session.class)).thenReturn(session);
        when(builder.createQuery(PredicateGroup.create(map), session)).thenReturn(query);
        when(query.getResult()).thenReturn(result);
        when(result.getHits()).thenReturn(hits);
        when(hit1.getProperties()).thenReturn(valueMap);
        when(valueMap.containsKey("categories")).thenReturn(true);


    }

    @Test
    void testDoGet() {
        themesDataSourceServlet.doGet(request, response);
    }
}

package com.abbott.aem.cloud.platform.core.redirects.servlets;

import com.adobe.granite.ui.components.ExpressionResolver;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.SearchResult;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import lombok.NonNull;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.jcr.Session;
import javax.servlet.ServletException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.isNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class UrlRedirectsDataSourceServletTest {

    private final AemContext context = new AemContext(ResourceResolverType.RESOURCERESOLVER_MOCK);

    @InjectMocks
    UrlRedirectsDataSourceServlet servlet;

    @Mock
    ExpressionResolver expressionResolver;

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
    QueryBuilder builder;

    @Mock
    Query query;

    @Mock
    SearchResult result;

    @Mock
    Iterator<Resource> simpleDataSource;


    @BeforeEach
    public void setUp() {
        Map<String, String> map = new HashMap<>();
        map.put("path", "/conf");
        map.put("type", "cq:Page");
        map.put("1_property", "jcr:content/cq:template");
        map.put("1_property.value", "/apps/abbott-cloudplatform/templates/utilities/urlredirectconfig");
        map.put("orderby", "path");
        map.put("p.limit", "11");
        map.put("p.offset", "0");
        map.put("hasPermission", "rep:alterProperties");

        when(request.getResourceResolver()).thenReturn(resourceResolver);
        when(request.getResource()).thenReturn(resource);
        when(resourceResolver.adaptTo(QueryBuilder.class)).thenReturn(builder);
        when(resourceResolver.adaptTo(Session.class)).thenReturn(session);
        when(builder.createQuery(PredicateGroup.create(map), session)).thenReturn(query);
        when(query.getResult()).thenReturn(result);
        when(result.getResources()).thenReturn(simpleDataSource);
    }

    @Test
    void testDoGet() throws ServletException, IOException {
        ValueMap valueMap = mock(ValueMap.class);
        when(resource.getChild("datasource")).thenReturn(resource);
        when(resource.getValueMap()).thenReturn(valueMap);

        when(valueMap.containsKey("offset")).thenReturn(true);
        when(valueMap.containsKey("limit")).thenReturn(true);

        when(valueMap.get("offset")).thenReturn("0");
        when(valueMap.get("limit")).thenReturn("10");

        when(expressionResolver.resolve(ArgumentMatchers.eq("0"), isNull(), any(Class.class), eq(request))).thenReturn(0);
        when(expressionResolver.resolve(ArgumentMatchers.eq("10"), isNull(), any(Class.class), eq(request))).thenReturn(10);

        servlet.doGet(request, response);
        verify(query, times(1)).getResult();
    }

    @Test
    void testDoGet_whenEmptyConfig() throws ServletException, IOException {
        ValueMap valueMap = mock(ValueMap.class);
        when(resource.getChild("datasource")).thenReturn(resource);
        when(resource.getValueMap()).thenReturn(valueMap);

        when(valueMap.containsKey("offset")).thenReturn(true);
        when(valueMap.containsKey("limit")).thenReturn(true);

        when(valueMap.get("offset")).thenReturn("");
        when(valueMap.get("limit")).thenReturn("");

        servlet.doGet(request, response);
        verify(query, times(1)).getResult();
    }

    @Test
    void testDoGet_whenNoDatasource() throws ServletException, IOException {
        servlet.doGet(request, response);
        verify(query, times(1)).getResult();
    }
}
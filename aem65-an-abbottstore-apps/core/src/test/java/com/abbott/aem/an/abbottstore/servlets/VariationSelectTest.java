package com.abbott.aem.an.abbottstore.servlets;

import com.abbott.aem.an.abbottstore.constants.CommonConstants;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.request.RequestParameter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.servlet.ServletException;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class VariationSelectTest {

    private static final String PATH_PARAMETER = "/content/requestParameter";

    @Mock
    SlingHttpServletRequest request;

    @Mock
    SlingHttpServletResponse response;

    @InjectMocks
    VariationSelect variationSelect;

    @Mock
    RequestParameter requestParameter;

    @Mock
    PrintWriter printWriter;

    @Mock
    QueryBuilder queryBuilder;

    @Mock
    ResourceResolver resourceResolver;

    @Mock
    Query query;

    @Mock
    SearchResult searchResult;

    @Mock
    Hit hit;

    @Mock
    ValueMap valueMap;

    @Mock
    Resource resource;

    @BeforeEach
    public void setUp() throws ServletException, IOException {
        when(request.getRequestParameter(CommonConstants.SIZE)).thenReturn(requestParameter);
        when(request.getRequestParameter(CommonConstants.FLAVOR)).thenReturn(requestParameter);
        when(response.getWriter()).thenReturn(printWriter);
    }

    @Test
    void doGetWhenNull() throws ServletException, IOException {
        variationSelect.doGet(request, response);
    }

    @Test
    void doGet() throws ServletException, IOException, RepositoryException {
        when(request.getRequestParameter(CommonConstants.PROD_PATH)).thenReturn(requestParameter);
        when(request.getRequestParameter(CommonConstants.STORE)).thenReturn(requestParameter);
        when(request.getResourceResolver()).thenReturn(resourceResolver);
        when(request.getResourceResolver().adaptTo(QueryBuilder.class)).thenReturn(queryBuilder);

        Map<String, Object> queryMap = new HashMap<>();
        queryMap.put("1_property.value", "requestParameter");
        queryMap.put("path", PATH_PARAMETER);
        queryMap.put("1_property", "flavors");
        queryMap.put("type", "cq:PageContent");
        when(queryBuilder.createQuery(PredicateGroup.create(queryMap), request.getResourceResolver().adaptTo(Session.class))).thenReturn(query);
        when(query.getResult()).thenReturn(searchResult);

        List<Hit> hits = new ArrayList<>();
        hits.add(hit);
        when(hit.getPath()).thenReturn(PATH_PARAMETER);
        when(searchResult.getHits()).thenReturn(hits);
        when(request.getResourceResolver().getResource(PATH_PARAMETER)).thenReturn(resource);
        when(request.getResourceResolver().getResource(PATH_PARAMETER).adaptTo(ValueMap.class)).thenReturn(valueMap);
        variationSelect.doGet(request, response);
    }
}
package com.abbott.aem.an.abbottstore.scheduler;

import com.abbott.aem.an.abbottstore.constants.CommonConstants;
import com.abbott.aem.an.abbottstore.services.NutritionDataService;
import com.abbott.aem.an.abbottstore.services.NutritionFactsConfigurationService;
import com.abbott.aem.an.abbottstore.services.ResResolverBySysUserService;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.NameConstants;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.event.jobs.Job;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.lenient;

@ExtendWith(MockitoExtension.class)
class NutritionalAPIJobConsumerTest {

    @InjectMocks
    NutritionalAPIJobConsumer nutritionalAPIJobConsumer;

    @Mock
    ResResolverBySysUserService resolver;

    @Mock
    NutritionDataService nutritionDataService;

    @Mock
    ResourceResolver resourceResolver;

    @Mock
    QueryBuilder queryBuilder;

    @Mock
    Query query;

    @Mock
    Session session;

    @Mock
    Job job;

    @Mock
    Hit hit;

    @Mock
    SearchResult searchResult;

    @Mock
    NutritionFactsConfigurationService config;

    @Mock
    ValueMap valueMap;

    @BeforeEach
    void setUp() {
        lenient().when(job.getTopic()).thenReturn("nutritional job");
        lenient().when(resolver.getReadAndWriteResourceResolver()).thenReturn(resourceResolver);
        lenient().when(resourceResolver.adaptTo(Session.class)).thenReturn(session);
        lenient().when(resourceResolver.adaptTo(QueryBuilder.class)).thenReturn(queryBuilder);

        Map<String, Object> queryMap = new HashMap<>();
        queryMap.put("path", "/content/abbott/en");
        queryMap.put("type", "cq:PageContent");
        queryMap.put("property", "type_id");
        queryMap.put("property.value", "simple");
        queryMap.put("p.limit", "-1");

        lenient().when(queryBuilder.createQuery(PredicateGroup.create(queryMap), session)).thenReturn(query);
        lenient().when(query.getResult()).thenReturn(searchResult);

        List<Hit> hits = new ArrayList<>();
        hits.add(hit);
        lenient().when(searchResult.getHits()).thenReturn(hits);

    }

    @Test
    void process() throws RepositoryException {
        lenient().when(hit.getProperties()).thenReturn(valueMap);
        lenient().when(valueMap.get(NameConstants.NN_TEMPLATE, String.class)).thenReturn("abbott-product-template");
        lenient().when(valueMap.containsKey(CommonConstants.SKU)).thenReturn(true);
        nutritionalAPIJobConsumer.process(job);
    }

    @Test
    void processInvalid() throws RepositoryException {
        lenient().when(hit.getProperties()).thenThrow(RepositoryException.class);
        nutritionalAPIJobConsumer.process(job);
    }

    @Test
    void configure() {
        lenient().when(config.updateAll()).thenReturn(true);
        nutritionalAPIJobConsumer.configure(config);
        assertTrue(config.updateAll());

    }
}